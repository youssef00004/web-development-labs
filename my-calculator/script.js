const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    // Handle clear button
    if (action === "clear") {
      firstNumber = "";
      secondNumber = "";
      operator = "";
      result = "";
      display.value = "";
      return;
    }

    // Handle delete
    if (action === "delete") {
      if (operator === "") {
        firstNumber = firstNumber.slice(0, -1);
        display.value = firstNumber;
      } else {
        secondNumber = secondNumber.slice(0, -1);
        display.value = firstNumber + operator + secondNumber;
      }
      return;
    }

    // Handle equal
    if (action === "equals") {
      if (firstNumber && operator && secondNumber) {
        result = calculate(firstNumber, secondNumber, operator);
        display.value = result;
        firstNumber = result.toString();
        secondNumber = "";
        operator = "";
      }
      return;
    }

    // Handle operator
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      if (firstNumber !== "") operator = value;
      display.value = firstNumber + operator;
      return;
    }

    // Handle numbers and dot
    if (!operator) {
      firstNumber += value;
      display.value = firstNumber;
    } else {
      secondNumber += value;
      display.value = firstNumber + operator + secondNumber;
    }
  });
});

// Function to calculate manually (no eval)
function calculate(num1, num2, op) {
  const a = parseFloat(num1);
  const b = parseFloat(num2);
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : "Error";
    default:
      return "";
  }
}
