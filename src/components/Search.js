import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            keyword:''
        }
    }
    onChange=(event)=>{
        var target=event.target;
        var name=target.name;
        var value=target.value;
        console.log(name,value)
        this.setState({
            [name]:value
        })
    }
    onSearch=()=>{
        this.props.onSearch(this.state.keyword);
    }
    render() {
        var {keyword}=this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
                <input
                    type="text"
                    name="keyword"
                    className="form-control"
                    placeholder="Nhập từ khóa.."
                    onChange={this.onChange}
                    value={keyword}
                />
                <span className="input-group-btn">
                    <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={this.onSearch}
                    >
                        <i class="fas fa-search mr-5"></i>
                        Tìm
                    </button>

                </span>
            </div>
            </div>
        );
    }
}

export default Search;
