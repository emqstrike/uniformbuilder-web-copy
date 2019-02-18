
var RichardsonIndex = {
    init: function() {
        $("#richardson-main-container").on('click', '.uniform-type-container .richardson-filter-button', RichardsonIndex.onFilterStyles);
        $("#richardson-main-container").on('click', '.uniform-type-filter', RichardsonIndex.onFilterByType);
        $("#richardson-main-container").on('click', '.filter-uniform-neck-option', RichardsonIndex.onFilterByNeck);
        $(".nav-uniforms-button").on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            RichardsonIndex.onLoad();
        });
        RichardsonIndex.onLoad();
    },

    onLoad: function() {
        if (typeof ub.richardson.materials !== "undefined") {
            var template = document.getElementById("m-richardson-index");
            var render = Mustache.render(template.innerHTML);
            $("#richardson-main-container .index-main-header").show();
            $("#richardson-main-container div.richardson-initial-picker").html("");
            $("#richardson-main-container div.richardson-initial-picker").html(render);
        } else {
            $("#richardson-main-container .loading").show();
            $("#richardson-main-container .banner").hide();
            getJSON("https://api.prolook.com/api/materials",
                function(response) {
                    if (response.success) {
                        var materials = response.materials;

                        var richardsons = _.filter(materials, function(material) {
                            if (material.brand === "Richardson" || material.brand === "richardson") {
                                return material;
                            }
                        });

                        ub.richardson.materials = richardsons;
                        var template = document.getElementById("m-richardson-index");
                        var render = Mustache.render(template.innerHTML);
                        $(".richardson-initial-picker").html("");
                        $(".richardson-initial-picker").html(render);

                        $("#richardson-main-container .loading").hide();
                        $("#richardson-main-container .banner").show();
                    }
                },

                function(error) {
                    console.log(error)
                }
            );
        }
    },

    onFilterStyles: function() {
        var blockPattern = $(".block-pattern-container li.uk-active").data("block-pattern");
        var application_type = $(this).data("application-type");

        var uniforms = RichardsonIndex.getFilteredUniforms(blockPattern, application_type, "upper");

        RichardsonIndex.renderStyles(blockPattern, application_type);
        RichardsonIndex.renderSecondaryFilter(blockPattern, "upper");
        RichardsonIndex.renderUniforms(uniforms);
    },

    onFilterByType: function() {
        var blockPattern = $("#richardson-main-container .uniform-filter-header").data("block-pattern");
        var application_type = $("#richardson-main-container .uniform-filter-header").data("application-type");
        var type = $(this).data("type");

        var uniforms = RichardsonIndex.getFilteredUniforms(blockPattern, application_type, type);

        RichardsonIndex.renderSecondaryFilter(blockPattern, type);
        RichardsonIndex.renderUniforms(uniforms);
    },

    onFilterByNeck: function() {
        var blockPattern = $("#richardson-main-container .uniform-filter-header").data("block-pattern");
        var application_type = $("#richardson-main-container .uniform-filter-header").data("application-type");
        var type = $("#richardson-main-container ul.primary-filter").find("li.uk-active").data("type");
        var neck_option = $(this).data("filter-neck");

        var uniforms = RichardsonIndex.getFilteredUniforms(blockPattern, application_type, type, neck_option);
        RichardsonIndex.renderUniforms(uniforms);
    },

    renderStyles: function(blockPattern, application_type) {
        var template = document.getElementById("m-richardson-styles");
        var render = Mustache.render(template.innerHTML, {
            block_pattern: blockPattern,
            application_type: application_type.replace("_", " ")
        });
        $("#richardson-main-container .index-main-header").hide();
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

    getFilteredUniforms: function(blockPattten, application_type, type, neck_option) {
        var uniforms = _.filter(ub.richardson.materials, function(material) {
            if (material.block_pattern.includes(blockPattten) && material.is_blank === 0) {
                if (material.uniform_application_type === application_type && material.type === type) {
                    return material;
                }
            }
        });

        if (typeof neck_option !== "undefined" && neck_option !== "all") {
            uniforms = _.filter(uniforms, function(uniform) {
                if (uniform.neck_option === neck_option) {
                    return uniform;
                }
            });
        }

        return uniforms;
    }
}

$(document).ready(RichardsonIndex.init);

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