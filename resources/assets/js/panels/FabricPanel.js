function FabricPanel(element) {
    this.panel = document.getElementById(element);
    this.fabrics = {};
    this.fabric_types = ["base", "insert"];

    FabricPanel.events.init();
}

FabricPanel.prototype = {
    constructor: FabricPanel,

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.fabrics);
        return panel;
    },

    setItems: function() {
        var fabric_types = this.fabric_types;

        this.fabrics.fabrics_data = [];

        var fabric_type;
        for (var i in fabric_types) {
            fabric_type = fabric_types[i];

            // mos = material options
            var fabric_mos = FabricPanel.getUniqueFabrics(fabric_type);

            console.log("fabric_mos: ", fabric_mos);

            if (!_.isEmpty(fabric_mos)) {
                var fabric_layer = FabricPanel.buildFabricLayer(fabric_type, fabric_mos);
                console.log("fabric_layer: ", fabric_layer);

                this.fabrics.fabrics_data.push({
                    types: {
                        fabric_type: fabric_type,
                        layers: fabric_layer
                    }
                });
            }
        }
    }
};

FabricPanel.FABRIC_SOLID_IDS = [98, 99];
FabricPanel.FABRIC_ALL_MESH_IDS = [100, 101];
FabricPanel.FABRIC_MIXED_IDS = [102, 103];

FabricPanel.FABRIC_BASE_TYPE = "base";
FabricPanel.FABRIC_INSERT_TYPE = "insert";

FabricPanel.events = {
    is_events_init: false,

    init: function() {
        if (!FabricPanel.events.is_events_init) {
            $('#primary_options_container').on('click', '#m-fabric-selection a', FabricPanel.events.onFabricLayerChange);

            FabricPanel.events.is_events_init = true;
        }
    },

    onFabricLayerChange: function() {
        var layer_level = $(this).closest('.fabric-layer').data('layer-level');
        var fabric_id = $(this).closest('.fabric-layer').data('fabric-id');
        var fabric_type = $(this).closest('.fabric-layer').parent().data('fabric-type');

        ub.current_material.settings.fabrics = fabric_id;

        FabricPanel.changeFabricVisible(layer_level);
        $('#m-fabric-selection ul[data-fabric-type="'+fabric_type+'"] li a.uk-active').removeClass('uk-active');
        $(this).addClass('uk-active');
    }
};

FabricPanel.getFabricMaterialOptions = function(fabric_type, default_asset, enabled_fabric_info) {
    var fabric_types = [FabricPanel.FABRIC_BASE_TYPE, FabricPanel.FABRIC_INSERT_TYPE];
    if (!_.contains(fabric_types, fabric_type)) return null;

    default_asset = typeof(default_asset) !== "undefined" ? default_asset : null;
    enabled_fabric_info = typeof(enabled_fabric_info) !== "undefined" ? enabled_fabric_info : false;

    var fabric_material_options = _.filter(ub.current_material.materials_options, function (mo) {
        console.log("mo: ", mo);
        console.log('mo.name.includes("Insert"): ', mo.name.includes("Insert"));

        switch(fabric_type) {
            case FabricPanel.FABRIC_BASE_TYPE:
                is_fabric = mo.name === "Highlights" || mo.name === "Shadows";
                break;

            case FabricPanel.FABRIC_INSERT_TYPE:
                is_fabric = mo.name.includes("Insert");
                break;
        }

        if (default_asset !== null) {
            var is_default_asset = mo.default_asset == default_asset;

            return is_fabric && is_default_asset;
        }

        return is_fabric;
    });

    if (enabled_fabric_info) {
        // fmo - fabric material option
        var fmo_with_fabric_info = _.map(fabric_material_options, function(fmo) {
            var fabric_info = fmo.fabric_id !== 0 ? FabricPanel.getFabricById(fmo.fabric_id) : null;
            return _.extend({fabric_info: fabric_info}, fmo);
        });

        return fmo_with_fabric_info;
    }

    return fabric_material_options;
};

FabricPanel.changeFabricVisible = function(fabric_type, layer_level) {
    _.each(ub.fabric.fabricCollections, function (fc) {
        if (fc.type === fabric_type) {
            fc.obj.visible = _.contains(layer_levels, fc.id);
        }
    });
};

FabricPanel.getLayerLevelByFabricId = function(fabric_type, fabric_id) {
    // fmos - fabric material options
    var fmos = FabricPanel.getFabricMaterialOptions(fabric_type);

    var filter_fmos = _.filter(fmos, function(b) {
        return b.fabric_id == fabric_id;
    });

    return _.uniq(_.pluck(filter_fmos, "layer_level"));
};

FabricPanel.getUniqueFabrics = function(fabric_type) {
    // fmos - fabric material options
    var fmos = FabricPanel.getFabricMaterialOptions(fabric_type, null, true);

    var fmos_no_zero = _.filter(fmos, function(fmo) {
        return fmo.fabric_id !== 0;
    });

    return _.uniq(fmos_no_zero, 'fabric_id');
};

FabricPanel.getDefaultFabric = function(fabric_type) {
    // fmos - fabric material options
    var fmos = FabricPanel.getFabricMaterialOptions(fabric_type, true, true);

    var default_fabrics = _.filter(fmos, function(fmo) {
        return fmo.fabric_id !== 0;
    });

    return default_fabrics.shift();
};

FabricPanel.buildFabricLayer = function(fabric_type, fabric_mos) {
    return _.map(fabric_mos, function(fabric_mo) {
        var dummy_thumbnail = ["fabric-texture", "fabric-texture-2", "fabric-texture-3"];
        var pick_thumbnail = "http://34.212.160.37/img/" + dummy_thumbnail[Math.floor(Math.random() * 3)] + ".jpg";

        var fabric_info = fabric_mo.fabric_info;
        var active;

        var default_fabric_mo = FabricPanel.getDefaultFabric(fabric_type);

        if (typeof default_fabric_mo !== "undefined") {
            if (typeof ub.current_material.settings.fabrics !== "undefined") {
                active = fabric_info.id == ub.current_material.settings.fabrics ? "uk-active" : "";
            } else {
                active = fabric_info.id == default_fabric_mo.fabric_id ? "uk-active" : "";
            }
        } else {
            ub.utilities.info("No default fabric");
        }

        return {
            fabric_type: fabric_type,
            layer_title: fabric_info.material,
            layer_level_category: FabricPanel.getLayerLevelText(fabric_mo.layer_level),
            layer_level: JSON.stringify(FabricPanel.getLayerLevelByFabricId(fabric_type, fabric_info.id)),
            fabric_id: fabric_mo.fabric_id,

            thumbnail: fabric_info.thumbnail !== null ? fabric_info.thumbnail : pick_thumbnail,
            class_active: active,

            description_list: [
                {description: fabric_info.material},
                {description: fabric_info.material_abbreviation},
                {description: "lorem ipsum dolor"},
            ]
        };
    });
};

FabricPanel.getFabricById = function(fabric_id) {
    return _.find(ub.current_material.fabrics, function(fabric) {
        return fabric.id == fabric_id;
    });
};

FabricPanel.getLayerLevelText = function(layer_level) {
    switch(true) {
        case _.contains(FabricPanel.FABRIC_SOLID_IDS, layer_level):
            return "Solid";

        case _.contains(FabricPanel.FABRIC_ALL_MESH_IDS, layer_level):
            return "All Mesh";

        case _.contains(FabricPanel.FABRIC_MIXED_IDS, layer_level):
            return "Mixed";

        default:
            return null;
    }
};