var BLACK_SQUARE = "\u25A0";

var makeRow = function(elt, width) {
  var row = "";
  var spacer = "<spacer class='spacer'> </spacer>";
  for (var i = 0; i < width; i++) {
    row += "<spacer class='spacer'>"+elt+"</spacer>";
  }

  row += "<br>";
  return row;
};


var setXSpace = function(grid, width) {
  var spacers = grid.getElementsByClassName("spacer");
  for (var i = 0; i < spacers.length; i++) {
    spacers[i].style.width = width;
    spacers[i].style.display = "inline-block";
  }
};


var setYSpace = function(grid, height) {
  grid.style["line-height"] = height;
};


var makeGrid = function(elt, x, y, xSpace, ySpace) {
  var container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "0px";
  container.style.top = "0px";
  container.style.width = "100%";
  var grid = document.createElement("div");
  for (var i = 0; i < y; i++) {
    grid.innerHTML += makeRow(elt, x);
  }
  setXSpace(grid, xSpace);
  setYSpace(grid, ySpace);
  // grid.style.float = "left";
  grid.style.opacity = "0.5";
  grid.style["text-align"] = "center";
  container.appendChild(grid);
  return container;
};


magentaGrid = makeGrid(BLACK_SQUARE, 21, 21, "2em", "2em");
magentaGrid.id = "magenta";
magentaGrid.style.color = "magenta";
magentaGrid.style.transform = "rotate(120deg)";
document.body.appendChild(magentaGrid);

blackGrid = makeGrid(BLACK_SQUARE, 21, 21, "2em", "2em");
blackGrid.id = "black";
blackGrid.style.color = "black";
document.body.appendChild(blackGrid);

cyanGrid = makeGrid(BLACK_SQUARE, 21, 21, "2em", "2em");
cyanGrid.id = "cyan";
cyanGrid.style.color = "cyan";
cyanGrid.style.transform = "rotate(60deg)";
document.body.appendChild(cyanGrid);

yellowGrid = makeGrid(BLACK_SQUARE, 21, 21, "2em", "2em");
yellowGrid.id = "yellow";
yellowGrid.style.color = "yellow";
yellowGrid.style.transform = "rotate(15deg)";
document.body.appendChild(yellowGrid);
