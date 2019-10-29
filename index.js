let bufferValue = "0";
let currentValue = 0;
let prevOperator;
const disp = document.querySelector(".disp");

function buttonClick(value) {
  //action on button click
  if (isNaN(parseInt(value))) {
    forSymbol(value);
  } else {
    forNumber(value);
  }
  reRender();
}

function forNumber(value) {
  if (bufferValue === "0") {
    bufferValue = value;
  } else {
    bufferValue += value;
  }
}

function forSymbol(value) {
  switch (value) {
    case "C":
      bufferValue = "0";
      currentValue = 0;
      break;
    case "←":
      //if bufferValue length is greater than 1 ,
      //return string from 0 to length-1
      if (bufferValue.length === 1) {
        bufferValue = "0";
      } else {
        bufferValue = bufferValue.substring(0, bufferValue.length - 1);
      }
      break;
    case "=":
      if (prevOperator === null) {
        return;
      }
      flushOperation(parseInt(bufferValue)); //performs operation
      prevOperator = null; //refresh operator
      bufferValue = +currentValue;
      currentValue = 0;
      break;
    case "+":
    case "×":
    case "-":
    case "÷":
      forMath(value); //calls the function for math tasks
      break;
  }
}

function forMath(value) {
  if (bufferValue === 0) {
    //do nothing if buffer is 0
    return;
  }

  const intBuffer = parseInt(bufferValue); //convert bufferValue to integer
  if (currentValue === 0) {
    currentValue = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  prevOperator = value; //updates operator
  bufferValue = "0";
}

function flushOperation(intBuffer) {
  //perform the operation by prevOperator
  if (prevOperator === "+") {
    currentValue += intBuffer;
  }
  if (prevOperator === "-") {
    currentValue -= intBuffer;
  }
  if (prevOperator === "×") {
    currentValue *= intBuffer;
  }
  if (prevOperator === "÷") {
    currentValue /= intBuffer;
  }
}

function reRender() {
  //re render the bufferValue on display
  disp.innerText = bufferValue;
}

let button = document.querySelector(".calc-buttons"); //init event listner
button.addEventListener("click", function(event) {
  buttonClick(event.target.innerText);
});
