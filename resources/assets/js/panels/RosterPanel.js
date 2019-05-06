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
            // $("#richardson-team-roster").on("focus", ".player-number-button", that.onHoverPlayerNumber);
            $("#richardson-team-roster").on("keypress", ".roster-uniform-name, .roster-uniform-number, .roster-uniform-qty", _.debounce(that.onUpdateRosterInfo, 500));
            $("#richardson-team-roster").on("click", ".remove-player-info", that.onRemoveRoster);
            $("#richardson-team-roster").on("click", ".save-roster", that.onClickSaveRoster);
            that.isInit = false;
        }
    },
    // Show roster
    onShowRoster: function() {
        RosterPanel.events.prepareUniformSizes();
        RosterPanel.events.preparePlayerNumbers();
        UIkit.modal("#richardson-team-roster").show();
    },

    onHoverPlayerNumber: function() {
        var active_size = $("#richardson-team-roster .uniform-size-button.uk-active").data("size");
        var category = $("#richardson-team-roster .uniform-size-button.uk-active").data("category");
        var number = $(this).data("number");

        console.log(active_size, category, number);
    },

    onClickPlayerNumber: function() {
        var active_size = $("#richardson-team-roster .uniform-size-button.uk-active").data("size");
        var category = $("#richardson-team-roster .uniform-size-button.uk-active").data("category");
        var number = $(this).data("number");
        var numbers = [];

        $("#richardson-team-roster .uniform-size-button[data-size='"+  active_size +"'][data-category='"+  category +"']").addClass("selected");

        if ($("#richardson-team-roster .uniform-size-button.uk-active").length > 0) {
            if ($(this).hasClass("uk-active")) {
                $("#richardson-team-roster .remove-player-info[data-number='"+ number +"'][data-category='"+ category +"']").trigger("click");
                $(this).removeClass("uk-active");
            } else {
                var findNumber = _.find(ub.data.playerNumbers, {number: number.toString(), status: "selected"});
                if (typeof findNumber === "undefined") {
                    numbers.push({
                        size: active_size,
                        number: $(this).data("number").toString(),
                        qty: 1,
                        lastName: "",
                        category: category
                    });
                }

                ub.funcs.setNumberStatus($(this).data("number"), 'selected');
                $(this).addClass("uk-active");
            }
        } else {
            return;
        }

        RosterPanel.events.saveRosterData(active_size, category, numbers);
        var roster = RosterPanel.events.find(active_size, category);
        RosterPanel.events.prepareRosterList(roster.rosters);
        RosterPanel.events.prepareRosterSummary();
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
            _.delay(function() {
                _.each(roster.rosters, function(roster) {
                    $("#richardson-team-roster .player-number-button[data-number='"+ roster.number +"']").removeClass("selected").addClass("uk-active");
                });
            }, 100);

            RosterPanel.events.prepareRosterList(roster.rosters);
        } else {
            $("#richardson-team-roster .roster-player-list-table tbody").html("");
        }
    },

    onClickSaveRoster: function() {
        var data = [];
        var _factoryCode = ub.current_material.material.factory_code;
        var _total = 0;
        var _prepareSize = [];
        ub.current_material.settings.roster = [];
        ub.current_material.settings.size_breakdown = [];

        _.each(RosterPanel.teamRoster, function(roster) {
            if (roster.rosters.length > 0) {
                _.each(roster.rosters, function(item, index) {
                    ub.current_material.settings.roster.push({
                        index: index,
                        lastname: item.lastName,
                        size: item.size,
                        number: item.number,
                        // Disable temporarily for FOOTBALL
                        sleeveType: "N/A",
                        lastNameApplication: "",
                        Sample: 0
                    });

                    _total += parseInt(item.qty);
                    var _obj = _.find(_prepareSize, {size: item.size});
                    
                    if (typeof _obj === "undefined") {
                        _prepareSize.push({size: item.size, quantity: 0 });
                        _obj = _.find(_prepareSize, {size: item.size});
                    }

                    _obj.quantity +=  parseInt(item.qty);
                });
                ub.current_material.settings.size_breakdown = _prepareSize;
            }
        });

        ub.data.rosterIsChange = true;
        UIkit.modal("#richardson-team-roster").hide();

    },

    onRemoveRoster: function() {
        var container = $(this).closest(".player-info")
        var size = container.find(".roster-uniform-size").val();
        var last_name = container.find(".roster-uniform-name").val();
        var number = container.find(".roster-uniform-number").val();
        var quantity = container.find(".roster-uniform-qty").val();
        var category = container.data("category");
        var index = $(this).closest('tr').index();

        var roster = RosterPanel.events.find(size, category);
        if (typeof roster !== "undefined") {
            var list = roster.rosters;
            if (typeof list !== "undefined") {
                list.splice(index, 1);
                if (_.size(list) >= 0) {
                    $("#richardson-team-roster .uniform-size-button[data-size='"+ size +"']").removeClass("selected");
                }
            }
        }

        container.fadeOut(function() {
            $(this).remove();
        });

        $(".player-numbers-container .player-number-button[data-number='"+ number +"']").removeClass("selected").removeClass("uk-active");
        ub.funcs.setNumberStatus(number, 'free');
        
        RosterPanel.events.prepareRosterSummary();
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

    prepareUniformSizes: function() {
        var template = document.getElementById("m-richardson-roster-sizes").innerHTML;
        var render = Mustache.render(template, {
            uniformSizes: ub.data.uniformSizes
        });

        $("#richardson-team-roster .roster-uniform-size-container").html("");
        $("#richardson-team-roster .roster-uniform-size-container").html(render);

        var rosters = RosterPanel.teamRoster;

        if (rosters.length > 0) {
            _.map(rosters, function(roster) {
                if (roster.rosters.length > 0) {
                    $("#richardson-team-roster .uniform-size-button[data-size='"+ roster.size +"'][data-category='"+ roster.category +"']").addClass("selected");
                }
            });

            $("#richardson-team-roster .uniform-size-button.selected").first().trigger("click");
        }
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

    prepareRosterSummary: function() {
        var data = RosterPanel.teamRoster;
        var summary = [];
        _.each(data, function(item) {
            if (item.rosters.length > 0) {
                var sort_numbers = _.pluck(_.sortBy(item.rosters, "number"), "number");
                summary.push({
                    size: item.size,
                    category: item.category,
                    numbers2: _.sortBy(item.rosters, "number")
                    numbers: sort_numbers.join(", ")
                });
            }
        });

        var template = document.getElementById("m-richardson-team-roster-summary").innerHTML;
        var render = Mustache.render(template, {
            rosters: summary,
        });

        $("#richardson-team-roster .roster-summary").html("");
        $("#richardson-team-roster .roster-summary").html(render);
    },

    saveRosterData: function (size, category, rosters) {
        var find = this.find(size, category);

        if (typeof find !== "undefined") {
            _.each(rosters, function(item) {
                var isPresent = _.find(find.rosters, {number: item.number.toString()});
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
            var info = _.find(roster.rosters, {size: size, number: number.toString()});
            _.delay(function() {
                if (typeof info !== "undefined") {
                    info.number = number.toString();
                    info.qty = quantity;
                    info.lastName = last_name;
                }
            }, 500)

            console.log(info)
        }
    }
}