import React, { Component } from 'react';
import './styles.css';

export default class AppDragDropDemo extends Component {
  state = {
    tasks: [
        {name:"Task 1",category:"planning"},
        {name:"Task 2", category:"planning"},
        {name:"Task 3", category:"inProgress"},
        {name:"Task 4", category:"testing"},
        {name:"Task 5",category:"planning"},
        {name:"Task 6", category:"planning"},
        {name:"Task 7", category:"inProgress"},
        {name:"Task 8", category:"testing"},
        {name:"Task 9", category:"complete"},
        {name:"Task1 0 ", category:"comlete"},
        {name:"Task 11 ", category:"co"}
      ],
      task_name:'Task_name',
      stage1:'stage1',
      stage2:'stage_2',
      new_task:'',
      new_stage:'',
      stages:['planning','inProgress','testing','complete']
  }

  onDragStart = (ev, id,cat) => {
      //console.log('dragstart:',id);
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

  handleTaskChange= (e)=>{
    //console.log("value", e.target.value);
    this.setState({
      new_task: e.target.value
    })
  }

  handleSubmitTask = (e)=>{
    e.preventDefault();
    if(this.state.new_task.length <1){
      alert("Enter task name");
      return;
    }
    if(this.state.new_task.length >100){
      alert("Task name cannot be greater than 100 characters");
      return;
    }
    const task ={
      name: this.state.new_task,
      category:"planning"
    }
    //console.log("new_task",task);
    this.setState(prevstate => {
      let previousState = prevstate.tasks;
      previousState.push(task);
      return {
        tasks: previousState,
        new_task:''
      };
    });
  }

  handleStageChange= (e)=>{
    //console.log("value", e.target.value);
    this.setState({
      new_stage: e.target.value
    })
  }

  handleSubmitStage = (e)=>{
    e.preventDefault();
    if(this.state.new_stage.length <1){
      alert("Enter stage Name");
      return;
    }
    if(this.state.new_stage.length >50){
      alert("State name cannot be greater than 50 characters");
      return;
    }
    const stage = this.state.new_stage;
    //console.log("new_stage",stage);
    this.setState(prevstate => {
      let previousState = prevstate.stages;
      previousState.push(stage);
      return {
        stages: previousState,
        new_stage:''
      };
    });
    alert(`Addding Stage ${stage}`);
  }

  deleteStage = (s) =>{
    //console.log("S",s);
    let newStages = this.state.stages.filter((stage)=>{
      //console.log("stage name", stage);
      return stage !== s;
    })
    this.setState({
      stages: newStages
    })
    //console.log("new state", this.state.stages);
  }
  render() {
    //console.log("state", this.state);
    console.log(this.state.stages);
    var tasks = {};
    this.state.stages.forEach(item=>{
      tasks[item]=[]
    })
    this.state.tasks.forEach ((t) => {

        tasks[t.category]&&tasks[t.category].push(
          <div key={t.name}
              onDragStart = {(e) => this.onDragStart(e, t.name, t.category)}
              draggable
              className="draggable"
          >
            <div className="task">{t.name}</div>
          </div>
        );
      });

      var stages=[];
      this.state.stages.forEach ((s) => {
       stages.push(
        <div className="stage"
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, s)}>
            <div className="task-header">
              <span className="stage-header-name">{s}</span>
              <button className="delete" onClick={()=>this.deleteStage(s)}> X </button>
            </div>
            <div className="task-container" >{tasks[s]}</div>
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
          <div className="add">
            <form id="form-task" onSubmit={this.handleSubmitTask}>
              <input className="task-input" type="text" value={this.state.new_task} onChange={this.handleTaskChange}></input>
              <button className="add-button">Add new task</button>
            </form>
            <form id="form-stage" onSubmit={this.handleSubmitStage}>
              <input className="task-input" type="text" value={this.state.new_stage} onChange={this.handleStageChange}></input>
              <button className="add-button">Add new stage</button>
            </form>
          </div>
          <div className="draggable-container">
            {/* <div className="stage"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>{this.onDrop(e, "planning")}}>
                <div id="task-header-planning">Planning</div>
                <div className="task-container" >{tasks.planning}</div>
            </div>
            <div className="stage"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "inProgress")}>
                <div id="task-header-progress">In-progress</div>
                <div className="task-container" >{tasks.inProgress}</div>
            </div>
            <div className="stage"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "testing")}>
                <div id="task-header-testing">Testing</div>
                <div className="task-container" >{tasks.testing}</div>
            </div>
            <div className="stage"
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e)=>this.onDrop(e, "complete")}>
                <div id="task-header-complete">Complete</div>
                <div className="task-container" >{tasks.complete}</div>
            </div> */}
            {stages}
          </div>
        </div>
      </div>
    );
  }
}
