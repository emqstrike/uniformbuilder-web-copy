function RosterPanel() {

}

RosterPanel.teamRoster = [];

RosterPanel.events = {
    isInit: true,

    init: function() {
        var that = this;
        if (that.isInit) {
            $("#right-pane-column").on("click", ".richardson-footer .manage-team-roster", that.onClickManageRoster);
            $("#richardson-team-roster").on("click", ".uniform-size-button", that.onClickUniformSize);
            $("#richardson-team-roster").on("click", ".player-number-button", that.onClickPlayerNumber);
            $("#richardson-team-roster").on("keypress", ".roster-uniform-name, .roster-uniform-number, .roster-uniform-qty", _.debounce(that.onUpdateRosterInfo, 100));
            $("#richardson-team-roster").on("click", ".remove-player-info", that.onRemoveRoster);
            $("#richardson-team-roster").on("click", ".save-roster", that.onClickSaveRoster);
            $("#richardson-team-roster").on("click", ".click-player-number", that.onClickSummaryPlayerNumber);

            $("#richardson-team-roster").on("beforehide", function() {
                $("#property-modifiers-menu .menu-item").first().trigger("click");
            })

            $("#richardson-team-roster").on("change", ".application-sizing-container .application-sizing-item select", that.onChangeSize)
            $("#richardson-team-roster").on("click", ".application-sizing-container .application-sizing-item .application-size-type", that.onChangeApplicationSizeType);
            $("#richardson-team-roster").on("click", ".add-player", that.onClickAddPlayer);
            $("#richardson-team-roster").on("click", ".save-application-sizing", that.onSaveApplicationSizing);
            that.isInit = false;
        }
    },
    // Show roster
    onShowRoster: function() {
        if (ub.funcs.isLower()) {
            RosterPanel.events.setupRosterForPant();
            RosterPanel.events.prepareUniformSizes();
        } else {
            RosterPanel.events.prepareUniformSizes();
            RosterPanel.events.preparePlayerNumbers();
            RosterPanel.events.onHoverPlayerNumberActive();
        }

        RosterPanel.events.prepareApplicationSizing();
        UIkit.modal("#richardson-team-roster").show();
        UIkit.switcher("#richardson-team-roster .active-bgc-red-switcher").show(0);
    },

    onSaveApplicationSizing: function() {
        
        if (_.size(ub.current_material.settings.roster) <= 0) {
            $.smkAlert({
                text: 'Please edit your roster',
                type: 'info'
            });
            UIkit.switcher("#richardson-team-roster .active-bgc-red-switcher").show(0);
        } else {
            UIkit.modal("#richardson-team-roster").hide();
            $("#right-pane-column .richardson-footer .uniform-summary-preview").trigger("click");
        }
    },

    onClickAddPlayer: function() {
        var active_size = $("#richardson-team-roster .uniform-size-button.uk-active").data("size");
        var category = $("#richardson-team-roster .uniform-size-button.uk-active").data("category");

        if (typeof active_size !== "undefined" && typeof category !== "undefined") {
            var data = [];
            data.push({
                size: active_size,
                number: "-",
                qty: 1,
                lastName: "",
                category: category
            });

            RosterPanel.events.saveRosterData(active_size, category, data);
            var roster = RosterPanel.events.find(active_size, category);
            RosterPanel.events.prepareRosterList(roster.rosters);
        }
    },

    onClickManageRoster: function() {
        $("#property-modifiers-menu .menu-item-roster").trigger("click");
    },

    onHoverPlayerNumber: function() {
        var active_size = $("#richardson-team-roster .uniform-size-button.uk-active").data("size");
        var category = $("#richardson-team-roster .uniform-size-button.uk-active").data("category");
        var number = $(this).data("number");
    },

    onClickPlayerNumber: function() {
        if ($(this).hasClass("selected")) {
            return;
        }
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
                var findNumber = _.find(ub.data.playerNumbers, {number: number.toString()});
                if (typeof findNumber !== "undefined") {
                    numbers.push({
                        size: active_size,
                        number: $(this).data("number").toString(),
                        qty: 1,
                        lastName: "",
                        category: category
                    });
                }

                ub.funcs.setNumberStatus(active_size, category, $(this).data("number"), 'selected');
                $(this).addClass("uk-active");
                $(this).attr("data-size", active_size);
                $(this).attr("data-category", category);
            }
        } else {
            return;
        }

        RosterPanel.events.saveRosterData(active_size, category, numbers);
        var roster = RosterPanel.events.find(active_size, category);
        RosterPanel.events.prepareRosterList(roster.rosters);
        RosterPanel.events.prepareRosterSummary();
        RosterPanel.events.onHoverPlayerNumberActive();
    },

    //On Click Uniform Size
    onClickUniformSize: function() {
        var size = $(this).data("size");
        var category = $(this).data("category");
        $(".roster-uniform-size-container .uniform-size-button.uk-active").removeClass("uk-active");
        $(this).addClass("uk-active");
        if (ub.funcs.isLower()) {
            // Add 
            var roster = RosterPanel.events.find(size, category);
            if (typeof roster !== "undefined") {
                RosterPanel.events.prepareRosterList(roster.rosters);
            } else {
                var data = [];
                data.push({
                    size: size,
                    number: "-",
                    qty: 1,
                    lastName: "",
                    category: category
                });
                RosterPanel.events.saveRosterData(size, category, data);
                var roster = RosterPanel.events.find(size, category);
                RosterPanel.events.prepareRosterList(roster.rosters);
            }

            $(this).addClass("selected");
        } else {
            RosterPanel.events.preparePlayerNumbers(size, category);
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

            RosterPanel.events.onHoverPlayerNumberActive();
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
        UIkit.switcher("#richardson-team-roster .active-bgc-red-switcher").show(1);
    },

    onClickSummaryPlayerNumber: function() {
        var size = $(this).data("size")
        var number = $(this).data("number")
        var category = $(this).data("category")

        var uniform_size = $("#richardson-team-roster .uniform-size-button[data-size='"+ size +"'][data-category='"+ category +"']");

        if (!uniform_size.hasClass("uk-active")) {
            uniform_size.trigger("click");
        }

        _.delay(function() {
            $(".roster-player-list-table .player-info").removeClass("active");
            $(".roster-player-list-table .player-info[data-size='"+ size +"'][data-category='"+ category +"'][data-number='"+ number +"']").addClass("active");
            $(".roster-player-list-table tbody").scrollTo("tr.player-number-" + number, { duration: 100 });
        }, 50)
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
        ub.funcs.setNumberStatus(undefined, undefined, number, 'free');
        
        RosterPanel.events.prepareRosterSummary();
    },

    onUpdateRosterInfo: function() {
        var container = $(this).closest(".player-info")
        var size = container.find(".roster-uniform-size").val();
        var last_name = container.find(".roster-uniform-name").val();
        var number = container.find(".roster-uniform-number").val();
        var quantity = container.find(".roster-uniform-qty").val();
        var category = container.data("category");
        var index = $(this).closest('tr').index();

        RosterPanel.events.updateRoster(size, last_name, number, quantity, category, index);
    },

    // Application Sizing Events
    onChangeApplicationSizeType: function() {
        var code = $(this).closest(".application-sizing-item").data("code");
        var type = $(this).val();

        var settingsObject = ub.funcs.getApplicationSettings(code);
        if (typeof settingsObject !== "undefined") {
            settingsObject.size_type = type;
        }

        var sizingObject = RosterPanel.events.getApplicationSizingObject(code);
        if (typeof sizingObject !== "undefined") {
            sizingObject.size_type = type;
        }
    },

    onChangeSize: function () {
        var code = $(this).closest(".application-sizing-item").data("code");
        var size = $(this).val();

        var settingsObject = ub.funcs.getApplicationSettings(code);
        if (typeof settingsObject !== "undefined") {
            settingsObject.application_size = size;
        }

        var sizingObject = RosterPanel.events.getApplicationSizingObject(code);
        if (typeof sizingObject !== "undefined") {
            sizingObject.application_size = size;
        }
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

    preparePlayerNumbers: function(size, category) {
        var template = document.getElementById("m-richardson-roster-player-number").innerHTML;
        var render = Mustache.render(template, {
            numbers: ub.data.playerNumbers,
            size: size,
            category: category
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
            var numbers = [];
            _.each(item.rosters, function(item) {
                if (item.number !== "00") {
                    numbers.push(parseInt(item.number));
                } else {
                    numbers.push(item.number);
                }
            });

            if (item.rosters.length > 0) {
                summary.push({
                    size: item.size,
                    category: item.category,
                    numbers: _.sortBy(numbers),
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
                if (ub.funcs.isLower()) {
                    find.rosters.push(item);
                } else {
                    var isPresent = _.find(find.rosters, {size: item.size, number: item.number.toString(), category: item.category});
                    if (typeof isPresent === "undefined") {
                        find.rosters.push(item);
                    }
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

    updateRoster: function(size, last_name, number, quantity, category, index) {
        var roster = this.find(size, category);
        var info;
        if (typeof roster !== "undefined") {
            info = roster.rosters[index];
            _.delay(function() {
                if (typeof info !== "undefined") {
                    info.number = number.toString();
                    info.qty = quantity;
                    info.lastName = last_name;
                }
            }, 500)
        }
    },

    onHoverPlayerNumberActive: function() {
        $("#richardson-team-roster .player-number-button").unbind("hover");
        $("#richardson-team-roster .player-number-button").hover(function() {
            var number = $(this).data("number");
            var active_size = $(".roster-uniform-size-container .uniform-size-button.uk-active").data("size");
            var category = $(".roster-uniform-size-container .uniform-size-button.uk-active").data("category");
            var html =  "";
            var info;

            if ($(this).hasClass("uk-active") || $(this).hasClass("selected")) {
                var roster = RosterPanel.events.find(active_size, category);
                if (typeof roster !== "undefined") {
                        info = _.find(roster.rosters, {size: active_size, number: number.toString()});
                    if (typeof info !== "undefined") {
                        html = "NO. " + info.number + " - " + info.size + ' - ' + info.qty + " pcs" + " - " + info.lastName;
                    }
                }

                $("#richardson-team-roster .player-info-preview").html("")
                $("#richardson-team-roster .player-info-preview").html(html)
            }
        }, function() {
            $("#richardson-team-roster .player-info-preview").html("")
        })
    },

    prepareApplicationSizing: function () {
        var that = this;
        var applications = [];
        var _uniformCategory = ub.current_material.material.uniform_category
        var _alias = ub.data.sportAliases.getAlias(_uniformCategory);

        _.map(ub.current_material.settings.applications, function(app) {
            var obj = {};
            var appSizes = ub.funcs.getRichardsonApplicationSizes(app);

            if (typeof appSizes === "undefined") {
                appSizes = {};
                appSizes.sizes = ub.data.defaultApplicationSizes;
            }

            if (typeof app.application_size === "undefined") {
                app.application_size = "best_fit";
            }

            if (typeof app.size_type === "undefined") {
                app.size_type = "tall";
            }

            if (app.application_type === "team_name" || app.application_type === "player_name") {
                obj = {
                    code: app.code,
                    type: app.application.name,
                    accent: app.accent_obj.title,
                    thumbnail: '/images/sidebar/' + app.accent_obj.thumbnail,
                    text: app.text,
                    font: app.font_obj.name,
                    colors: app.color_array,
                    isEmbellishment: false,
                    sizes: appSizes.sizes,
                    size_type: app.size_type,
                    application_size: app.application_size

                }
            } else if (app.application_type === "front_number" || app.application_type === "back_number" || app.application_type === "sleeve_number") {
                obj = {
                    code: app.code,
                    type: app.application.name,
                    accent: app.accent_obj.title,
                    thumbnail: '/images/sidebar/' + app.accent_obj.thumbnail,
                    text: app.text,
                    font: app.font_obj.name,
                    colors: app.color_array,
                    isEmbellishment: false,
                    sizes: appSizes.sizes,
                    size_type: app.size_type,
                    application_size: app.application_size
                }
            } else if (app.application_type === "embellishments") {
                obj = {
                    code: app.code,
                    type: app.logo_type + " " + "logo",
                    name: app.embellishment.name,
                    thumbnail: app.embellishment.png_filename,
                    details: ub.config.host + '/utilities/preview-logo-information/' + app.embellishment.design_id,
                    isEmbellishment: true,
                    sizes: appSizes.sizes,
                    size_type: app.size_type,
                    application_size: app.application_size
                }
            }

            applications.push(obj);
            ub.current_material.settings.applicationSizing.push({
                code: app.code,
                size_type: app.size_type,
                application_size: app.application_size
            });
        });

        var template = document.getElementById("m-richardson-application-item").innerHTML;
        var render = Mustache.render(template, {
            applications: applications,
        });
        $(".application-sizing-container table.applications-sizing-table tbody").html("");
        $(".application-sizing-container table.applications-sizing-table tbody").html(render);

        _.delay(function() {
            RosterPanel.events.setupApplicationSizing();
        }, 1000)
    },

    getApplicationSizingObject: function(code) {
        var sizing = _.find(ub.current_material.settings.applicationSizing, {code: code.toString()});
        return sizing;
    },

    setupApplicationSizing: function() {
        var sizing = ub.current_material.settings.applicationSizing;
        _.map(sizing, function(size) {
            var container = $("#richardson-team-roster .application-sizing-container table.applications-sizing-table tbody tr.application-sizing-item[data-code='"+ size.code +"']");
            container.find(".application-size-type[value='"+ size.size_type +"']").trigger("click")
            container.find("select option[value='"+ size.application_size +"']").prop("selected", true);
        });
    },

    setupRosterForPant: function() {
        var template = document.getElementById("m-richardson-roster-pants").innerHTML;
        var render = Mustache.render(template);
        $("#richardson-team-roster .roster-main-container").html("");
        $("#richardson-team-roster .roster-main-container").html(render);
    }

}