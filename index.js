//!DOM ACCESS
const display = document.querySelector(".screen"); 
const keys = document.querySelector(".calc-keys"); 
//! DOM ACCESS
//! GLOBAL VARİABLES
let displayValue = `0`;
let firstValue = null;
let operator = null; 
let waitingSecondValue = false; 
//*Bu değerler değişeceği için, bunları let kapsamında tanımladık.
//! GLOBAL VARİABLES
updateDisplay = () => {
  display.value = displayValue;
};
updateDisplay();
keys.addEventListener("click", (e) => {
  const element = e.target; 
  if (!element.matches("button")) return; 
  //TODO START:Temizleme, ondalık, aritmetik operatörleri ve tuşlarını sınıf listesinden eriştik. Bu sayede her bir tuşa tıkladığımızda, yapması gereken işlemi yapacaktır.
  if (element.classList.contains("operator")) {
    handleOperator(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("decimal")) {
    inputDecimal();
    //TODO:Ondalık işareti basıldığında bir nokta ekleyen fonksiyonu çağırdık. Ancak, eğer ekrandaki değerde zaten bir nokta varsa, fonksiyondaki koşul bunu anlar ve çalışmaz.
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    inputClear();
    //TODO:Ekran üzerindeki veriyi temizleyen fonksiyonu çağırdık.
    updateDisplay();
    return;
  }
  inputElement(element.value);
  //TODO: Bir sayıya tıklandığında, ekran üzerine değerini yazacak olan fonksiyonu çağırıyoruz.
  updateDisplay();
  //TODO STOP
});
/*TODO START:Operatör butonlarından birine bastığımızda, ilk değeri ve operatörü bir değişkene kaydeder.
Eşittir'e bastığımızda hesaplama yaparsak, sonucu ekrana yazar ve sonucu ilk değer olarak kaydederiz.
Böylece ekrana yazılan değeri sonuç üzerinden işlemeye devam edebiliriz.*/
handleOperator = (nextOperator) => {
  const value = parseFloat(displayValue);
  if (operator && waitingSecondValue) {
    operator = nextOperator;
    return;
  }
  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = `${parseFloat(result).toFixed(4)}`;
    firstValue = result;
  }
  waitingSecondValue = true;
  operator = nextOperator;
};
//TODO STOP:
calculate = (first, second, opr) => {
  //TODO:Operatöre göre istenilen işlemi gerçekleştiren switch içeren bir hesaplama fonksiyonu oluşturduk. Eğer uygun operatör basılmamışsa, hesaplamayı yapmaz ve ikinci değeri döndürür.
  switch (opr) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return first / second;
    default:
      return second;
  }
};
inputElement = (num) => {
  if (waitingSecondValue) {
    displayValue = num;
    waitingSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num; //!order is important
  }
};
inputDecimal = () => {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
};
inputClear = () => {
  displayValue = "0";
  waitingSecondValue = false; 
  firstValue = null;
  operator = null; 
};
