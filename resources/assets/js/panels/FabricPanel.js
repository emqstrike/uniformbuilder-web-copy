function FabricPanel(element) {
    this.panel = document.getElementById(element);
    this.items = {
        fabric_layers: [
            {
                layer: "solid",
                layer_title: "Solid",
                layer_code: "100 - 101",
                description_list: [
                    {description: "hello"},
                    {description: "world"}
                ]
            }
        ]
    };

    FabricPanel.events.init();
}

FabricPanel.prototype = {
    constructor: FabricPanel,

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, this.items);
        return panel;
    },

    setItems: function() {
        this.items = {};

        var highlightsAndShadows = FabricPanel.getHighlightAndShadows();
        var fabric_ids = _.uniq(_.pluck(highlightsAndShadows, "layer_level"));
    },

    getFabric: function() {
        var active_fabrics = FabricPanel.getHighlightAndShadows(1);

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

FabricPanel.setInitialState = function() {
    var default_fabric = ub.fabric.defaultFabric();

    $('#primary_options_container .fabric-layer .image-wrapper img').removeClass('active');

    switch(default_fabric) {
        case "one":
            $('#primary_options_container .fabric-layer[data-layer="'+FabricPanel.FABRIC_SOLID+'"] .image-wrapper img').addClass('active');
            break;

        case "two":
            $('#primary_options_container .fabric-layer[data-layer="'+FabricPanel.FABRIC_ALL_MESH+'"] .image-wrapper img').addClass('active');
            break;

        case "three":
            $('#primary_options_container .fabric-layer[data-layer="'+FabricPanel.FABRIC_MIXED+'"] .image-wrapper img').addClass('active');
            break;
    }
};

FabricPanel.changeFabricVisible = function(fabric_ids) {
    _.each(ub.fabric.fabricCollections, function (fc) {
        fc.obj.visible = _.contains(fabric_ids, fc.id);
    });
};

FabricPanel.getHighlightAndShadows = function(default_asset) {
    var highlightsAndShadows = _.filter(ub.current_material.materials_options, function (mo) {
        var condition = mo.name === "Highlights" || mo.name === "Shadows";

        return typeof default_asset === "undefined" ?
                condition :
                condition && mo.default_asset === default_asset;
    });

    return highlightsAndShadows;
};