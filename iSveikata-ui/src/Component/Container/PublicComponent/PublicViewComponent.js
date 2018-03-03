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
                        <button className="btn btn-primary" onClick={props.showIcdStatistic}>Pateikti dažniausias sergamų ligų statistiką pagal TLK-10 </button>
                        <button className="btn btn-primary" onClick={props.showApiStatistic}>Pateikti Vaisto aktyviu medžiagu panaudojimo statistika</button>
                           {props.icdStatistic}
                            {props.icdButton}
                           {props.icdTable}
                           
                           {props.apiStatistic}
                            {props.apiButton}
                           {props.apiTable}
                        </div> 
                    </div> 
                </div>           
            </div>
        </section>
    </div>
    )
}

export default PublicViewComponent;