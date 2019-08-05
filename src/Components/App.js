import React from 'react';
import '.././App.css';
import ToDoItem from './ToDoItem'
import ToDoList from './ToDoItemList'
import axios from 'axios'
import { resolveMx } from 'dns';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      items: [],
      currentItem: {
        task: '',
        id: '',
        status: 1
      },
      updateItem: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:8083/tasks').then(res => {
      const items = res.data;
      this.setState({items});
    })
  }

  handleInputChange(event) {
    const InputValue = event.target.value;
    const id = this.state.currentItem.id
    const currentItem = { task: InputValue, id: id, status: 1 };
    this.setState({
      currentItem
    })
  }
  

  addItem(event) {
    event.preventDefault();
    const currentItemlist = this.state.currentItem;
    const id = currentItemlist.id;
    const currentItem = { task: '', id: '', status: 1 };
    const updateItem = false;
    let items;
    // const url = 'https://jsonmock.hackerrank.com/datetime'
    // console.log('ddd')
    // fetch(url).then(response => console.log(response.data)).then(data => console.log(data))
    // console.log('11ddd')

    if(this.state.updateItem) {
      items = this.state.items;
      const updatedItemIndex = items.findIndex(item => item.id === currentItemlist.id)
      const item = currentItemlist;
      items[updatedItemIndex] = item;
      const task = { task: currentItemlist.task, status: 1}
      axios.put('http://localhost:8083/tasks/'+id, {task}).then(res => {
        this.setState({
          items,
          currentItem,
          updateItem
        })
      });
    } else {
      const task = { task: this.state.currentItem.task, status: 1}
      axios.post('http://localhost:8083/tasks', {task}).then(res => {
        currentItemlist.id= res.data;
        items = [...this.state.items, currentItemlist];
        this.setState({
          items,
          currentItem,
          updateItem
        });
      });
    }
  }

  deleteTask = (id) => {
    const filterList = this.state.items.filter(item => item.id !== id)
    axios.delete('http://localhost:8083/tasks/'+id).then(res => {
      alert(res.data.message);
      this.setState({
        items: filterList
      })
    });
  }

  updateTask = (id) => {
    const updatedItem = this.state.items.filter(item => item.id === id)
    const currentItem = { task: updatedItem[0].task, id: updatedItem[0].id, status: 1 }
    const updateItem = true
    this.setState({
      currentItem,
      updateItem
    })
  }

  cancelEdit(event) {
    event.preventDefault()
    const currentItem = { task: '', id: '', status: 1 }
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
