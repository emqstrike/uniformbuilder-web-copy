<div id="select-mascot-inksoft-modal" class="uk-modal-container bootbox modal" uk-modal="bg-close: false; esc-close: false;">
    <div class="uk-modal-dialog uk-modal-body uk-padding-small uk-margin-medium-top uk-padding-remove-bottom">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <h3 class="modal-title uk-padding-small fc-darkGray bgc-light uk-text-bold uk-text-center uk-text-uppercase uk-margin-remove">Prolook Mascot</h3>
        <ul class="modal-menu-mascot-header uk-subnav uk-subnav-pill uk-flex-center active-bgc-dark uk-margin-small uk-margin-bottom" uk-switcher>
            <li>
                <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize mascot-menu-button" data-type="mascots">
                    <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: list"></span>Select <span class="uk-visible@s"> mascots</span>
                </a>
            </li>
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
        
        <hr class="uk-margin-small">

        <ul class="uk-switcher uk-margin menu-mascot-content uk-margin-small">
            <li class="inksoft-existing-design">
                <ul class="existing-mascot-category uk-subnav uk-subnav-pill active-bgc-dark" uk-switcher>
                    <li>
                        <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize mascot-type" data-type="my-designs">
                            <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: list"></span> My Design
                        </a>
                    </li>
                    <li>
                        <a href="#" class="uk-button uk-button-small uk-button-default uk-text-capitalize mascot-type" data-type="inksoft">
                            <span class="uk-margin-small-right uk-hidden@s" uk-icon="icon: list"></span> Design Ideas
                        </a>
                    </li>
                </ul>

                <ul class="uk-switcher uk-padding-small uk-padding-remove-horizontal">
                    <li>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-expand">
                                <div class="bdr-thin bdr-light">
                                    <div class="uk-grid-small" uk-grid>
                                        <!-- Mascot Category List -->
                                        <div class="uk-width-1-4">
                                            <div class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-top uk-height-large uk-overflow-auto">
                                                <ul class="uk-nav-default uk-nav-parent-icon my-design-category" uk-nav>
                                                    <li class="uk-active">
                                                        <a href="javascript:void(0)" class="filter-my-design" data-type="active">Active</a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:void(0)" class="filter-my-design" data-type="archive">Archive</a>
                                                    </li>
                                                </ul>   
                                            </div>
                                        </div>
                                        <!-- List of Mascot -->
                                        <div class="uk-width-expand">
                                            <div class="uk-padding-small uk-height-large uk-overflow-auto">
                                                <div class="uk-grid-small uk-child-width-1-4 uk-child-width-1-5@xl uk-text-center my-designs-container" uk-height-match="target: > div > a > div" uk-grid>
                                                </div>

                                                <div class="stock-mascot-loading-screen-content uk-hidden">
                                                    <div class="uk-width-1-1 uk-margin-xlarge-top">
                                                        <div class="uk-flex uk-flex-middle uk-flex-center">
                                                            <div uk-spinner="ratio: 5"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Mascot Preview -->
                            <div class="uk-width-1-5">
                                <div class="uk-padding-small uk-padding-remove-horizontal my-mascot-preview">
                                    
                                </div>
                            </div>
                        </div>

                        <div>
                            
                        </div>
                    </li>
                    <li>
                        <div class="uk-grid-small" uk-grid>
                            <div class="uk-width-expand">
                                <div class="bdr-thin bdr-light">
                                    <div class="uk-grid-small" uk-grid>
                                        <!-- Mascot Category List -->
                                        <div class="uk-width-medium">
                                            <div class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-top uk-height-large uk-overflow-auto">
                                                <ul class="uk-nav-default uk-nav-parent-icon mascot-categories" uk-nav>
                                                    
                                                </ul>   
                                            </div>
                                        </div>
                                        <!-- List of Mascot -->
                                        <div class="uk-width-expand">
                                            <div class="uk-padding-small uk-height-large uk-overflow-auto">
                                                <div class="uk-grid-small uk-child-width-1-4 uk-child-width-1-5@xl uk-text-center stock-mascot-container" uk-height-match="target: > div > a > div" uk-grid>
                                                </div>

                                                <div class="stock-mascot-loading-screen-content uk-hidden">
                                                    <div class="uk-width-1-1 uk-margin-xlarge-top">
                                                        <div class="uk-flex uk-flex-middle uk-flex-center">
                                                            <div uk-spinner="ratio: 5"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- Mascot Preview -->
                            <div class="uk-width-1-5">
                                <div class="uk-padding-small uk-padding-remove-horizontal stock-mascot-preview">
                                    
                                </div>
                            </div>
                        </div>

                        <div>
                            
                        </div>
                    </li>
                </ul>
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