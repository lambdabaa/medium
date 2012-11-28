
goog.provide('medium.App');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('medium.ColoredMatrix');
goog.require('medium.Graph');



/**
 * @constructor
 * @export
 */
medium.App = function() {
  /**
   * @type {boolean}
   * @private
   */
  this.isLocked_ = false;


  /**
   * @type {Element}
   * @private
   */
  this.randomButton_ = goog.dom.getElementByClass('random-button');
  goog.events.listen(
      this.randomButton_, goog.events.EventType.CLICK,
      this.onRandomButtonClick_, false, this);
};
goog.addSingletonGetter(medium.App);
goog.exportSymbol('medium.App.getInstance', medium.App.getInstance);


/** @const */
medium.App.WIDTH = 50;


/** @const */
medium.App.HEIGHT = 50;


/**
 * @param {goog.events.Event} e
 * @private
 */
medium.App.prototype.onRandomButtonClick_ = function(e) {
  if (this.isLocked_) {
    return;
  }

  this.isLocked_ = true;

  // Get a random matrix, build a graph, and color connected components
  var matrix = this.createMatrix_(medium.App.HEIGHT, medium.App.WIDTH);
  var graph = medium.Graph.initWithBinaryMatrix(matrix);
  var nodeIds = graph.getNodeIds();
  this.colorConnectedComponents_(graph, nodeIds);

  // Render
  var container = goog.dom.getElement('wrap-container');

  var coloredMatrix = new medium.ColoredMatrix(graph, true);
  var incolor = goog.dom.getElementByClass('incolor');
  if (incolor) {
    goog.dom.removeChildren(incolor);
  } else {
    incolor = goog.dom.createDom('div');
    goog.dom.classes.add(incolor, 'incolor');
    goog.dom.appendChild(container, incolor);
  }
  coloredMatrix.render(incolor);

  var blackAndWhiteMatrix = new medium.ColoredMatrix(graph, false);
  var blackAndWhite = goog.dom.getElementByClass('blackandwhite');
  if (blackAndWhite) {
    goog.dom.removeChildren(blackAndWhite);
  } else {
    blackAndWhite = goog.dom.createDom('div');
    goog.dom.classes.add(blackAndWhite, 'blackandwhite');
    goog.dom.appendChild(container, blackAndWhite);
  }
  blackAndWhiteMatrix.render(blackAndWhite);

  this.isLocked_ = false;
};


/**
 * @param {number} n
 * @param {number} m
 * @return {Array}
 * @private
 */
medium.App.prototype.createMatrix_ = function(n, m) {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    matrix[i] = [];
    for (var j = 0; j < m; j++) {
      matrix[i].push(Math.round(Math.random()));
    }
  }

  return matrix;
};


/**
 * @param {medium.Graph} graph
 * @param {Array} nodeIds
 */
medium.App.prototype.colorConnectedComponents_ = function(graph, nodeIds) {
  var colour = 0;
  for (var i = 0; i < nodeIds.length; i++) {
    var nodeId = nodeIds[i];
    var node = graph.nodeIdToNode[nodeId];
    if (node.colour != 0) {
      // Already visited this node from a search originating from another
      continue;
    }

    colour += 1000000 / (medium.App.HEIGHT + medium.App.WIDTH);
    node.colour = colour;

    // Do a breadth first search starting at the node we just found
    var queue = [];
    queue.push(node);
    while (queue.length > 0) {
      var next = queue.shift();
      var neighbors = graph.nodeIdToNeighbors[next.serialize()];
      for (var n = 0; n < neighbors.length; n++) {
        var neighbor = neighbors[n];
        if (neighbor.colour != 0) {
          // Already visited and queued this node
          continue;
        }

        neighbor.colour = colour;
        queue.push(neighbor);
      }
    }
  }
};
