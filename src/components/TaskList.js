import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
   constructor(props){
      super(props);
      this.state={
         filterName:'',
         filterStatus:-1  //all:-1,active:1,deactive:0
      }
   }
   onChange=(event)=>{
      var target=event.target;
      var name=target.name;
      var value=target.value;
      this.props.onFilter(
         name==='filterName'?value:this.state.filterName,
         name==='filterStatus'?value:this.state.filterStatus
      )
      this.setState({
         [name]:value
      })
   
   }
    render() {
       var {tasks}=this.props;
       var{filterName,filterStatus}=this.state;
       var eleTasks=tasks.map((task,index)=>{
          return <TaskItem 
          task={task}
          key={task.id}
          status={task.status}
          name={task.name}
          order={index+1}
          onUpdateStatus={this.props.onUpdateStatus}
          onDelete={this.props.onDelete}
          onUpdate={this.props.onUpdate}
          >
          </TaskItem>
       })
        return (
            <table className="table table-bordered table-hover mt-15">
            <thead>
               <tr>
                  <th className="text-center">STT</th>
                  <th className="text-center">Tên</th>
                  <th className="text-center">Trạng Thái</th>
                  <th className="text-center">Hành Động</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td></td>
                  <td>
                     <input
                        type="text"
                        className="form-control"
                        name="filterName"
                        onChange={this.onChange}
                     // value={this.state.filerName}
                     />
                  </td>
                  <td>
                     <select
                        className="form-control"
                        name="filterStatus"
                        onChange={this.onChange}
                     // value={this.state.filterStatus}
                     >
                        <option value={-1}>Tất Cả</option>
                        <option value={0}>Ẩn</option>
                        <option value={1}>Kích Hoạt</option>
                     </select>
                  </td>
                  <td></td>
               </tr>
                {eleTasks}
            </tbody>
         </table>
        );
    }
}

export default TaskList;
