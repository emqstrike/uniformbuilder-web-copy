/**
 * References:
 *     Fabrics:
 *         [4] Baseball Polyester
 *         [27] MTX Mesh
 *         [29] ETX
 *         [31] Performance Fleece
 *         [36] Pro Stretch Dazzle
 *         [23] LTE Fit (A00 3)
 *         [6] LTX
 *
 *     Parts category:
 *         Base Material:
 *             Upper:
 *                 - Front Body
 *                 - Back Body
 *             Lower
 *                 - Base
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
 *             Upper:
 *                 - Bottom Panel
 *             Lower:
 *                 - Back Insert
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
        var have_base_sleeve_fabric = ub.funcs.is_pts_signature() ||
                                        ub.funcs.is_pts_pro_select() ||
                                        ub.funcs.is_pts_select() ||
                                        ub.funcs.is_pts_select_pant() ||
                                        ub.funcs.is_pts_hoodie() ||
                                        ub.funcs.is_pts_cage_jacket();

        var have_insert_fabric = ub.funcs.is_pts_signature() ||
                                    ub.funcs.is_pts_hoodie() ||
                                    ub.funcs.is_pts_cage_jacket();

        if (have_base_sleeve_fabric) {
            this.setBaseSleeveFabrics();
        }

        if (have_insert_fabric) {
            this.setInsertFabrics();
        }
    },

    setBaseSleeveFabrics: function() {
        var default_fabric = FabricPanel.getDefaultFabric();

        if (default_fabric !== null) {
            if (default_fabric.fabric !== "undefined") {
                this.fabrics.base_sleeve = {data: FabricPanel.getBaseSleeveFabricSets(default_fabric)};
                this.fabrics.base_sleeve.multiple = this.fabrics.base_sleeve.data.length > 1;
            }
        }
    },

    setInsertFabrics: function() {
        var default_fabric = FabricPanel.getDefaultFabric(FabricPanel.LEFT_PERSPECTIVE, FabricPanel.INSERT_MATERIAL);

        if (ub.funcs.is_pts_hoodie()) {
            default_fabric = FabricPanel.getDefaultFabric(FabricPanel.FRONT_PERSPECTIVE, FabricPanel.INSERT_MATERIAL);
        }

        if (default_fabric !== null) {
            if (default_fabric.fabric !== "undefined") {
                var fabric = default_fabric.fabric;

                // thumbnail placeholder
                var thumbnail = fabric.thumbnail || "http://34.212.160.37/img/fabric-texture.jpg";

                if (ub.funcs.is_twill()) {
                    if (ub.funcs.is_upper()) {
                        this.fabrics.insert = {
                            data: [
                                {
                                    name: fabric.material,
                                    thumbnail: thumbnail,
                                    layer_level: default_fabric.layer_level,
                                    active: ""
                                }
                            ]
                        };
                        this.fabrics.insert.multiple = this.fabrics.insert.data.length > 1;

                    } else if (ub.funcs.is_lower()){
                        this.fabrics.insert = {
                            data: [
                                {
                                    name: fabric.material,
                                    thumbnail: thumbnail,
                                    layer_level: default_fabric.layer_level,
                                    active: ""
                                }
                            ]
                        };
                        this.fabrics.insert.multiple = this.fabrics.insert.data.length > 1;
                    }
                } else if (ub.funcs.is_sublimated()) {
                    if (ub.funcs.is_upper()) {
                        this.fabrics.insert = {
                            data: [
                                {
                                    name: fabric.material,
                                    thumbnail: thumbnail,
                                    layer_level: default_fabric.layer_level
                                }
                            ]
                        };
                        this.fabrics.insert.multiple = this.fabrics.insert.data.length > 1;

                    } else if (ub.funcs.is_lower()){
                        this.fabrics.insert = {
                            data: [
                                {
                                    name: fabric.material,
                                    thumbnail: thumbnail,
                                    layer_level: default_fabric.layer_level,
                                    active: ""
                                }
                            ]
                        };
                        this.fabrics.insert.multiple = this.fabrics.insert.data.length > 1;
                    }
                } else {
                    console.log("Application type is not sublimated or twill");
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

FabricPanel.BASE_SLEEVE_MATERIAL = "base_sleeve";
FabricPanel.INSERT_MATERIAL = "insert";

FabricPanel.PARTS_BASE_SLEEVE = [
    // upper
    "front_body", "back_body", "left_sleeve", "right_sleeve",

    // lower
    "base"
];
FabricPanel.PARTS_SIDE_INSERT = ["left_side_insert", "right_side_insert"];
FabricPanel.PARTS_INSERT = [
    // upper
    "bottom_panel",

    // lower
    "back_insert"
];

FabricPanel.events = {
    is_events_init: false,

    init: function() {
        if (!FabricPanel.events.is_events_init) {
            $('#primary_options_container').on('click', '#m-fabric-selection a', FabricPanel.events.onFabricLayerChange);

            FabricPanel.events.is_events_init = true;
        }
    },

    onFabricLayerChange: function() {
        var active_fabric_el = $('#m-fabric-selection ul li a.uk-active');

        var layer_level = $(this).data('layer-level');
        var active_layer_level = active_fabric_el.data('layer-level');

        var layer_levels = FabricPanel.getLayerLevels(layer_level);

        // do not change fabric if same layer level
        if (!_.include(layer_levels, active_layer_level)) {
            FabricPanel.changeFabricVisible(layer_level);
        }

        active_fabric_el.removeClass('uk-active');
        $(this).addClass('uk-active');
    }
};

FabricPanel.getDefaultFabric = function(perspective, material) {
    // default perspective
    perspective = perspective || FabricPanel.FRONT_PERSPECTIVE;
    material = material || FabricPanel.BASE_SLEEVE_MATERIAL;

    var filtered_fabric = [];

    switch(material) {
        case FabricPanel.BASE_SLEEVE_MATERIAL:
            filtered_fabric = _.filter(ub.fabric.fabricCollections[perspective], function(f) {
                return f.fabric_id !== 0 && _.include(FabricPanel.PARTS_BASE_SLEEVE, f.name);
            });

            break;

        case FabricPanel.INSERT_MATERIAL:
            filtered_fabric = _.filter(ub.fabric.fabricCollections[perspective], function(f) {
                return f.fabric_id !== 0 && (
                    _.include(FabricPanel.PARTS_SIDE_INSERT, f.name) ||
                    _.include(FabricPanel.PARTS_INSERT, f.name)
                );
            });

            break;
    }

    if (!_.isEmpty(filtered_fabric)) {
        var fabric_id = _.uniq(_.pluck(filtered_fabric, "fabric_id"));

        if (!_.isEmpty(fabric_id)) {
            fabric_id = fabric_id.pop();

            return {
                fabric: _.find(ub.current_material.fabrics, {id: fabric_id.toFixed(0)}),
                layer_level: FabricPanel.getDefaultLayerLevel()
            };
        }
    }

    return null;
};

FabricPanel.getDefaultLayerLevel = function(perspective) {
    // default perspective
    perspective = perspective || FabricPanel.FRONT_PERSPECTIVE;

    var filtered_fabric = _.filter(ub.fabric.fabricCollections[FabricPanel.FRONT_PERSPECTIVE], function(fc) {
        return fc.default_asset == true || fc.default_asset == 1;
    });

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

FabricPanel.getLayerLevels = function(layer_level) {
    switch (true) {
        case _.contains(FabricPanel.FABRIC_SOLID_IDS, layer_level):
            return FabricPanel.FABRIC_SOLID_IDS;

        case _.contains(FabricPanel.FABRIC_ALL_MESH_IDS, layer_level):
            return FabricPanel.FABRIC_ALL_MESH_IDS;

        case _.contains(FabricPanel.FABRIC_MIXED_IDS, layer_level):
            return FabricPanel.FABRIC_MIXED_IDS;

        default:
            return null;
    }
};

FabricPanel.changeFabricVisible = function(layer_level) {
    var layer_levels = FabricPanel.getLayerLevels(layer_level);

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
        fc.sprite.visible = _.contains(layer_levels, fc.layer_level);
    });

    _.each(left_hl_sh, function (fc) {
        fc.sprite.visible = _.contains(layer_levels, fc.layer_level);
    });

    _.each(right_hl_sh, function (fc) {
        fc.sprite.visible = _.contains(layer_levels, fc.layer_level);
    });

    _.each(back_hl_sh, function (fc) {
        fc.sprite.visible = _.contains(layer_levels, fc.layer_level);
    });
};

// remove this function if fabric set is done
FabricPanel.getBaseSleeveFabricSets = function(default_fabric) {
    var fabric_sets = [];

    var fabric = default_fabric.fabric;
    var thumbnail = fabric.thumbnail || "http://34.212.160.37/img/fabric-texture.jpg";

    fabric_sets.push({
        name: fabric.material,
        thumbnail: thumbnail,
        layer_level: default_fabric.layer_level,
        active: "uk-active"
    });

    var baseballPolyEster = _.find(ub.current_material.fabrics, {id: "4"});
    var matrixMesh = _.find(ub.current_material.fabrics, {id: "27"});
    var etx = _.find(ub.current_material.fabrics, {id: "29"});
    var lte = _.find(ub.current_material.fabrics, {id: "23"});
    var ltx = _.find(ub.current_material.fabrics, {id: "6"});

    if (ub.funcs.is_upper()) {
        switch (true) {
            case ub.funcs.is_pts_signature():
            case ub.funcs.is_pts_pro_select():
                if (ub.funcs.is_twill() || ub.funcs.is_sublimated()) {
                    var layer_level;

                    if (ub.funcs.is_pts_signature()) {
                        layer_level = FabricPanel.FABRIC_MIXED_IDS[0];
                    } else if (ub.funcs.is_pts_pro_select()) {
                        layer_level = FabricPanel.FABRIC_SOLID_IDS[0];
                    }

                    switch (parseInt(fabric.id)) {
                        case 4: // Baseball Polyester
                            fabric_sets.push({
                                name: matrixMesh.material,
                                thumbnail: thumbnail,
                                layer_level: FabricPanel.FABRIC_ALL_MESH_IDS[0],
                                active: ""
                            });
                            break;

                        case 29: // ETX
                            fabric_sets.push({
                                name: matrixMesh.material,
                                thumbnail: thumbnail,
                                layer_level: FabricPanel.FABRIC_ALL_MESH_IDS[0],
                                active: ""
                            });
                            break;

                        case 27: // matrix mesh
                            fabric_sets.unshift({
                                name: baseballPolyEster.material,
                                thumbnail: thumbnail,
                                layer_level: layer_level,
                                active: ""
                            });
                            break;
                    }
                } else {
                    console.log("Uniform application type is not twill or sublimated");
                }

                break;

            case ub.funcs.is_pts_select():
                if (ub.funcs.is_sublimated()) {
                    switch(parseInt(fabric.id)) {
                        case 23: // LTE Fit (A00 3)
                            fabric_sets.push({
                                name: ltx.material,
                                thumbnail: thumbnail,
                                layer_level: FabricPanel.FABRIC_SOLID_IDS[0],
                                active: ""
                            });
                            break;

                        case 6: // LTX
                            fabric_sets.unshift({
                                name: lte.material,
                                thumbnail: thumbnail,
                                layer_level: FabricPanel.FABRIC_SOLID_IDS[0],
                                active: ""
                            });
                            break;
                    }
                } else {
                    console.log("Uniform application type is not sublimated");
                }

                break;
        }
    }

    if (fabric_sets.length === 1) {
        fabric_sets[0].active = "";
    }

    return fabric_sets;
};