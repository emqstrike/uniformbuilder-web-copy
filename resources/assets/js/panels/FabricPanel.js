function FabricPanel(element) {
    this.panel = document.getElementById(element);
    this.items = {};

    FabricPanel.events.init();
}

FabricPanel.prototype = {
    constructor: FabricPanel,

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    },

    setItems: function() {
        var default_fabric = FabricPanel.getDefaultFabric();

        this.items.fabric_layers = _.map(FabricPanel.getFabrics(FabricPanel.getMaterialOptionsOfFabrics()), function(layer) {
            var dummy_thumbnail = ["fabric-texture", "fabric-texture-2", "fabric-texture-3"];
            var pick_thumbnail = dummy_thumbnail[Math.floor(Math.random() * 3)];

            return {
                layer_id: layer.id,
                layer_title: layer.material,
                layer_abbr: layer.material_abbreviation,
                thumbnail: "http://34.212.160.37/img/" + pick_thumbnail + ".jpg",
                class_active: layer.id == default_fabric.id ? "active" : "",
                description_list: [
                    {description: layer.material},
                    {description: layer.material_abbreviation},
                    {description: "lorem ipsum dolor"},
                ]
            };
        });
    },

    getFabric: function() {
        var active_fabrics = FabricPanel.getMaterialOptionsOfFabrics(1);

        var fabric_ids = _.uniq(_.pluck(active_fabrics, "layer_level"));

        switch(fabric_ids) {
            case FabricPanel.FABRIC_SOLID_IDS:
                // logic for solid fabric
                break;

            case FabricPanel.FABRIC_ALL_MESH_IDS:
                // logic for all mesh fabric
                break;

            case FabricPanel.FABRIC_MIXED_IDS:
                // logic for mixed fabric
                break;
        }
    }
};

FabricPanel.FABRIC_SOLID = "solid";
FabricPanel.FABRIC_ALL_MESH = "all-mesh";
FabricPanel.FABRIC_MIXED = "mixed";

FabricPanel.FABRIC_SOLID_IDS = [98, 99];
FabricPanel.FABRIC_ALL_MESH_IDS = [100, 101];
FabricPanel.FABRIC_MIXED_IDS = [102, 103];

FabricPanel.events = {
    is_events_init: false,

    init: function() {
        if (!FabricPanel.events.is_events_init) {
            $('#primary_options_container').on('click', '.fabric-layer .image-wrapper img', FabricPanel.events.onFabricLayerChange);

            FabricPanel.events.is_events_init = true;
        }
    },

    onFabricLayerChange: function() {
        var layer = $(this).closest('.fabric-layer').data('layer');

        switch(layer) {
            case FabricPanel.FABRIC_SOLID:
                FabricPanel.changeFabricVisible(FabricPanel.FABRIC_SOLID_IDS);
                break;

            case FabricPanel.FABRIC_ALL_MESH:
                FabricPanel.changeFabricVisible(FabricPanel.FABRIC_ALL_MESH_IDS);
                break;

            case FabricPanel.FABRIC_MIXED:
                FabricPanel.changeFabricVisible(FabricPanel.FABRIC_MIXED_IDS);
                break;
        }

        $('#primary_options_container .fabric-layer .image-wrapper img').removeClass('active');
        $(this).addClass('active');
    }
};

FabricPanel.changeFabricVisible = function(fabric_ids) {
    _.each(ub.fabric.fabricCollections, function (fc) {
        fc.obj.visible = _.contains(fabric_ids, fc.id);
    });
};

FabricPanel.getMaterialOptionsOfFabrics = function(default_asset) {
    default_asset = typeof(default_asset) !== "undefined" ? default_asset : null;

    var fabrics = _.filter(ub.current_material.materials_options, function (mo) {
        var is_fabric = mo.name === "Highlights" || mo.name === "Shadows";

        if (default_asset !== null) {
            var is_default_asset = mo.default_asset === default_asset;

            return is_fabric && is_default_asset;
        }

        return is_fabric;
    });

    return fabrics;
};

/**
 * @param  array mo_fabrics  material options of fabrics
 * @return array
 */
FabricPanel.getFabrics = function(mo_fabrics) {
    // filter no zero fabric id
    mo_fabrics = _.filter(mo_fabrics, function(fabric) {
        return fabric.fabric_id !== 0;
    });

    var uniq_fabric_ids = _.uniq(_.pluck(mo_fabrics, 'fabric_id'));

    var fabrics = _.filter(ub.current_material.fabrics, function(fabric) {
        return _.contains(uniq_fabric_ids, parseInt(fabric.id));
    });

    return fabrics;
};

FabricPanel.getDefaultFabric = function() {
    var mo_fabrics = FabricPanel.getMaterialOptionsOfFabrics(1);
    var fabrics = FabricPanel.getFabrics(mo_fabrics);

    return !_.isEmpty(fabrics) ? fabrics[0] : null;
};