import React, { Component } from "react";
import axios from "axios";

import PatientInfoCard from "../DoctorComponent/PatientInfoCard";
import RecordForm from "../DoctorComponent/RecordForm";

export default class DoctorRecordContainer extends Component {
  constructor(props) {
    super(props);
    this.session = JSON.parse(sessionStorage.getItem("session"));
    this.state = {
      patient: "",
      icds: "",

      icdCode: "",
      isCompensable: false,
      isRepetitive: false,
      duration: "",
      description: "",

      patientId: props.params.patientId,
      userName: this.session.user.userName,

      formErrors: { icd: "", description: "", duration: "" },
      icdValid: true,
      descriptionValid: false,
      durationValid: false,
      formValid: false,

      infoState: ""
    };
  }

  componentWillMount = () => {
    if (
      this.session === null ||
      this.session.user.loggedIn !== true ||
      this.session.user.userType !== "doctor"
    ) {
      this.props.router.push("/vartotojams");
      return "";
    }
    this.loadPatient();
    this.loadIcd();
  };
  loadIcd = () => {
    axios
      .get("http://localhost:8080/api/icd")
      .then(response => {
        this.setState({
          icds: response.data.map((icd, index) => (
            <option key={index} value={icd.icdCode}>
              {icd.icdCode} - {icd.title}
            </option>
          ))
        });
        console.log(response.status);
      })
      .catch(erorr => {
        console.log(erorr);
      });
  };

  loadPatient = () => {
    axios
      .get("http://localhost:8080/api/patient/" + this.props.params.patientId)
      .then(response => {
        this.setState({
          patient: response.data
        });
      })
      .catch(erorr => {
        console.log(erorr);
      });
  };

  submitHandler = e => {
    let date = new Date();
    let newDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    e.preventDefault();
    console.log(newDate);
    axios
      .post("http://localhost:8080/api/doctor/new/record", {
        appointment: {
          duration: this.state.duration,
          description: this.state.description,
          date: newDate
        },
        medicalRecord: {
          compensable: this.state.isCompensable,
          repetitive: this.state.isRepetitive
        },
        icdCode: this.state.icdCode,
        patientId: this.state.patientId,
        userName: this.state.userName
      })
      .then(response => {
        console.log(response.status);
        this.setState({
          infoState: (
            <div className="alert alert-success">
              <strong>Naujas įrašas sekmingai sukurtas </strong>
            </div>
          ),
          isCompensable: false,
          isRepetitive: false,
          duration: "",
          description: "",
          formErrors: { icd: "", description: "", duration: "" },
          icdValid: true,
          descriptionValid: false, //turejo buti false
          durationValid: false,
          formValid: false
        });
      })
      .catch(erorr => {
        console.log(erorr);
        this.setState({
          infoState: (
            <div className="alert alert-danger">
              <strong>Nesekmingas įrašo kurimas {erorr.response.data}</strong>
            </div>
          )
        });
      });
  };

  fieldHandler = e => {
    // e === event
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  //Formos laukų validacija:
  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let icdValid = this.state.icdValid;
    let descriptionValid = this.state.descriptionValid;
    let durationValid = this.state.durationValid;

    switch (fieldName) {
      case "icdCode":
        if (value.match(/^[a-zA-Z]\d{2}(\.[a-zA-Z0-9]{1,4})?$/g)) {
          icdValid = true;
        } else if (value.match(/^[1-7]{1}$/g)) {
          icdValid = true;
        } else if (value.match(/^[lL]\d{3}$/g)) {
          icdValid = true;
        } else if (value.match(/^[8-9]{1}\d{0,1}(\d-[mM]\d{2})?$/g)) {
          icdValid = true;
        } else {
          icdValid = false;
        }
        // ^ [RAIDĖ][SKAIČIUS][SKAIČIUS](.)(SKAIČIUS*)(SKAIČIUS*)(SKAIČIUS*)(RAIDĖ ARBA SKAIČIUS).
        //*rečiau, raidė, arba X -> jei yra 7-ta pozicija, o kitų pozicijų nėra, šios iki septintosios užpildomos raide X.
        //Specialūs kodai Lietuvoje - [RAIDĖ L][SKAIČIUS][SKAIČIUS][SKAIČIUS]. [SKAIČIUS NUO 1 IKI 7]. [SKAIČIUS 8 ARBA 9](SKAIČIUS)(SKAIČIUS -M SKAIČIUS SKAIČIUS).
        fieldValidationErrors.icd = icdValid
          ? ""
          : "Įveskite taisyklingą TLK-10 kodą.";
        break;
      case "description":
        descriptionValid = value.length >= 3;
        // ^ Tikrina ar įrašyta bent kažkas.
        fieldValidationErrors.description = descriptionValid
          ? ""
          : "Aprašykite vizitą.";
        break;
      case "duration":
        durationValid = value.match(/^\d{1,3}$/g);
        // ^ Tikrina ar įrašytas teigiamas skaičius.
        fieldValidationErrors.duration = durationValid
          ? ""
          : "Įveskite vizito trukmę.";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        icdValid: icdValid,
        descriptionValid: descriptionValid,
        durationValid: durationValid
      },
      this.validateForm
    );
  };

  //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
  validateForm = () => {
    this.setState({
      formValid:
        this.state.icdValid &&
        this.state.descriptionValid &&
        this.state.durationValid
    });
  };

  //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
  //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile.
  errorClass = erorr => {
    return erorr.length === 0 ? "is-valid" : "is-invalid";
  };

  render() {
    return (
      <div className="container">
        <section>
          <button
            onClick={() => this.props.router.goBack()}
            className="btn btn-primary"
          >
            {" "}Atgal{" "}
          </button>
          <h2>Naujas ligos įrašas</h2>
          <PatientInfoCard
            patientFullName={this.state.patient.fullName}
            date={this.state.patient.birthDate}
            patientId={this.state.patient.id}
            form={
              <RecordForm
                erorrClassIcd={this.errorClass(this.state.formErrors.icd)}
                errorClassDescription={this.errorClass(
                  this.state.formErrors.description
                )}
                errorClassDuration={this.errorClass(
                  this.state.formErrors.duration
                )}
                infoState={this.state.infoState}
                icds={this.state.icds}
                icd={this.state.icd}
                icdCode={this.state.icdCode}
                formErrors={this.state.formErrors}
                description={this.state.description}
                isCompensable={this.state.isCompensable}
                isRepetitive={this.state.isRepetitive}
                duration={this.state.duration}
                formValid={this.state.formValid}
                submitHandler={this.submitHandler}
                fieldHandler={this.fieldHandler}
              />
            }
          />
        </section>
      </div>
    );
  }
}
