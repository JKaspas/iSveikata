import React from 'react'

var SearchFieldForm = (props) =>{
    return(
    <form onSubmit={props.searchHandler} className="form-inline text-center">
        <div className="form-group ">     
            <input type={props.searchType} className="form-control" value={props.searchValue} onChange={props.fielddHandler} placeholder={props.searchPlaceHolder} name="userName" />
        </div>
        <div className="form-group">     
            <input type="submit" className="btn btn-primary" value="Ieškoti" />
        </div>
    </form>)
}

export default SearchFieldForm