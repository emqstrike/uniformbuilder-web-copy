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

<div class="bootbox modal fade in" id="piping-change-color" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="top: 210px !important">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header cp-bgc-light cp-text-center">
                <div>
                    <h4 class="modal-title cp-text-uppercase cp-text-bold" id="myModalLabel">Piping Color</h4>
                </div>
            </div>
            <div class="modal-body cp-padding-remove-horizontal">
                <div class="row">
                    <div class="col-md-5 cp-padding-remove-right">
                        <div class="cp-margin-bottom-small piping-preview" id="piping-preview"></div>
                    </div>
                    <div class="col-md-7 cp-padding-remove-left">
                        <div>
                            <ul class="nav nav-tabs piping-color-categories cp-border-none" role="tablist">
                                <li role="presentation" class="active cp-float-none">
                                    <div class="col-sm-4 cp-padding-remove piping-color-item cp-border">
                                        <a href="#piping-color-category-1"
                                                aria-controls="piping-category-1"
                                                role="tab" data-toggle="tab"
                                                class="cp-button-active cp-width-1-1 piping-color-selector cp-tab-button piping-category-1"
                                        >
                                            Color 1
                                        </a>
                                    </div>
                                </li>

                                <li role="presentation" class="cp-float-none">
                                    <div class="col-sm-4 cp-padding-remove piping-color-item cp-border">
                                        <a href="#piping-color-category-2"
                                                aria-controls="piping-category-2"
                                                role="tab" data-toggle="tab"
                                                class="cp-width-1-1 piping-color-selector cp-tab-button piping-category-2"
                                        >
                                            Color 2
                                        </a>
                                    </div>
                                </li>

                                <li role="presentation" class="cp-float-none">
                                    <div class="col-sm-4 cp-padding-remove piping-color-item cp-border">
                                        <a href="#piping-color-category-3"
                                                aria-controls="piping-category-3"
                                                role="tab" data-toggle="tab"
                                                class="cp-width-1-1 piping-color-selector cp-tab-button piping-category-3"
                                        >
                                            Color 3
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="col-md-12 uk-padding-remove-right">
                            <div id="piping-color-tab-content">
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="piping-color-category-1" data-piping-category="1">
                                        <div class="piping-color-main-container-1">
                                            <div class="row piping-color-button-container">

                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="piping-color-category-2" data-piping-category="2">
                                        <div class="piping-color-main-container-2">
                                            <div class="row piping-color-button-container">

                                            </div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="piping-color-category-3" data-piping-category="3">
                                        <div class="piping-color-main-container-3">
                                            <div class="row piping-color-button-container">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 cp-padding-remove-horizontal">
                            <div class="row cp-margin-top-xs">
                                <div class="col-md-6">
                                    <button type="button" class="col-md-6 piping-button cp-width-1-1 cp-text-uppercase" data-dismiss="modal">Done</button>
                                </div>

                                <div class="col-md-6" style="padding-left: 0 !important; padding-right: 31px;">
                                    <button type="button" class="piping-button cancel-application cp-width-1-1 cp-text-uppercase">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

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
                    <ul class="uk-subnav uk-grid-collapse uk-text-center uk-padding-remove uk-child-width-expand bottom-arrow arrow-outward bac-dark active-bgc-dark active-bdr-dark layer-container" uk-switcher uk-grid>
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