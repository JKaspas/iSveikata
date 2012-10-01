import React, {Component} from 'react'
import axios from 'axios'

import UsersForm from '../AdminComponent/UsersForm'
import { UserFormSpecInput } from '../AdminComponent/UserFormSpecInput';
import { UserFormDrugStoreInput } from '../AdminComponent/UserFormDrugStoreInput';
import { UserFormSpecOtherInput } from '../AdminComponent/UserFormSpecOtherInput';


export default class AdminCreateUserContainer extends Component{
    constructor(){
        super();
        this.session =  JSON.parse(sessionStorage.getItem('session'))
        this.state = {
            firstName:'',
            lastName:'',
            userName:'',
            password: Math.random().toString(36).substr(2,8), //slaptažodis generuojamas iš 8 atsitiktinių skaitmenų ir raidžių.
            companyName: '',
            companyType: 'UAB',

            specialization:'',
            title:'BENDROJI GYDYTOJO PRAKTIKA',
            newTitle:'',

            type:'admin',

            infoState:'',

            formErrors: {firstName: '', lastName: '', companyName: '', newTitle: ''},
            firstNameValid: false,
            lastNameValid: false,    
            companyNameValid: false, 
            specializationValid: true,  
            isOtherSpecialization: false,        
            formValid: false,
            passwordMasked: true,
            generatedNumericString: Math.random().toString().substr(2,3),
       

        }
        

    }

    fullCompanyName = () => {
        return this.state.companyName + " " + this.state.companyType
    }

    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'admin'){
            this.props.router.push('/vartotojams');
            return '';
        }
        this.getAllSpecialization();

    }

    getAllSpecialization = () =>{
        axios.get('http://localhost:8080/api/specialization')
        .then((response)=>{
            this.setState({
                specialization:response.data.map(this.composerSpecialization)
            })
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }

    composerSpecialization = (spec, index) =>{
        return(
            <option key={index} value={spec.title}>{spec.title}</option>
        )
    }

    
    fieldHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        if(name === "title" && value === "kita") {
            this.setState({isOtherSpecialization: true, title:value},
            () => { this.validateField(name, value) });
        } else if(name === "title" && value !== "kita") {
            this.setState({isOtherSpecialization: false, newTitle:'', title:value});
        } else if(name === "newTitle") {
            this.setState({isOtherSpecialization: true, newTitle: value.toUpperCase()},
            () => { this.validateField(name, value) });
        } else {
             this.setState({[name]: value},
            () => { this.validateField(name, value) });
        }
       
            
        // console.log("Input field name: " + name);
        // console.log("Input field value: " + value);
    }

    userObjectByType = () =>{
        if(this.state.type === "druggist"){
            return{ firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    userName:this.generateUsername(),
                    password:this.state.password,
                    drugStore:this.fullCompanyName(),
                    type:this.state.type}
        }else{
            return{ firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    userName:this.generateUsername(),
                    password:this.state.password,
                    type:this.state.type,}
        }
    }
    specializationObject = () =>{
        if(this.state.title !== 'kita'){
            return {
                title:this.state.title
            }
        }else{
            return{
                title:this.state.newTitle
            }
        }
        
    }
               
   
    submitHandler = (e) =>{
        
        e.preventDefault();
        console.log(this.userObjectByType())
        console.log(this.fullCompanyName())
        axios.post('http://localhost:8080/api/admin/new/user', {
            employee:this.userObjectByType(),
            specialization:this.specializationObject(),
            
        })
        .then((response)=>{
            console.log(response.status)
            this.setState({
                infoState:<div className="alert alert-success"><strong>{response.data}</strong></div>,
                firstName:'',
                lastName:'',
                userName:'',
                password: Math.random().toString(36).substr(2,8), //slaptažodis generuojamas iš 8 atsitiktinių skaitmenų ir raidžių.
                companyName: '',
                newTitle:'',
                firstNameValid: false,
                lastNameValid: false,    
                companyNameValid: false, 
                specializationValid: true,  
                isOtherSpecialization: false,        
                formValid: false,
                passwordMasked: true,
                generatedNumericString: Math.random().toString().substr(2,3),
            })
            this.getAllSpecialization()
        })
        .catch((erorr) => {
            console.log(erorr)
            this.setState({
                infoState:<div className="alert alert-danger"><strong>{erorr.response.data}</strong></div>
            })
        })
        
    }
 
    specializationInput = () =>{
        if(this.state.type === 'doctor'){
        return (<UserFormSpecInput 
            fieldHandler={this.fieldHandler} 
            specialization={this.state.specialization} 
            newTitle={this.state.newTitle}
            title={this.state.title}
            otherSpecialization={
                this.state.isOtherSpecialization ? 
                <UserFormSpecOtherInput 
                 formErrorsNewTitle={this.errorClass(this.state.formErrors.newTitle)}
                fieldHandler={this.fieldHandler}
                newTitle={this.state.newTitle}
                /> : null
            }
        />)
        }else{
            return null;
        }
    }
    drugStoreInput = () =>{
        if(this.state.type === 'druggist'){
        return (<UserFormDrugStoreInput 
            companyType={this.state.companyType}
            fieldHandler={this.fieldHandler} 
            companyName={this.capitalizeFirstLetterOfString(this.state.companyName)}
            formErrorsCompanyName={this.errorClass(this.state.formErrors.companyName)}
        />)
        }else{
            return null;
        }
    }

    //Užtikrina, kad vardas ir pavardė būtų iš didžiosios raidės, jei įvesta mažosiomis.
    capitalizeFirstLetter = (string) => { 
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

     //Užtikrina, kad darbovietės pavadinimas būtų iš didžiosios raidės, jei įvesta mažosiomis.
     capitalizeFirstLetterOfString(string) { 
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    //Slapyvardis sudaromas iš trijų pirmų vardo raidžių, trijų pirmų pavardės raidžių ir atsitiktinio triženklio skaičiaus. 
    generateUsername = () => {
        let generatedUserName = ''; 
        if(this.state.firstNameValid && this.state.lastNameValid) {
            generatedUserName = this.state.firstName.substring(0, 3) + this.state.lastName.substring(0, 3) + this.state.generatedNumericString;    
        }
        return generatedUserName;
    }
    
    //Paspaudus ant slaptažodžio įvesties langelio (read only), galima pamatyti slaptažodį; vėl paspaudus - paslėpti.
    handlePasswordMasking = () => {
        this.setState(prevState => ({passwordMasked: !prevState.passwordMasked}));
    }
    
    //Formos laukų validacija:
    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let companyNameValid = this.state.companyNameValid;
        let specializationValid = this.state.specializationValid;
      
        switch (fieldName) {
            case 'firstName':
                firstNameValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                //Vėliau su XRegExp galima būtų padaryti kad atpažintų ir kitų kalbų raides;
                fieldValidationErrors.firstName = firstNameValid ? '' : 'Įveskite vardą.';
                break;
            case 'lastName':
                lastNameValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                fieldValidationErrors.lastName = lastNameValid ? '' : 'Įveskite pavardę.';
                break;
            case 'companyName':
                companyNameValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                fieldValidationErrors.companyName = companyNameValid ? '' : 'Įveskite darbovietės pavadinimą.';
                break;
            case 'title':
                specializationValid = value !== "kita";
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                fieldValidationErrors.newTitle = specializationValid ? '': 'Įveskite specializaciją.';
                break;
            case 'newTitle':
                specializationValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                fieldValidationErrors.newTitle = specializationValid ? '': 'Įveskite specializaciją.';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        firstNameValid: firstNameValid,
                        lastNameValid: lastNameValid,
                        companyNameValid: companyNameValid,
                        specializationValid: specializationValid
                      }, this.validateForm);
    }
    
    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm = () => {
        if(this.state.type === 'doctor'){
        this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.specializationValid });
        }else if (this.state.type === 'druggist'){
            this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.companyNameValid });
        }else{
            this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid });
        }
    }
    //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
    //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
    errorClass = (error) => {
        return(error.length === 0 ? 'is-valid' : 'is-invalid');
    }
    
  

    
    render(){
        return(
        <div className="container">
            <section>
                
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Registruoti naują sistemos vartotoją</h4>
                        </div>
                        <div className="panel-body">
                        {this.state.infoState}
                            <UsersForm 
                            firstName={this.capitalizeFirstLetter(this.state.firstName)}
                            lastName={this.capitalizeFirstLetter(this.state.lastName)}
                            userName={ this.generateUsername()} //userName
                            password={this.state.password}
                        

                            specializationInput={this.specializationInput()}
                            drugStoreInput={this.drugStoreInput()}

                            fieldHandler={this.fieldHandler}
                            submitHandler={this.submitHandler}
                            formErrors={this.state.formErrors}
                            
                            passwordMasked={this.state.passwordMasked}
                            handlePasswordMasking={this.handlePasswordMasking}
                            formValid={this.state.formValid}


                            formErrorsFirstName={this.errorClass(this.state.formErrors.firstName)}
                            formErrorsLastName={this.errorClass(this.state.formErrors.lastName)}
                     
                            />
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}


