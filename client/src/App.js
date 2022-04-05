import {useState,useEffect} from 'react';
const API_BASE = "https://todo-application-gp.herokuapp.com";
const axios = require('axios');
function App() {
	const [todos,setTodos] = useState([]);
	const [popupActive,setPopupActive] = useState(false);
	const [newTodo,setNewTodo] = useState('');
	useEffect(()=>{
		const getTodos = async () => {
			try {
				const result = await axios.get(`${API_BASE}/todos`)
				setTodos(result.data);
			}
			catch(err) {
				console.log(err);
			}
		}
		getTodos();
	},[])
	const completeTodo = async (id) => {
		try {
			const {data} = await axios.put(`${API_BASE}/todos/complete/${id}`);
			setTodos(todos.map(todo => {
				if(todo._id === data._id) {
					todo.completed = data.completed;
				}
				return todo;
			}))
		}
		catch(err) {
			console.log(err);
		}
	}
	const deleteTodo = async id => {
		try {
			const {data} = await axios.delete(`${API_BASE}/todos/${id}`);
			setTodos(todos.filter(todo => todo._id !== data._id));
		}
		catch(err) {
			console.log(err);
		}
	}
	const addTodo = async () => {
		try {
			const {data} = await axios.post(`${API_BASE}/todos`,{text:newTodo});
			setTodos([...todos,data]);
			setNewTodo('');
			setPopupActive(false);
		}
		catch(err) {
			console.log(err);
		}
	}
  	return (
	  	<div className="App">
			<h1>Welcome</h1>
			<h4>Your Tasks</h4>
			<div className="todos">
				{todos.map(todo => (
				<div className={"todo " + (todo.completed ? "is-complete" : "")} 
				key = {todo._id} >
					<div className="checkbox" onClick={() => completeTodo(todo._id)}></div>
					<div className="text">{todo.text}</div>
					<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
				</div>
				))}
			</div>
			<div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
			{popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => {
						setPopupActive(false)
					}}>x</div>
					<div className="content">
						<h3>Add task</h3>
						<input type="text" className = "add-todo-input"
						onChange={(e) => setNewTodo(e.target.value)} value = {newTodo}/>
						<button className = "button" onClick={() => addTodo()}>Create a task</button>
					</div>
				</div>
			) : ''
			}
  		</div>
	)
}

export default App;
