$(document).ready(function(){

    // Version 1, .... or Edge, for global feature flipping, should be more minute in the future
    // https://blog.travis-ci.com/2014-03-04-use-feature-flags-to-ship-changes-with-confidence/
    // using this now to disable thumbnail generation instead of deleting / commenting code which can still be used in the future

    ub.VERSION = "1";

    ub.config.feature_flags = {

        ui: {
                // For ub.funcs.createDraggable @ uniform-builder-applications.js
                draggable_applications: true, 
                hotspots: true, 
                drag_limits: false, 
                scale_text: false, 
                hotspot_applications: true, 
            },

    };

    // Primarily used for other brands, so we can use all colors
    // without breaking the team color setup used for a number of features 

    // Feature Flag Mapping
    ub.config.features = {

        uniforms: {
            betaSportUniforms: false,
            priceItemName: false,
            testOrders: false,
            tackeTwillCustomSizes: false,
        },

        setState: function (section, property, state) {

            if (typeof this[section] === "undefined") { ub.utilities.error('Feature Section [' + section + '] not found'); }
            if (typeof this[section][property] === "undefined") { ub.utilities.error('Feature Section [' + section + '][' + property + '] not found'); }

            this[section][property] = state;

            ub.displayDoneAt('Setting the feature [' + section + ' / ' + property + '] to ' + state);

            return this[section][property];

        },

        isOn: function (section, property) {

            if (typeof this[section] === "undefined") { ub.utilities.error('Feature Section [' + section + '] not found'); }
            if (typeof this[section][property] === "undefined") { ub.utilities.error('Feature Section [' + section + '][' + property + '] not found'); }

            return this[section][property];

        }

    };

    ub.config.setFeatureFlag = function (featureName, cb) {

        var _url;
        var _data;
        var _featurePoint = ub.data.locations.getUrl('feature');

        _data = {
            "user_id": ub.user.id,
            "feature": featureName,
        };

        if (typeof _featurePoint === "undefined") { return; }
        _url = ub.config.api_host + _featurePoint.url;

        $.ajax({
            url: _url,
            type: "POST", 
            data: JSON.stringify(_data),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',

            success: function (response){

                var _structure;

                _structure = ub.data.featureFlagCodes.getCode(featureName);
                ub.config.features.setState(_structure.section, _structure.code, response.success);

                if (typeof cb !== "undefined") { cb(response); }

            }
        });

    };

    ub.config.setFeatureFlags = function () {

        ub.config.setFeatureFlag('Beta Sport Uniforms');
        ub.config.setFeatureFlag('Show price items of uniforms');
        ub.config.setFeatureFlag('Test Orders');
        ub.config.setFeatureFlag('Tackle Twill Custom Sizes');
        
    }

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
            '\n %c %c %c ✰ ' + 'Prolook Uniform Builder v' + ub.VERSION +  ' ✰  %c ' + ' %c ' + ' ENV: ' + ub.config.app_env + ' | Host: ' +  ub.config.host + ' | API: ' + ub.config.api_host + ' %c %c %c\n\n',
            'background: #3d3d3d; padding:5px 0;',
            'background: #3d3d3d; padding:5px 0;',
            'color: #fff; background: #030307; padding:5px 0;',
            'color: #3d3d3d; background: #3d3d3d; padding:5px 0;',
            'color: #3d3d3d; background: #acacac; padding:5px 0;',
            'color: #3d3d3d; background: #3d3d3d; padding:5px 0;',
            'color: #fff; background: #3d3d3d; padding:5px 0;',
            'color: #fff; background: #3d3d3d; padding:5px 0;',
        ];

        window.console.log.apply(console, args);

    }

    // Brand Rules

    // enable application's Scale Tool for the ff. brand
    ub.config.enableScaleToolOnApplications = function (brand) {
        var brands = ['Richardson'];
        return _.contains(brands, brand);
    }

    // ignore font rules for twill and subli uniforms
    ub.config.ignoreFontRulesOnSublimatedAndTwill = function (brand) {
        var brands = ['Richardson'];
        return _.contains(brands, brand);
    }

    // end Brand Rules

});
