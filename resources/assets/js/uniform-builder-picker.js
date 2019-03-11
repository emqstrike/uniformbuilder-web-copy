$(document).ready(function () {

	ub.picker = {
		isNew: false
	}

	ub.data.secondaryBarLabelsV2 = {

        items: [
            {
                sport: 'Wrestling',
                type: 'both',
                upperLabel: 'Singlet',
                lowerLabel: 'Fight Shorts',
            },
            {
                sport: 'Wrestling 2018',
                type: 'both',
                upperLabel: 'Singlets & Tops',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Volleyball',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Compression Shorts',
            },
            {
                sport: 'Crew Socks (Apparel)',
                type: 'lower',
                lowerLabel: 'Crew Sock',
            },
            {
                sport: 'Compression (Apparel)',
                type: 'upper',
                upperLabel: 'Compression',
            },
            {
                sport: 'Tech-Tee (Apparel)',
                type: 'upper',
                upperLabel: 'Tech-Tee',
            },
            {
                sport: 'Cinch Sack (Apparel)',
                type: 'upper',
                upperLabel: 'Cinch Sack',
            },
            {
                sport: 'Hoodie (Apparel)',
                type: 'upper',
                upperLabel: 'Hoodie',
            },
            {
                sport: 'Quarter Zip Jacket (Apparel)',
                type: 'upper',
                upperLabel: 'Quarter Zip Jacket',
            },
            {
                sport: 'Polo (Apparel)',
                type: 'upper',
                upperLabel: 'Polo',
            },
            {
                sport: 'Soccer',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Lacrosse',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Shorts',
            },
            {
                sport: '2017 Team Short with Pockets (Apparel)',
                type: 'lower',
                lowerLabel: ' Team Short',
            },
            {
                sport: 'Signature Coaches Short (Apparel)',
                type: 'lower',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Socks (Apparel)',
                type: 'lower',
                lowerLabel: 'Socks',
            },
            {
                sport: 'Wrestling Compression Shorts (Apparel)',
                type: 'lower',
                lowerLabel: 'Shorts',
            },
            {
                sport: 'Game Day Jackets (Apparel)',
                type: 'upper',
                upperLabel: 'Jacket',
            },
            {
                sport: 'Cage Jacket (Apparel)',
                type: 'upper',
                upperLabel: 'Jackets',
            },
            {
                sport: 'Fan Replica Jersey (Apparel)',
                type: 'upper',
                upperLabel: 'Jersey',
            },
            {
                sport: 'Compression Pant (Apparel)',
                type: 'lower',
                lowerLabel: ' Pants',
            },
            {
                sport: 'Football 2017',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: 'Pants',
            },
            {
                sport: 'Yoga Pant (Apparel)',
                type: 'lower',
                lowerLabel: ' Pants',
            },
            {
                sport: 'Hockey',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: ' Socks',
            },
            {
                sport: 'SFN Jogger (Apparel)',
                type: 'lower',
                lowerLabel: ' Pants',
            },
            {
                sport: 'Tennis',
                type: 'both',
                upperLabel: 'Jersey',
                lowerLabel: ' Shorts',
            },
            // eSports Uniform
            {
                sport: 'Tech Tee (eSports)',
                type: 'upper',
                lowerLabel: ' Jersey',
            },
            {
                sport: 'Polo (eSports)',
                type: 'upper',
                lowerLabel: ' Jersey',
            },
            {
                sport: 'Hoodie (eSports)',
                type: 'upper',
                lowerLabel: ' Jersey',
            },
            
        ],
        getLabel: function (sport) {

            var _result = _.find(this.items, {sport: sport});

            if (typeof _result === "undefined") { ub.utilities.info('Secondary Bar Labels not found for ' + sport); }

            return _result;

        }

    }

	ub.funcs.initPicker = function () {

		if (ub.config.picker_version == 'NEW') {
			ub.picker.isNew = true;
		}
    }

    ub.funcs.initPicker();

    ub.funcs.prepareSecondaryBarV2 = function (sport, gender) {

    	$('a.picker-slink[data-type="upper"]').show();
    	$('a.picker-slink[data-type="lower"]').show();

        var labels = ub.data.secondaryBarLabelsV2.getLabel(sport);

        if (typeof labels != "undefined") {

            if (labels.type == "upper") {

            	$('a.picker-slink[data-type="upper"]').html(labels.upperLabel);
            	$('a.picker-slink[data-type="lower"]').hide();

            } else if (labels.type == "lower") {
                
                $('a.picker-slink[data-type="upper"]').hide();
                $('a.picker-slink[data-type="lower"]').html(labels.lowerLabel);

            } else if (labels.type == "both") {

                $('a.picker-slink[data-type="upper"]').html(labels.upperLabel);
                $('a.picker-slink[data-type="lower"]').html(labels.lowerLabel);

            }

        } else {
        	$('a.picker-slink[data-type="upper"]').html('Jersey');
            $('a.picker-slink[data-type="lower"]').html('Pants');
        }


    }

});