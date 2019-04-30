function FabricPanel(element) {
    this.panel = document.getElementById(element);

    this.fabrics = {};
    this.default_fabric = {};

    this.setFabrics();
    this.setDefaultFabric();

    FabricPanel.events.init();
}

FabricPanel.prototype = {
    constructor: FabricPanel,

    setFabrics: function() {
        // base on front perspective
        this.fabrics = _.filter(ub.fabric.fabricCollections[FabricPanel.FRONT_PERSPECTIVE], function(f) {
            return f.base_fabric !== undefined || f.insert_fabric !== undefined || f.sleeve_fabric !== undefined;
        });
    },

    setDefaultFabric: function() {
        if (this.fabrics.length > 0) {
            var default_fabric = _.find(this.fabrics, {default_asset: 1});

            this.default_fabric = default_fabric !== undefined ? default_fabric : this.fabrics[0];
        } else {
            this.default_fabric = ub.fabric.fabricCollections[FabricPanel.FRONT_PERSPECTIVE][0];

            console.error("Error: No default asset in highlight and shadows.");
        }
    },

    getPanel: function() {
        var panel = Mustache.render(this.panel.innerHTML, {fabrics: this.fabrics});
        return panel;
    },
};

FabricPanel.FABRIC_SOLID_IDS = [98, 99];
FabricPanel.FABRIC_ALL_MESH_IDS = [100, 101];
FabricPanel.FABRIC_MIXED_IDS = [102, 103];

FabricPanel.FRONT_PERSPECTIVE = "front";
FabricPanel.LEFT_PERSPECTIVE = "left";
FabricPanel.RIGHT_PERSPECTIVE = "right";
FabricPanel.BACK_PERSPECTIVE = "back";

FabricPanel.events = {
    is_events_init: false,

    init: function() {
        if (!FabricPanel.events.is_events_init) {
            $('#primary_options_container').on('click', '#m-fabric-selection a', FabricPanel.events.onFabricLayerChange);

            FabricPanel.events.is_events_init = true;
        }
    },

    onFabricLayerChange: function() {
        var layer_level = $(this).data('layer-level');

        FabricPanel.changeFabricVisible(layer_level);
        $('#m-fabric-selection ul li a.uk-active').removeClass('uk-active');
        $(this).addClass('uk-active');
    }
};

FabricPanel.changeFabricVisible = function(layer_level) {
    var layer_levels = [];
    switch (true) {
        case _.contains(FabricPanel.FABRIC_SOLID_IDS, layer_level):
            layer_levels = FabricPanel.FABRIC_SOLID_IDS;
            break;

        case _.contains(FabricPanel.FABRIC_ALL_MESH_IDS, layer_level):
            layer_levels = FabricPanel.FABRIC_ALL_MESH_IDS;
            break;

        case _.contains(FabricPanel.FABRIC_MIXED_IDS, layer_level):
            layer_levels = FabricPanel.FABRIC_MIXED_IDS;
            break;
    }

    _.each(ub.fabric.fabricCollections[FabricPanel.FRONT_PERSPECTIVE], function (fc) {
        if (_.contains(layer_levels, fc.layer_level)) {
            fc.sprite.visible = true;
            fc.active_asset = "uk-active";
            fc.default_asset = true;
        } else {
            fc.sprite.visible = false;
            fc.active_asset = "";
            fc.default_asset = false;
        }
    });

    _.each(ub.fabric.fabricCollections[FabricPanel.LEFT_PERSPECTIVE], function (fc) {
        if (_.contains(layer_levels, fc.layer_level)) {
            fc.sprite.visible = true;
            fc.active_asset = "uk-active";
            fc.default_asset = true;
        } else {
            fc.sprite.visible = false;
            fc.active_asset = "";
            fc.default_asset = false;
        }
    });

    _.each(ub.fabric.fabricCollections[FabricPanel.RIGHT_PERSPECTIVE], function (fc) {
        if (_.contains(layer_levels, fc.layer_level)) {
            fc.sprite.visible = true;
            fc.active_asset = "uk-active";
            fc.default_asset = true;
        } else {
            fc.sprite.visible = false;
            fc.active_asset = "";
            fc.default_asset = false;
        }
    });

    _.each(ub.fabric.fabricCollections[FabricPanel.BACK_PERSPECTIVE], function (fc) {
        if (_.contains(layer_levels, fc.layer_level)) {
            fc.sprite.visible = true;
            fc.active_asset = "uk-active";
            fc.default_asset = true;
        } else {
            fc.sprite.visible = false;
            fc.active_asset = "";
            fc.default_asset = false;
        }
    });
};

FabricPanel.activateDefaultAsset = function(layer_level) {
    var fabric_el = $('#primary_options_container #m-fabric-selection a[data-layer-level="'+layer_level+'"]');

    if (fabric_el.length > 0) {
        fabric_el.click();
    } else {
        FabricPanel.changeFabricVisible(layer_level);
    }
};