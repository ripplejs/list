var assert = require('assert');
var createList = require('list');
var ripple = require('ripple');

var ListItem = ripple('<li>{{name}}</li>')
  .attr('name');

var List = createList(ListItem);

describe('list', function(){
  var list;
  var items = [{
    name: 'one'
  }, {
    name: 'two'
  }, {
    name: 'three'
  }];

  before(function () {
    list = new List(items);
  });

  it('should render items initially', function(){
    var children = list.el.children;
    assert(children.length === 3, 'should have 3 children');
    assert(children[0].innerHTML === 'one');
    assert(children[1].innerHTML === 'two');
    assert(children[2].innerHTML === 'three');
  });

  it('should add items', function () {
    var children = list.el.children;
    items.push({ name: 'four' });
    assert(children.length === 4, 'should have 4 children');
    assert(children[0].innerHTML === 'one');
    assert(children[1].innerHTML === 'two');
    assert(children[2].innerHTML === 'three');
    assert(children[3].innerHTML === 'four');
  });

  it('should remove items', function () {
    var children = list.el.children;
    items.shift();
    assert(children.length === 3, 'should have 3 children');
    assert(children[0].innerHTML === 'two');
    assert(children[1].innerHTML === 'three');
    assert(children[2].innerHTML === 'four');
  });

  it('should add items at an index', function () {
    var children = list.el.children;
    items.splice(1, 0, { name: 'five' });
    assert(children.length === 4, 'should have 4 children');
    assert(children[0].innerHTML === 'two');
    assert(children[1].innerHTML === 'five');
    assert(children[2].innerHTML === 'three');
    assert(children[3].innerHTML === 'four');
  });

  it('should sort items', function () {
    var children = list.el.children;
    items.sort(function(a, b){
      return a.name > b.name;
    });
    assert(children.length === 4);
    assert(children[0].innerHTML === 'five');
    assert(children[1].innerHTML === 'four');
    assert(children[2].innerHTML === 'three');
    assert(children[3].innerHTML === 'two');
  });

  it('should render plain array values', function () {
    var ListItem = ripple('<li>{{value}}</li>');
    var List = createList(ListItem);
    var list = new List(['one', 'two', 'three']);
    var children = list.el.children;
    assert(children.length === 3, 'should have 3 children');
    assert(children[0].innerHTML === 'one');
    assert(children[1].innerHTML === 'two');
    assert(children[2].innerHTML === 'three');
  });

});