import React, {Component} from 'react'
import axios from 'axios'

import RecordListingItem from '../DoctorComponent/RecordListingItem'
import RecordListView from '../DoctorComponent/RecordListView'

export default class DoctorPatientViewContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            records:''
        }
    }

    componentWillMount = () =>{
        axios.get('http://localhost:8080/api/patient/'+this.props.params.patientId+'/record')
        .then((response) => {
            this.setState({
                records:response.data.map(this.composeRecord)
            })
            console.log(response.status)
            console.log(response.data[0].appointment)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }

    composeRecord = (record,index) =>{
        return(
            <RecordListingItem
                key={index}
                id={record.id}
                compensable={record.compensable}
                repetitive={record.repetitive}
                app={record.appointment.description}

            />
        )
    }

    


    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Paciento informacija</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                Paciento istorijos irasai...
                                <RecordListView 
                                    records={this.state.records}
                                />
                                
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

