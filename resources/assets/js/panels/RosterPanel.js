function RosterPanel() {

}

RosterPanel.events = {
    isInit: true,

    init: function() {
        var that = this;
        if (that.isInit) {
            $("#right-pane-column").on("click", ".richardson-footer .manage-team-roster", that.onShowRoster);

            that.isInit = false;
        }
    },
    // Show roster
    onShowRoster: function() {
        UIkit.modal("#richardson-team-roster").show();
    }
}