$(document).ready(function() {

    // TODO: Have getter, setter and locking functions here to track changes and prevent races

    ub.status = {};
    ub.status.manipulatorDown = false;

    ub.status.fullView = {

        active: false,

        getStatus: function () {

            return this.active;

        }, 

        setStatus: function (status) {

            this.active = status;
            return this.getStatus();

        }

    };


    ub.status.gaFontTool = {

        active: false,

        getStatus: function () {

            return this.active;

        }, 

        setStatus: function (status) {

            this.active = status;
            return this.getStatus();

        }

    };

    /// Used in temporarily cancelling rendering while sprites hasn't been constructed

    ub.status.render = {

        renderFrames: true,

        getRenderStatus: function () {

            return this.renderFrames;

        },

        setRenderStatus: function (status) {

            this.renderFrames = status;
            return this.getRenderStatus();

        }

    }

});