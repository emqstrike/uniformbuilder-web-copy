function ColorHexTester() {

}

ColorHexTester.init = {
    isInit: true,

    init: function() {
        var that = this;
        if (that.isInit) {
            $("#primary_options_container").on("click", ".hex-code-tester .submit-test-hexcode", that.onTestHexCode)
            that.isInit = false;
        }
        ub.data.hexCodeTesterShown = true;
        that.loadMaterials();
    },

    loadMaterials: function() {
        var materials = _.filter(ub.current_material.options_distinct_names, function(material) {
            material.name = material.material_option.replace("_", " ");
            if (material.setting_type === "shape") {
                return material;
            }
        });

        var template = document.getElementById("m-richardson-hexcode-checker").innerHTML;
        var render = Mustache.render(template, {
            materials: _.sortBy(materials, 'layer_order')
        });

        $("#primary_options_container").html("");
        $("#primary_options_container").html(render);
    },

    onTestHexCode: function() {
        var material = $(this).closest('.material-option').data("material");
        var hexcode = $(this).closest(".material-option").find(".input-hexcode").val();

        if (typeof hexcode !== "undefined" && hexcode.length > 0) {
            ub.change_material_option_color(material, hexcode.substring(1,7));
        }
    }
}