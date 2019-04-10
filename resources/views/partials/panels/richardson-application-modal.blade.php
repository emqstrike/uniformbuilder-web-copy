<!-- List of decoration -->
<div class="bootbox modal fade in" id="application-list-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false" style="top: 50% !important; margin-top: -250px !important;">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content cp-padding-remove">
            <div class="modal-header cp-bgc-light cp-text-center">
                <div>
                    <h4 class="modal-title cp-text-uppercase" id="myModalLabel">All Decoration(s)</h4>
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
<!-- end List of decoration -->

<!-- {{-- Pattern Modal --}} -->
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
<!-- {{-- End Pattern Modal --}} -->

<!-- {{-- Piping Modal --}} -->
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

                <div class="uk-grid-small uk-grid-match uk-text-center piping-footer-option-button" uk-grid>
                    <div class="uk-width-1-2 uk-width-1-2@s">
                        <button class="uk-button uk-button-default uk-button-small uk-width-1-1 apply-piping-color" type="button">Done</button>
                    </div>
                    <div class="uk-width-1-2 uk-width-1-2@s">
                        <button class="uk-button uk-button-default uk-button-small uk-width-1-1 cancel-piping-color" type="button">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- {{-- End Piping Modal --}} -->


<!-- {{-- User Login --}} -->
<div id="richardson-user-login" class="uk-flex-top bootbox modal" uk-modal="esc-close: false; bg-close: false">
    <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <button class="uk-modal-close-default" type="button" uk-close></button>
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
<!-- {{-- End User Login --}} -->


<!-- {{-- User Login --}} -->
<div id="richardson-saved-design" class="uk-flex-top bootbox modal" uk-modal="esc-close: false; bg-close: false">
    <div class="uk-modal-dialog uk-width-2-3 uk-modal-body uk-margin-auto-vertical">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-body">
            <h3 class="uk-padding-small bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-bottom">Save Design</h3>
            <div class="uk-flex uk-flex-center">
                <div class="uk-width-2-3">
                    <form>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="form-stacked-text">Name</label>
                            <div class="uk-form-controls">
                                <input class="uk-input" id="design-name" type="text" placeholder="Some text...">
                            </div>
                        </div>
                        <div class="uk-margin">
                            <label class="uk-form-label" for="form-stacked-text">Notes</label>
                            <div class="uk-form-controls">
                                <textarea class="uk-textarea" id="design-notes" rows="5"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div class="uk-grid-match uk-child-width-1-2@s uk-child-width-1-4@m uk-text-center uniform-thumbnail-container uk-hidden" uk-grid>
                <div class="front_view">
                    <img class="bdr-reg bdr-gray uk-height-medium" src="">
                </div>
                <div class="back_view">
                    <img class="bdr-reg bdr-gray uk-height-medium" src="">
                </div>
                <div class="right_view">
                    <img class="bdr-reg bdr-gray uk-height-medium" src="">
                </div>
                <div class="left_view">
                    <img class="bdr-reg bdr-gray uk-height-medium" src="">
                </div>
            </div>
            <div class="uk-child-width-1-1 save-design-loading uk-flex uk-flex-center uk-text-center" uk-grid>
                <div uk-spinner="ratio: 8">
                </div>
                <div>
                    <p>Uploading images .... </p>
                </div>
            </div>
        </div>

        <div class="uk-modal-footer uk-text-right save-design-buttons uk-hidden">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <button class="uk-button uk-button-primary save" type="button">Save</button>
        </div>
        <div class="saving-please-wait uk-modal-footer uk-text-right uk-hidden">
            <p>Please wait.... <span uk-spinner="ratio: .5"></span></p>
        </div>
    </div>
</div>
<!-- {{-- End User Login --}} -->

<!-- Mascot Select -->
<div id="select-mascot-inksoft-modal" class="uk-modal-container bootbox modal" uk-modal="bg-close: false">
    <script type="text/javascript" language="javascript" src="https://stores.inksoft.com/designer/html5/common/js/launcher.js"></script>
    <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h5 class="modal-title uk-padding-small fc-darkGray bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin uk-margin-remove-horizontal abrade-ultra-italic">Custom logo</h5>
        <ul class="modal-menu-mascot uk-subnav uk-subnav-pill uk-flex-center active-bgc-dark" uk-switcher>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: list"></span>Select <span class="uk-visible@s">from existing design</span>
                </a>
            </li>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: list"></span>Select <span class="uk-visible@s">from libraries</span>
                </a>
            </li>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: plus-circle"></span>Create <span class="uk-visible@s">a custom logo</span>
                </a>
            </li>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: cloud-upload"></span>Upload <span class="uk-visible@s">your own logo file</span>
                </a>
            </li>
        </ul>
        <hr>
        <ul class="uk-switcher uk-margin">
            <li>
                <div class="uk-grid-collapse uk-flex uk-flex-middle" uk-grid>
                    <div class="uk-width-1-2@s uk-width-1-3@m uk-width-1-2@l">
                        <div class="con-preview-mascot">
                            <h4 class="uk-text-bold uk-text-center uk-text-uppercase uk-margin-remove fc-darkGray abrade-ultra-italic">Bear</h4>
                            <p class="uk-text-center uk-margin-remove-top">
                                <a href="#" class="uk-button uk-button-text uk-text-capitalize">Fullsize Preview</a>
                            </p>
                        </div>
                        <div class="uk-grid-collapse uk-flex-center" uk-grid>
                            <div class="uk-width-1-1 uk-width-2-3@s uk-text-center">
                                <div>
                                    <img id="preview-existing-logo" src="" uk-img>
                                </div>

                                <a href="" id="btn-add-to-uniform" class="uk-button uk-button-secondary uk-margin-top">Add to uniform</a>
                            </div>
                        </div>
                    </div>
                    <div class="uk-width-1-2@s uk-width-2-3@m uk-width-1-2@l uk-flex-first@s">
                        <nav class="uk-navbar-container uk-navbar-transparent uk-margin-top" uk-navbar>
                            <div class="nav-overlay uk-navbar-left uk-padding-small uk-padding-remove-horizontal">
                                <ul class="menu-tab-mascot uk-subnav uk-margin-remove uk-grid-small grid-tiny active-bgc-dark" uk-switcher="connect: .con-mascot-act-arch" uk-grid>
                                    <li><a href="#" class="uk-button uk-button-small uk-button-default padding-tiny-vertical uk-text-capitalize">Active <span>(8)</span></a></li>
                                    <li><a href="#" class="uk-button uk-button-small uk-button-default padding-tiny-vertical uk-text-capitalize">Archive <span>(0)</span></a></li>
                                </ul>
                            </div>

                            <div class="uk-navbar-right uk-padding-small uk-padding-remove-left uk-visible@m">
                                <form class="uk-search uk-search-default"> 
                                    <input class="uk-search-input" type="search" placeholder="Search...">
                                </form>
                                <span class="uk-margin-small-left icon-search"></span>
                            </div>
                            <div class="nav-overlay uk-navbar-right uk-padding-small uk-padding-remove-left uk-hidden@m">
                                <a class="" uk-search-icon uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="#"></a>
                            </div>

                            <div class="nav-overlay uk-navbar-left uk-flex-1 uk-padding-small" hidden>
                                <div class="uk-width-expand">
                                    <form class="uk-search uk-search-navbar uk-width-1-1">
                                        <input class="uk-search-input" type="search" placeholder="Search..." autofocus>
                                    </form>
                                </div>
                                <a class="" uk-close uk-toggle="target: .nav-overlay; animation: uk-animation-fade" href="#"></a>
                            </div>
                        </nav>
                        <ul class="uk-switcher con-mascot-act-arch con-select">
                            <li>
                                <div class="uk-margin-top uk-padding-small bdr-thin bdr-gray bgc-light uk-height-max-medium uk-overflow-auto">
                                    <div class="m-logo-active uk-grid-small uk-grid-match uk-child-width-1-2 uk-child-width-1-4@m con-palettes mascot-container" uk-grid>

                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
            <li class="inksoft-loader libraries">
                <div class="uk-flex uk-flex-center">
                    <div id="embed-inksoft-libraries">
                    </div>
                </div>
            </li>
            <li class="inksoft-loader create">
                <div class="uk-flex uk-flex-center">
                    <div id="embed-inksoft-create">
                    </div>
                </div>
            </li>
            <li class="inksoft-loader upload">
                <div class="uk-flex uk-flex-center">
                    <div id="embed-inksoft-upload">
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
<!-- End Mascot Select -->