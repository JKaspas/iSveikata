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
                        <div className="col-sm-12">
                            <button className="btn btn-default" disabled={props.icdButtonDisabled} onClick={props.showIcdStatistic}>Pateikti dažniausias sergamų ligų statistiką pagal TLK-10 </button>
                            <button className="btn btn-default pull-right" disabled={props.tlkButtonDisabled} onClick={props.showApiStatistic}>Pateikti vaisto aktyviu medžiagu panaudojimo statistiką</button>
                        </div>
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