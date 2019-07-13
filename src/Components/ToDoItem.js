import React, { Component } from 'react'

class ToDoItem extends Component {
    render(){
        return (
            <div className="todoListMain">
                <div className="header">
                    <form 
                        onSubmit={(event) => this.props.addItem(event)} 
                        onReset={(event)=>this.props.cancelAction(event)} >
                        <input type="text" className="taskInputVal" placeholder="Add to do item" 
                            onChange={(event) => this.props.handleInputChange(event)} 
                            value={this.props.inputText.text} 
                        />
                        <button>{this.props.upadetText ? 'Update': 'Add'}</button>
                        <button type="reset" className={this.props.upadetText ? 'displayblock' : 'displaynone'} >Cancel</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default ToDoItem;