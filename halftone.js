var BLACK_SQUARE = "\u25A0";

function Grid(color, elt, x, y, xSpace, ySpace, initRotation) {
  this.color = color;
  this.elt = elt;
  this.rotation = initRotation;

  this.container = document.createElement("div");
  this.container.class = "container";
  this.container.id = color;
  this.container.style.color = color;
  this.container.style["font-size"] = (window.innerHeight / (y * ySpace)) + "px";
  this.container.style.position = "absolute";
  this.container.style.left = "0px";
  this.container.style.top = "0px";
  this.container.style.width = "100%";
  this.container.style.height = "100%";
  this.container.style.clip = "rect(0px, "+window.innerWidth+"px, "+window.innerHeight+"px, 0px)";

  this.grid = document.createElement("div");
  this.grid.class = "grid";
  for (var i = 0; i < y; i++) {
    this.grid.innerHTML += this.makeRow(x);
  }
  this.setXSpace(xSpace);
  this.setYSpace(ySpace);
  this.grid.style.opacity = "0.7";
  this.grid.style["text-align"] = "center";

  this.container.appendChild(this.grid);
  document.body.appendChild(this.container);
}

Grid.prototype = {
  setXSpace: function(width) {
    var spacers = this.grid.getElementsByClassName("spacer");
    for (var i = 0; i < spacers.length; i++) {
      spacers[i].style.width = width + "em";
      spacers[i].style.display = "inline-block";
    }
  },

  setYSpace: function(height) {
    this.grid.style["line-height"] = height + "em";
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
                      8,
                      24,
                      1.2,
                      1.2,
                      initRotations[color]);
  return grid;
});

var update = function() {
  grids.forEach(function(grid, i) {
    grid.rotation += (i + 5) / 30;
    grid.update();
  });
  window.requestAnimationFrame(update);
};

update();
