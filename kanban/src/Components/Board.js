import React, { Component } from 'react';
import './styles.css';

export default class AppDragDropDemo extends Component {
  state = {
    tasks: [
        {name:"Ajsdhfkjdfhkjdhkdfkdjghkdjhgkdjhksehkhkhkhkh",category:"planning"},
        {name:"b", category:"planning"},
        {name:"C", category:"inProgress"},
        {name:"D", category:"testing"},
        {name:"hhkhkhkh",category:"planning"},
        {name:"bhghj", category:"planning"},
        {name:"Chjgj", category:"inProgress"},
        {name:"Dtrru", category:"testing"},
        {name:"Learn Vue", category:"complete"},
        {name:"Learn ", category:"complete"},
      ],
      task_name:'task_name',
      stage1:'stage1',
      stage2:'stage_2',
      new_task:''
  }

  onDragStart = (ev, id,cat) => {
      console.log('dragstart:',id);
      ev.dataTransfer.setData("id", id);
      this.setState({
      task_name: id,
      stage1: cat,
      stage2:''
    })
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
     this.setState({
      stage2:cat
    });
  }

  handleChange= (e)=>{
    console.log("value", e.target.value);
    this.setState({
      new_task: e.target.value
    })
  }
  handleSubmit = (e)=>{
    e.preventDefault()
    const task ={
      name: this.state.new_task,
      category:"planning"
    }
    console.log("new_task",task);
    this.setState(prevstate => {
      let previousState = prevstate.tasks;
      previousState.push(task);
      return {
        tasks: previousState,
        new_task:''
      };
    });
  }

  render() {
    console.log("state state", this.state);
    var tasks = {
        planning: [],
        inProgress: [],
        testing:[],
        complete:[]
    }
    this.state.tasks.forEach ((t) => {
      tasks[t.category].push(
        <div key={t.name}
            onDragStart = {(e) => this.onDragStart(e, t.name, t.category)}
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
          <p className="message"><b>Task Status: {this.state.task_name} moved from {this.state.stage1} to {this.state.stage2}</b> </p>
        </div>
        <div className="container">
          <div className="add-task">
            <form onSubmit={this.handleSubmit}>
              <input className="task-input" type="text" onChange={this.handleChange}></input>
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
