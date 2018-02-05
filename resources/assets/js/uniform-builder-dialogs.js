$(document).ready(function () {

	// For Use with Custom Artwork Request

	ub.status.mascotPopupVisible = false;
    ub.funcs.createMascotPopupUpload = function (applicationType, mascot, settingsObj) {

    	// Overrides  

    		applicationType = undefined;
    		mascot = undefined;
    		settingsObj = undefined; 

    	// End Overrides 

        var mascot_category = undefined;
        var mascots_group_category = undefined;

        mascot_category = _.find(ub.data.mascots_categories, {name: mascot.category});
        mascots_group_category = _.find(ub.data.mascots_groups_categories, { name: mascot_category.group_name });

        ub.status.mascotPopupVisible = true;

        var sampleSize = '1.9em';
        var paddingTop = '40px';

        var data = {
            label: 'Choose Mascot: ',
            mascots: _.filter(ub.data.mascots, {active: "1", category: 'Bulldogs'}),
            categories: _.sortBy(ub.data.mascots_categories, 'name'),
            groups_categories: _.sortBy(ub.data.mascots_groups_categories, 'name'),
            paddingTop: paddingTop,
        };

        var template = $('#m-new-mascot-popup').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        $popup = $('div#primaryMascotPopup');
        $popup.fadeIn();

        $('div.patternPopupResults > div.item').hover(

          function() {
            $( this ).find('div.name').addClass('pullUp');
          }, function() {
            $( this ).find('div.name').removeClass('pullUp');
          }

        );

        /// Type Ahead

        var _mascotNames = _.pluck(ub.data.mascots, "name");

        $('input.mascot_search').typeahead({
          hint: true,
          highlight: true,
          minLength: 1
        },
        {
          name: 'Mascots',
          source: ub.funcs.substringMatcher(_mascotNames),
        });

        $('.patternPopupResults').isotope({
          // options
          itemSelector: '.item',
          layoutMode: 'fitRows'
        });

        $('.patternPopupResults').isotope({ filter: '.all' });

        $('input.mascot_search').on('change', function (){

            var _term = $(this).val().toLowerCase();
            var _mascots = _.filter(ub.data.mascots, function(mascot){ return mascot.name.toLowerCase().indexOf(_term.toLowerCase()) !== -1; });

            var data = {
                category: '',
                mascot_category_id: '',
                mascots: _mascots,
            };

            var template = $('#m-new-mascot-items').html();
            var markup = Mustache.render(template, data);

            $('div.main-content').scrollTo(0);
            $('div.patternPopupResults').html(markup);

             $('div.patternPopupResults > div.item').on('click', function () {

                var _id = $(this).data('mascot-id');

                ub.funcs.changeMascotByID(_id, settingsObj);

            });

        });

        $('span.category_item').on('click', function (){

            var _dataCategory = $(this).data('category');
            
            $('.patternPopupResults').isotope({ filter: "." + _dataCategory });

            $('span.category_item').removeClass('active_category');
            $(this).addClass('active_category');

            $('div.patternPopupResults > div.item').hover(

                function() {
                  $( this ).find('div.name').addClass('pullUp');
                }, function() {
                  $( this ).find('div.name').removeClass('pullUp');
                }

            );

        });

        /// End Type Ahead

            $('div.patternPopupResults > div.item').hover(

                function() {
                  $( this ).find('div.name').addClass('pullUp');
                }, function() {
                  $( this ).find('div.name').removeClass('pullUp');
                }

            );

        $('span.groups_category_item').on('click', function () {

            var _groups_category_id = ($(this).data('category')).toString();
            var _groups_category_name = $(this).data('category-name');
            var _categories = _.filter(ub.data.mascots_categories, {mascots_group_category_id: _groups_category_id});

            if (_groups_category_id === "all") {

                $('div.popup_header').html("Mascots: All");
                return;

            }

            var data = {
                categories: _.sortBy(_categories, 'name'),
            };

            var template = $('#m-new-mascot-popup-categories').html();
            var markup = Mustache.render(template, data);

            $('div.popup_header').html("Mascots: " + _groups_category_name);
            $('div.categories').html(markup);
            $('div.groups_categories').hide();
            $('div.categories').fadeIn();

            $('div.patternPopupResults > div.item').hover(

                function() {
                  $( this ).find('div.name').addClass('pullUp');
                }, function() {
                  $( this ).find('div.name').removeClass('pullUp');
                }

            );

            $('span.category_item').on('click', function () {

                var _category_id = $(this).data('category');
                var _category_name = $(this).data('category-name');
                var _current = $('div.popup_header').html();

                $('span.category_item').removeClass('active');
                $(this).addClass('active');

                $('div.popup_header').html('MASCOTS: ' + _groups_category_name + ', ' + _category_name );

                if (_category_id === "back") {

                    $('div.categories').hide();
                    $('div.groups_categories').fadeIn();
                    
                    $('div.popup_header').html('MASCOTS');

                    return;

                }

                var _mascots = _.filter(ub.data.mascots, {category: _category_name});

                var data = {
                    category: _category_name,
                    mascot_category_id: _category_id,
                    mascots: _.sortBy(_mascots, 'name'),
                };

                var template = $('#m-new-mascot-items').html();
                var markup = Mustache.render(template, data);

                $('div.main-content').scrollTo(0);

                $('div.patternPopupResults').html(markup);

                $('div.patternPopupResults > div.item').hover(

                    function() {
                      $( this ).find('div.name').addClass('pullUp');
                    }, function() {
                      $( this ).find('div.name').removeClass('pullUp');
                    }

                );

                $('div.patternPopupResults > div.item').on('click', function () {

                    var _id = $(this).data('mascot-id');

                    ub.funcs.changeMascotByID(_id, settingsObj);

                });

            });

        });

        $('div.patternPopupResults > div.item').on('click', function () {

            var _id = $(this).data('mascot-id');

            ub.funcs.changeMascotByID(_id, settingsObj);
            $('div#primaryMascotPopup').remove();
            ub.status.mascotPopupVisible = false;

        });

        $('span.mascot-tab').on('click', function () {

            var _btn = $(this).data('button');

            $('span.mascot-tab').removeClass('active');
            $(this).addClass('active');

        });

        ub.funcs.centerPopups();

        $('div.close-popup, span.close-popup').on('click', function (){

            $popup.remove();
            ub.status.mascotPopupVisible = false;

        });

        $popup.bind('clickoutside', function () {

            var _status = $(this).data('status');

            if (_status === 'hidden') {

                $(this).data('status', 'visible');
                return;

            }

            $(this).data('status', 'hidden');
            $(this).hide();
            $(this).remove();
            ub.status.mascotPopupVisible = false;

        });


        /// Custom Artwork Request

            $('span[data-button="browse"]').on('click', function () {

                $('div.upload').fadeOut();

            }); 

            $('span[data-button="upload"]').on('click', function () {

                $('div.upload').fadeIn();

            });    

            $("input#custom-artwork").change( function() {

                // if (this.files && this.files[0]) {

                //     var reader = new FileReader();

                //     console.log('This Files: ');
                //     console.log(this.files);

                //     reader.onload = function (e) {

                //         console.log('Uploaded (e): ');
                //         console.log(e);
                        
                //         $('img#preview').attr('src', e.target.result);
                //         ub.uploadLogo(e.target.result);

                //     }

                //     reader.readAsDataURL(this.files[0]);

                // }

                if (this.files && this.files[0]) {

                    var _filename = ub.funcs.fileUpload(this.files[0], settingsObj, function (filename) {

                        // TODO: Implement Assignment here to remove global variable [window.uploaded_filename]

                    });
                    
                }

            });

            $('span.ok_btn').on('click', function () {

                if ($(this).attr('data-status') === "ok") {

                    ub.current_material.settings.custom_artwork = window.uploaded_filename;

                    var _additionalNotes = $('textarea[name="custom-artwork-additional-notes"]').val();

                    settingsObj.customLogo = true;
                    settingsObj.customFilename = window.uploaded_filename;
                    settingsObj.additionalNotes = _additionalNotes;

                    $popup = $('div#primaryMascotPopup');
                    $popup.remove();
                    ub.funcs.changeMascotByID('1038', settingsObj, window.uploaded_filename, _additionalNotes);

                }
                
            }); 

        /// End Custom Artwork Request 

        /// Select current mascot

            $('span.groups_category_item[data-category-name="' + mascots_group_category.name + '"]').click();
            $('span.category_item[data-category-name="' + mascot_category.name + '"]').click();
            $('div.item[data-mascot-id="' + mascot.id + '"]').addClass('active');

            if (typeof settingsObj.customFilename !== "undefined" && settingsObj.customFilename.length > 0) {

                $('textarea[name="custom-artwork-additional-notes"]').val(settingsObj.additionalNotes);
                $('img#preview').attr('src', settingsObj.customFilename);
                $('span[data-button="upload"]').trigger('click');

            }
            
        /// End After load Events

    }

});