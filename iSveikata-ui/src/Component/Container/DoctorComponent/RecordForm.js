import React from 'react'

var RecordForm = (props) =>{
    return(
        <form onSubmit={props.submitHandler} className="form-horizontal" >
        <div className="form-group">
          <div className="col-sm-10 col-sm-offset-2">          
            <input type="checkbox" name="isCompensable" value="true" onChange={props.fieldHandler}/>Apsilankymas konpensuojamas<br/>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Vizito trukme: </label>
          <div className="col-sm-10">
            <input type="number" className="form-control" value={props.duration} onChange={props.fieldHandler} placeholder="Vizito trukme" name="duration" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" >Lygos kodas:</label>
          <div className="col-sm-10">          
            <input type="text" className="form-control" value={props.icd } onChange={props.fieldHandler} name="icd" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2" >Vizito aprašymas:</label>
          <div className="col-sm-10">          
            <textarea type="text" className="form-control" onChange={props.fieldHandler}  placeholder="Vizito aprašymas" name="description" >{props.description}</textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10 col-sm-offset-2">          
            <input type="checkbox" name="isRepetitive" value="true" onChange={props.fieldHandler}/>Apsilankymas yra pakartotinas<br/>
          </div>
        </div>
        <div className="form-group">        
          <div className="col-sm-offset-2 col-sm-10">
           <button className="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    )
}

export default RecordForm