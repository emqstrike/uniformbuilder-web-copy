function RichardsonSaveDesign() {

}

RichardsonSaveDesign.events = {
    isInit: true,

    init: function() {
        var that = this;
        if (RichardsonSaveDesign.events.isInit) {
            $("#right-pane-column").on('click', '.richardson-footer .save-uniform', that.onClickSaveDesign);
            RichardsonSaveDesign.events.isInit = false;
        }
    },


    onClickSaveDesign: function() {
        console.log("SAVED DESIGN INITRT")
        UIkit.modal("#richardson-saved-design").show();
    }
}