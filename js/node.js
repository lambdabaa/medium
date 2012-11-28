
goog.provide('medium.Node');



/**
 * @constructor
 * @param {number} row
 * @param {number} col
 */
medium.Node = function(row, col) {
  /** @type {number} */
  this.row = row;

  /** @type {number} */
  this.col = col;

  /** @type {number} */
  this.colour = 0;
};


/** @return {string} a unique string representation of this node. */
medium.Node.prototype.serialize = function() {
  return '(' + this.row + ', ' + this.col + ')';
};
