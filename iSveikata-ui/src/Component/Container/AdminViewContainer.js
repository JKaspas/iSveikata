import React, {Component} from 'react'

import AdminCreateUserComponent from './AdminComponent/AdminCreateUserComponent'

export default class AdminViewContainer extends Component{


    render() {
        return (
            <div className='container'><section>AdminViewContainer
                <AdminCreateUserComponent />
            </section>
          
            </div>
        )
    }
}