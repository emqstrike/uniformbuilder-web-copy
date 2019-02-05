<div class="bootbox modal fade in" id="gradient-change-color-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md" role="document" style="top: 50% !important; margin-top: -250px !important;">
        <div class="modal-content cp-padding-large">
            <div class="modal-header cp-bgc-light cp-text-center cp-border-none">
                <div>
                    <a type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                </div>
                <div>
                    <h4 class="modal-title cp-fc-black cp-text-uppercase" id="myModalLabel">Gradient Color</h4>
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="gradient-preview">
                            <img src="http://i.pravatar.cc/300" width="100%" height="100%">
                        </div>
                    </div>
                    <div class="col-md-8 cp-padding-remove gradient-main-container">
                        <div class="tab-navigation">
                            <ul class="nav nav-tabs cp-border-none" role="tablist">
                                <li role="presentation" class="active cp-float-none">
                                    <div class="col-md-6 cp-padding-remove pattern-color-item cp-border cp-tab-button">
                                        <a href="#gradient-color-picker-1"
                                                aria-controls="gradient-color-picker-1"
                                                role="tab" data-toggle="tab"
                                                class="gradient-isActive cp-width-1-1 cp-tab-button col-md-6"
                                        >
                                            1
                                        </a>
                                    </div>
                                </li>

                                <li role="presentation" class="cp-float-none">
                                    <div class="col-md-6 cp-padding-remove pattern-color-item cp-border cp-tab-button">
                                        <a href="#gradient-color-picker-2"
                                                aria-controls="gradient-color-picker-2"
                                                role="tab" data-toggle="tab"
                                                class="gradient-isActive cp-width-1-1 cp-tab-button col-md-6"
                                        >
                                            2
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="col-md-12 pattern-colorpicker-container cp-padding-remove">
                            <div id="gradient-color-content">
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="gradient-color-picker-1" data-gradient-category="1">
                                        <div class="gradient-color-picker-1-container">
                                            
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="gradient-color-picker-2" data-gradient-category="2">
                                        <div class="gradient-color-picker-2-container">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/mustache" id="m-gradient-color">
    <div class="gradient-color-main-container">
        @{{ #colors }}
            <div class="color_element cp-color-element-auto gradient-color-container-button">
                <button
                    class="grow change-color whitebtn cp-gradient-color-box gradient-color-selector-button"
                    style="background-color: #@{{ hex_code }};"
                    data-color-id="@{{ id }}"
                    data-color-name="@{{ name }}"
                    data-color-code="@{{ color_code }}"
                    data-color-id="@{{ id }}"
                    data-layer-name="@{{ layer }}"
                    data-modifier="@{{ modifier }}"
                >
                </button>
            </div>
        @{{ /colors }}
    </div>
</script>