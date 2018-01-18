import React from 'react'


const UsersForm = (props) => {
    return (
    <div className="col-sm-10">
        
            
        
        <form onSubmit={props.submitHandler} className="form-horizontal" >
            <div className="form-group">
                <div className="radio col-sm-9 col-sm-offset-3">
                    <label><input onChange={props.fieldHandler} type="radio" value="doctor" name="type"/>Daktaras</label>
                </div>
                <div className="radio col-sm-9 col-sm-offset-3">
                    <label><input onChange={props.fieldHandler} type="radio" value="admin" name="type"/>Administratorius</label>
                </div>
                <div className="radio col-sm-9 col-sm-offset-3">
                    <label><input onChange={props.fieldHandler} type="radio" value="druggist" name="type"/>Vaistininkas</label>
                </div>
            </div>
        
            <div className="form-group">
                <label className="control-label col-sm-3">Vardas:</label>
                <div className="col-sm-9">
                <input type="text" className="form-control" value={props.firstName} onChange={props.fieldHandler} placeholder="Vardas" name="firstName" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Pavardė: </label>
                <div className="col-sm-9">
                <input type="text" className="form-control" value={props.lastName} onChange={props.fieldHandler} placeholder="Pavardė" name="lastName" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Slapyvardis:</label>
                <div className="col-sm-9">          
                <input type="text" className="form-control" value={props.userName } onChange={props.fieldHandler} placeholder="Slapyvardis" name="userName" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3" >Slaptažodis:</label>
                <div className="col-sm-9">          
                <input type="password" className="form-control" value={props.password } onChange={props.fieldHandler} placeholder="Slaptažodis" name="password" />
                </div>
            </div>
            {/* <div className="form-group">
                <label className="control-label col-sm-3" >Daktaro specelizacija:</label>
                <div className="col-sm-9">          
                <input type="text" className="form-control" value={props.specialization } onChange={props.fieldHandler} placeholder="Specelizacija" name="specialization"/>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3" >Vaistininko įmonės pavadinimas</label>
                <div className="col-sm-9">          
                <input type="text" className="form-control" value={props.drugStore } onChange={props.fieldHandler} placeholder="Įmonės pavadinimas" name="drugStore" />
                </div>
            </div> */}
            <div className="form-group">        
                <div className="col-sm-offset-3 col-sm-9">
                    <button className="btn btn-default">Submit</button>
                </div>
            </div>
        </form>
      </div>)  
  }

export default UsersForm;