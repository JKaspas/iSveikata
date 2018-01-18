import React from 'react'

var SearchFieldForm = (props) =>{
    return(
    <form onSubmit={props.searchHandler} className="form-inline">
        <div className="form-group">     
            <input type="text" className="form-control" value={props.userName} onChange={props.fielddHandler} placeholder="Daktaro userName" name="userName" />
        </div>
        <div className="form-group">     
            <input type="submit" className="btn btn-primary" value="Find" />
        </div>
    </form>)
}

export default SearchFieldForm