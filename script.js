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
    return a/b;
}

let allOperations = ['+', '-', '/', 'x'];

const allButtons = Array.from(document.querySelectorAll('button'));

const display = document.querySelector('.display');
display.textContent = 0;


document.addEventListener("keydown", (e)=>{
    let key = e.key;
    // Backspace
    if (key === "Backspace"){
        if (display.textContent.includes(snarkyString)){
            display.textContent = "";
        }
        display.textContent = display.textContent.slice(0,-1);
    }
    // Numbers
    else if (0<=key && key<=9){
        if (display.textContent.includes(snarkyString)){
            display.textContent = "";
        }

        if(display.textContent === "0") display.textContent = "";
        if (!(display.textContent.includes(".") && 
        key === ".")) {
            display.textContent += key;
        }
    }
    // DOT
    else if (key === "."){
        if (display.textContent.includes(snarkyString)){
            display.textContent = "";
        }

        if(display.textContent === "0") display.textContent = "";

        display.textContent += key;
        

        if (display.textContent.includes(snarkyString)){
            display.textContent = "";
        }

        if(display.textContent === "0") display.textContent = "";
        let expression = display.textContent;
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
    }
    // equals
    else if (key === "=" || key === "Enter"){
        if (display.textContent.includes(snarkyString)){
            display.textContent = "";
        }
        if(display.textContent === "0") display.textContent = "";
        display.textContent = evaluate(display.textContent);
    }
    // operators
    else if (key === '+' || key === '-' || key === 'x' || key === '/'){

        if (display.textContent.includes(snarkyString)){
            display.textContent = "";
        }
        if(display.textContent === "0") display.textContent = "";
        display.textContent = evaluate(display.textContent);
        if (!display.textContent.includes(snarkyString)){
            display.textContent += key;
        }

    }
})

for (const button of allButtons){

    // if clear
    if (button.textContent === "clear"){
        
        button.addEventListener('click', ()=>{
            
            display.textContent = 0;

        });
    }
    
    // if 0-9 number OR dot
    else if(!isNaN(button.textContent) || button.textContent === "."){
        button.addEventListener('click', ()=>{
            if (display.textContent.includes(snarkyString)){
                display.textContent = "";
            }

            if(display.textContent === "0") display.textContent = "";
            if (!(display.textContent.includes(".") && 
            button.textContent === ".")) {
                display.textContent += button.textContent;
            }
        });
    }
    else{
        // operations
        if (allOperations.includes(button.textContent)){
            button.addEventListener('click', ()=>{

                if (display.textContent.includes(snarkyString)){
                    display.textContent = "";
                }
                if(display.textContent === "0") display.textContent = "";
                display.textContent = evaluate(display.textContent);
                if (!display.textContent.includes(snarkyString)){
                    display.textContent += button.textContent;
                }

            });
        }
        // equals
        else if(button.textContent === "="){
            button.addEventListener('click', ()=>{
                if (display.textContent.includes(snarkyString)){
                    display.textContent = "";
                }
                if(display.textContent === "0") display.textContent = "";
                display.textContent = evaluate(display.textContent);
            });
        }
        // backspace
        else if (button.textContent === "←"){
            button.addEventListener('click', ()=>{
                if (display.textContent.includes(snarkyString)){
                    display.textContent = "";
                }
                display.textContent = display.textContent.slice(0,-1);
            });
        }
    }
}


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

    console.log("OPERATOR:", operator);
    let operands = expression.split(operator);
    let firstOperand = operands[0];
    let secondOperand = operands[1];

    let finalResult = operate(operator, firstOperand, secondOperand);

    finalResult = Math.round(finalResult*100)/100;
    if (isNaN(finalResult) ||
        (operator === '/' && Number(secondOperand) === 0)
    ){
        // console.log(firstOperand, operator, secondOperand);
        return snarkyString;
    }
    return finalResult;
}