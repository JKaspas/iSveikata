import React, {Component} from 'react'
import axios from 'axios'
import PrescriptionUsageListView from '../DoctorComponent/PrescriptionUsageListView';
import PrescriptionUsageListingItem from '../DoctorComponent/PrescriptionUsageListingItem';


export default class DoctorPrescriptionUsageViewContainer extends Component{
    constructor(props){
        super(props)
        this.session = JSON.parse(sessionStorage.getItem('session'))
        this.state = {
           usage:null,
           info:''
        }
    }


    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        }  
        
        
        document.getElementsByClassName("modal-backdrop")[0].style.position = "static"
       this.getPrescriptionUsage();
    }

    getPrescriptionUsage = () =>{
        axios.get('http://localhost:8080/api/prescription/'+this.props.params.prescriptionId+'/usages')
        .then((response)=>{
            this.setState({
                usage:response.data.map(this.composeUsage)
            })
          

            if(response.data.length === 0){
                this.setState({
                    info:(<h3>Priskirtų pacientų nerasta</h3>)
                })
            }
                  
            console.log(response.data)
        })
        .catch((erorr) => {
            
            //console.log(erorr)
        })
    }

  
    composeUsage= (usage, index) =>{
       
        return (
            <PrescriptionUsageListingItem
                key={index}
                date={usage.usageDate}
                druggistName={usage.druggist.firstName + ' ' + usage.druggist.lastName}
               
            />
        )
    }





    render() {
        return (
            <div className="container">
            <section>
            <button onClick={() =>  this.props.router.goBack()} className="btn btn-primary"> Atgal </button>
            <p/>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Recepto panaudojimo faktai</h4>
                        </div>
                        <div className="panel-body">
                            <PrescriptionUsageListView 
                                usage={this.state.usage}
                            />
                            {this.state.info}
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

