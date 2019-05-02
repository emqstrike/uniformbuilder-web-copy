/**
 * References:
 *     Fabrics:
 *         [4] Baseball Polyester
 *         [27] MTX Mesh
 *         [29] ETX
 *
 *     Parts category:
 *         Base Material
 *             - Front Body
 *             - Back Body
 *
 *         Sleeve Material
 *             - Left Sleeve
 *             - Right Sleeve
 *
 *         Side Insert Material
 *             - Left Side Insert
 *             - Right Side Insert
 *
 *         Back Insert Material
 *             - Bottom Panel
 *
 *         Sleeve Insert Material
 *             -
 *
 *         Gusset Material
 *             -
 *
 *     Layer Levels:
 *         [98 - 99] - solids
 *         [100 - 101] - all mesh
 *         [102 - 103] - mixed
 */
function FabricPanel(element) {
    this.panel = document.getElementById(element);

    this.fabrics = {};

    this.setFabrics();

    FabricPanel.events.init();
}

FabricPanel.prototype = {
    constructor: FabricPanel,

    /**
     * Temporary hard coded
     *
     * @source Model Material Options.xlsx
     */
    setFabrics: function() {
        if (ub.funcs.is_pts_signature()) {
            if (ub.funcs.is_twill()) {
                if (ub.funcs.is_upper()) {
                    this.setBaseSleeveFabrics();
                    this.setInsertFabrics();
                }
            }
        }
    },

    setBaseSleeveFabrics: function() {
        var default_fabric = FabricPanel.getDefaultFabric();

        if (default_fabric !== null) {
            if (default_fabric.fabric !== "undefined") {
                var fabric = default_fabric.fabric;

                // thumbnail placeholder
                var thumbnail = fabric.thumbnail || "http://34.212.160.37/img/fabric-texture.jpg";

                switch(parseInt(fabric.id)) {

                    case 4: // Baseball Polyester
                        this.fabrics.base_sleeve = [
                            {
                                name: fabric.material,
                                thumbnail: thumbnail,
                                layer_level: default_fabric.layer_level,
                                active: "uk-active"
                            },
                            {
                                name: "Matrix Mesh",
                                thumbnail: thumbnail,
                                layer_level: FabricPanel.FABRIC_ALL_MESH_IDS[0],
                                active: ""
                            }
                        ];
                        this.fabrics.base_sleeve_multiple = true;

                        break;

                    case 27: // MTX Mesh
                        break;

                    case 29: // ETX
                        break;
                }
            }
        }
    },

    setInsertFabrics: function() {
        var default_fabric = FabricPanel.getDefaultFabric(FabricPanel.LEFT_PERSPECTIVE);

        if (default_fabric !== null) {
            if (default_fabric.fabric !== "undefined") {
                var fabric = default_fabric.fabric;

                // thumbnail placeholder
                var thumbnail = fabric.thumbnail || "http://34.212.160.37/img/fabric-texture.jpg";

                switch(parseInt(fabric.id)) {

                    case 4: // Baseball Polyester
                        break;

                    case 27: // MTX Mesh
                        this.fabrics.insert = [
                            {
                                name: fabric.material,
                                thumbnail: thumbnail,
                                layer_level: default_fabric.layer_level
                            }
                        ];

                        this.fabrics.insert_multiple = false;
                        break;

                    case 29: // ETX
                        break;
                }
            }
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

FabricPanel.getDefaultFabric = function(perspective) {
    // default perspective
    perspective = perspective || FabricPanel.FRONT_PERSPECTIVE;

    var filtered_fabric = _.filter(ub.fabric.fabricCollections[perspective], function(f) {
        return f.fabric_id !== 0;
    });

    var fabric_id = _.uniq(_.pluck(filtered_fabric, "fabric_id"));

    if (!_.isEmpty(fabric_id)) {
        fabric_id = fabric_id.pop();

        return {
            fabric: _.find(ub.current_material.fabrics, {id: fabric_id.toFixed(0)}),
            layer_level: FabricPanel.getDefaultLayerLevel()
        };
    }

    return null;
};

FabricPanel.getDefaultLayerLevel = function(perspective) {
    // default perspective
    perspective = perspective || FabricPanel.FRONT_PERSPECTIVE;

    var filtered_fabric = _.filter(ub.fabric.fabricCollections[FabricPanel.FRONT_PERSPECTIVE], {default_asset: 1});

    if (!_.isEmpty(filtered_fabric)) {
        var fabric = filtered_fabric.pop();

        return fabric.layer_level;
    }

    return null;
};

FabricPanel.applyDefaultLayerLevel = function() {
    var default_layer_level = FabricPanel.getDefaultLayerLevel();

    if (default_layer_level !== null) {
        FabricPanel.changeFabricVisible(default_layer_level);
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

    // hl_sh - highlights and shadows
    var front_hl_sh = _.filter(ub.fabric.fabricCollections[FabricPanel.FRONT_PERSPECTIVE], function(fc) {
        return fc.name === "highlights" || fc.name === "shadows";
    });

    var left_hl_sh = _.filter(ub.fabric.fabricCollections[FabricPanel.LEFT_PERSPECTIVE], function(fc) {
        return fc.name === "highlights" || fc.name === "shadows";
    });

    var right_hl_sh = _.filter(ub.fabric.fabricCollections[FabricPanel.RIGHT_PERSPECTIVE], function(fc) {
        return fc.name === "highlights" || fc.name === "shadows";
    });

    var back_hl_sh = _.filter(ub.fabric.fabricCollections[FabricPanel.BACK_PERSPECTIVE], function(fc) {
        return fc.name === "highlights" || fc.name === "shadows";
    });

    _.each(front_hl_sh, function (fc) {
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

    _.each(left_hl_sh, function (fc) {
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

    _.each(right_hl_sh, function (fc) {
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

    _.each(back_hl_sh, function (fc) {
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