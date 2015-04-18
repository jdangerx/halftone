var BLACK_SQUARE = "\u25A0";

function Grid(color, elt, x, y, xspace, yspace, initRotation) {
  this.color = color;
  this.elt = elt;
  this.rotation = initRotation;
  this.rotvel = 5;
  this.xspace = xspace;
  this.yspace = yspace;

  this.container = document.createElement("div");
  this.container.class = "container";
  this.grid = document.createElement("div");
  this.grid.class = "grid";

  this.container.id = color;
  this.container.style.color = color;
  this.grid.style.opacity = "0.7";

  // CSS to get things properly centered
  this.container.style.position = "absolute";
  this.container.style.left = "0px";
  this.container.style.top = "0px";
  this.container.style.width = "100%";
  this.container.style.height = "100%";
  this.container.style.clip = "rect(0px, "+window.innerWidth+"px, "+window.innerHeight+"px, 0px)";
  this.grid.style["text-align"] = "center";
  this.container.style["font-size"] = (window.innerHeight / (y * yspace)) + "px";

  // populate the grid
  for (var i = 0; i < y; i++) {
    this.grid.innerHTML += this.makeRow(x);
  }
  this.setXSpace();
  this.setYSpace();

  this.container.appendChild(this.grid);
  document.body.appendChild(this.container);
}

Grid.prototype = {
  setXSpace: function() {
    var spacers = this.grid.getElementsByClassName("spacer");
    for (var i = 0; i < spacers.length; i++) {
      spacers[i].style.width = this.xspace + "em";
      spacers[i].style.display = "inline-block";
    }
  },

  setYSpace: function() {
    this.grid.style["line-height"] = this.yspace + "em";
  },

  makeRow: function(width) {
    var row = "";
    var spacer = "<spacer class='spacer'> </spacer>";
    for (var i = 0; i < width; i++) {
      row += "<spacer class='spacer'>"+this.elt+"</spacer>";
    }
    row += "<br>";
    return row;
  },

  update: function() {
    this.grid.style.transform = "rotate(" + this.rotation + "deg)";
  }

};


var colors = ["cyan", "yellow", "magenta", "black"];
var initRotations = {
  "cyan": 60,
  "yellow": 15,
  "magenta": -60,
  "black": 0
};

var grids = colors.map(function(color) {
  var grid = new Grid(color,
                      BLACK_SQUARE,
                      24,
                      24,
                      1.4,
                      1.4,
                      initRotations[color]);
  return grid;
});

var update = function() {
  grids.forEach(function(grid, i) {
    grid.rotation += grid.rotvel / 30;
    grid.update();
  });
  window.requestAnimationFrame(update);
};

document.onkeypress = function(e) {
  console.log(e.charCode);
  var charPressed = String.fromCharCode(e.charCode);

  var charsToGrids = {"a": grids[0],
                      "s": grids[1],
                      "d": grids[2],
                      "f": grids[3]};

  function isUpperCase(c) {
    return c === c.toUpperCase();
  }

  var activeGrid = charsToGrids[charPressed.toLowerCase()];
  activeGrid.rotvel += isUpperCase(charPressed) ? -1 : 1;
};

update();
