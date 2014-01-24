glift.controllers.boardEditor = function(sgfOptions) {
  var controllers = glift.controllers;
  var baseController = glift.util.beget(controllers.base());
  var newController = glift.util.setMethods(baseController,
          glift.controllers.boardEditorMethods);
  baseController.initOptions(sgfOptions);
  return baseController;
};

glift.controllers.BoardEditorMethods = {
  addStone: function(point, color, mark) {
    console.log(point);
    console.log(color);
    console.log(mark);
  }
};
