<!-- List of decoration -->
<div id="application-list-modal" class="uk-flex-top bootbox modal" uk-modal="esc-close: false; bg-close: false">
    <div class="uk-modal-dialog uk-margin-auto-vertical">
        <div class="uk-modal-body uk-padding-small uk-padding-remove-bottom">
            <h6 class="uk-padding-small bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-small-bottom">All Decorations</h6>
            <div class="">
                <ul class="uk-list uk-list-divider application-list uk-height-max-medium uk-overflow-auto">
                </ul>
            </div>
        </div>
        <div class="uk-modal-footer uk-text-center">
            <button class="uk-button uk-button-secondary show-location-markers" data-status="show">Show Location Marker</button>
            <button class="uk-button uk-button-default uk-modal-close" type="button">close</button>
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
                        <input class="uk-input uk-form-width-large" type="email" name="email" />
                    </div>
                </div>
                <label>Password</label>
                <div class="uk-margin-small">
                    <div class="uk-inline">
                        <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
                        <input class="uk-input uk-form-width-large" type="password" name="password" />
                    </div>
                </div>
                <button class="uk-button uk-button-default uk-text-capitalize submit-login" type="button">Submit</button>
            </form>
        </div>
    </div>
</div>
<!-- {{-- End User Login --}} -->


<!-- {{-- User Saved Desing --}} -->
<div id="richardson-saved-design" class="uk-flex-top bootbox modal" uk-modal="esc-close: false; bg-close: false">
    <div class="uk-modal-dialog uk-width-1-1 uk-width-3-4@m uk-width-2-3@l uk-width-1-2@xl uk-margin-auto-vertical uk-padding-small">
        <div>
            <h6 class="uk-padding-small bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-bottom">Save Design</h6>
            <div class="uk-margin-top uk-grid-small" uk-grid>
                <div class="uk-margin-bottom uk-width-1-2@s">
                    <div class="design-preview uk-hidden">
                        <h6 class="uk-text-bold uk-text-uppercase">Design Preview</h6>
                        <div class="uk-grid-collapse uk-flex-center" uk-grid>
                            <!--Preview-->
                            <div class="uk-width-1-1 uk-width-expand@s">
                                <div class=" uk-grid-collapse uk-flex uk-flex-center" uk-grid>
                                    <ul class="uk-switcher con-preview uk-width-1-1 uk-width-3-4@s uniform-thumbnail-container">
                                        <li>
                                            <div class="uk-inline front_view">
                                                <img src="" alt="" uk-img>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="uk-inline back_view">
                                                <img src="" alt="" uk-img>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="uk-inline left_view">
                                                <img src="" alt="" uk-img>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="uk-inline right_view">
                                                <img src="" alt="" uk-img>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!--Preview navigation-->
                            <div class="uk-width-1-1 con-thumb-nav-savedesign uk-flex-center uk-flex-first@m ">
                                <div class="uk-grid-small grid-tiny uk-flex-center uniform-thumbnail-container" uk-switcher="connect: .con-preview" uk-grid>
                                    <div class="uk-width-auto front_view">
                                        <a href="" class="bdrr-none uk-link-reset" uk-icon=" ratio: 2">
                                            <img class="thumb-nav-savedesign bdr-reg bdr-lightGray" src="" alt=""uk-img>
                                        </a>
                                    </div>
                                    <div class="uk-width-auto back_view">
                                        <a href="" class="bdrr-none uk-link-reset" uk-icon=" ratio: 2">
                                            <img class="thumb-nav-savedesign bdr-reg bdr-lightGray" src="" alt="" uk-img>
                                        </a>
                                    </div>
                                    <div class="uk-width-auto left_view">
                                        <a href="" class="bdrr-none uk-link-reset" uk-icon=" ratio: 2">
                                            <img class="thumb-nav-savedesign bdr-reg bdr-lightGray" src="" alt="" uk-img>
                                        </a>
                                    </div>
                                    <div class="uk-width-auto right_view">
                                        <a href="" class="bdrr-none uk-link-reset" uk-icon=" ratio: 2">
                                            <img class="thumb-nav-savedesign bdr-reg bdr-lightGray" src="" alt="" uk-img>
                                        </a>
                                    </div>
                                </div>
                            </div>
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

                <div class="uk-margin-bottom uk-width-1-2@s">
                    <h6 class="uk-text-bold uk-text-uppercase">Design Information</h6>
                    <form id="save-design-form">
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-2-3">
                                <label class="uk-form-label" for="form-stacked-text">Design Name</label>
                                <div class="uk-form-controls">
                                    <input class="uk-input" id="design-name" type="text" placeholder="Design Name">
                                </div>
                            </div>

                            <div class="uk-width-1-3">
                                <label class="uk-form-label" for="form-stacked-text">ID</label>
                                <div class="uk-form-controls">
                                    <input class="uk-input" id="design-id" type="text" placeholder="0000" readonly="true">
                                </div>
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
        </div>

        <div class="uk-modal-footer uk-padding-remove-bottom uk-text-right save-design-buttons">
            <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
            <button class="uk-button uk-button-primary save bgc-lightGray" type="button" disabled>Save</button>
        </div>
        <div class="saving-please-wait uk-modal-footer uk-text-right uk-hidden">
            <p>Please wait.... <span uk-spinner="ratio: .5"></span></p>
        </div>
    </div>
</div>
<!-- {{-- End User Saved Desing --}} -->

<!-- Mascot Select -->
<div id="select-mascot-inksoft-modal" class="uk-modal-container bootbox modal" uk-modal="bg-close: false; stack: true; esc-close: false;">
    <script type="text/javascript" language="javascript" src="https://stores.inksoft.com/designer/html5/common/js/launcher.js"></script>
    <div class="uk-modal-dialog uk-modal-body uk-padding-small">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h6 class="modal-title uk-padding-small fc-darkGray bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin uk-margin-remove-horizontal abrade-ultra-italic">Richardson logos</h6>
        <ul class="modal-menu-mascot-header uk-subnav uk-subnav-pill uk-flex-center active-bgc-dark" uk-switcher>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize mascot-menu-button" data-type="existing">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: list"></span>Select <span class="uk-visible@s">from existing logo</span>
                </a>
            </li>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize mascot-menu-button" data-type="create">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: list"></span>Create logo/Logo libraries</span>
                </a>
            </li>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize mascot-menu-button" data-type="upload">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: cloud-upload"></span>Upload <span class="uk-visible@s">your own logo file</span>
                </a>
            </li>
        </ul>
        <hr>
        <ul class="uk-switcher uk-margin menu-mascot-content">
            <li class="inksoft-existing-design">
            </li>
            <li class="inksoft-loader create">
                <div class="uk-flex uk-flex-center">
                    <div id="embed-inksoft-create">
                    </div>
                </div>
            </li>
            <li class="inksoft-loader upload">
                <div class="uk-grid-small uk-child-width-1-1@s uk-text-center" uk-grid>
                    <div class="upload-tutorial-container">
                        <div class="uk-grid-small uk-child-width-1-1" uk-grid>
                            <div>
                                <div class="uk-flex uk-flex-right">
                                    <a href="javascript:void(0)" class="close-tutorial uk-text-muted"><span uk-icon="icon: close"></span></a>
                                </div>
                            </div>
                            <div>
                                <div class="uk-flex uk-flex-center">
                                    <img src="{{ $asset_storage }}/richardson/img/upload-me.png" uk-img style="position: absolute; height: 790px !important" class="close-tutorial">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="uk-flex uk-flex-center">
                            <div id="embed-inksoft-upload">
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
<!-- End Mascot Select -->

<div id="richardson-summary-preview" class="uk-modal-container" uk-modal="esc-close: false; bg-close: false;">
    <div class="uk-modal-dialog uk-modal-body uk-padding-small">
        <button class="uk-modal-close-outside" type="button" uk-close></button>
        <h6 class="uk-padding-small bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-remove">Uniform Summary</h6>
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

<!-- Stock Mascot -->
<div id="richardson-stock-mascot" class="bootbox modal" uk-modal="bg-close: false; stack: false; esc-close: false;">
    <div class="uk-modal-dialog uk-width-3-4 uk-margin-auto-vertical inksoft-stock-mascot">
        <div class="uk-modal-body">
            <h6 class="modal-title uk-padding-small fc-darkGray bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin uk-margin-remove-horizontal abrade-ultra-italic richardson-stock-mascot-header">Richardson Stock Logos</h6>
            <div class="stock-mascot-main-content">
                <div class="uk-grid-small uk-grid-match" uk-grid>
                    <div class="uk-width-expand">
                        <div class="bdr-thin bdr-gray bgc-lightGray">
                            <div class="uk-grid-small uk-grid-divider uk-grid-match" uk-grid>
                                <div class="uk-width-1-3">
                                    <div class="uk-padding-small uk-padding-remove-right">
                                        <ul class="uk-nav uk-list uk-list-divider stock-mascot-categories uk-height-max-large uk-overflow-auto bdr-thin bdr-gray">
                                        </ul>
                                    </div>
                                </div>
                                <div class="uk-width-expand">
                                    <div class="uk-padding-small">
                                        <div class="uk-height-max-large uk-overflow-auto">
                                            <div class="uk-grid-small uk-grid-match uk-child-width-1-4@m uk-padding-small stock-mascot-list-container uk-padding-remove-vertical uk-padding-remove-left" uk-grid>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="stock-mascot-loading-screen-content uk-hidden">
                                        <div class="uk-width-1-1">
                                            <div class="uk-flex uk-flex-middle uk-flex-center">
                                                <div uk-spinner="ratio: 5"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br><br>
                    <div class="uk-width-1-4 uk-flex uk-flex-center uk-padding-small uk-padding-remove-vertical uk-padding-remove-right">
                        <div class="uk-width-1-1@s uk-text-center uk-first-column stock-mascot-preview-container">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="stock-mascot-loading-screen uk-hidden">
                <div class="uk-width-1-1">
                    <div class="uk-flex uk-flex-center">
                        <div uk-spinner="ratio: 8"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="uk-modal-footer uk-text-center">
            <button class="uk-button uk-button-default cancel-add-uniform uk-text-capitalize" type="button">Cancel</button>
            <button class="uk-button uk-button-secondary uk-text-capitalize add-to-uniform" type="button">Apply</button>
        </div>
    </div>
</div>
<!-- End Stock Mascot -->

<!-- Inksoft Editor -->
<div id="inksoftEditor" class="uk-modal-container bootbox modal inksoft-design-studio" uk-modal="bg-close: false; stack: false; esc-close: false;">
    <script type="text/javascript" language="javascript" src="https://stores.inksoft.com/designer/html5/common/js/launcher.js"></script>
    <div class="uk-modal-dialog uk-modal-body uk-padding-small uk-width-1-1">
        <a href="#" class="uk-icon-link uk-flex uk-flex-right cancel-add-uniform" uk-icon="close"></a>
        <h6 class="modal-title uk-padding-small fc-darkGray bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin uk-margin-remove abrade-ultra-italic">Design Editor</h6>
        <div class="uk-padding-small">
            <div class="uk-width-1-1 uk-flex uk-flex-center">
                <div class="inksoft-design-editor bdr-thin bdr-gray uk-padding-small">
                    
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Inksoft Editor -->

<!-- Inksoft Upload -->
<div id="inksoftUploader" class="uk-modal-container bootbox modal inksoft-design-studio" uk-modal="bg-close: false; stack: false; esc-close: false;">
    <script type="text/javascript" language="javascript" src="https://stores.inksoft.com/designer/html5/common/js/launcher.js"></script>
    <div class="uk-modal-dialog uk-modal-body uk-padding-small uk-width-1-1">
        <a href="#" class="uk-icon-link uk-flex uk-flex-right cancel-add-uniform" uk-icon="close"></a>
        <h6 class="modal-title uk-padding-small fc-darkGray bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin uk-margin-remove abrade-ultra-italic">Design Upload</h6>
        <div class="uk-padding-small">
            <div class="uk-grid-small uk-child-width-1-1@s uk-text-center" uk-grid>
                <div class="upload-tutorial-container">
                    <div class="uk-grid-small uk-child-width-1-1" uk-grid>
                        <div>
                            <div class="uk-flex uk-flex-right">
                                <a href="javascript:void(0)" class="close-tutorial uk-text-muted"><span uk-icon="icon: close"></span></a>
                            </div>
                        </div>
                        <div>
                            <div class="uk-flex uk-flex-center">
                                <img src="{{ $asset_storage }}/richardson/img/upload-me.png" uk-img style="position: absolute; height: 790px !important" class="close-tutorial">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="uk-flex uk-flex-center">
                        <div class="inksoft-design-uploader bdr-thin bdr-gray uk-padding-small">
                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- End Inksoft Upload -->

<!-- Generate Thumbnail -->
<div id="generateThumbnail" class="uk-modal-container" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-flex uk-flex-center uk-flex-middle uk-padding-small thumbnail">
            <img src="">
        </div>
    </div>
</div>
<!-- End Generate Thumbnail -->

<!-- Team Roster-->
<div id="richardson-team-roster" class="bootbox modal" uk-modal="bg-close: false; stack: true; esc-close: false;">
    <div class="uk-modal-dialog uk-modal-body uk-width-3-4 uk-margin-auto-vertical">
        <button class="uk-modal-close-outside" type="button" uk-close></button>

        <div class="uk-grid-collapse uk-child-width-expand active-bgc-red-switcher" uk-switcher uk-grid>
            <div>
                <a class="uk-button uk-button-default uk-width-1-1">
                    <h6 class="uk-padding-small uk-margin-remove uk-text-bold uk-text-center uk-text-uppercase">Team Roster</h6>
                </a>
            </div>
            <div>
                <a class="uk-button uk-button-default uk-width-1-1">
                    <h6 class="uk-padding-small uk-margin-remove uk-text-bold uk-text-center uk-text-uppercase">Applications Sizing</h6>
                </a>
            </div>
        </div>

        <ul class="uk-switcher uk-margin uk-padding-remove">
            <li>
                <div class="uk-grid-small" uk-grid>
                    <div class="uk-width-1-2@m uk-width-1-5@l">
                        <div class="uk-width-1-1@m uk-width-1-1@l">
                            <div class="uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Select Sizes</h5>
                                <div class="roster-uniform-size-container">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-width-1-2@m uk-width-1-3@l">
                            <div class="uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                <h5 uk-margin class="uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Select Player Number</h5>
                                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Preview: <span class="fc-red player-info-preview"></span></h6>
                                <div class="uk-grid-small uk-child-width-1-1@m grid-tiny uk-grid-match">
                                    <div class="bdr-top uk-height-max-xlarge uk-overflow-auto player-numbers-container">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div class="uk-width-1-1@m uk-width-expand@l">
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-1-1@l">
                                <div class="uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                    <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Edit Roster</h5>
                                    <table class="uk-table uk-table-small uk-table-divider roster-player-list-table uk-margin-remove-top fixed_header">
                                        <thead>
                                            <tr>
                                                <th class="fc-dark uk-padding-remove-top uk-width-1-6">Size</th>
                                                <th class="fc-dark uk-padding-remove-top uk-width-expand">Last Name</th>
                                                <th class="fc-dark uk-padding-remove-top uk-width-1-6">Number</th>
                                                <th class="fc-dark uk-padding-remove-top uk-width-expand">Quantity</th>
                                                <th class="fc-dark uk-padding-remove-top uk-table-shrink"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="uk-width-1-1@l">
                                <div class="uk-padding-small uk-padding-remove-vertical uk-padding-remove-left">
                                    <h5 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Summary</h5>
                                    <div class="uk-width-1-1">
                                        <div class="uk-grid-small uk-grid-match" uk-grid>
                                            <div class="uk-width-1-3">
                                                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Sizes</h6>
                                            </div>
                                            <div class="uk-width-2-3">
                                                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark uk-text-center">Player Numbers</h6>
                                            </div>
                                        </div>
                                        <div class="bdr-top uk-padding-small summary-list-height uk-overflow-auto"> 
                                            <ul class="uk-list uk-list-divider roster-summary">
                                                
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="uk-modal-footer uk-padding-remove-bottom uk-text-center">
                    <button class="uk-button uk-button-secondary save-roster">Save Roster</button>
                    <button class="uk-button uk-button-secondary save-roster">Next</button>
                </div>
            </li>
            <li>
                <div class="application-sizing-container">
                    <div class="uk-overflow-auto application-list-maxheight">
                        <table class="uk-table uk-table-large uk-table-hover uk-table-middle uk-table-divider applications-sizing-table">
                            <thead class="uk-text-uppercase">
                                <tr>
                                    <th class="uk-width-small">App&nbsp;Type</th>
                                    <th class="uk-width-1-4">Font&nbsp;/&nbsp;Logo Details</th>
                                    <th class="uk-width-1-6">Select&nbsp;size</th>
                                    <th class="uk-width-1-5">Colors&nbsp;/&nbsp;Pattern</th>
                                    <th class="uk-table-expand">Notes</th>
                                </tr>
                            </thead>
                            <tbody class="fc-dark uk-text-small">
                            </tbody>
                        </table>
                    </div>
                    <div class="uk-modal-footer uk-padding-remove-bottom uk-text-center">
                        <button class="uk-button uk-button-secondary save-application-sizing uk-modal-close">Save Application Sizing</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
<!-- End Team Roster-->


<!-- Saving Option -->
<div id="richardson-saving-option" class="uk-modal-container uk-flex-top bootbox modal" uk-modal="esc-close: false; bg-close: false">
    <div class="uk-modal-dialog uk-width-1-2@s uk-padding-small">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uniform-thumbnail-container uk-hidden">
            <h3 class="uk-heading uk-text-uppercase uk-text-bold abrade-ultra-italic uk-text-center">YOUR DESIGN IS COMPLETE, WHAT'S NEXT?</h3>
            <div class="uk-grid-small" uk-grid>
                <div class="uk-margin-bottom uk-width-1-2@s">
                    <div class="design-preview uk-hidden uk-padding-small">
                        <h6 class="uk-text-bold uk-text-uppercase">Design Preview</h6>
                        <div class="uk-grid-collapse uk-flex-center" uk-grid>
                            <!--Preview-->
                            <div class="uk-width-1-1 uk-width-expand@s">
                                <div class=" uk-grid-collapse uk-flex uk-flex-center" uk-grid>
                                    <ul class="uk-switcher con-preview uk-width-1-1 uk-width-3-4@s uniform-thumbnail-container">
                                        <li>
                                            <div class="uk-inline front_view">
                                                <img src="" alt="" uk-img>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="uk-inline back_view">
                                                <img src="" alt="" uk-img>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="uk-inline left_view">
                                                <img src="" alt="" uk-img>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="uk-inline right_view">
                                                <img src="" alt="" uk-img>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <!--Preview navigation-->
                            <div class="uk-width-1-1 con-thumb-nav-savedesign uk-flex-center uk-flex-first@m ">
                                <div class="uk-grid-small grid-tiny uk-flex-center uniform-thumbnail-container" uk-switcher="connect: .con-preview" uk-grid>
                                    <div class="uk-width-auto front_view">
                                        <a href="" class="bdrr-none uk-link-reset" uk-icon=" ratio: 2">
                                            <img class="thumb-nav-savedesign bdr-reg bdr-lightGray" src="" alt=""uk-img>
                                        </a>
                                    </div>
                                    <div class="uk-width-auto back_view">
                                        <a href="" class="bdrr-none uk-link-reset" uk-icon=" ratio: 2">
                                            <img class="thumb-nav-savedesign bdr-reg bdr-lightGray" src="" alt="" uk-img>
                                        </a>
                                    </div>
                                    <div class="uk-width-auto left_view">
                                        <a href="" class="bdrr-none uk-link-reset" uk-icon=" ratio: 2">
                                            <img class="thumb-nav-savedesign bdr-reg bdr-lightGray" src="" alt="" uk-img>
                                        </a>
                                    </div>
                                    <div class="uk-width-auto right_view">
                                        <a href="" class="bdrr-none uk-link-reset" uk-icon=" ratio: 2">
                                            <img class="thumb-nav-savedesign bdr-reg bdr-lightGray" src="" alt="" uk-img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="pdf-container">
                            
                        </div>
                        <h5 class="uk-margin-small fc-red">Before emailing to a dealer, please SAVE the design first to your <br>Player account or your Dealer's account.</h5>
                    </div>
                </div>

                <div class="uk-margin-bottom uk-width-1-2@s summary-content">
                    
                </div>
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
</div>
<!-- End Saving Option -->
