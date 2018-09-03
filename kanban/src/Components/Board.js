import React, { Component } from 'react';
import './styles.css';


export default class AppDragDropDemo extends Component {
  state = {
    tasks: [
        {name:"Task 1",category:"Planning"},
        {name:"Task 2", category:"Planning"},
        {name:"Task 3", category:"InProgress"},
        {name:"Task 4", category:"Testing"},
        {name:"Task 5",category:"Planning"},
        {name:"Task 6", category:"Planning"},
        {name:"Task 7", category:"InProgress"},
        {name:"Task 8", category:"Testing"},
        {name:"Task 9", category:"Complete"},
        {name:"Task 10 ", category:"Complete"},
        {name:"Task 11 ", category:"Co"}
      ],
      task_name:'Task_name',
      stage1:'stage_1',
      stage2:'stage_2',
      new_task:'',
      new_stage:'',
      stages:['Planning','InProgress','Testing','Complete'],
      notification:false,
      notificationMessage:'',
      warning:false,
      warningMessage:''
  }
  dismissNotification = () => {
    setTimeout( () => { this.setState( { notification:false } )},3000)
  }
  dismissWarning = () => {
    setTimeout( () => { this.setState( { warning:false } )},4000)
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
      this.setState({
        warning:true, warningMessage:"Task name cannot be empty"}, this.dismissWarning())
        return;
    }
    if(this.state.new_task.length >100){
      this.setState({
        warning:true, warningMessage:"Task name cannot be longer than 100 characters"}, this.dismissWarning())
        return;
    }
    if(this.state.stages.length <1 || !this.state.stages.includes("Planning")){
      this.setState({
        warning:true, warningMessage:"Add Planning stage first"}, this.dismissWarning())
        return;
    }
    const task ={
      name: this.state.new_task,
      category:"Planning"
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
    this.setState({
      notification:true, notificationMessage:"Addding new task to planning stage"}, this.dismissNotification())
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
      this.setState({
        warning:true, warningMessage:"Stage name cannot be empty"}, this.dismissWarning())
        return;
    }
    this.state.stages.map((s)=>{
      var first = this.state.new_stage.charAt(0);
      if (first === first.toLowerCase() && first !== first.toUpperCase())
      {
        this.setState({
          warning:true, warningMessage:"Stage names should start with uppercase letters follwed by lowercase letters"}, this.dismissWarning())
          return;
      }
      else if(s === this.state.new_stage)
      {
        this.setState({
          warning:true, warningMessage:"This stage alreday exists"}, this.dismissWarning())
          return;
      }
    })
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
    this.setState({
      notification:true, notificationMessage:`Addding Stage ${stage}`}, this.dismissNotification())
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
    // console.log(this.state);
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
      const { notification,notificationMessage,warning,warningMessage} = this.state;
      //console.log(notification,notificationMessage);
    return (
      <div className="parent-container">
        {notification && <div className="notification">
          {notificationMessage}
          </div>
        }
        {warning && <div className="warning">
          {warningMessage}
          </div>
        }
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
            {stages}
          </div>
        </div>

      </div>
    );
  }
}
