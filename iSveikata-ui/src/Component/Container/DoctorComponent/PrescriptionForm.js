import React from 'react';
import { FormErrors } from '../AdminComponent/Form_errors';
import '../../../Form.css';

var PrescriptionForm = (props) =>{
    return(
        <div className="col-sm-12">
            {props.infoState}
            <div className="col-sm-9 col-sm-offset-3"> 
                <FormErrors formErrors={props.formErrors}/>
            </div>
            <form className="form-horizontal" onSubmit={props.submitHandler}>
                <div className="form-group">
                    <label className="control-label col-sm-3">Recepto galiojimo trukmė:</label>
                    <div className="col-sm-9">          
                        <select className="form-control" name="daysToExpiration" value={props.daysToExpiration} onChange={props.fieldHandler}>
                            <option value="5">5 dienos</option>
                            <option value="10">10 dienų</option>
                            <option value="30" selected>30 dienų</option>
                            <option value="180">180 dienų</option>
                            <option value="termless">neterminuotas</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3">Galioja iki:</label>
                    <div className="col-sm-9">
                        <input type="text" readOnly className="form-control" 
                        // value={props.generateExpirationDate} 
                        required onChange={props.fieldHandler} 
                        placeholder="yyyy-MM-dd" name="expirationDate" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3" >Vaisto veiklioji medžiaga:</label>
                    <div className="col-sm-9">  
                        <select className="form-control" name="substance" value={props.substance} onChange={props.fieldHandler}>
                            {props.substances}
                            <option value="Ibuprofenas" selected>Ibuprofenas</option>
                            <option value="Ksilometazolinas">Ksilometazolinas</option>
                            <option value="Paracetamolis">Paracetamolis</option>
                            <option value="Propolis">Propolis</option>
                            <option value="Telmisartanas">Telmisartanas</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3">Vaisto stiprumas:</label>
                    <div className="col-sm-7">
                        <input type="number" className="form-control"  name="substanceAmount"
                        placeholder="Veikliosios medž. kiekis dozėje" value={props.substanceAmount} required 
                        onChange={props.fieldHandler} 
                        id={props.errorClassSubstanceAmount} />
                    </div>
                    <div className="col-sm-2">  
                        <select className="form-control" name="substanceUnit" value={props.substanceUnit} onChange={props.fieldHandler}>
                            <option value="mg" selected>mg</option>
                            <option value="mcg">mcg</option>
                            <option value="tv">t.v.</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3">Vartojimo aprašymas:</label>
                    <div className="col-sm-9"> 
                        <textarea className="form-control"  name="description"
                            rows="3" required 
                            placeholder="Nurodyti kokią vaisto dozę, kiek kartų ir kaip vartoti."
                            onChange={props.fieldHandler}
                            value={props.description}
                            id={props.errorClassDescription}
                            maxLength="225"
                        ></textarea>
                    </div> 
                </div>   
                <div className="form-group">        
                    <div className="col-sm-offset-3 col-sm-9">
                        <button type="submit" className="btn btn-default" disabled={!props.formValid}>Išrašyti receptą</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PrescriptionForm


