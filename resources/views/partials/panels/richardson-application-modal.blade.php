<div class="bootbox modal fade in" id="application-list-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="top: 50% !important; margin-top: -250px !important;">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content cp-padding-remove">
            <div class="modal-header cp-bgc-light cp-text-center">
                <div>
                    <h4 class="modal-title cp-text-uppercase" id="myModalLabel">All Application(s)</h4>
                </div>
            </div>
            <div class="modal-body application-list-body cp-padding-medium cp-padding-remove-vertical">
                <ul class="list-unstyled application-list cp-margin-remove">
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
{{-- Pattern Modal --}}
<div id="modal-edit-palette-pattern" class="uk-flex-top bootbox modal" uk-modal="esc-close: false; bg-close: false">
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <h6 class="uk-padding-small bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-bottom">Pattern Color</h6>
        <div class="uk-grid-medium uk-flex-center" uk-grid>
            <div class="uk-width-auto uk-width-1-3@m">
                <div>
                    <div id="patternPreviewUI" style="width: 100% !important">
                        <canvas id="patternPreview" class="patternPreview"></canvas>
                    </div>
                </div>
                <h6 class="uk-margin-remove uk-text-bold uk-text-center uk-text-uppercase modal-pattern-name"></h6>
            </div>
            <div class="uk-width-1-1 uk-width-2-3@m uk-text-center">
                <div>
                    <ul class="uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark layer-container-pattern" uk-switcher uk-grid>
                    </ul>
                    <ul class="uk-switcher uk-margin uk-padding-remove pattern-color-main-container">
                        <li class="pattern-color-main-container-1">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color pattern-color-button-container" uk-grid>
                                </div>
                            </div>
                        </li>
                        <li class="pattern-color-main-container-2">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color pattern-color-button-container" uk-grid>
                                </div>
                            </div>
                        </li>
                        <li class="pattern-color-main-container-3">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color pattern-color-button-container" uk-grid>
                                </div>
                            </div>
                        </li>
                        <li class="pattern-color-main-container-4">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color pattern-color-button-container" uk-grid>
                                </div>
                            </div>
                        </li>
                        <li class="pattern-color-main-container-5">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-palette-color pattern-color-button-container" uk-grid>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="uk-grid-small uk-grid-match uk-text-center footer-button" uk-grid>
                    <div class="uk-width-1-2 uk-width-1-2@s">
                        <button class="uk-button uk-button-default uk-button-small uk-width-1-1 apply-pattern-color" type="button">Done</button>
                    </div>
                    <div class="uk-width-1-2 uk-width-1-2@s">
                        <button class="uk-button uk-button-default uk-button-small uk-width-1-1 uk-modal-close" type="button">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- End Pattern Modal --}}

{{-- Piping Modal --}}
<div id="piping-change-color" class="uk-flex-top bootbox modal" uk-modal="esc-close: false; bg-close: false">
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical" >
        <h6 id="title-test" class="uk-padding-small bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-bottom">Piping Color</h6>
        <div class="uk-grid-medium uk-flex-center" uk-grid>
            <div class="uk-width-auto uk-width-1-3@m">
                <div class="bdr-thin bdr-gray">
                    <div class="piping-preview" id="piping-preview"></div>
                </div>
                <h6 class="uk-margin-remove uk-text-bold uk-text-center uk-text-uppercase piping-name">Yoke Piping</h6>
            </div>
            <div class="uk-width-1-1 uk-width-2-3@m uk-text-center">

                <div>
                    <ul id="color-piping-nav-list" class="mn uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark" uk-switcher uk-grid>
                    </ul>
                    <ul id="color-piping-list" class="uk-switcher uk-margin uk-padding-remove">
                        <li data-piping-layer="1">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-piping-color-container" uk-grid>
                                </div>
                            </div>
                        </li>
                        <li data-piping-layer="2">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-piping-color-container" uk-grid>
                                </div>
                            </div>
                        </li>
                        <li data-piping-layer="3">
                            <div class="con-select con-palettes">
                                <div class="uk-grid-small grid-tiny uk-grid-match uk-child-width-auto uk-text-center m-piping-color-container" uk-grid>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="uk-grid-small uk-grid-match uk-text-center" uk-grid>
                    <div class="uk-width-1-2 uk-width-1-2@s">
                        <button class="uk-button uk-button-default uk-button-small uk-width-1-1 uk-modal-close" type="button">Done</button>
                    </div>
                    <div class="uk-width-1-2 uk-width-1-2@s">
                        <button class="uk-button uk-button-default uk-button-small uk-width-1-1 uk-modal-close" type="button">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
{{-- End Piping Modal --}}


{{-- User Login --}}
<div id="richardson-user-login" class="uk-flex-top bootbox modal" uk-modal="esc-close: false; bg-close: false">
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <h6 class="uk-padding-small bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-bottom">User Login</h6>
        <div class="uk-grid uk-flex-center" uk-grid>
            <form id="r-login" method="POST" action="#">
                <label>Email address</label>
                <div class="uk-margin-small">
                    <div class="uk-inline">
                        <span class="uk-form-icon" uk-icon="icon: user"></span>
                        <input class="uk-input uk-form-width-large" type="email" name="email">
                    </div>
                </div>
                <label>Password</label>
                <div class="uk-margin-small">
                    <div class="uk-inline">
                        <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                        <input class="uk-input uk-form-width-large" type="password" name="password">
                    </div>
                </div>
                <button class="uk-button uk-button-default uk-text-capitalize submit-login" type="button">Submit</button>
            </form>
        </div>
    </div>
</div>
{{-- End User Login --}}