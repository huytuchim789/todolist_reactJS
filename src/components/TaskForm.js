import React, { Component } from 'react';
class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            status:false
        }
    }
  
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            console.log('Sửa')
            this.setState({
                id:nextProps.task.id,
                name:nextProps.task.name,
                status:nextProps.task.status,
            })
        }
        else if(nextProps && nextProps.task === null){
            console.log('Sửa và thêm')
            this.setState({
                id:'',
                name:'',
                status:false
            })
        }
    }
    componentDidMount(){
        if(this.props.task){
            this.setState({
                id:this.props.task.id,
                name:this.props.task.name,
                status:this.props.task.status,
            })
        }
    }
    
    onCloseForm(){
        this.props.onCloseForm();
    }
    onChange=(event)=>{
        var target=event.target;
        var value=target.value;
        var name=target.name;
        if(name==='status'){
            value=value==='true'?true:false
        }
        this.setState({
            [name]:value
        })
    }
    onSubmit= (event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state)
        //submit xong thì hủy bỏ và close form
        this.onClear();
        this.onCloseForm();
    }
    onClear=()=>{
        this.setState({
            name:'',
            status:false
        })
    }

    render() {
        var {id}=this.state
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{id!==''?'Sửa Công Việc':'Thêm Công Việc'}
                        <span
                        onClick={()=>this.onCloseForm()}
                        >
                            <i className="fas fa-times-circle text-right"></i>
                        </span>
                    </h3>
                </div>
                <div className="panel-body">

                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label for="">Tên</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Input field" 
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            />
                        </div>
                        <select className="form-control" name="status" onChange={this.onChange} value={this.state.status}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>

                        </select>
                        <br />
                        <div className="text-center btn-gap">
                            <button type="submit" class="btn btn-primary">
                                <i class="far fa-save mr-5"></i>Lưu Lại
                            </button>
                            <button 
                            type="submit" 
                            class="btn btn-danger"
                            onClick={this.onClear}
                            >
                                <i class="far fa-times-circle mr-5"></i>Hủy bỏ
                            </button>

                        </div>


                    </form>

                </div>
            </div>
        );
    }
}

export default TaskForm;
