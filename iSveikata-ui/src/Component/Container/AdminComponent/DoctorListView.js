import React from 'react'


const DoctorListView = (props) =>{


    return (
    <div> 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Vardas</th>
                    <th>Pavarde</th>
                    <th>Slapyvardis</th>
                    <th>Specializacija</th>
                </tr>
            </thead>
            <tbody>
                {props.doctors}
            </tbody>
        </table>
</div>)
}

export default DoctorListView;