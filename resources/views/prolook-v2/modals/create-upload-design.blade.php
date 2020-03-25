<div id="create-upload-inksoft-modal" class="uk-modal-container bootbox modal" uk-modal="bg-close: false; esc-close: false;">
    <div class="uk-modal-dialog uk-modal-body uk-padding-small uk-margin-medium-top uk-padding-remove-bottom">
        <button class="uk-modal-close-default" type="button" uk-close></button>
    
        <h3 class="modal-title uk-padding-small fc-darkGray bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-remove">Prolook Inksoft</h3>
        <hr class="uk-margin-small" />

        <ul class="modal-menu-mascot-header uk-subnav uk-subnav-pill uk-flex-center active-bgc-dark uk-margin-small" uk-switcher>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize mascot-menu-button" data-type="create">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: list"></span>Create new mascots</span>
                </a>
            </li>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize mascot-menu-button" data-type="upload">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: cloud-upload"></span>Upload <span class="uk-visible@s">your own mascot file</span>
                </a>
            </li>
        </ul>

         <hr class="uk-margin-small" />

        <ul class="uk-switcher menu-mascot-content uk-margin-small">
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