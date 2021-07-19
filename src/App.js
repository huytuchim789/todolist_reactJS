import React from "react";
import './App.css';
import TaskForm from './components/TaskForm';
import Control from "./components/Control";
import TaskList from "./components/TaskList";
class App extends React.Component {
   constructor(props) {
      super(props);
      this.state={
         tasks:[],
         isPlayForm:false,
         taskEditing:null,
         filter:{
            name:'',
            status:-1
         }, //id:unique,name,status
         keyword:'',
         sort:{
            by:'name',
            value:1  //1 la tang -1la giam
         }
      }
   }
   componentDidMount(){
    if(localStorage && localStorage.getItem('tasks')){
       var tasks=JSON.parse(localStorage.getItem('tasks'));
       this.setState({
          tasks:tasks
       })
    }
   }
   onGenerateData(){
      var tasks=[
         {
            id:this.generateID(),
            name:'Học Lập Trình',
            status:true
         },
         {
            id:this.generateID(),
            name:'Đi bơi',
            status:false
         },
         {
            id:this.generateID(),
            name:'Ngủ',
            status:true
         }
      ]
      this.setState({
         tasks:tasks
      }
      )
      localStorage.setItem('tasks',JSON.stringify(tasks))
   }
   s4(){
      return Math.floor((1+Math.random())*0x10000).toString(16).substring(1)
   }
   generateID(){
      return this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+this.s4()+'-'+Math.random()*100;
   }
   onToggleForm(){ //Th đóng mở
      if(this.state.taskEditing && this.state.isPlayForm){
         this.setState({
            isPlayForm:true,
            taskEditing:null
          })
      }
      else{
      this.setState({
        isPlayForm:this.state.isPlayForm?false:true,
        taskEditing:null
      })
      }
  }
   onSubmit=(data)=>{
     var task={
        id:this.generateID(),
        name:data.name,
        status:data.status
     }
     var {tasks}=this.state;
     if(data.id ===''){
      tasks.push(task); //add
     }
     else{
        console.log('in')
      var index=this.findIndexByKey(data.id)
      tasks[index]=data      //editing
     }
     this.setState({
        tasks:tasks,
        taskEditing:null
     })
     localStorage.setItem('tasks',JSON.stringify(tasks))
   }
   findIndexByKey(id){
      var index=this.state.tasks.findIndex((element,index)=>element.id===id)
      return index;
   }
   onUpdateStatus=(key)=>{
      var index=this.findIndexByKey(key)
      var {tasks}=this.state;
      console.log(index,tasks[index].status)
      if(index!==-1){
         tasks[index].status=!tasks[index].status
         this.setState({
            tasks:tasks
         })
      }
      localStorage.setItem('tasks',JSON.stringify(tasks))
   }
   onDelete=(key)=>{
      var index=this.findIndexByKey(key)
      var {tasks}=this.state;
      console.log(index,tasks[index].status)
      if(index!==-1){
         tasks.splice(index,1)
         this.setState({
            tasks:tasks
         })
      }
      localStorage.setItem('tasks',JSON.stringify(tasks))
      this.onCloseForm();
   }
   onCloseForm(){
      this.setState({
         isPlayForm:false
      })
   }
   onShowForm(){
      this.setState({
         isPlayForm:true
      })
   }
   onUpdate=(key)=>{
      var index=this.findIndexByKey(key)
      var {tasks}=this.state;
      console.log(tasks[index].id)
      if(index!==-1){
         this.setState({
            taskEditing:tasks[index]
         })
      }
      this.onShowForm();
   }
   onFilter=(filterName,filterStatus)=>{
      // console.log(filterName,filterStatus)
      this.setState({
         filter:{
            name:filterName,
            status:parseInt(filterStatus,10)
         }
      })
   }
   onSearch=(keyword)=>{
      this.setState({
         keyword:keyword
      })
   }
   onSort=(sortBy,sortValue)=>{
      this.setState({
         sort:{
            by:sortBy,
            value:sortValue
         }
      })
   }
   render() {
      var {tasks,isPlayForm,taskEditing,filter,keyword,sort}=this.state;
      console.log(sort)
      if(filter){
         if(filter.name){
            tasks=tasks.filter((task)=>{
               return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) !==-1
            })
         }
         if([-1,0,1].includes(filter.status)){
               tasks=tasks.filter((task)=>{
                  if(filter.status===-1){
                     return task
                  }
                  else{
                     console.log('in')
                     return task.status===(filter.status===1?true:false)
                  }
               })   
         }
         if(keyword){
            console.log('in')
            tasks=tasks.filter((task)=>{
               return task.name.toLowerCase().indexOf(keyword)!==-1
            })
         }
      }
      if(sort.by==='name'){
         tasks.sort((a,b)=>{
         if(a.name>b.name) return sort.value;
         else if(a.name<b.name) return -sort.value
         return 0;
         })
      }
      if(sort.by==='status'){
         tasks.sort((a,b)=>{
         if(a.status>b.status) return sort.value;
         else if(a.status<b.status) return -sort.value
         else return 0;
         })
      }
      var eleTaskForm=isPlayForm===true?<TaskForm 
      onSubmit={this.onSubmit} 
      onCloseForm={()=>this.onToggleForm()}
      task={taskEditing}
      >
      
      </TaskForm>:'';
      return (
         <div className="container">
            <div className="text-center">
               <h1 className>Quản Lý Công Việc</h1>
            </div>
            <div className="row mt-15">
               {/**Form */}
               <div className={isPlayForm?'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
                  {eleTaskForm}
               </div>
               <div className={!isPlayForm?'col-xs-12 col-sm-12 col-md-12 col-lg-12':'col-xs-8 col-sm-8 col-md-8 col-lg-8'}>
                  <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={()=>this.onToggleForm()}
                  
                  >
                     <i className="fas fa-plus mr-5"></i>
                     Thêm Công Việc
                  </button>
                  <Control
                  onSearch={this.onSearch}
                  onSort={this.onSort}
                  >
                     {/**Search */}
                     {/**Sort */}
                  </Control>
               {/**Table */}
               <div className="row mt-15">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                     <TaskList
                     tasks={tasks}
                     onUpdateStatus={this.onUpdateStatus}
                     onDelete={this.onDelete}
                     onUpdate={this.onUpdate}
                     onFilter={this.onFilter}
                     ></TaskList>
                  </div>
               </div>
               </div>
           

            </div>

         </div>


      );
   }
}
export default App;