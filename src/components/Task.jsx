function Task({ task, updateTask, deleteTask }) {
	return (
		<tr>
			<td>{task.fields.Task}</td>
			<td>{task.fields.who}</td>
			<td>
				<button className="button" onClick={() => updateTask(task.id)}>
					Update
				</button>
				<button className="button" onClick={() => deleteTask(task.id)}>
					Delete
				</button>
			</td>
		</tr>
	)
}

export default Task

