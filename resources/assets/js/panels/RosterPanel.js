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
            $("#richardson-team-roster").on("keypress", ".roster-uniform-name, .roster-uniform-number, .roster-uniform-qty", _.debounce(that.onUpdateRosterInfo, 1000));
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

    onUpdateRosterInfo: function() {
        var container = $(this).closest(".player-info")
        var size = container.find(".roster-uniform-size").val();
        var last_name = container.find(".roster-uniform-name").val();
        var number = container.find(".roster-uniform-number").val();
        var quantity = container.find(".roster-uniform-qty").val();
        var category = container.data("category");
        
        RosterPanel.events.updateRoster(size, last_name, number, quantity, category);
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
            var findNumber = _.find(ub.data.playerNumbers, {number: $(this).data("number").toString(), status: "selected"});
            if (typeof findNumber === "undefined") {
                numbers.push({
                    size: active_size,
                    number: parseInt($(this).data("number")),
                    qty: 1,
                    lastName: "",
                    category: category
                });
            }
            ub.funcs.setNumberStatus($(this).data("number"), 'selected');
        });

        RosterPanel.events.saveRosterData(active_size, category, numbers);
        var roster = RosterPanel.events.find(active_size, category);
        RosterPanel.events.prepareRosterList(roster.rosters);

        $("#richardson-team-roster .uniform-size-button[data-size='"+  active_size +"'][data-category='"+  category +"']").addClass("selected");
    },

    //On Click Uniform Size
    onClickUniformSize: function() {
        var size = $(this).data("size");
        var category = $(this).data("category");
        $(".roster-uniform-size-container .uniform-size-button.uk-active").removeClass("uk-active");
        $(this).addClass("uk-active");
        RosterPanel.events.preparePlayerNumbers();

        var roster = RosterPanel.events.find(size, category);
        if (typeof roster !== "undefined") {
            _.each(roster.rosters, function(roster) {
                $("#richardson-team-roster .player-number-button[data-number='"+ roster.number +"']").addClass("uk-active");
            });

            RosterPanel.events.prepareRosterList(roster.rosters);
        }
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

    prepareRosterList: function(numbers) {
        var template = document.getElementById("m-richardson-roster-player-form").innerHTML;
        var render = Mustache.render(template, {
            players: numbers
        });

        $("#richardson-team-roster .roster-player-list-table tbody").html("");
        $("#richardson-team-roster .roster-player-list-table tbody").html(render);
    },

    saveRosterData: function (size, category, rosters) {
        var find = this.find(size, category);

        if (typeof find !== "undefined") {
            _.each(rosters, function(item) {
                var isPresent = _.find(find.rosters, {number: item.number});
                if (typeof isPresent === "undefined") {
                    find.rosters.push(item);
                }
            })
        } else {
            RosterPanel.teamRoster.push({
                size: size,
                category: category,
                rosters: rosters
            });
        }
    },

    find: function (size, category) {
        return _.find(RosterPanel.teamRoster, {size: size, category: category});
    },

    updateRoster: function(size, last_name, number, quantity, category) {
        var roster = this.find(size, category);

        if (typeof roster !== "undefined") {
            var info = _.find(roster.rosters, {size: size, number: parseInt(number)});
            if (typeof info !== "undefined") {
                info.number = parseInt(number);
                info.qty = quantity;
                info.lastName = last_name;
            }
        }
    }
}