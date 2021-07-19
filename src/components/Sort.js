import React, { Component } from 'react';

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state={
            sort:{
                by:'name',
                value:1
            }
        }
        
    }
    onClick=(sortBy,sortValue)=>{
        this.props.onSort(sortBy,sortValue)
        this.setState({
            sort:{
            by:sortBy,
            value:sortValue
            }
        }
        )
    }
    
       
    
    render() {
        var {sort}=this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

            <div className="dropdown">
                <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenu1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                >
                    Sắp Xếp <i class="fad fa-sort-down ml-5"></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li
                        onClick={()=>this.onClick('name',1)}
                    >
                        <a
                            role="button"
                            className={(sort.by==='name' && sort.value===1)?'sort_selected':''}
                        >
                            Tên A-Z
                           
                        </a>
                    </li>
                    <li
                        onClick={()=>this.onClick('name',-1)}
                    >
                        <a
                            role="button"
                            className={(sort.by==='name' &&sort.value===-1)?'sort_selected':''}
                        >
                            <span className="fa fa-sort-alpha-desc pr-5">
                                Tên Z-A
                            </span>
                        </a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li
                        onClick={()=>this.onClick('status',-1)}
                    >
                        <a
                            role="button"
                            className={(sort.by==='status' &&sort.value===-1)?'sort_selected':''}
                        >
                            Trạng Thái Kích Hoạt
                        </a>
                    </li>
                    <li
                        onClick={()=>this.onClick('status',1)}
                    >
                        <a
                            role="button"
                            className={(sort.by==='status' && sort.value===1)?'sort_selected':''}
                        >
                            Trạng Thái Ẩn
                        </a>
                    </li>
                </ul>
            </div>
            </div>
        );
    }
}

export default Sort;
