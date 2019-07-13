import React from 'react';
import '.././App.css';
import ToDoItem from './ToDoItem'
import ToDoList from './ToDoItemList'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      items: [],
      currentItem: {
        text: '',
        id: ''
      },
      updateItem: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  handleInputChange(event) {
    const InputValue = event.target.value;
    const id = this.state.updateItem ? this.state.currentItem.id : Date.now();
    const currentItem = { text: InputValue, id: id };
    this.setState({
      currentItem
    })
  }

  addItem(event) {
    event.preventDefault();
    const currentItem = { text: '', id: '' };
    const updateItem = false;
    let items;

    if(this.state.updateItem) {
      const currentItemlist = this.state.currentItem;
      items = this.state.items;
      const updatedItemIndex = items.findIndex(item => item.id === currentItemlist.id)
      const item = currentItemlist;
      items[updatedItemIndex] = item;
    } else {
      const newItem = this.state.currentItem;
      items = [...this.state.items, newItem]
    }

    this.setState({
      items,
      currentItem,
      updateItem
    });
  }

  deleteTask = (id) => {
    const filterList = this.state.items.filter(item => item.id !== id)
    this.setState({
      items: filterList
    })
  }

  updateTask = (id) => {
    const updatedItem = this.state.items.filter(item => item.id === id)
    const currentItem = { text: updatedItem[0].text, id: updatedItem[0].id }
    const updateItem = true
    this.setState({
      currentItem,
      updateItem
    })
  }

  cancelEdit(event) {
    event.preventDefault()
    const currentItem = { text: '', id: '' }
    const updateItem = false
    this.setState({
      currentItem,
      updateItem
    });
  }


  render() {
    return (
      <div className="App">
        <ToDoItem 
          handleInputChange={this.handleInputChange}
          addItem={this.addItem}
          inputText={this.state.currentItem}
          upadetText={this.state.updateItem}
          cancelAction={this.cancelEdit} 
        />
        
        <ToDoList 
          items={this.state.items} 
          deleteTask={this.deleteTask} 
          updateTask={this.updateTask}
        />
      </div>
    )
  }
}

export default App
