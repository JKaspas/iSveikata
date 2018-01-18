import React from 'react'


const PatientForm = (props) => {
    return (
    <div className="col-sm-10">
        
            
        
        <form onSubmit={props.submitHandler} className="form-horizontal" >
        
            <div className="form-group">
                <label className="control-label col-sm-3">Asmens kodas:</label>
                <div className="col-sm-9">
                <input type="text" className="form-control" value={props.patientId} onChange={props.fieldHandler} placeholder="Asmens kodas" name="patientId" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Gimino data: </label>
                <div className="col-sm-9">
                <input type="text" className="form-control" value={props.birthDate} onChange={props.fieldHandler} placeholder="Gimimo data" name="birthDate" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Vardas:</label>
                <div className="col-sm-9">          
                <input type="text" className="form-control" value={props.firstName } onChange={props.fieldHandler} placeholder="Vardas" name="firstName" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3" >Pavarde:</label>
                <div className="col-sm-9">          
                <input type="text" className="form-control" value={props.lastName } onChange={props.fieldHandler} placeholder="Pavarde" name="lastName" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3" >Slaptazodis:</label>
                <div className="col-sm-9">          
                <input type="password" className="form-control" value={props.password } onChange={props.fieldHandler} placeholder="Slaptazodis" name="password"/>
                </div>
            </div>
            <div className="form-group">        
                <div className="col-sm-offset-3 col-sm-9">
                    <button className="btn btn-default">Submit</button>
                </div>
            </div>
        </form>
      </div>)  
  }

export default PatientForm;