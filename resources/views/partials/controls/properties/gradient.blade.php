<div class="bootbox modal fade in" id="gradient-change-color-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <a type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                </div>
                <div>
                    <h4 class="modal-title cp-fc-black" id="myModalLabel">Gradient Color</h4>
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <div id="gradient-color-content">
                            <div class="col-md-12 cp-margin-bottom-medium cp-padding-remove gradient-color-picker-1-container">
                            </div>
                            <div class="col-md-12 cp-margin-bottom-medium cp-padding-remove gradient-color-picker-2-container">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/mustache" id="m-gradient-color">
    <p class="cp-padding-left-medium cp-text-medium">@{{ layer }}</p>
    <div class="gradient-color-main-container">
        @{{ #colors }}
            <div class="color_element gradient-color-container-button">
                <button
                    class="grow change-color whitebtn cp-gradient-color-box gradient-color-selector-button"
                    style="background-color: #@{{ hex_code }};"
                    data-color-id="@{{ id }}"
                    data-color-name="@{{ name }}"
                    data-color-code="@{{ color_code }}"
                    data-color-id="@{{ id }}"
                    data-layer-name="@{{ layer }}"
                >
                </button>
            </div>
        @{{ /colors }}
    </div>
</script>