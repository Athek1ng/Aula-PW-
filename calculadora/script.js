const display = document.getElementById('display');
const keys = document.querySelector('.calculator__keys');
let currentValue = '0';
let operator = null;
let previousValue = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentValue;
}

function appendNumber(number) {
    if (shouldResetDisplay) {
        currentValue = '0';
        shouldResetDisplay = false;
    }

    if (number === '.' && currentValue.includes('.')) return;
    if (currentValue === '0' && number !== '.') {
        currentValue = number;
        return;
    }

    currentValue += number;
}

function chooseOperator(nextOperator) {
    if (operator !== null) {
        compute();
    }
    previousValue = currentValue;
    operator = nextOperator;
    shouldResetDisplay = true;
}

function compute() {
    if (operator === null || previousValue === null) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result = 0;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Erro' : prev / current;
            break;
        default:
            return;
    }

    currentValue = String(result);
    operator = null;
    previousValue = null;
    shouldResetDisplay = true;
}

function clearCalculator() {
    currentValue = '0';
    operator = null;
    previousValue = null;
    shouldResetDisplay = false;
}

function deleteDigit() {
    if (shouldResetDisplay) {
        currentValue = '0';
        shouldResetDisplay = false;
        return;
    }

    currentValue = currentValue.slice(0, -1);
    if (currentValue === '' || currentValue === '-' ) {
        currentValue = '0';
    }
}

keys.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('button')) return;

    if (target.dataset.number) {
        appendNumber(target.dataset.number);
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'operator') {
        chooseOperator(target.textContent);
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'clear') {
        clearCalculator();
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'delete') {
        deleteDigit();
        updateDisplay();
        return;
    }

    if (target.dataset.action === 'calculate') {
        compute();
        updateDisplay();
    }
});

updateDisplay();
