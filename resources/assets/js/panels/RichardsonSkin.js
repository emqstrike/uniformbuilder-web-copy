function RichardsonSkin() {
}

RichardsonSkin.init = function() {
    ub.current_modifier = 1;

    $("div#left-side-toolbar").html("")
    $("div.customizer-uniform-information").html("");
    $("p.verbiage-text").addClass('cp-fc-black');
    RichardsonSkin.funcs.setupSkin(0xffffff);
}

RichardsonSkin.events = {
    isInit: true,

    init: function() {
        var _this = this;
        if (RichardsonSkin.events.isInit) {
            $("div#left-side-toolbar").on('click', '.perspective .change-perspective-button', _this.onClickPerspectiveThumbnail);
            $("#right-pane-column .richardson-footer").on('click', '.richardson-onNext', _this.onNextPanel);
            $("#right-pane-column .richardson-footer").on('click', '.richardson-onPrevious', _this.onPreviousPanel);
            $(".richardson-header").on('click', '.change-fabric', _this.onChangeFabric);
            RichardsonSkin.events.isInit = false;
        }

        if (ub.user) {
            RichardsonSaveDesign.events.init();
        }
    },

    onNextPanel: function() {
        var current_modifier = ub.current_modifier;
        var total_modifier = 7;

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
    },

    onPreviousPanel: function() {
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
    },

    onChangeFabric: function() {
        if (!$('#property-modifiers-menu .menu-item-fabrics').hasClass('active')) {
            $('#property-modifiers-menu .menu-item-fabrics').trigger("click");
        }
    },

    onClickPerspectiveThumbnail: function() {
        $(".perspective a.active").removeClass('active');
        $(this).addClass("active")
        /* Act on the event */
        var view = $(this).data('perspective');
        if (ub.active_view !== view) {
            var perspective = new PerspectiveController();
            perspective.setPerspective(view)
        }
    }

}

RichardsonSkin.funcs = {
    setupSkin: function(color) {
        this.enableRichardsonNavigator();
        this.removeSpecialModifier()
        this.setupRightPanelHeader();
        this.removeNavigationHeader();
        var _this = this;
        
        _.delay(function() {
            $('#property-modifiers-menu .menu-item-fabrics').trigger("click");
            _this.changeStageBackgroundColor(color);
            _this.setupSidePanelToolbar();
            _this.setupFooter();

            // Bind events
            RichardsonLogin.events.init();
            RichardsonSkin.events.init();
        }, 2000) 
    },

    setupFooter: function() {
        $("div#right-main-window.pane-main-window.footer_buttons_container").remove();

        var user = ub.user;

        var richardson_footer = document.getElementById("m-richardson-footer");
        var render_footer = Mustache.render(richardson_footer.innerHTML, {user: user});
        if ($("#right-pane-column .richardson-footer").length !== 0) {
            $("#right-pane-column .richardson-footer").remove();
        }
        $("div#right-pane-column").append(render_footer);
        $(".richardson-footer .richardson-onPrevious").css('pointer-events', 'none');
    },

    enableRichardsonNavigator: function() {
        $("div.richardson-footer .richardson-onPrevious").css('pointer-events', 'auto');
        $(".richardson-footer .richardson-onNext").css('pointer-events', 'auto');
    },

    richardsonPTSCategory: function() {
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
    },

    perspectiveThumbnailAutoUpdate: function() {
        ub.front_view.visible = true;
        ub.back_view.visible = true;
        ub.left_view.visible = true;
        ub.right_view.visible = true;
        ub.funcs.deactivateMoveTool();

        if (Worker) {
            var worker = new Worker('/workers/image-worker.js');
            worker.postMessage([
                {
                    image: ub.getThumbnailImage("front_view"),
                    perspective: "front"
                },
                {
                    image: ub.getThumbnailImage("back_view"),
                    perspective: "back"
                },
                {
                    image: ub.getThumbnailImage("left_view"),
                    perspective: "left"
                },
                {
                    image: ub.getThumbnailImage("right_view"),
                    perspective: "right"
                },
            ]);

            worker.onmessage = function(e) {
                var template = document.getElementById("m-left-panel-toolbar");
                var rendered_template = Mustache.render(template.innerHTML, {perspectives: e.data});
                $("div#left-side-toolbar").html("");
                $("div#left-side-toolbar").html(rendered_template);
                $(".perspective .change-perspective-button[data-perspective='"+ ub.active_view +"']").addClass('active');
                console.log("Updating Uniform Thumbnail via worker")
            }
        } else {
            // Setup perspective
            var front = ub.getThumbnailImage("front_view");
            var back = ub.getThumbnailImage("back_view");
            var left = ub.getThumbnailImage("left_view");
            var right = ub.getThumbnailImage("right_view");

            var perspectives = [
               {
                   "perspective": "front",
                   "image": front
               },
               {
                   "perspective": "back",
                   "image": back
               },
               {
                   "perspective": "left",
                   "image": left
               },
               {
                   "perspective": "right",
                   "image": right
               }
            ];

            var template = document.getElementById("m-left-panel-toolbar");
            var rendered_template = Mustache.render(template.innerHTML, {perspectives: perspectives});
            $("div#left-side-toolbar").html("");
            $("div#left-side-toolbar").html(rendered_template);
            $(".perspective .change-perspective-button[data-perspective='"+ ub.active_view +"']").addClass('active');
        }
    },

    removeSpecialModifier: function() {
        $("div#right-main-window.pane-main-window.footer_buttons_container").remove();
        $("#right-main-window.pane-main-window").css('height', '600px');
    },

    setupSidePanelToolbar: function() {
        // Add CSS in left side toolbar
        $("div#left-side-toolbar").css({
            "top": ub.config.isHeaderVisible ? '220px' : "100px",
            "left": '120px'
        });

        $("div#right-pane-column").css({
            "top": ub.config.isHeaderVisible ? '220px' : "100px",
            "right": "100px"
        });
    },

    setupRightPanelHeader: function() {
        $("div.options_panel_header").html("");

        var template = document.getElementById("m-richardson-right-panel-header");
        var data = {
            "uniform_name": ub.current_material.material.name,
            "block_pattern": this.richardsonPTSCategory(),
            "application_type": ub.funcs.isSublimated() ? "color infused" : ub.funcs.isTackleTwill() ? "color dyed" : ""
        };

        var rendered = Mustache.render(template.innerHTML, data);

        $("div.options_panel_header").html(rendered);
    },

    removeNavigationHeader: function() {
        $("nav.navbar.navbar-default.navbar-fixed-top").remove();
    },

    changeStageBackgroundColor: function(color) {
        $("#main_container").css({
            "display": "block",
            "margin": "0"
        });
        if  (typeof color !== "undefined") {
            ub.renderer.backgroundColor = color;
        }
    }
}