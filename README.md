
var Todo = ripple('<li>{{name}}</li>')
  .attr('name', { required: true, type: 'string' });

var Category = ripple('<li>{{$value}}</li>');

var TodoList = ripple(template)
  .attr('todos', { required: true, type: 'array' })
  .attr('categories', { required: true, type: 'array' })
  .attr('items', { items: 'todos', view: Todo })
  .use(each());

TodoList.prototype.add = function(data) {
  this.todos.push(data);
};

var todolist = new TodoList({
  categories: ['high', 'regular', 'low'],
  todos: [{
    name: "Buy Milk"
  }]
});

<div class="TodoList">
  Categories: 
  <ul each="{{categories}}">
    <li>{{$value}}</li>
  </ul>
  <div class="Todos">
    {{todos}}
  </div>
</div>


