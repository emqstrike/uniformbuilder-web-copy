<script type="x-tmpl-mustache" id="fabric-tmpl">
    <div id="m-fabric-selection" class="uk-padding-small">
        @{{ #fabrics_data }}
            <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Fabric</h5>

            @{{ #types }}
                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Choose @{{ fabric_type }} Fabric</h6>

                <ul class="uk-list uk-margin-remove-vertical con-select con-palettes" data-fabric-type="@{{ fabric_type }}">
                    @{{ #layers }}
                        <li class="fabric-layer" data-layer-level="@{{ layer_level }}" data-fabric-id="@{{ fabric_id }}">
                            <a class="box-palette uk-link-reset btn-selection-choice pick-fabric @{{ class_active }}">
                                <div class="uk-grid-small uk-flex uk-text-left" uk-grid>
                                    <div class="uk-width-1-4">
                                        <div class="uk-inline">
                                            <div class="bgc-white padding-tiny-vertical">
                                                <img src="@{{ thumbnail }}" uk-img>
                                            </div>
                                            <div class="uk-position-cover choice-icon bdr-lightGray">
                                                <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="uk-width-3-4">
                                        <div class="">
                                            <p class="uk-text-bold uk-text-uppercase uk-margin-remove fc-dark">@{{ layer_title }} (@{{ layer_level_category }})</p>
                                            <ul class="uk-list uk-padding-remove">
                                                @{{ #description_list }}
                                                    <li class="uk-text-small">
                                                        <p>-&nbsp;@{{ description }}</p>
                                                    </li>
                                                @{{ /description_list }}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    @{{ /layers }}
                </ul>
            @{{ /types }}
        @{{ /fabrics_data }}

        @{{ ^fabrics_data }}
            <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Notice</h5>
            <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Fabric is not available for this uniform.</h6>
        @{{ /fabrics_data }}
    </div>
</script>