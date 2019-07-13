import React from 'react'

class ToDoList extends React.Component {
    render(){
        const itemsList = this.props.items;
        const items = itemsList.map((item) => 
            <li key={item.id}>
                {item.text}
                <span className="remove" onClick={(id) =>this.props.deleteTask(item.id)}>Remove</span>
                <span className="update" onClick={(id) =>this.props.updateTask(item.id)}>EDIT</span>
            </li>
        )

        return(
            <ul className="theList">
                {items}
            </ul>
        )
    }
}

export default ToDoList