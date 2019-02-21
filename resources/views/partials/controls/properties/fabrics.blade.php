<script type="x-tmpl-mustache" id="fabric-tmpl">
    @{{ #fabrics }}
        <div class="fabric-container">
            <h4 class="cp-text-bold abrade-ultra-italic cp-margin-remove uk-text-uppercase">FABRIC</h4>
            <h5 class="cp-text-bold abrade-book uk-margin-small uk-margin-remove-top uk-text-uppercase">CHOOSE BASE FABRIC</h5>

            <div class="fabric-layers">
                @{{ #fabric_layers }}
                    <div class="fabric-layer" data-layer-level="@{{ layer_level }}">
                        <div class="image-wrapper">
                            <img src="@{{ thumbnail }}" class="img-responsive @{{ class_active }}" alt="" />
                        </div>
                        <div class="fabric-description">
                            <h4 class="fabric-layer-title">@{{ layer_title }} (@{{ layer_level_category }})</h4>

                            <ul class="description-list">
                                @{{ #description_list }}
                                    <li>
                                        <p>@{{ description }}</p>
                                    </li>
                                @{{ /description_list }}
                            </ul>
                        </div>
                    </div>
                @{{ /fabric_layers }}
            </div>
        </div>
    @{{ /fabrics }}

    @{{ ^fabrics }}
        <div class="uk-padding-small">
            <h4 class="cp-text-bold abrade-ultra-italic cp-margin-remove uk-text-uppercase">No Fabric Available</h4>
        </div>
    @{{ /fabrics }}
</script>