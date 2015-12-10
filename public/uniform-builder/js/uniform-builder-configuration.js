$(document).ready(function(){

    // Version 1, .... or Edge, for global feature flipping, should be more minute in the future
    // https://blog.travis-ci.com/2014-03-04-use-feature-flags-to-ship-changes-with-confidence/
    // using this now to disable thumbnail generation instead of deleting / commenting code which can still be used in the future

    ub.VERSION = "1";

    ub.config.feature_flags = {

        ui: {
                // For ub.funcs.createDraggable @ uniform-builder-applications.js
                draggable_applications: false, 
                hotspots: true, 
            },    

    };

    ub.config.isFeatureOn = function (namespace, feature) {

        var flag = ub.config.feature_flags[namespace][feature];

        if( typeof flag !== 'boolean') {
            console.warn("Feature Flag (" + namespace + "-" + feature + ") doesn't exist");
            return false;
        }

        return flag;

    }

    ub.config.print_version = function () {

        var args = [
            '\n %c %c %c Uniform Builder ' + ub.VERSION + ' - ✰ ' + 'Prolook' + ' ✰  %c ' + ' %c ' + ' http://www.prolook.com/  %c %c ♥%c♥%c♥ \n\n',
            'background: #3d3d3d; padding:5px 0;',
            'background: #3d3d3d; padding:5px 0;',
            'color: #ffffff; background: #030307; padding:5px 0;',
            'background: #3d3d3d; padding:5px 0;',
            'background: #acacac; padding:5px 0;',
            'background: #3d3d3d; padding:5px 0;',
            'color: #fff; background: #fff; padding:5px 0;',
            'color: #fff; background: #fff; padding:5px 0;',
            'color: #fff; background: #fff; padding:5px 0;',
        ];

        window.console.log.apply(console, args);

    }



});
