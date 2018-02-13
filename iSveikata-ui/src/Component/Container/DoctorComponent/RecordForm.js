import React from "react";
import { FormErrors } from "../AdminComponent/Form_errors";
import Timer from "../DoctorComponent/Timer";
import "../../../Form.css";

var RecordForm = props => {
  return <div className="col-sm-12">
      {props.infoState}
      <div className="col-sm-10 col-sm-offset-2">
        <FormErrors formErrors={props.formErrors} />
      </div>
      <form className="form-horizontal" onSubmit={props.submitHandler}>
        <div className="form-group">
          <label className="control-label col-sm-2">
            TLK-10 ligos kodas:
          </label>
          <div className="col-sm-10">
            <select type="text" className="form-control" name="icdCode" placeholder="X##(.###) arba specialus kodas" maxLength="8" 
            value={props.icdCode.toUpperCase()} required onChange={props.fieldHandler} id={props.errorClassIcd}>
              {props.icds}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">Vizito aprašymas:</label>
          <div className="col-sm-10">
            <textarea className="form-control" name="description" rows="3" required onChange={props.fieldHandler} value={props.description} 
            id={props.errorClassDescription} maxLength="225" />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check col-sm-10 col-sm-offset-2">
            <input type="checkbox" className="form-check-input" id="CheckIfCompensable" name="isCompensable" checked={props.isCompensable} 
            onChange={props.fieldHandler} />
            <label className="form-check-label" htmlFor="CheckIfCompensable">
              Vizitas <strong>
                {props.isCompensable
                  ? " kompensuojamas "
                  : " nekompensuojamas "}
              </strong> Valstybinės ligonių kasos.
            </label>
          </div>
          <div className="form-check col-sm-10 col-sm-offset-2">
            <input type="checkbox" className="form-check-input" id="CheckIfRepetitive" name="isRepetitive" checked={props.isRepetitive} 
            onChange={props.fieldHandler} />
            <label className="form-check-label" htmlFor="CheckIfRepetitive">
              Vizitas <strong>
                {props.isRepetitive ? " yra " : " nėra "}
              </strong> pakartotinis dėl tos pačios priežasties.
            </label>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-2">
            Vizito trukmė (minutėmis):
          </label>
          <div className="col-sm-10">
            <input type="number" className="form-control" name="duration" placeholder="Trukmė" maxLength="3" value={props.duration} required 
            onChange={props.fieldHandler} id={props.errorClassDuration} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" disabled={!props.formValid}>
              Sukurti įrašą
            </button>
          </div>
        </div>
      </form>
      <Timer />
    </div>;
};

export default RecordForm;
