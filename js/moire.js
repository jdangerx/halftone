(function() {
  function makeDiamond(attrs) {
    var center = attrs.center;
    var side = attrs.side;
    var color = attrs.color || "black";
    var corner = new Point(center.x - side/2, center.y - side/2);
    var diamond = new Shape.Rectangle(corner, new Size(side, side));
    diamond.rotation = 45;
    // diamond.fillColor = color;
    return diamond;
  }

  function grid(attrs) {
    attrs = attrs || {};
    rows = attrs.rows || 21;
    cols = attrs.cols || 21;
    size = attrs.size || 8;
    spacing = attrs.spacing || 20;
    color = attrs.color || "black";
    opacity = attrs.opacity || 1.0;

    var grid = new Group();

    for (var i = 1; i <= cols; i++) {
      for (var j = 1; j <= rows; j++) {
        grid.addChild(makeDiamond({center: new Point(i*spacing, j*spacing),
                                   side: size,
                                   opacity: opacity}));
      }
    }
    grid.fillColor = color;
    grid.opacity = opacity;
    grid.blendMode = "multiply";
    grid.position = view.center;
    return grid;
  }

  C = grid({color: "cyan"});
  C.rotation = 30;
  Y = grid({color: "yellow"});
  Y.rotation = 15;
  M = grid({color: "magenta"});
  M.rotation = 60;
  K = grid();
  // var d = makeDiamond({center: new Point(10, 10), side: 14});
  // d.fillColor = "black";
})();
