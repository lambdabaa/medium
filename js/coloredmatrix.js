
goog.provide('medium.ColoredMatrix');

goog.require('goog.color');
goog.require('goog.dom');
goog.require('goog.ui.Component');



/**
 * @constructor
 * @param {medium.Graph} graph
 * @param {boolean} incolor
 * @extends {goog.ui.Component}
 */
medium.ColoredMatrix = function(graph, incolor) {
  goog.base(this);

  /**
   * @type {medium.Graph}
   * @private
   */
  this.graph_ = graph;

  /**
   * @type {boolean}
   * @private
   */
  this.incolor_ = incolor;
};
goog.inherits(medium.ColoredMatrix, goog.ui.Component);


medium.ColoredMatrix.prototype.createDom = function() {
  this.decorateInternal(this.dom_.createElement('canvas'));
};


medium.ColoredMatrix.prototype.enterDocument = function() {
  var context = this.element_.getContext('2d');

  for (var i = 0; i < medium.App.HEIGHT; i++) {
    for (var j = 0; j < medium.App.WIDTH; j++) {
      context.fillStyle = 'rgb(255, 255, 255)';
      context.fillRect(20 * j, 20 * i, 20, 20);
    }
  }

  for (var nodeId in this.graph_.nodeIdToNode) {
    var node = this.graph_.nodeIdToNode[nodeId];
    context.fillStyle =
        this.incolor_ ? this.numToRgbStyle_(node.colour) : 'rgb(0, 0, 0)';
    context.fillRect(
        20 * node.col, 20 * node.row, 20, 20);
  }
};


/**
 * @param {number} colour
 * @private
 */
medium.ColoredMatrix.prototype.numToRgbStyle_ = function(colour) {
  var hexString = colour.toString(16);
  while (hexString.length < 6) {
    hexString = '0' + hexString;
  }
  hexString = '#' + hexString;
  return goog.color.hexToRgbStyle(hexString);
};
