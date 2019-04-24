<script type="x-tmpl-mustache" id="fabric-tmpl">
    <div id="m-fabric-selection" class="uk-padding-small">
        <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Fabric</h5>
        <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Choose Fabric</h6>

        <ul class="uk-list uk-margin-remove-vertical con-select con-palettes">
            <li class="fabric-layer">
                @{{ #fabrics }}
                <a class="box-palette uk-link-reset btn-selection-choice pick-fabric @{{ active_asset }}" data-layer-level="@{{ layer_level }}">
                    <div class="uk-grid-small uk-flex uk-text-left uk-margin-bottom" uk-grid>
                        <div class="uk-width-1-4">
                            <div class="uk-inline">
                                <div class="bgc-white">
                                    <img src="http://34.212.160.37/img/fabric-texture.jpg" uk-img>
                                </div>
                                <div class="uk-position-cover choice-icon bdr-lightGray">
                                    <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary"></span>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-3-4">
                            @{{ #base_fabric }}
                                <p class="uk-margin-remove">
                                    <strong class="uk-text-bold uk-text-uppercase fc-dark">Base: </strong>
                                    @{{ material }} (@{{ material_abbreviation }})
                                </p>
                            @{{ /base_fabric }}

                            @{{ #sleeve_fabric }}
                                <p class="uk-margin-remove">
                                    <strong class="uk-text-bold uk-text-uppercase fc-dark">Sleeve: </strong>
                                    @{{ material }} (@{{ material_abbreviation }})
                                </p>
                            @{{ /sleeve_fabric }}

                            @{{ #insert_fabric }}
                                <p class="uk-margin-remove">
                                    <strong class="uk-text-bold uk-text-uppercase fc-dark">Insert: </strong>
                                    @{{ material }} (@{{ material_abbreviation }})
                                </p>
                            @{{ /insert_fabric }}
                        </div>
                    </div>
                </a>
                @{{ /fabrics }}
            </li>
        </ul>
    </div>
</script>