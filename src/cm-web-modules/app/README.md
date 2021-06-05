# The cm-app Framework

An SOV (State Observer) Framework.

It is mainly [bind.js](https://github.com/remy/bind.js/) with the addition of automatically adding 
actions via a "data-event-listener", "data-delegate" and "data-action" attributes at the inputs.

See example [ToDoListComponent.js](../../../examples/todo-list/ToDoListComponent.js).

## Component
- the Controller
- contains View, State and Actions
- handles Events from the View, Button clicks, Input changes
    - Events change the state of the component (the model data)

## View
- redraw on observing the State

## State 
- the Model
- holds the data
- can be class or struct