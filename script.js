let firstOperand;
let operation;
let secondOperand;

function operate(operator, firstOperand, secondOperand){
    let result;
    switch(operator) {
        case '+':
            result = add(firstOperand, secondOperand);
            return result;
        case '-':
            result = subtract(firstOperand, secondOperand);
            return result;
        case '*':
            result = multiply(firstOperand, secondOperand);
            return result;
        case '/':
            result = divide(firstOperand, secondOperand);
            return result;
    }
}

function add(a, b){
    return a+b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a,b){
    return a/b;
}