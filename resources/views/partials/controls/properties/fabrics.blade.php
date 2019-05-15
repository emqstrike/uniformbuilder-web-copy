<script type="x-tmpl-mustache" id="fabric-tmpl">
    <div id="m-fabric-selection" class="uk-padding-small">
        <h5 uk-margin class="uk-margin-remove-vertical uk-text-uppercase uk-text-bold fc-darker abrade-ultra-italic">Fabric</h5>

        @{{ #fabrics }}
            {{-- base and sleeve fabric --}}
            @{{ #base_sleeve }}
                <h6 uk-margin class="uk-margin-remove-top uk-margin-small-bottom uk-text-bold uk-text-uppercase fc-dark">
                    @{{ #multiple }}Choose @{{ /multiple }}Base &amp; Sleeve Fabric
                </h6>

                <div class="uk-child-width-1-3 uk-margin-remove-left uk-text-center con-palettes" uk-grid>
                    @{{ #data }}
                        @{{ #multiple }}<a@{{ /multiple }}
                        @{{ ^multiple }}<div@{{ /multiple }}

                            class="box-palette uk-link-reset btn-selection-choice pick-fabric uk-margin-medium-right @{{ active }}" data-layer-level="@{{ layer_level }}" style="width: 102px;">
                                <div style="position: relative">
                                    <img src="@{{ thumbnail }}" class="uk-margin-small-bottom" uk-img />

                                    <div class="uk-position-cover choice-icon bdr-lightGray">
                                        <span uk-icon="icon: check; ratio: 1.5" class="uk-text-bold uk-position-center uk-overlay-primary"></span>
                                    </div>
                                </div>

                                <p class="uk-margin-remove uk-text-bold uk-text-uppercase">@{{ name }}</p>

                        @{{ #multiple }}</a>@{{ /multiple }}
                        @{{ ^multiple }}</div>@{{ /multiple }}
                    @{{ /data }}
                </div>
            @{{ /base_sleeve }}

            @{{ #insert }}
                <p>@{{ insert }}</p>
            @{{ /insert }}

            @{{ #gusset }}
                <p>@{{ gusset }}</p>
            @{{ /gusset }}
        @{{ /fabrics }}
    </div>
</script>