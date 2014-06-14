# List

**Work in progress**

Create lists of views that map to an array of data.

## Install

```
component install ripplejs/list
```

## Usage

First create a child view for the items in the list:

```js
var Todo = ripple('<li>{{name}}</li>');
```

Then create your main view:

```js
var TodoList = ripple(template)
  .attr('todos', { required: true, type: 'array' })
  .attr('items', { map: 'todos', view: Todo })
  .use(list());
```

Add `list` as a plugin and you'll be able to use `map` and `view` within attributes. This maps the `items` property to the `todos` property and will create a new `Todo` view for each item in the array.

The template might look like this:

```html
<div class="TodoList">
  <ul class="Todos">{{items}}</ul>
</div>
```

The `items` value will be a view with an `el` property so it will render the list's element within the `ul`. 

Then you can create your view as normal, passing in todos:

```js
var todolist = new TodoList({
  todos: [{
    name: "Buy Milk"
  }]
});
```

Then you can manipulate the array itself to add, remove and sort items:

```js
todos.push({
  name: "Feed cat"
});

todos.sort();
todos.pop();
```


