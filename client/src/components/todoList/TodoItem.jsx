import React from 'react';

//Some internal components just for using in TODOITEM component
function CheckBox(props) {
	console.log(props.finished);
	if (props.finished) return <i className='fas fa-check-square text-primary'></i>;
	return <i className='fas fa-square text-primary'></i>;
}

function NameText(props) {
	const p = <p className='m-0 text-center'>{props.todo.name}</p>;
	return props.todo.finished ? (
		<del>
			<>{p}</>
		</del>
	) : (
		<>{p}</>
	);
}

export default function TodoItem(props) {
	return (
		<li className='list-group-item d-flex justify-content-between align-items-center'>
			<NameText todo={props.todo} />
			<div className='d-flex justify-content-between align-items-center'>
				<p className='m-0 mr-4'>Created : {new Date(props.todo.date).toLocaleString()}</p>
				<div className='mr-2' style={{ cursor: 'pointer' }} onClick={() => props.finishTodo(props.todo)}>
					<CheckBox finished={props.todo.finished} />
				</div>
				<i className='fas fa-trash text-danger' style={{ cursor: 'pointer' }} onClick={() => props.deleteTodo(props.todo._id)}></i>
			</div>
		</li>
	);
}
