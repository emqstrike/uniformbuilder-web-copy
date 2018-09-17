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
        ub.fabric.activateFabrics();
		
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

});