import React from 'react'



var PublicViewComponent = (props) =>{
    return(
    <div>
        <section>
            <div className="container">           
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3>Susirgimų statistika</h3>
                        </div>
                        <div className="panel-body">
                           {props.icdStatistic}
                            {props.button}
                           {props.icdTable}
                        </div> 
                    </div> 
                </div>           
            </div>
        </section>
    </div>
    )
}

export default PublicViewComponent;