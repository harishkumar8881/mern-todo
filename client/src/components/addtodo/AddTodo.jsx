import React, { useState } from 'react';

function AddTodo(props) {
	const [value, setValue] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		if (value === '') {
			alert("Enter the todo's name");
			return;
		}
		const todo = {
			name: value, //Date added on server side
			finished: false,
		};
		props.onAddTodo(todo);
		setValue('');
	};

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<form className='mt-1' onSubmit={handleSubmit}>
			<div className='form-group d-flex mt-1 mb-1'>
				<input className='form-control' onChange={handleChange} value={value} placeholder='Name' />
				<button className='btn btn-primary ml-1' type='submit'>
					Add
				</button>
			</div>
		</form>
	);
}

export default AddTodo;
