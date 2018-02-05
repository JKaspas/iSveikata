import React, {Component} from 'react'
import axios from 'axios'
import Pagination from "react-js-pagination"


import DoctorListView from '../AdminComponent/DoctorListView'
import DoctorListingItem from '../AdminComponent/DoctorListingItem'
import {DoctorBindLink} from '../../Container/LinksAndButtons/DoctorBindLink'


export default class AdminBindDoctorPartContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            search:'',
            doctors:null,
            listInfo:'',
            notFound:'',

            activePage:1,
            itemsPerPage:8,
            listLength:''

        }
    }



    componentWillMount = () =>{

        var session =  JSON.parse(sessionStorage.getItem('session'))
        if(session === null || session.user.loggedIn !== true || session.user.userType !== 'admin'){
            this.props.router.push('/vartotojams');
            return '';
        }

        this.getAllDoctor(this.state.activePage)
       
    }

    getAllDoctor = (activeNumber) =>{
        axios.get('http://localhost:8080/api/doctor?page='+activeNumber+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            if(response.data.length === 0){
                this.setState({
                    notFound:(<h3>No doctor found</h3>),
                })
            }else{
                this.setState({
                    doctors:response.data.content.map(this.composeDoctor),
                    listInfo:response.data,
                    listLength:response.data.content.length
                })
            }
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr.response.data)
        })
    }

    composeDoctor = (doctor, index) =>{
        return(
            <DoctorListingItem
                key={index}
                firstName={doctor.firstName}
                lastName={doctor.lastName}
                userName={doctor.userName}
                specialization={doctor.specialization.title}
                doctorBindLink={<DoctorBindLink userName={doctor.userName}/>}
            />)
    }
    
    

    
    searchdHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

     //handle paggination page changes 
     handlePageChange = (activePage) => {
        
        //sen request for specific page
        this.getAllDoctor(activePage);
        
        //change activePage state to new page number
        this.setState({
            activePage:activePage
        })
      }

    //Show paggination div with props from state
    showPagination = () =>{
        if(this.state.listLength < this.state.itemsPerPage && !this.state.listInfo.last){
            return ''
        }
        return (
            <div className="col-sm-5 col-sm-offset-4">
            <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsPerPage}
            totalItemsCount={this.state.listInfo.totalElements}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
            />
        </div>
        )
    }


    
    render(){
        return(
        <div className="container">
            <section>  
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Priskirkyte gydytojui pacientą</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <div className="col-sm-4 col-sm-offset-4">
                                    <input type="text" className="form-control" value={this.state.search} onChange={this.searchdHandler} placeholder="Paieška" name="search" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <DoctorListView 
                                    doctors={this.state.doctors}
                                />
                                {this.showPagination()}
                                {this.state.notFound}
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}


