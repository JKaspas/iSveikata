import React from 'react'

export const UserFormDrugStoreInput = (props) =>{
    return (
        <div className="form-group">
        <label className="control-label col-sm-3">Darbovietės pavadinimas:</label>
        <div className="col-sm-2">          
            <select className="form-control" name="companyType" onChange={props.fieldHandler}>
                <option value="AB">AB</option>
                <option value="MB">MB</option>
                <option value="UAB" selected>UAB</option>
                <option value="VšĮ">VšĮ</option>
            </select>
        </div>
        <div className="col-sm-7">          
            <input type="text" className="form-control"  name="companyName"
            placeholder="pavadinimas" value={props.companyName} required
            onChange={props.fieldHandler} maxLength="225"
            id={props.formErrorsCompanyName}/>
        </div>
        </div>
    )
}



//  <div className="form-group">
// <label className="control-label col-sm-3" >Parduotuve: </label>
// <div className="col-sm-9">  
//     <input name="drugStore" className="form-control" onChange={props.fieldHandler} value={props.title} />
// </div>

// </div>