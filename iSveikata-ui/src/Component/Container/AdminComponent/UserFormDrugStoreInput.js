import React from 'react'

export const UserFormDrugStoreInput = (props) =>{
    return (
        <div className="form-group">
        <label className="control-label col-sm-3" >Parduotuve: </label>
        <div className="col-sm-9">  
            <input name="drugStore" className="form-control" onChange={props.fieldHandler} value={props.title} />
        </div>
       
    </div>
    )
}