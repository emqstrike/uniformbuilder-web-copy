<script type="text/mustache" id="m-inserts">
<div class="cp-padding-medium cp-padding-remove-vertical" id="primary_options_colors">
    <ul style="list-style:none; padding: 0 !important" id="parts-with-insert-container">
        @{{ #inserts }}
            <li class="panel-index-@{{ index }}">
                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-padding-medium cp-padding-remove-vertical">
                        <div class="cp-text-uppercase cp-fc-white">
                            <h4 class="header cp-text-bold">@{{ name }}</h4>
                            <p style="font-weight: bold;">Choose Color / Pattern</p>
                        </div>
                    </div>
                </div>
                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-margin-bottom-medium cp-padding-remove">
                        <p class="cp-padding-left-medium cp-fc-white">COLOR</p>
                        <div class="color-main-container-@{{ fullname }}" data-modifier-name="@{{ name }}">
                            @{{ #colors }}
                                <div class="color_element sublimated color-container-button">
                                    <button
                                        class="grow change-color whitebtn cp-new-color-box color-selector-button"
                                        style="background-color: #@{{ hex_code }};"
                                        data-color-id="@{{ id }}"
                                        data-color-name="@{{ name }}"
                                        data-color-label="@{{ color_code }}"
                                        data-color-id="@{{ id }}"
                                        data-modifier-category="@{{ fullname }}"
                                    >
                                    </button>
                                    <span class="label">@{{ name }}</span>
                                </div>
                            @{{ /colors }}
                        </div>
                    </div>
                </div>
                @{{#hasPattern}}
                    <div class="row modifier-wrapper">
                        <div class="col-md-12 cp-padding-remove">
                            <p class="cp-padding-left-medium cp-fc-white">PATTERN</p>
                            <div class="pattern-main-container-@{{ fullname }}">
                                @{{ #patterns }}
                                    <div class="color_element sublimated">
                                        <div class="pattern-container-button" data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                                            <button
                                                class="grow change-color whitebtn cp-new-color-box pattern-selector-button"
                                                style="background-image: url('@{{ icon }}');"
                                                data-pattern-id="@{{ id }}"
                                                data-pattern-name="@{{ name }}"
                                                data-modifier-category="@{{ fullname }}"
                                                data-modifier-index="@{{ index }}"
                                            >
                                            </button>
                                        </div>
                                    </div>
                                @{{ /patterns }}
                            </div>
                        </div>
                    </div>
                    <div class="row modifier-wrapper" data-modifier-name="@{{ name }}">
                        <div class="col-md-12 cp-margin-top-small cp-padding-small cp-margin-remove">
                            <div class="edit-pattern-modal-container-@{{ fullname }} pattern-modal-selector-container cp-margin-remove">
                            </div>
                        </div>
                    </div>
                @{{/hasPattern}}
                <div class="row modifier-wrapper">
                    <div class="col-md-12 cp-margin-top-small cp-padding-medium cp-padding-remove-vertical cp-margin-remove">
                        <hr>
                    </div>
                </div>
            </li>
        @{{ /inserts }}
    </ul>
</div>
</script>