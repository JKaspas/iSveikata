import React from 'react'

export const UserFormSpecInput = (props) =>{
    return (
        <div className="form-group">
        <label className="control-label col-sm-3" >Specializacija: </label>
        <div className="col-sm-9">  
            <input name="title" className="form-control" onChange={props.fieldHandler} value={props.title} list="specialization"/>
        </div>
        <datalist id="specialization">
            {props.specialization}
        </datalist>
    </div>
    )
}