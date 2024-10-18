const zval = [];

function loadHomepage(){
  document.getElementById('infunc').value = localStorage.getItem('expression');
}

function clearFunction() {
  document.getElementById('infunc').value = '';
  saveFunction();
}
function saveFunction() {
  localStorage.setItem('expression', document.getElementById('infunc').value);
}








/*
// evaluate expressions
math.evaluate('sqrt(3^2 + 4^2)')        // 5
math.evaluate('sqrt(-4)')               // 2i
math.evaluate('2 inch to cm')           // 5.08 cm
math.evaluate('cos(45 deg)')            // 0.7071067811865476

// provide a scope
let scope = {
    a: 3,
    b: 4
}
math.evaluate('a * b', scope)           // 12
math.evaluate('c = 2.3 + 4.5', scope)   // 6.8
scope.c                                 // 6.8
*/

