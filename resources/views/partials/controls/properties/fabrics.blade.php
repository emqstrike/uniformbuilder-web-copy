<script type="x-tmpl-mustache" id="fabric-tmpl">
    <div id="m-fabric-selection" class="uk-padding-small">
        <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Fabric</h5>

        @{{ #fabrics }}
            {{-- base and sleeve fabric --}}
            @{{ #base_sleeve_multiple }}
                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Choose Base &amp; Sleeve Fabric</h6>

                <ul class="uk-list uk-margin-remove-vertical con-select con-palettes">
                    @{{ #base_sleeve }}
                        <li class="fabric-layer">
                            <a class="box-palette uk-link-reset btn-selection-choice pick-fabric @{{ active }}" data-layer-level="@{{ layer_level }}">
                                <div class="uk-grid-small uk-flex uk-text-left uk-margin-bottom" uk-grid>
                                    <div class="uk-width-1-4">
                                        <div class="uk-inline">
                                            <div class="bgc-white">
                                                <img src="@{{ thumbnail }}" uk-img>
                                            </div>
                                            <div class="uk-position-cover choice-icon bdr-lightGray">
                                                <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="uk-width-3-4">
                                        <p class="uk-margin-remove uk-text-bold uk-text-uppercase uk-margin-remove fc-dark">@{{ name }}</p>

                                        <ul class="uk-list uk-padding-remove">
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </li>
                    @{{ /base_sleeve }}
                </ul>
            @{{ /base_sleeve_multiple }}

            @{{ ^base_sleeve_multiple }}
                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Base &amp; Sleeve Fabric</h6>

                <ul class="uk-list uk-margin-remove-vertical con-select con-palettes">
                    @{{ #base_sleeve }}
                        <li class="fabric-layer">
                            <div class="box-palette uk-link-reset btn-selection-choice pick-fabric">
                                <div class="uk-grid-small uk-flex uk-text-left uk-margin-bottom" uk-grid>
                                    <div class="uk-width-1-4">
                                        <div class="uk-inline">
                                            <div class="bgc-white">
                                                <img src="@{{ thumbnail }}" uk-img>
                                            </div>
                                            <div class="uk-position-cover choice-icon bdr-lightGray">
                                                <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="uk-width-3-4">
                                        <p class="uk-margin-remove uk-text-bold uk-text-uppercase uk-margin-remove fc-dark">@{{ name }}</p>

                                        <ul class="uk-list uk-padding-remove">
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    @{{ /base_sleeve }}
                </ul>
            @{{ /base_sleeve_multiple }}

            {{-- insert fabric --}}
            @{{ #insert_multiple }}
                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Choose Insert Fabric</h6>

                <ul class="uk-list uk-margin-remove-vertical con-select con-palettes">
                    @{{ #insert }}
                        <li class="fabric-layer">
                            <a class="box-palette uk-link-reset btn-selection-choice pick-fabric @{{ active }}" data-layer-level="@{{ layer_level }}">
                                <div class="uk-grid-small uk-flex uk-text-left uk-margin-bottom" uk-grid>
                                    <div class="uk-width-1-4">
                                        <div class="uk-inline">
                                            <div class="bgc-white">
                                                <img src="@{{ thumbnail }}" uk-img>
                                            </div>
                                            <div class="uk-position-cover choice-icon bdr-lightGray">
                                                <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="uk-width-3-4">
                                        <p class="uk-margin-remove uk-text-bold uk-text-uppercase uk-margin-remove fc-dark">@{{ name }}</p>

                                        <ul class="uk-list uk-padding-remove">
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                        </ul>
                                    </div>
                                </div>
                            </a>
                        </li>
                    @{{ /insert }}
                </ul>
            @{{ /insert_multiple }}

            @{{ ^insert_multiple }}
                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">Insert Fabric</h6>

                <ul class="uk-list uk-margin-remove-vertical con-select con-palettes">
                    @{{ #insert }}
                        <li class="fabric-layer">
                            <div class="box-palette uk-link-reset btn-selection-choice pick-fabric">
                                <div class="uk-grid-small uk-flex uk-text-left uk-margin-bottom" uk-grid>
                                    <div class="uk-width-1-4">
                                        <div class="uk-inline">
                                            <div class="bgc-white">
                                                <img src="@{{ thumbnail }}" uk-img>
                                            </div>
                                            <div class="uk-position-cover choice-icon bdr-lightGray">
                                                <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="uk-width-3-4">
                                        <p class="uk-margin-remove uk-text-bold uk-text-uppercase uk-margin-remove fc-dark">@{{ name }}</p>

                                        <ul class="uk-list uk-padding-remove">
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                            <li class="uk-text-small">- Lorem ipsum dolor amet, asdasd consectetur.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    @{{ /insert }}
                </ul>
            @{{ /insert_multiple }}
        @{{ /fabrics }}
    </div>
</script>