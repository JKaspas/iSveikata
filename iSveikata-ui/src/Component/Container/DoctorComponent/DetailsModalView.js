import React from 'react'

export const DetailsModalView = (props) =>{
    return(
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">{props.infoHeader}</h4>
                </div>
                <div class="modal-body">
                    {props.infoDetails}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Uždaryti</button>
                </div>
                </div>
            </div>
        </div>
    )
}
