const Board = require("../dist/board").default;
const Rules = require("../dist/rules").default;
const Item = require("../dist/item").default;

const board = new Board({
  x: 5,
  y: 7,
});

const item = new Item({
  rules: {
    movement: {
      angular: true,
      linear: true,
      stepCount: 4,
    },
  },
});

board.setItemToCoord("3|5", item);

const rules = new Rules(board);

const boardElement = document.createElement("div");
boardElement.setAttribute("class", "board");

const appElement = document.querySelector(".app");
appElement.append(boardElement);

board.board.forEach((row,index) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("class", "row");
  boardElement.append(rowElement);
  
  // Row legendlerı ekle
    const rowLegend = document.createElement("span");
    rowLegend.setAttribute('class','rowLegend');
    rowLegend.innerHTML=index;
    rowElement.append(rowLegend);  
  // Row legendlerı ekle

  row.forEach((col) => {
    const colElement = document.createElement("div");
    colElement.setAttribute("class", "column");
    colElement.setAttribute("data-coord", col.id);
   
    // Col legendlerı ekle
      const isItFirstRow = col.id.split('|')[0] === '0';
      const rowNumber = col.id.split('|')[1];
      const colLegend = document.createElement("span");
      colLegend.setAttribute('class','colLegend');
      colLegend.innerHTML=rowNumber
      if(isItFirstRow){
        colElement.append(colLegend)
      }
    // Col legendlerı ekle
   
    if (col.item) {
      const itemElement = document.createElement("div");
      itemElement.setAttribute("class", "item");
      itemElement.setAttribute("data-coord", col.id);
      itemElement._props = item;

      colElement.append(itemElement);
    }

    rowElement.append(colElement);
  });
});

function showAvailableCoords() {
  const itemElement = document.querySelector(".item");
  const colElements = document.querySelectorAll(".column");

  for (colElement of colElements) {
    colElement.classList.remove("available");
  }

  const coord = itemElement.dataset.coord;

  const availableColumns = rules.getAvaiblableColumn(
    coord,
    itemElement._props.rules
  );
  
  availableColumns.forEach((coord) => {
    const availableColumn = document.querySelector(
      '.column[data-coord="' + coord + '"]'
    );
    availableColumn.classList.add("available");
  });
}

function update() {
  console.log(1);
  const directionAngularEl = document.querySelector("#direction_angular");
  const directionLinearEl = document.querySelector("#direction_linear");
  const stepCountEl = document.querySelector("#step_count");

  const isAngular = directionAngularEl.checked;
  const isLinear = directionLinearEl.checked;
  const stepCount = parseInt(stepCountEl.value);

  const itemElement = document.querySelector(".item");

  const item = new Item({
    rules: {
      movement: {
        angular: isAngular,
        linear: isLinear,
        stepCount: stepCount,
      },
    },
  });

  itemElement._props = item;

  showAvailableCoords();
}

document.querySelector("#direction_angular").addEventListener("change", update);
document.querySelector("#direction_linear").addEventListener("change", update);
document.querySelector("#step_count").addEventListener("change", update);

window.update = update;
