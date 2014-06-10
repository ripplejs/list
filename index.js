var observer = require('array-observer');

/**
 * Create a new List contructor that
 * can be used to create new lists using
 * a certain type of view.
 *
 * @param {View} Item
 *
 * @return {Function}
 */

module.exports = function(Item) {

  function List(items) {
    this.el = document.createDocumentFragment();
    this.observer = observer(items);
    this.observer.on('add', this.add.bind(this));
    this.observer.on('remove', this.remove.bind(this));
    this.observer.on('sort', this.render.bind(this));
    this.items = [];
    this.source = items;
    items.forEach(this.add.bind(this));
  }

  List.prototype.at = function(index) {
    return this.items[index];
  };

  List.prototype.add = function(obj, index) {
    var item;
    if (Object(obj) !== obj) {
      item = new Item({ value: obj });
    }
    else {
      item = new Item(obj);
    }
    if (index < this.el.children.length) {
      this.items.splice(index, 0, item);
      item.before(this.el.children[index]);
    }
    else {
      this.items.push(item);
      item.appendTo(this.el);
    }
    return this;
  };

  List.prototype.remove = function(index) {
    var items = this.items.splice(index, 1);
    items[0].remove();
    return items[0];
  };

  List.prototype.render = function() {
    var el = this.el;
    var items = this.items;
    this.source.forEach(function(obj){
      items.some(function(item){
        if (item.attrs === obj) {
          item.appendTo(el);
          return true;
        }
      });
    });
  };

  List.prototype.length = function() {
    return this.items.length;
  };

  List.prototype.destroy = function() {
    this.el.parentNode.removeChild(this.el);
    this.items.forEach(function(item){
      item.destroy();
    });
    this.observer.dispose();
    this.items = null;
  };

  return List;
};