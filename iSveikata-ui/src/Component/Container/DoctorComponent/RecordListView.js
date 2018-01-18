import React from 'react'


const RecordListView = (props) =>{


    return (
    <div> 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Ligos iraso id</th>
                    <th>Ar apsilankymas yra komensuojamas</th>
                    <th>Ar apsilankymas del to pacios priezasties</th>
                </tr>
            </thead>
            <tbody>
                {props.records}
            </tbody>
        </table>
</div>)
}

export default RecordListView;