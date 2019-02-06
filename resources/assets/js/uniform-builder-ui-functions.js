$(document).ready(function() {
    ub.funcs.changeStageBackgroundColor = function(color) {
        if  (typeof color !== "undefined") {
            ub.renderer.backgroundColor = color;
        }
    };

    ub.funcs.removeNavigationHeader = function() {
        $("nav.navbar.navbar-default.navbar-fixed-top").remove();
        $(".generic-canvas").css('background-color', 'white');
    };

    ub.funcs.setupRightPanelHeader = function() {
        $("div.options_panel_header").html("");

        var template = document.getElementById("m-richardson-right-panel-header");
        var data = {
            "uniform_name": ub.current_material.material.name,
            "block_pattern": ub.funcs.richardsonPTSCategory(),
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
            "left": '120px'
        });
    };

    ub.funcs.removeSpecialModifier = function() {
        $("div#right-main-window.pane-main-window.footer_buttons_container").remove();
        $("#right-main-window.pane-main-window").css('height', '600px');
    }

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

    ub.funcs.setupRightPanelFooter = function () {
        $("div#right-main-window.pane-main-window.footer_buttons_container").remove();
        $("#right-main-window.pane-main-window").css({
            'height': '600px',
            "background-color": "white",
            "border": "1px solid #e6e6e6"
        });;

        var richardson_footer = document.getElementById("m-richardson-footer");
        var render_footer = Mustache.render(richardson_footer.innerHTML);

        $("div#right-pane-column").append(render_footer);
        $(".richardson-footer .richardson-onPrevious").css('pointer-events', 'none');

        // Bind Event
        _.delay(function() {
            ub.funcs.handleOnNextModifier();
            ub.funcs.handleOnPreviousModifier();
        }, 500)
    };

    ub.funcs.handleOnNextModifier = function () {
        $("#right-pane-column .richardson-footer").on('click', '.richardson-onNext', function(event) {
            event.preventDefault();
            var current_modifier = ub.current_modifier;
            var total_modifier = 8;

            if (ub.current_modifier !== total_modifier) {
                if (current_modifier >= 1) {
                    ub.current_modifier++;
                    $('#property-modifiers-menu .group-' + ub.current_modifier).trigger('click');
                    $("div.richardson-footer .richardson-onPrevious").css('pointer-events', 'auto');
                }
            }

            if (ub.current_modifier === total_modifier)  {
                $(".richardson-footer .richardson-onNext").css('pointer-events', 'none');
            }
        });
    };

    ub.funcs.handleOnPreviousModifier = function () {
        $("#right-pane-column .richardson-footer").on('click', '.richardson-onPrevious', function(event) {
            event.preventDefault();
            /* Act on the event */
            var current_modifier = ub.current_modifier;
            var modifier_limit = 1;

            if (ub.current_modifier !== modifier_limit) {
                ub.current_modifier--
                $('#property-modifiers-menu .group-' + ub.current_modifier).trigger('click');
                $(".richardson-footer .richardson-onNext").css('pointer-events', 'auto');
            }

            if (ub.current_modifier === modifier_limit) {
                $("div.richardson-footer .richardson-onPrevious").css('pointer-events', 'none');
            }
        });
    };

    ub.funcs.changeStage = function() {
        ub.current_modifier = 1;
        $('#property-modifiers-menu .menu-item-fabrics').trigger("click");

        $("div#left-side-toolbar").html("")
        $("div.customizer-uniform-information").html("");
        $("p.verbiage-text").addClass('cp-fc-black');

        ub.funcs.setupRightPanelHeader();
        ub.funcs.changeStageBackgroundColor("0xffffff");
        ub.funcs.removeNavigationHeader();
        ub.funcs.setupRightPanelFooter();


        _.delay(function() {
            ub.funcs.setupSidePanelToolbar();
            ub.funcs.handlePerspectiveEvent();
        }, 2000)
    };

    ub.funcs.enableRichardsonNavigator = function() {
        $("div.richardson-footer .richardson-onPrevious").css('pointer-events', 'auto');
        $(".richardson-footer .richardson-onNext").css('pointer-events', 'auto');
    };

    ub.funcs.richardsonPTSCategory = function() {
        var category;
        var blockPattern = ub.current_material.material.block_pattern;

        if (blockPattern.includes("PTS Signature")) {
            category = "PTS 90";
        } else if (blockPattern.includes("PTS Pro Select")) {
            category = "PTS 80";
        } else if (blockPattern.includes("PTS Select")) {
            category = "PTS 70";
        } else if (blockPattern.includes("PTS Hoodie")) {
            category = "PTS 10";
        } else if (blockPattern.includes("PTS Cage Jacket")) {
            category = "PTS 20";
        }

        return category;
    }

})