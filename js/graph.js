
goog.provide('medium.Graph');

goog.require('medium.Node');



/** @constructor */
medium.Graph = function() {
  /** @type {Object} */
  this.nodeIdToNode = {};

  /** @type {Object} */
  this.nodeIdToNeighbors = {};
};


/** @return {Array} of all ids of nodes in the graph. */
medium.Graph.prototype.getNodeIds = function() {
  var nodes = [];
  for (var k in this.nodeIdToNode) {
    nodes.push(k);
  }

  return nodes;
};


/** 
 * @param {Array} matrix
 * @return {medium.Graph}
 */
medium.Graph.initWithBinaryMatrix = function(matrix) {
  var graph = new medium.Graph();

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 0) {
        continue;
      }

      var node = new medium.Node(i, j);
      var nodeId = node.serialize();
      if (graph.nodeIdToNode[nodeId]) {
        // We already found this node
        node = graph.nodeIdToNode[nodeId];
      } else {
        graph.nodeIdToNode[nodeId] = node;
      }

      var neighbors = [];
      if (j + 1 < matrix[i].length && matrix[i][j + 1] == 1) {
        var neighbor = new medium.Node(i, j + 1);
        graph.nodeIdToNode[neighbor.serialize()] = neighbor
        neighbors.push(neighbor);
      }
      if (j - 1 >= 0 && matrix[i][j - 1] == 1) {
        var neighbor = new medium.Node(i, j - 1);
        graph.nodeIdToNode[neighbor.serialize()] = neighbor
        neighbors.push(neighbor);
      }
      if (i + 1 < matrix.length && matrix[i + 1][j] == 1) {
        var neighbor = new medium.Node(i + 1, j);
        graph.nodeIdToNode[neighbor.serialize()] = neighbor
        neighbors.push(neighbor);
      }
      if (i - 1 >= 0 && matrix[i - 1][j] == 1) {
        var neighbor = new medium.Node(i - 1, j);
        graph.nodeIdToNode[neighbor.serialize()] = neighbor
        neighbors.push(neighbor);
      }

      graph.nodeIdToNeighbors[nodeId] = neighbors;
    }
  }

  return graph;
};
