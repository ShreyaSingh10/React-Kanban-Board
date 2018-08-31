import React, { Component } from 'react';
import './styles.css';

export default class AppDragDropDemo extends Component {
  state = {
    tasks: [
        {name:"Asjdjjhjhjkhjhhkjhjhjhjhjhkjsdhhhfshfsfhsfhsdhfdsfhjdshfsdhfdfhkjjkhjhjhhjhjhjhkhkhkhkh",category:"planning"},
        {name:"b", category:"planning"},
        {name:"C", category:"inProgress"},
        {name:"D", category:"testing"},
        {name:"hhkhkhkh",category:"planning"},
        {name:"bhghj", category:"planning"},
        {name:"Chjgj", category:"inProgress"},
        {name:"Dtrru", category:"testing"},
        {name:"Learn Vue", category:"complete"},
        {name:"Learn ", category:"complete"},
      ]
  }

  onDragStart = (ev, id) => {
      console.log('dragstart:',id);
      ev.dataTransfer.setData("id", id);
  }

  onDragOver = (ev) => {
      ev.preventDefault();
  }

  onDrop = (ev, cat) => {
     let id = ev.dataTransfer.getData("id");

     let tasks = this.state.tasks.filter((task) => {
         if (task.name === id) {
             task.category = cat;
         }
         return task;
     });

     this.setState({
         ...this.state,
         tasks
     });
  }

  render() {
    var tasks = {
        planning: [],
        inProgress: [],
        testing:[],
        complete:[]
    }

    this.state.tasks.forEach ((t) => {
      tasks[t.category].push(
        <div key={t.name}
            onDragStart = {(e) => this.onDragStart(e, t.name)}
            draggable
            className="draggable"
        >
          <div className="task">{t.name}</div>
        </div>
      );
    });

    return (
      <div className="parent-container">
        <h2 className="header">Kanban Board</h2>
        <div className="nav-bar">
          <p className="message"><b>Task Status: {this.state.task_name} moved from {this.state.message_from} to {this.state.message_to}</b> </p>
        </div>
        <div className="container">
          <div className="add-task">
            <form>
              <input className="task-input" type="text" ></input>
              <button className="add-button">Add new task</button>
            </form>
          </div>
          <div className="draggable-container">
            <div className="planning"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>{this.onDrop(e, "planning")}}>
                <div id="task-header-planning">Planning</div>
                <div className="task-container" >{tasks.planning}</div>
            </div>
            <div className="inProgress"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "inProgress")}>
                <div id="task-header-progress">In-progress</div>
                <div className="task-container" >{tasks.inProgress}</div>
            </div>
            <div className="testing"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "testing")}>
                <div id="task-header-testing">Testing</div>
                <div className="task-container" >{tasks.testing}</div>
            </div>
            <div className="complete"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "complete")}>
                <div id="task-header-complete">Complete</div>
                <div className="task-container" >{tasks.complete}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
