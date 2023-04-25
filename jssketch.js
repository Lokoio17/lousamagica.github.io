//VARIAVEIS DE ACESSO AO DOM//
const labelRange = document.getElementById("labelRange");
const inputRange = document.getElementById("inputRange");
const inputColor = document.getElementById('inputColor')
const buttons = document.getElementsByClassName("buttons");
const ink = document.getElementById('ink')
const rubber = document.getElementById('rubber')
const containerGrid = document.getElementById("containerGrid");
const wipeOut = document.getElementById("apagar");
let inkColor = '#000000';
let isPainting = false;
let isErasing = false;
ink.classList.add('active')

// funcao para pintar com uma variavel booleana que se torna true quando a funcao é  chamada//
function paint(event) {
  event.target.style.backgroundColor = inkColor;
  isPainting = true
}
// a variavel booleana serve para  o evento mouseover acontecer somente ao ocorrer o  evento mousedown//
function continuePainting(event, is) {
  if (is) {
    event.target.style.backgroundColor = inkColor;
  }
}

function eraser(event) {
  paint(event)
  isErasing = true
}

function erasing(event) {
  continuePainting(event, isErasing)
}




// funcao para criar grid//
function createGrid() {
  labelRange.innerText = `O tamanho da lousa é: ${inputRange.value} X ${inputRange.value}`;
  let size = inputRange.value;
  containerGrid.style.gridTemplateColumns = `repeat(${size},1fr)`;
  containerGrid.style.gridTemplateRows = `repeat(${size},1fr)`;
  for (let i = 0; i < size ** 2; i++) {
    let gridItem = document.createElement("div");
    gridItem.classList.add("grid");
    containerGrid.appendChild(gridItem);
  }
}


//funcao para determinar o comportamento dos event listener dos itens de containerGrid de acordo com a active class//
function whichButton() {
  if (ink.classList.contains('active')) {
    inkColor = `${inputColor.value}`;
    const gridItems = containerGrid.querySelectorAll('.grid');
    gridItems.forEach(item => {
      item.addEventListener('mousedown', paint)
      item.addEventListener('mousemove', (event) => {
        continuePainting(event, isPainting)
      })
      item.addEventListener('mouseup', () => {
        isPainting = false
      })

    })
  } else if (rubber.classList.contains('active')) {
    inkColor = ''
    const gridItems = containerGrid.querySelectorAll('.grid');
    gridItems.forEach(item => {
      item.addEventListener('mousedown', eraser)
      item.addEventListener('mousemove', (event) => {
        erasing(event, isErasing)
      })
      item.addEventListener('mouseup', () => {
        isErasing = false
      })
    })
  }
}
// loop para criacao de somente uma active class//
for (let b = 0; b < buttons.length; b++) {
  buttons[b].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
    whichButton()
  });
}


// funcao para mudanca de tamanho do grid//
function changeSize() {
  containerGrid.innerHTML = "";
  createGrid();
  ink.classList.add('active')
  rubber.classList.remove("active")
  whichButton()
}


// event listeners//
containerGrid.addEventListener('mouseleave', () => {
  isPainting = false
  isErasing = false
})
inputRange.addEventListener("change", changeSize);
inputColor.addEventListener('change', whichButton)
wipeOut.addEventListener("click", changeSize)



window.onload = () => {
  createGrid()
  whichButton()
}