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
            "left": '50px'
        });

    };

    ub.funcs.handlePerspectiveEvent = function() {
        $("div#left-side-toolbar .perspective").on('click', '.change-perspective-button', function(event) {
            event.preventDefault();
            /* Act on the event */
            var view = $(this).data('perspective');
            var perspective = new PerspectiveController();
            perspective.setPerspective(view)
        });
    }



    ub.funcs.changeStage = function() {
        $("div#left-side-toolbar").html("")
        $("div.customizer-uniform-information").html("");
        ub.funcs.changeStageBackgroundColor("0xffffff");
        ub.funcs.removeApplicationHeader();

        _.delay(function() {
            ub.funcs.setupSidePanelToolbar();
            ub.funcs.handlePerspectiveEvent();
        }, 1500)
    }

})