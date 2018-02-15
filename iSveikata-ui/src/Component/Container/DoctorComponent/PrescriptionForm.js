import React from 'react';
import '../../../Form.css';

var PrescriptionForm = (props) =>{
    return(   
        <form className="form-horizontal" onSubmit={props.submitHandler}>
            <div className="form-group">        
                {props.infoState}
            </div>
            <div className={'form-group ' + (props.daysToExpiration === "select" ? 'is-empty' : 'has-success has-feedback')}>
                <label className="control-label col-sm-3" htmlFor="daysToExpiration">Recepto galiojimo trukmė:</label>
                <div className="col-sm-9">          
                    <select className="form-control" id="daysToExpiration" name="daysToExpiration" value={props.daysToExpiration} onChange={props.fieldHandler} onFocus={props.fieldOnFocusHandler}>
                        <option value="select">Pasirinkite</option>
                        <option value="5">5 dienos</option>
                        <option value="10">10 dienų</option>
                        <option value="30">30 dienų</option>
                        <option value="180">180 dienų</option>
                        <option value="360">neterminuotas</option>
                    </select>
                    <span className={props.daysToExpiration === "select" ? 'form-control-feedback' : 'glyphicon glyphicon-ok form-control-feedback'}></span>
                    <span className="help-block"></span>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3" htmlFor="expirationDate">Galioja iki:</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" id="expirationDate" name="expirationDate" readOnly required
                    value={props.daysToExpiration === "360" ? "neterminuotas" : props.generateExpirationDate} 
                    placeholder="yyyy-MM-dd" />
                    <span className="help-block"></span>
                </div>
            </div>
            <div className={'form-group ' + (props.substance === "select" ? 'is-empty' : 'has-success has-feedback')}>
                <label className="control-label col-sm-3" htmlFor="substance">Vaisto veiklioji medžiaga:</label>
                <div className="col-sm-9">  
                    <select className="form-control" id="substance" name="substance" value={props.substance} onChange={props.fieldHandler} onFocus={props.fieldOnFocusHandler}>
                        <option value="select">Pasirinkite</option>
                        {props.substances} 
                    </select>
                    <span className={props.substance === "select" ? 'form-control-feedback' : 'glyphicon glyphicon-ok form-control-feedback'}></span>
                    <span className="help-block"></span>
                </div>
            </div>
            <div className="form-group">
                <div className={props.substanceAmount.length === 0 ? 'is-empty' : (props.classNameSubstanceAmount + ' has-feedback')}>
                    <label className="control-label col-sm-3" htmlFor="substanceAmount">Vaisto stiprumas:</label>
                    <div className="col-sm-7">
                        <input type="number" className="form-control" id="substanceAmount" name="substanceAmount"
                        placeholder="Veikliosios medž. kiekis dozėje" value={props.substanceAmount}
                        onChange={props.fieldHandler}
                        onFocus={props.fieldOnFocusHandler}
                        onBlur={props.fieldValidationHandler} />
                        <span className={props.classNameSubstanceAmount !== 'is-empty' ? (props.classNameSubstanceAmount === 'has-success' ? 'glyphicon glyphicon-ok form-control-feedback' : 'glyphicon glyphicon-remove form-control-feedback') : 'form-control-feedback'}></span>
                        <span className="help-block">{props.errorMessageSubstanceAmount}</span>
                    </div>
                </div>
                <div className="col-sm-2">  
                    <input type="text" className="form-control" name="substanceUnit" readOnly 
                    value={props.substanceUnit} />
                {/* <select className="form-control" name="substanceUnit" value={props.substanceUnit} onChange={props.fieldHandler}>
                        <option value="mg">mg</option>
                        <option value="mcg">mcg</option>
                        <option value="tv">t.v.</option>
                    </select> */}
                </div>
            </div>
            <div className={'form-group ' + (props.description.length === 0 ? 'is-empty' : (props.classNameDescription + ' has-feedback'))}>
                <label className="control-label col-sm-3" htmlFor="description">Vartojimo aprašymas:</label>
                <div className="col-sm-9"> 
                    <textarea className="form-control"  id="description" name="description"
                    placeholder="Nurodyti kokią vaisto dozę, kiek kartų ir kaip vartoti." value={props.description} rows="3" maxLength="225"
                    onChange={props.fieldHandler}
                    onFocus={props.fieldOnFocusHandler}
                    onBlur={props.fieldValidationHandler}></textarea>
                    <span className={props.classNameDescription !== 'is-empty' ? (props.classNameDescription === 'has-success' ? 'glyphicon glyphicon-ok form-control-feedback' : 'glyphicon glyphicon-remove form-control-feedback') : 'form-control-feedback'}></span>
                    <span className="help-block">{props.errorMessageDescription}</span>
                </div> 
            </div>   
            <div className="form-group">        
                <div className="col-sm-offset-3 col-sm-9">
                    <button type="submit" className="btn btn-primary">Išrašyti receptą</button>
                </div>
            </div>
        </form>   
    )
}

export default PrescriptionForm


