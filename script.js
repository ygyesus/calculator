let snarkyString = "HAHAHAHA";
function operate(operator, firstOperand, secondOperand){
    let result;
    switch(operator) {
        case '+':
            result = add(firstOperand, secondOperand);
            return result;
        case '-':
            result = subtract(firstOperand, secondOperand);
            return result;
        case 'x':
            result = multiply(firstOperand, secondOperand);
            return result;
        case '/':
            result = divide(firstOperand, secondOperand);
            return result;
    }
}

function add(a, b){
    return +a + +b;
}

function subtract(a, b){
    return a-b;
}

function multiply(a, b){
    return a*b;
}

function divide(a,b){
    if (b===0){
        return snarkyString;
    }
    return a/b;
}

let allOperations = ['+', '-', '/', 'x'];

const allButtons = Array.from(document.querySelectorAll('button'));

const display = document.querySelector('.display');
display.textContent = 0;

for (const button of allButtons){
    button.addEventListener('click', ()=>{
        if (display.textContent.includes(snarkyString)){
            display.textContent = "";
        }
    })
    // if clear
    if (button.textContent === "clear"){
        
        button.addEventListener('click', ()=>{
            display.textContent = 0;
            if (display.textContent === snarkyString){
                display.textContent = "";
            }
        });
    }
    
    // if 0-9 number
    else if(!isNaN(button.textContent) || button.textContent === "."){
        

        button.addEventListener('click', ()=>{
            if(display.textContent === "0") display.textContent = "";
            if (!(display.textContent.includes(".") && 
            button.textContent === ".")) {
                console.log(display.textContent);
                console.log(button.textContent);
                display.textContent += button.textContent;
            }
            if (display.textContent.includes(snarkyString)){
                display.textContent = snarkyString;
            }

        });
    }
    else{
        if (allOperations.includes(button.textContent)){
            button.addEventListener('click', ()=>{
                    if(display.textContent === "0") display.textContent = "";
                    display.textContent = evaluate(display.textContent);
                    display.textContent += button.textContent;
                    if (display.textContent.includes(snarkyString)){
                        display.textContent = snarkyString;
                    }
            });
        }
        else if(button.textContent === "="){
            button.addEventListener('click', ()=>{
                if(display.textContent === "0") display.textContent = "";
                display.textContent = evaluate(display.textContent);

                if (display.textContent.includes(snarkyString)){
                    display.textContent = snarkyString;
                }
            });
        }
        else if (button.textContent === "←"){
            button.addEventListener('click', ()=>{
                display.textContent = display.textContent.slice(0,-1);
            });

            if (display.textContent.includes(snarkyString)){
                display.textContent = snarkyString;
            }
        }
    }
}

// display.textContent = "";

function evaluate(expression){
    if (!isNaN(expression)){
        return Math.round(expression*100)/100;
    }

    let operator;
    if (expression.includes('+')){
        operator = '+';
    }
    else if (expression.includes('-')){
        operator = '-';
    }
    else if (expression.includes('x')){
        operator = 'x';
    }
    else if (expression.includes('/')){
        operator = '/';
    }

    
    let operands = expression.split(operator);
    let firstOperand = operands[0];
    let secondOperand = operands[1];
    if (operator === '/' && Number(secondOperand) === 0){
        return 'HAHAHAHA';
    }
    
    let finalResult = operate(operator, firstOperand, secondOperand);

    return Math.round(finalResult*100)/100;
}

