import React from 'react'

export const UserFormSpecOtherInput = (props) =>{
      return (
        <div className="form-group">
            <label className="control-label col-sm-3">Įrašykite:</label>
            <div className="col-sm-9">          
                <input type="text" className="form-control" 
                placeholder="Specializacija" value={props.newTitle} required
                name="newTitle" onChange={props.fieldHandler} 
                id={props.formErrorsNewTitle} maxLength="225"/>
            </div>
        </div>
        // id={this.props.errorClass} name="specializationOther"
      )
    
  }