$(document).ready(function() {
    ub.funcs.changeStageBackgroundColor = function(color) {
        if  (typeof color !== "undefined") {
            ub.renderer.backgroundColor = color;
        }
    };

    ub.funcs.removeApplicationHeader = function() {
        $("#navbar-header").css('display', 'none');
        $("div.user-profile").css('display', 'none');
        $("h1#header_text").css('display', 'none');
    };

    ub.funcs.setupRightPanelHeader = function() {
        $("div.options_panel_header").html("");

        var template = document.getElementById("m-richardson-right-panel-header");
        var data = {
            "uniform_name": ub.current_material.material.name,
            "block_pattern": ub.current_material.material.block_pattern,
            "application_type": ub.funcs.isSublimated() ? "color infused" : ub.funcs.isTackleTwill() ? "color dyed" : ""
        };

        var rendered = Mustache.render(template.innerHTML, data);

        $("div.options_panel_header").html(rendered);
    };

    ub.funcs.setupSidePanelToolbar = function() {
        ub.front_view.visible = true;
        ub.back_view.visible = true;
        ub.left_view.visible = true;
        ub.right_view.visible = true;

        // Setup perspective
        var perspectives = [
            {
                "perspective": "front",
                "image": ub.getThumbnailImage("front_view")
            },
            {
                "perspective": "back",
                "image": ub.getThumbnailImage("back_view")
            },
            {
                "perspective": "left",
                "image": ub.getThumbnailImage("left_view")
            },
            {
                "perspective": "right",
                "image": ub.getThumbnailImage("right_view")
            }
        ];

        var template = document.getElementById("m-left-panel-toolbar");
        var rendered_template = Mustache.render(template.innerHTML, {perspectives: perspectives});
        $("div#left-side-toolbar").html(rendered_template);

        // Add CSS in left side toolbar
        $("div#left-side-toolbar").css({
            "top": '150px',
            "left": '150px'
        });

    };

    ub.funcs.handlePerspectiveEvent = function() {
        $("div#left-side-toolbar .perspective").on('click', '.change-perspective-button', function(event) {
            event.preventDefault();
            /* Act on the event */
            var view = $(this).data('perspective');
            if (ub.active_view !== view) {
                var perspective = new PerspectiveController();
                perspective.setPerspective(view)
            }
        });
    };

    ub.funcs.changeStage = function() {
        $("div#left-side-toolbar").html("")
        $("div.customizer-uniform-information").html("");
        $("p.verbiage-text").addClass('cp-fc-black');
        ub.funcs.changeStageBackgroundColor("0xffffff");
        ub.funcs.removeApplicationHeader();
        ub.funcs.setupRightPanelHeader();

        _.delay(function() {
            ub.funcs.setupSidePanelToolbar();
            ub.funcs.handlePerspectiveEvent();
        }, 2000)
    };

})