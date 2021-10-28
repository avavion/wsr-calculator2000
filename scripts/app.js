const calculator = document.querySelector("#calculator");

const resultInput = calculator.querySelector("#inputResult");

const calculatorForm = calculator.querySelector(".calculator-form");
const formButtons = calculatorForm.querySelectorAll('button');

const calculatorOperations = calculator.querySelector(".calculator-operators");
const operationButtons = calculatorOperations.querySelectorAll("button")

for (const button of formButtons) {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const self = e.target;
        const value = Number(self.getAttribute('data-value'));

        insertValueIntoInput(value);
    })
}

let operation = '';
let operations = [];

for (const button of operationButtons) {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const self = e.target;
        const value = self.getAttribute('data-value');

        operations.push(Number(resultInput.value));
        operation = value;
        console.log(operation);

        clearInput();

        console.log(operations);
    });
}

document.addEventListener("keydown", (e) => {

    for (let i = 0; i < 10; i++) {
        if (Number(e.key) === i) {
            insertValueIntoInput(e.key);
        }
    }

    if (e.key.toLowerCase() === "backspace") {
        resultInput.value = resultInput.value.split("").slice(0, resultInput.value.split('').length - 1).join('');

        if (resultInput.value === '') {
            resultInput.value = '0';
        }
    }

    if (e.key === '.' || e.key === ',') {
        if (resultInput.value.split("").includes(',')) {
            return;
        }
        resultInput.value += ",";
    }

    if (e.key.toLowerCase() === 'enter') {
        e.preventDefault();
        e.stopPropagation();

        operations.push(Number(resultInput.value));
        compute();
    }

    console.log("DEBUG: KEY =", e.key);
});

function compute() {

    console.log(operations);

    if (operations.length === 0) {
        return;
    }

    switch (operation) {
        case "sum":
            resultInput.value = operations[0] + operations[1];
            operations = [];
            break;
        case "minus":
            resultInput.value = operations[0] - operations[1];
            operations = [];
            break;
        case "divined":
            resultInput.value = operations[0] / operations[1];
            operations = [];
            break;

        case "multiplication":
            resultInput.value = operations[0] * operations[1];
            operations = [];
            break;
    }
}

function clearInput() {
    resultInput.value = '0';
}

function insertValueIntoInput(value) {
    if (resultInput.value === "0") {
        resultInput.value = value;
        return;
    }

    resultInput.value += value;
    return;
}