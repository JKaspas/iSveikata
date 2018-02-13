import React from 'react'

export const DetailsModalView = (props) =>{
    return(
        <div id="myModal" className="modal fade" role="dialog">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">{props.infoHeader}</h4>
                </div>
                <div className="modal-body">
                    {props.infoDetails}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Uždaryti</button>
                </div>
                </div>
            </div>
        </div>
    )
}
