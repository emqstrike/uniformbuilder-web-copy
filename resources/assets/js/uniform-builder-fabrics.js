$(document).ready(function() {

	ub.fabric = {};

    ub.fabric.fabricSelectionBlocks = {
        
        items: [
            {
                blockPattern: ["PTS Pro Select Raglan", "PTS Pro Select Sleeveless"],
                layers: [98, 99, 100, 101],
            }, 
            {
                blockPattern: ["PTS Signature Raglan"],
                layers: [98, 99, 100, 101, 102, 103],
            }, 
        ],

        isFabricSelectionEnabled: function () {

            var _result = _.filter(ub.fabric.fabricSelectionBlocks.items, function (item) {
                return _.includes(item.blockPattern, ub.config.blockPattern)
            });

            return _result;

        },

    }

    ub.fabric.defaultFabric = function () {

        var _highlightsAndShadows = _.filter(ub.current_material.materials_options, function (mo) { 
            return (mo.name === "Highlights" || mo.name === "Shadows") && mo.default_asset === 1;
        });

        var _filteredFields =_.map(_highlightsAndShadows, function (mo) {
            return {
                name: mo.name,
                layer: mo.layer_level,
                default_asset: mo.default_asset,
                perspective: mo.perspective, 
            }
        });

        var _uniqIDS = _.uniq(_.pluck(_filteredFields, "layer"));
        
        ub.utilities.info('Activating Fabric ids: ');
        ub.utilities.info(_uniqIDS);

        if (_.contains(_uniqIDS, 98)) {
            return "one";
        } else if (_.contains(_uniqIDS, 100)) {
            return "two";
        } else if (_.contains(_uniqIDS, 102)) {
            return "three";
        } else {
            return "none";
        }

    };

    ub.fabric.initFabric = function () {

        var _defaultFabric = ub.fabric.defaultFabric();

        if (_defaultFabric === "one") { ub.fabric.fabricOne(); }
        if (_defaultFabric === "two") { ub.fabric.fabricTwo(); }
        if (_defaultFabric === "three") { ub.fabric.fabricThree(); }

        ub.utilities.info('Initializing fabric function...')

    };

	ub.fabric.testFabric = function () {

		// 103 - 102: Highlights / Shadows 
		// 101 - 100: Highlights / Shadows

	}

	// 98 - 99
    // ub.fabric.fabricCollections is being filled at ubjs@ub.setup_material_options

	ub.fabric.fabricOne = function () {
		_.each(ub.fabric.fabricCollections, function (fc) {

            if (fc.id === 98 || fc.id === 99) { fc.obj.visible = true; }

            if (fc.id === 100 || fc.id === 101) { fc.obj.visible = false; }
            if (fc.id === 102 || fc.id === 103) { fc.obj.visible = false; }

        });
	}

	// 101 - 100
	ub.fabric.fabricTwo = function () {

		_.each(ub.fabric.fabricCollections, function (fc) {

			if (fc.id === 100 || fc.id === 101) { fc.obj.visible = true; }

            if (fc.id === 98 || fc.id === 99) { fc.obj.visible = false; }
			if (fc.id === 102 || fc.id === 103) { fc.obj.visible = false; }

		});

	}

	// 103 - 102
	ub.fabric.fabricThree = function () {

		_.each(ub.fabric.fabricCollections, function (fc) {

			if (fc.id === 103 || fc.id === 102) { fc.obj.visible = true; }

            if (fc.id === 98 || fc.id === 99) { fc.obj.visible = false; }
			if (fc.id === 100 || fc.id === 101) { fc.obj.visible = false; }

		});

	}

	ub.fabric.fabricInitSample = function () {

		ub.fabric.fabricTwo();
        
        // ub.fabric.activateFabrics();
		
		$('span.table-btn').fadeIn();
		$('span.table-btn').on('click', function () {
			ub.fabric.activateFabrics();
		});

        if (ub.config.blockPattern === "PTS Pro Select Raglan" || ub.config.blockPattern === "PTS Pro Select Sleeveless") { 
            console.log('Hiding Mixed Button');
            $('span#mixed').fadeOut();
        } else {
            console.log('Mixed Button Shown');
        }

	}

	ub.fabric.activateFabrics = function (application_id) {

        ub.funcs.beforeActivateApplication();

        if ($('div#primaryPatternPopup').is(':visible')) { return; }
        if ($('div#primaryMascotPopup').is(':visible'))  { return; }

        ub.funcs.beforeActivateApplication();

        if (!ub.funcs.okToStart()) { return; }

        ub.funcs.activatePanelGuard();

        $('div#changeApplicationUI').remove();

        ub.funcs.deactivatePanels();
      
        var _htmlBuilder    = "";

        _htmlBuilder        =  '<div id="applicationUI" data-application-id="-1">';
        _htmlBuilder        +=      '<div class="header">';
        _htmlBuilder        +=      '<div class="body">';
        _htmlBuilder        +=          '<div class="cover"></div>';
        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=				'Fabric Change Test';
        _htmlBuilder        +=          '</div>';

        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=              '<button class="fabric-button" id="solid">Solid (98 - 99)</button>';
        _htmlBuilder        +=          '</div>';


        _htmlBuilder        +=          '<div class="ui-row">';
        _htmlBuilder        +=				'<button class="fabric-button active" id="all-mesh">All Mesh (100 - 101)</button>';
        _htmlBuilder        +=          '</div>';

        if (ub.config.blockPattern !== "PTS Pro Select Raglan" && ub.config.blockPattern !== "PTS Pro Select Sleeveless") { 

            _htmlBuilder        +=          '<div class="ui-row">';
            _htmlBuilder        +=				'<button  class="fabric-button" id="mixed">Mixed (102 - 103)</button>';
            _htmlBuilder        +=          '</div>';

        }

        _htmlBuilder        +=          '<div class="clearfix"></div>';
        _htmlBuilder        +=      '</div>';
        _htmlBuilder        += "</div>";

        $('.modifier_main_container').append(_htmlBuilder);

        //// Events

            /// Applications Color Events

            $('button.fabric-button').on('click', function () {

            	var _id = $(this).attr('id');

            	$('button.fabric-button').removeClass('active');

                if (_id === "solid") {
                    ub.fabric.fabricOne();
                } else if (_id === "all-mesh") {
					ub.fabric.fabricTwo();
            	} else if (_id === "mixed") {
            		ub.fabric.fabricThree();
            	}

            	$(this).addClass('active');

            });

            /// End Application Pattern Events

        //// Events   

        $('div#applicationUI').fadeIn();

        /// End Initialize

    }

    ub.fabric.init = function () {

        if (ub.fabric.fabricSelectionBlocks.isFabricSelectionEnabled().length > 0) { ub.fabric.fabricInitSample(); }
        if (ub.current_material.material.brand === "richardson") { ub.fabric.initFabric(); }

    }

    /// Executable Portion

        ub.funcs.addFunctionToAfterloadList(ub.fabric.init);

    ///

});