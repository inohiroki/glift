glift.widgets.basicProblem = function(options) {
  var displayTypes = glift.enums.displayTypes;
  var boardRegions = glift.enums.boardRegions;
  var point = glift.util.point;
  var divId = options.divId;
  var display = glift.createDisplay(options);

  options.controllerType = "STATIC_PROBLEM_STUDY";
  var controller = glift.createController(options);
  var cropping = glift.bridge.getFromMovetree(controller.movetree);
  glift.bridge.setDisplayState(controller.getEntireBoardState(), display);
  return new glift.widgets._BasicProblem(display, controller);
};

// Basic problem function object.  Meant to be private;
glift.widgets._BasicProblem = function(display, controller) {
  this.display = display;
  this.controller = controller;

  var hoverColors = {
    "BLACK": "BLACK_HOVER",
    "WHITE": "WHITE_HOVER"
  };

  display.intersections().setEvent('click', function(pt) {
    var currentPlayer = controller.getCurrentPlayer();
    var data = controller.addStone(pt, currentPlayer);
    $('#extra_info').text(data.message + '//' + (data.result || ''));
    if (data.data !== undefined) {
      glift.bridge.setDisplayState(data.data, display);
    }
  });

  display.intersections().setEvent('mouseover', function(pt) {
    var currentPlayer = controller.getCurrentPlayer();
    if (controller.canAddStone(pt, currentPlayer)) {
      display.stones().setColor(pt, hoverColors[currentPlayer]);
    }
  });

  display.intersections().setEvent('mouseout', function(pt) {
    var currentPlayer = controller.getCurrentPlayer();
    if (controller.canAddStone(pt, currentPlayer)) {
      display.stones().setColor(pt, 'EMPTY');
    }
  });
};

glift.widgets._BasicProblem.prototype = {
  enableAutoResizing: function() {
    this.display.enableAutoResizing();
  },

  redraw: function() {
    this.display.destroy();
    this.display.redraw();
  },

  destroy: function() {
    this.display.destroy();
  }
};
