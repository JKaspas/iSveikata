import React from 'react';

var PublicViewComponent = (props) =>{
    return(
    <div>
        <section>
            <div className="container">           
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3>Susirgimų ir vaistų vartojimo statistika</h3>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <button className="btn btn-default btn-lg btn-block" disabled={props.icdButtonDisabled} onClick={props.showIcdStatistic}>Peržiūrėti dažniausiai pasitaikančių ligų statistiką</button>
                                <button className="btn btn-default btn-lg btn-block" disabled={props.tlkButtonDisabled} onClick={props.showApiStatistic}>Peržiūrėti dažniausiai vartojamų vaistų veikliųjų medžiagų statistiką</button>
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