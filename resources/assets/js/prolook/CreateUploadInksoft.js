function CreateUploadInksoft() {

}

CreateUploadInksoft.events = {
    isInit: true,
    application: undefined,

    init: function(application) {
        var self = this;

        if (self.isInit) {
            $("#create-upload-inksoft-modal").on("click", ".modal-menu-mascot-header .mascot-menu-button", self.onChangeTab);
            $("#create-upload-inksoft-modal").on("click", ".cancel-mascot", self.onCancelCustomMascot)
            self.isInit = false;
        }

        if (typeof ub.data.newApplication !== "undefined") {
            CreateUploadInksoft.events.application = ub.data.newApplication;
        }

        if (typeof application !== "undefined") {
            CreateUploadInksoft.events.application = application;
        }

        CreateUploadInksoft.funcs.loadCreateDesign();
        UIkit.modal("#create-upload-inksoft-modal").show();
    },

    onChangeTab: function() {
        var type = $(this).data("type");

        if (type === "upload") {
            CreateUploadInksoft.funcs.loadUploadDesign();
        } else if (type === "create") {
            CreateUploadInksoft.funcs.loadCreateDesign();
        }
    },

    onCancelCustomMascot: function() {
        var application = ub.data.newApplication;
        if (!ub.data.isEditing) {
            if (typeof application !== "undefined") {
                ub.funcs.deleteLocation(application.code);
                ub.data.newApplication = undefined;
            }
        }

        ub.data.isEditing = false;

        if (typeof ub.data.newApplication !== "undefined") {
            ub.funcs.activateEmbellishments(application.code);
        }
    }
}

CreateUploadInksoft.funcs = {
    loadUploadDesign: function() {
        $("#embed-inksoft-upload").html("");
        var element = document.getElementById("embed-inksoft-upload");
        var application = CreateUploadInksoft.events.application;

        if (typeof application !== "undefined") {
            Inksoft.funcs.loadInksoftUploader(element, application.code);
        } else {
            console.log("Cannot find application");
        }
    },

    loadCreateDesign: function() {
        $("#embed-inksoft-create").html("");
        var element = document.getElementById("embed-inksoft-create");
        var application = CreateUploadInksoft.events.application

        if (typeof application !== "undefined") {
            Inksoft.funcs.loadInksoftDesigner(element, application.code);
        } else {
            console.log("Cannot find application");
        }
    }
}
