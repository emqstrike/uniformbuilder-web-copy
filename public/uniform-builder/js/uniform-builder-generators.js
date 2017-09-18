$(document).ready(function() {

    ub.generators = {};
    ub.generators.phData = "";

    function tabAndNewline (str) {

        return "\t" + str + "\n";

    }

    function newlineEnd (str) {

        return str + '\n';

    }

    /// To generate
    /// Put in a json object, stringify and slice
    /// JSON.stringify(jsonObject).slice(1, -1);

    ub.generators.generatePlaceholderOverrides = function () {

        var _forGen = ['32', '33', '9', '10', '2', '5'];
        var _applications = ub.current_material.settings.applications;
        var _markup = '';

        var _tempArray = [];

        _.each (_applications, function (applicationObj) {
            
            _.each(applicationObj.application.views, function (view) {
                
                // String Rep
                _markup += newlineEnd("{");
                _markup += tabAndNewline('sport: "' + ub.current_material.material.uniform_category + '",');
                _markup += tabAndNewline('blockPattern: "' + ub.current_material.material.block_pattern + '",');
                _markup += tabAndNewline('part: "' + applicationObj.application.layer + '",');
                _markup += tabAndNewline('perspective: "' + view.perspective + '",');
                _markup += tabAndNewline('position: {x: ' + view.application.center.x + ', y: ' + view.application.center.y + '},');
                _markup += tabAndNewline('rotation: ' + view.application.rotation + ',');
                _markup += '},';

                // JSON Rep
                var _element = {
                    sport: ub.current_material.material.uniform_category,
                    blockPattern: ub.current_material.material.block_pattern,
                    part: applicationObj.application.layer,
                    perspective: view.perspective,
                    position: {x: view.application.center.x, y: view.application.center.y},
                    rotation: view.application.rotation,
                }

                _tempArray.push(_element);

            });
            
            var _structure = {
                items: _tempArray,
            }

            ub.generators.phData = JSON.stringify(_tempArray);
            
        });

        var dialog = bootbox.dialog({
            title: 'Generate PHA Settings',
            message: '<div class="generator-container"><textarea class="code">' + _markup + '</textarea><button class="btn post-this">Save Placeholder Applications</button></div>',
        });

        dialog.init(function() {

            $('button.post-this').unbind('click');
            $('button.post-this').on('click', function () {

                ub.generators.updateBlockPattern(ub.generators.phData);

            });

        });

        dialog.show();

    }

    /// Post Field  

    ub.generators.updateBlockPattern = function (phData) {

        var _id = ub.current_material.material.block_pattern_id;
        var _placeholderOverrides = phData;

        var _postData = {
            "id" : _id,
            "placeholder_overrides": phData,
        };

        var _url = 'http://api-dev.qstrike.com/api/block_pattern/update';
        //delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

        $.ajax({
            
            url: _url,
            type: "POST", 
            data: JSON.stringify(_postData),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {

                ub.utilities.info('Response: ');
                ub.utilities.info(response);

                bootbox.alert("Placeholder Overrides Updated!");

            }
            
        });

    }

    /// End Post Field 

});