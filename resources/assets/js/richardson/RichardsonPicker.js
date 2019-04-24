var RichardsonPicker = {
    init: function() {
        $("#richardson-main-container").on('click', '.uniform-type-container .richardson-filter-button', RichardsonPicker.onFilterStyles);
        $("#richardson-main-container").on('click', '.uniform-type-filter', RichardsonPicker.onFilterByType);
        $("#richardson-main-container").on('click', '.filter-uniform-neck-option', RichardsonPicker.onFilterByNeck);
        ub.richardson.materials = [];
        RichardsonPicker.onLoad();
    },

    onLoad: function() {
        RichardsonPicker.renderUniformPicker(ub.config.styles.block_pattern, ub.config.styles.uniform_type);
    },

    onFilterStyles: function() {
        var blockPattern = $(".block-pattern-container li.uk-active").data("block-pattern");
        var application_type = $(this).data("application-type");

        $("#richardson-main-container .loading").show();
        $("#richardson-main-container .banner").hide();
        $("#richardson-main-container .index-main-header").show();
        $("#richardson-main-container div.richardson-initial-picker").html("");
        $("body").scrollTo(0);

        RichardsonPicker.renderUniformPicker(blockPattern, application_type);
    },

    onFilterByType: function() {
        var blockPattern = $("#richardson-main-container .uniform-filter-header").data("block-pattern");
        var application_type = $("#richardson-main-container .uniform-filter-header").data("application-type");
        var type = $(this).data("type");

        // Uniforms Materials
        var find = _.find(ub.richardson.materials, {block_pattern: blockPattern});

        var uniforms = _.filter(find.materials, function(material) {
            if (material.uniform_application_type === application_type && material.type === type) {
                return material;
            }
        });

        RichardsonPicker.renderSecondaryFilter(blockPattern, type);
        RichardsonPicker.renderUniforms(uniforms);
    },

    onFilterByNeck: function() {
        var blockPattern = $("#richardson-main-container .uniform-filter-header").data("block-pattern");
        var application_type = $("#richardson-main-container .uniform-filter-header").data("application-type");
        var type = $("#richardson-main-container ul.primary-filter").find("li.uk-active").data("type");
        var neck_option = $(this).data("filter-neck");

        // Uniforms Materials
        var find = _.find(ub.richardson.materials, {block_pattern: blockPattern});

        var uniforms = _.filter(find.materials, function(material) {
            if (material.uniform_application_type === application_type && material.type === type) {
                if (neck_option !== "all") {
                    if (material.neck_option === neck_option) {
                        return material;
                    }
                } else {
                    return material;
                }
            }
        });

        RichardsonPicker.renderUniforms(uniforms);
    },

    renderStyles: function(blockPattern, application_type) {
        var template = document.getElementById("m-richardson-styles");
        var render = Mustache.render(template.innerHTML, {
            block_pattern: blockPattern,
            type: application_type,
            application_type: application_type.replace("_", " ")
        });

        $('div.debug-panel').fadeOut();
        $("#richardson-main-container div.richardson-initial-picker").html("");
        $("#richardson-main-container div.richardson-initial-picker").html(render);
    },

    renderSecondaryFilter: function(blockPattern, type) {
        var template = document.getElementById("m-richardson-secondary-filter");
        var render = Mustache.render(template.innerHTML, {
            labels: ub.richardson.data.secondaryLabels.getLabel(blockPattern, type)
        });

        $("#richardson-main-container .secondary-filter").html("");
        $("#richardson-main-container .secondary-filter").html(render);
    },

    renderUniforms: function(uniforms) {
        var template = document.getElementById("m-richardson-uniforms");
        var render = Mustache.render(template.innerHTML, {
            uniforms: uniforms
        });

        $("#richardson-main-container #uniform-list").html("");
        $("#richardson-main-container #uniform-list").html(render);
    },

    renderUniformPicker: function(blockPattern, application_type) {
        var find = _.find(ub.richardson.materials, {block_pattern: blockPattern});

        if (typeof find !== "undefined") {

            var uniforms = _.filter(find.materials, function(material) {
                if (material.uniform_application_type === application_type && material.type === "upper") {
                    return material;
                }
            });

            RichardsonPicker.renderStyles(blockPattern, application_type);
            RichardsonPicker.renderSecondaryFilter(blockPattern, "upper");
            RichardsonPicker.renderUniforms(uniforms);

        } else {
            getJSON("https://api.prolook.com/api/v1-0/get_styles/richardson/men/baseball/" + blockPattern,
                function(response) {
                    if (response.success) {
                        var materials = response.materials;
                        ub.richardson.materials.push({
                            block_pattern: blockPattern,
                            materials: materials
                        });

                        var uniforms = _.filter(materials, function(material) {
                            if (material.uniform_application_type === application_type && material.type === "upper") {
                                return material;
                            }
                        });

                        RichardsonPicker.renderStyles(blockPattern, application_type);
                        RichardsonPicker.renderSecondaryFilter(blockPattern, "upper");
                        RichardsonPicker.renderUniforms(uniforms);

                    } else {
                        console.log("Something went wrong")
                    }
                },

                function(error) {
                    console.log(error)
                }
            );
        }
    }
}

$(document).ready(RichardsonPicker.init);

function getJSON(url, successHandler, errorHandler) {
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function() {
        var status;
        var data;
        // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
        if (xhr.readyState == 4) { // `DONE`
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
}
