<div class="bootbox modal fade in" id="application-list-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="top: 50% !important; margin-top: -250px !important;">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content cp-padding-remove">
            <div class="modal-header cp-bgc-light cp-text-center">
                <div>
                    <h4 class="modal-title cp-text-uppercase" id="myModalLabel">All Application(s)</h4>
                </div>
            </div>
            <div class="modal-body application-list-body cp-padding-medium cp-padding-remove-vertical">
                <ul class="list-unstyled application-list">
                    
                </ul>
            </div>
            <div class="modal-footer">
                <div class="row">
                    <div class="col-md-6">
                        <button type="button" class="app-btn show-location-markers" data-status="show" >Show Location Marker</button>
                    </div>
                    <div class="col-md-6">
                        <button type="button" class="app-btn" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="richardson-summary-preview" class="uk-modal-container" uk-modal="esc-close: false; bg-close: false;">
    <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-outside" type="button" uk-close></button>
        <div class="uk-padding-small cp-bgc-light uk-text-center uk-text-bold">
            <h2 class="uk-modal-title uk-text-uppercase uk-margin-remove abrade-black">uniform Summary</h2>
        </div>
        <div class="uk-flex-center">
            <div class="loading uk-padding-small uk-padding-remove-horizontal">
                <div class="uk-text-center">
                    <div uk-spinner="ratio: 8"></div>
                    <div>Preparing uniform preview.....</div>
                </div>
            </div>
            <div class="uk-padding-small pdf-iframe-container uk-padding-remove-horizontal">
                <div class="uk-padding-small uk-padding-remove-horizontal">
                    <iframe class="pdf-iframe" src="" width="100%" style="height: 70vh !important"></iframe>
                </div>
            </div>
        </div>
    </div>
</div>
