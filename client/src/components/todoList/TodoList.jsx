import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList(props) {
	return (
		<ul className='list-group list-group-flush'>
			{props.todos.map((todo) => (
				<TodoItem todo={todo} key={todo._id} deleteTodo={props.onDeleteTodo} finishTodo={props.onFinishedTodo} />
			))}
		</ul>
	);
}
