// App.jsx
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Task from './components/Task.jsx'

function App() {
	const [data, setData] = useState([])
	const [newTask, setNewTask] = useState('')

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		try {
			const response = await axios.get(
				`https://api.airtable.com/v0/app2rjZApQZVdAwhC/ortable`,
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
					},
				}
			)
			setData(response.data.records)
		} catch (error) {
			console.error(error)
		}
	}

	const NewTask = async () => {
		try {
			const response = await axios.post(
				`https://api.airtable.com/v0/app2rjZApQZVdAwhC/ortable`,
				{
					fields: {
						Task: newTask,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
					},
				}
			)
			setData([...data, response.data])
			setNewTask('')
		} catch (error) {
			console.error(error)
		}
	}

	const updateTask = async (id) => {
		try {
			const updatedTask = await axios.put(
				`https://api.airtable.com/v0/app2rjZApQZVdAwhC/ortable/${id}`,
				{
					fields: {
						Task: newTask,
					},
				},
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
					},
				}
			)
			setData(data.map((task) => (task.id === id ? updatedTask.data : task)))
		} catch (error) {
			console.error(error)
		}
	}

	const deleteTask = async (id) => {
		try {
			await axios.delete(
				`https://api.airtable.com/v0/app2rjZApQZVdAwhC/ortable/${id}`,
				{
					headers: {
						Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_KEY}`,
					},
				}
			)
			setData(data.filter((task) => task.id !== id))
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className="center box">
			<h2>OR Airtable</h2>
			<input
				type="text"
				placeholder="Enter New Task Here"
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
			/>
			<button className="button" onClick={NewTask}>
				Add Task
			</button>
			<table>
				<thead>
					<tr>
						<th>Task</th>
						<th>Who</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((task) => (
						<Task
							key={task.id}
							task={task}
							updateTask={updateTask}
							deleteTask={deleteTask}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default App

