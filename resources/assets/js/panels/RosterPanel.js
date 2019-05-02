function RosterPanel() {

}

RosterPanel.teamRoster = [];

RosterPanel.events = {
    isInit: true,

    init: function() {
        var that = this;
        if (that.isInit) {
            $("#right-pane-column").on("click", ".richardson-footer .manage-team-roster", that.onShowRoster);
            $("#richardson-team-roster").on("click", ".uniform-size-button", that.onClickUniformSize);
            $("#richardson-team-roster").on("click", ".player-number-button", that.onClickPlayerNumber);
            $("#richardson-team-roster").on("click", ".add-numbers", that.onAddNumbers);
            $("#richardson-team-roster").on("click", ".cancel", that.onCancel);
            that.isInit = false;
        }
    },
    // Show roster
    onShowRoster: function() {
        RosterPanel.events.prepareUniformSizes();
        RosterPanel.events.preparePlayerNumbers();
        UIkit.modal("#richardson-team-roster").show();
    },

    onClickPlayerNumber: function() {
        if ($("#richardson-team-roster .uniform-size-button.uk-active").length > 0) {
            if ($(this).hasClass("uk-active")) {
                $(this).removeClass("uk-active");
            } else {
                $(this).addClass("uk-active");
            }
        } else {
            return;
        }
    },

    onCancel: function() {
        $("#richardson-team-roster .player-numbers-container .player-number-button.uk-active").removeClass("uk-active");
    },

    onAddNumbers: function() {
        var selected_numbers = $("#richardson-team-roster .player-numbers-container .uk-active");
        var active_size = $("#richardson-team-roster .uniform-size-button.uk-active").data("size");
        var category = $("#richardson-team-roster .uniform-size-button.uk-active").data("category");
        var numbers = [];
        $("#richardson-team-roster .player-numbers-container .uk-active").each(function() {
            ub.funcs.setNumberStatus($(this).data("number"), 'selected');
            numbers.push({
                size: active_size,
                number: $(this).data("number"),
                qty: 1,
                lastName: ""
            });
        });

        var template = document.getElementById("m-richardson-roster-player-form").innerHTML;
        var render = Mustache.render(template, {
            players: numbers
        });

        RosterPanel.events.saveRosterData(active_size, category, numbers);

        $("#richardson-team-roster .uniform-size-button[data-size='"+  active_size +"'][data-category='"+  category +"']").addClass("selected");

        $("#richardson-team-roster .roster-player-list-table tbody").html("");
        $("#richardson-team-roster .roster-player-list-table tbody").html(render);
    },

    //On Click Uniform Size
    onClickUniformSize: function() {
        var size = $(this).data("size");
        $(".roster-uniform-size-container .uniform-size-button.uk-active").removeClass("uk-active");
        RosterPanel.events.preparePlayerNumbers();
        $(this).addClass("uk-active");
    },

    prepareUniformSizes: function() {
        var template = document.getElementById("m-richardson-roster-sizes").innerHTML;
        var render = Mustache.render(template, {
            uniformSizes: ub.data.uniformSizes
        });

        $("#richardson-team-roster .roster-uniform-size-container").html("");
        $("#richardson-team-roster .roster-uniform-size-container").html(render);
    },

    preparePlayerNumbers: function() {
        var template = document.getElementById("m-richardson-roster-player-number").innerHTML;
        var render = Mustache.render(template, {
            numbers: ub.data.playerNumbers
        });

        $("#richardson-team-roster .player-numbers-container").html("");
        $("#richardson-team-roster .player-numbers-container").html(render);

    },

    saveRosterData: function (size, category, numbers) {
        var find = this.find(size, category);

        if (typeof find !== "undefined") {
            find.numbers = numbers;
        } else {
            RosterPanel.teamRoster.push({
                size: size,
                category: category,
                numbers: numbers
            });
        }
    },

    find: function (size, category) {
        return _.find(RosterPanel.teamRoster, {size: size, category: category});
    }
}