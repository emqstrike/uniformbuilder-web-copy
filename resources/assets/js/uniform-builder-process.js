$(document).ready(function() {

    ub.funcs.isSocks = function () {

        if (typeof ub.current_material.material === "undefined") { return false; }

        return ub.funcs.isCurrentSport("Crew Socks (Apparel)") || ub.funcs.isCurrentSport("Socks (Apparel)") || ub.funcs.isCurrentSport("Socks (Quickturn)");
    }

    ub.funcs.isFootball = function () {

        return ub.config.sport === "Football" || ub.config.sport === "Football 2017";

    };

    ub.funcs.isLower = function () {

        return ub.config.type === "lower";

    }

    ub.funcs.fadeOutCustomizer = function () {



    }

    ub.funcs.fadeInCustomizer = function () {

        $('div#roster-input').fadeOut();

        $('div#right-pane-column').fadeIn();
        $('div#left-pane-column').fadeIn();

    }

    ub.funcs.addSizesTabs = function (size, cancelNumberPopup) {

        $('span.tabButton[data-size="' + size + '"]').css('display','inline-block');
        $('span.tabButton:visible').first().trigger('click');
        $('span.size[data-size="' + size + '"]').attr('data-status','on');

        // var _rosterSize = _.find(ub.current_material.settings.roster, {size: size});

        if ($('tr.roster-row[data-size="' + size + '"]').length === 0) {

            $('span.tabButton[data-size="' + size + '"]').trigger('click');

            if (typeof cancelNumberPopup === "undefined") {

                $('span.add-player[data-size="' + size + '"]').trigger('click');

            }

        }

        if ($('span.tabButton[data-category="youth"]:visible').length > 0) {
            $('span.youth-header').show();
        }
        else {
            $('span.youth-header').hide();
        }

        if ($('span.tabButton[data-category="adult"]:visible').length > 0) {
            $('span.adult-header').show();
        }
        else {
            $('span.adult-header').hide();
        }

    }

    ub.funcs.removeSizesTabs = function (size) {

        $('span.tabButton[data-size="' + size + '"]').hide();
        $('span.size[data-size="' + size + '"]').attr('data-status','off');
        $('span.tabButton:visible').first().trigger('click');
        $('div.tab[data-size="' + size + '"]').hide();

        if ($('span.tabButton[data-category="youth"]:visible').length > 0) {
            $('span.youth-header').show();
        }
        else {
            $('span.youth-header').hide();
        }

        if ($('span.tabButton[data-category="adult"]:visible').length > 0) {
            $('span.adult-header').show();
        }
        else {
            $('span.adult-header').hide();
        }

    }

    ub.funcs.getActiveSizes = function () {

        var _activeSizes = [];

        $('span.size[data-status="on"]').each (function () {

            var _size = $(this).data('size').toString();

            _activeSizes.push(_size);

        });

        return _activeSizes;

    }


    ub.funcs.reInitHover = function () {

        $('tr.roster-row').hover(
            function() {
                $(this).addClass("row-hover");
            }, function() {
                $(this).removeClass("row-hover");
            }
        );

    }

    ub.funcs.centerNumberSelectionPopup = function () {

        $popup = $('div#numbersPopup');
        $popup.fadeIn();

        if ($popup.length === 0) { return; }

        var _wWidth     = window.innerWidth;
        var _wHeight    = window.innerHeight;
        var _pWidth     = $popup.width();
        var _pHeight    = $popup.height();

        var _left       = (_wWidth - _pWidth) / 2;
        var _top        = (_wHeight - _pHeight) /2;

        $popup.css({

            top: _top,
            left: _left,

        });

    };

    ub.funcs.setNumberStatus = function (number, status) {

        var _numberObj = _.find(ub.data.playerNumbers, { number: number.toString() });
        _numberObj.status = status;

    }

    ub.funcs.hideColumns = function () {

        // Hide lastname, sleevetype and lastname application on everything except football
        // !ub.funcs.isFootball() ||
        if (!ub.data.numberPopupExcemptions.isValid(ub.config.sport, ub.config.type)) {

            $('th.sleevetype, th.lastnameapplication, td.sleevetype, td.lastnameapplication').hide();

        }

        // Hide Lastname on Socks
        if (ub.funcs.isSocks()) {

            $('td.PlayerLastNameInput, th.thlastname').hide();

        }

        // hide the the table row 'Sleeve Type' and 'Last Name Application' in roster form if the uniform is Socks and except for Hockey Socks.
        if (ub.funcs.isSocks() && ub.config.blockPattern !== 'Hockey Sock') {
            // header th td
            $('td.sleevetype, th.wide.sleevetype').hide();
            $('td.lastnameapplication, th.wide.lastnameapplication').hide();
        }

        // Hide Player Number on Wrestling and Socks
        if (!ub.funcs.isCurrentSport('Wrestling') && !ub.funcs.isSocks()) {

            $('td.PlayerNumberInput, th.thPlayerNumberInput').show();

        } else {

            $('td.PlayerNumberInput, th.thPlayerNumberInput').hide();

        }

    }

    ub.funcs.updateSelect = function (_size, _length) {

        var $trRow = $('tr.roster-row[data-size="' + _size + '"][data-index="' + _length + '"]');

        $trRow.find('select.sleeve-type').val($('select.default-sleeve-type').val());
        $trRow.find('select.lastname-application').val($('select.default-lastname-application').val());

    }

    ub.funcs.createNumbersSelectionPopup = function (_size) {

        $('body').scrollTo(0);
        $('div#numbersPopup').remove();

        var _htmlBuilder = "";

        _htmlBuilder += '<div id="numbersPopup" data-status="visible">';
        _htmlBuilder +=     '<div class="header">';
        _htmlBuilder +=         'SELECT PLAYER NUMBERS';
        _htmlBuilder +=     '</div>';

        _.each (ub.data.playerNumbers, function (_number){

            _htmlBuilder +=     '<span class="number ' + _number.status + '" data-status="' + _number.status + '" data-number="' + _number.number + '">'
            _htmlBuilder +=        _number.number;
            _htmlBuilder +=     '</span>';

        });

        _htmlBuilder += '<br />';
        _htmlBuilder += '<span class="preview">Preview: </span> <span class="btn-cancel">Cancel</span> <span class="btn-ok">OK</span>';
        _htmlBuilder += '</div>';

        $('body').append(_htmlBuilder);
        ub.funcs.centerNumberSelectionPopup();
        $('div#numbersPopup').fadeIn();

        $('span.number.free, span.number.selected').on('click', function () {

            var _number = $(this).data('number');
            var _status = $(this).data('status');

            if (_status === 'selected') {

                $(this).data('status','free');
                $(this).removeClass('selected');
                $(this).addClass('free');

            } else if (_status === 'free' ) {

                $(this).data('status','selected');
                $(this).removeClass('free');
                $(this).addClass('selected');

            }

        });

        $('span.number.used').hover(function() {

            var _number     = $(this).data('number');
            var $tr         = $('input[name="number"][value="' + _number + '"]').parent().parent();
            var _size       = $tr.find('input[name="size"]').val();
            var _lastname   = $tr.find('input[name="lastname"]').val();
            var _index      = $tr.data('index');

            $('span.preview').html(_index + '. ' +_size + ' - ' + _lastname);

        }, function() {

            $('span.preview').html('Preview');

        });

        $('span.btn-cancel').on('click', function () {

            $('div#numbersPopup').remove();

        });

        $('span.btn-ok').on('click', function () {

            var _returnValue = [];

            $('span.number').each(function(){

                if ($(this).data('status') === 'selected') {

                    var _number = $(this).data('number');
                    ub.funcs.setNumberStatus(_number,'used');
                    _returnValue.push(_number);

                }

            });

            numbers = _returnValue;

            var _markup         = '';
            var $rosterTable    = $('table.roster-table[data-size="' + _size + '"] > tbody');
            var _length         = $rosterTable.find('tr').length;

            _.each (numbers, function (number){

                data = {
                    index: _length,
                    size: _size,
                    number: number,
                };

                template = $('#m-roster-table-field').html();
                markup = Mustache.render(template, data);

                $.when($rosterTable.append(markup)).then(ub.funcs.updateSelect(_size, _length));

                _length += 1;

            });

            if (
                !ub.funcs.isFootball() ||
                (ub.funcs.isFootball() && ub.current_material.material.factory_code === "BLB") ||
                ub.current_material.material.price_item_code === "FBMJ"
            )
            {
                $('select.lastname-application').attr('disabled','disabled');
                $('select.lastname-application').val('None');

                $('select.sleeve-type').attr('disabled','disabled');
                $('select.sleeve-type').val('Motion Cut');

            }
            else {

                $('select.lastname-application').removeAttr('disabled');
                $('select.sleeve-type').removeAttr('disabled');

            }

            ub.funcs.hideColumns();

            // Remove Roster Item
            $('span.clear-row[data-size="' + _size + '"]').unbind('click');
            $('span.clear-row[data-size="' + _size + '"]').on('click', function () {

                var _index = $(this).data('index');
                var _size = $(this).data('size');
                ub.funcs.bindRemoveRosterItemButton(_index, _size);

            });

            ub.funcs.reInitHover();
            $('div#numbersPopup').remove();

        });

    };

    ub.funcs.bindRemoveRosterItemButton = function(index, size) {
        var $table = $('table.roster-table[data-size="' + size + '"] > tbody');
        var $row = $('tr[data-size="' + size + '"][data-index="' + index + '"]');
        var number = $row.find('input[name="number"]').val();

        ub.funcs.setNumberStatus(number, 'free');

        $row.remove();

        $('table.roster-table[data-size="' + size + '"] > tbody').find('tr.roster-row').each(function (indexVar){

            var index_id = indexVar + 1;

            $(this).find('td').first().html(index_id);
            $(this).find('span.clear-row').attr('data-index', index_id);
            $(this).attr('data-index', index_id);

        });
    };

    ub.funcs.extractFields = function (row) {

        var _index               = row.data('index');
        var _size                = row.find('input.size').val();
        var _lastname            = row.find('input.lastname').val();
        var _number              = row.find('input.number').val();
        var _quantity            = row.find('input.quantity').val();
        var _sleeveType          = row.find('select.sleeve-type').val();
        var _lastNameApplication = row.find('select.lastname-application').val();

        if (!ub.funcs.isFootball()) {

            _sleeveType = 'N/A';

        }

        return {

            index: _index,
            lastname: _lastname,
            size: _size,
            number: _number,
            quantity: _quantity,
            sleeveType: _sleeveType,
            lastNameApplication: _lastNameApplication,
            sample: 0,

        }

    }

    ub.funcs.validName = function (value) {

        var _valid = true;

        if (!value.trim().length > 0) {

            _valid = false;

        }

        return _valid;

    }

    ub.funcs.validQuantity = function (value) {

        var _valid = true;

        if (!parseInt(value) > 0) {

            _valid = false;

        }

        return _valid;

    }

    ub.funcs.rosterValid = function () {

        var _valid          = true;
        var _messages       = [];
        var _roster         = [];

        $('tr.roster-row').each (function () {

            var $row            = $(this);
            var _values         = ub.funcs.extractFields($row);
            var _message        = '';
            var _validName      = ub.funcs.validName(_values.lastname);
            var _validQuantity  = ub.funcs.validQuantity(_values.quantity);
            var _indexLabel     = _values.index + '. ' + _values.size + ' (#' + _values.number + ')';

            _valid              = true;

            if (!_validQuantity) {

                _valid = false;
                _message = _indexLabel + ' - ' + 'Invalid Quantity' + '<br />';
                _messages.push(_message);

            }

            if (!_valid) {

                $row.css('background-color', 'red');

            } else {

                $row.css('background-color', 'white');

            }

            if(_.includes(ub.funcs.getActiveSizes(),_values.size)) {

                _roster.push(_values);

            }

        });

        return { valid: _valid, messages: _messages, roster: _roster }

    }

    ub.funcs.showRosterForm = function () {

        $('div#order-form').fadeOut();
        $('div#roster-input').fadeIn();

    }

    ub.funcs.hideRosterAndOrderForm = function () {

        $('div#order-form').fadeOut();
        $('div#roster-input').fadeOut();

    }

    ub.funcs.prepareSizingTable = function () {

        var _footballSizingTable = [];

        _.each (ub.current_material.settings.roster, function (roster) {

            var _sleeveType = roster.sleeveType.toUpperCase();

            var _cutEntry = _.find(_footballSizingTable, {sleeveType: _sleeveType});
            var _rosterSize;

            if (typeof _cutEntry === "undefined") {

                _footballSizingTable.push({
                    sleeveType: _sleeveType,
                    sizes: [],
                });

                _cutEntry = _.find(_footballSizingTable, {sleeveType: _sleeveType});

            }

           _rosterSize = _.find(_cutEntry.sizes, {size: roster.size});

            if (typeof _rosterSize === "undefined") {

                _cutEntry.sizes.push({size: roster.size, items: [], total: 0, sizeString: "" });
                _rosterSize = _.find(_cutEntry.sizes, {size: roster.size});

            }

            _rosterSize.items.push({

                sleeveType: _sleeveType,
                size: roster.size,
                number: roster.number,

            });

            _rosterSize.total += parseInt(roster.quantity);
            _rosterSize.sizeString += roster.number + ", ";

        });

        _.each(_footballSizingTable, function (entry, entryKey) {

            _.each(_footballSizingTable[entryKey].sizes, function (record, recordKey) {

                record.sizeString = record.sizeString.substring(0, record.sizeString.length - 2);

            });

        });

        ub.current_material.settings.sizingTable = _footballSizingTable;
        ub.current_material.settings.sizingTableHTML = ub.utilities.buildTemplateString("#m-sizing-table", {entries: ub.current_material.settings.sizingTable});

    }

    ub.funcs.getTotalQuantity = function () {

        var _total = 0;
        var _prepareSize = [];

        _.each (ub.current_material.settings.roster, function (roster) {

            _total += parseInt(roster.quantity);

            var _obj = _.find(_prepareSize, {size: roster.size});

            if (typeof _obj === "undefined") {

                _prepareSize.push({size: roster.size, quantity: 0 });
                _obj = _.find(_prepareSize, {size: roster.size});

            }

            _obj.quantity +=  parseInt(roster.quantity);

        });

        ub.current_material.settings.size_breakdown = _prepareSize;

        return _total;

    }

    ub.funcs.isOrderFormValid = function () {

        return true;

    }

    ub.funcs.submitFeedback = function (_data) {

        var test = false;

        if(test) {
            console.log('DATA===>', _data);
        } else {
            var _user_id = ub.user.id;
            var _user_email = ub.user.email;

            if (typeof _user_id === "undefined") {
                _user_id = 0;
                _user_email = _data.email;
            }

            var _postData = {
                "subject" : "Feedback",
                "order_code" : "",
                "content" : _data.message,
                "type" : "feedback",
                "email" : _user_email,
                "name" : _data.name,
                "screenshot": _data.screenshot,
                "material_id": _data.material_id,
                "saved_design_id": _data.saved_design_id
            };

            // pass user id only when a user is logged in
            if (typeof ub.user.id !== "undefined") { _postData.user_id = _user_id; }

            // pass material id if exist
            // if (_material_id !== -1) { _postData.material_id = _material_id; }

            // pass saved design id if exist
            // if (typeof ub.config.savedDesignInfo !== "undefined") { _postData.saved_design_id = ub.config.savedDesignInfo.savedDesignID }

            var _url = ub.config.api_host + '/api/feedback';
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

                    // ub.funcs.reload();
                    console.log('FEEDBACK FORM SUBMITTED!', response);

                }

            });
        }

    }

    ub.funcs.feedbackFormFromOrder = function (initMessage, imgFront, imgLeft, imgRight, imgBack, redirectLink) {

        // unbind before opening window
        window.onbeforeunload = null;

        var data = {
            message: initMessage,
            imgFront: imgFront,
            imgLeft: imgLeft,
            imgRight: imgRight,
            imgBack: imgBack,
        };

        var template = $('#m-feedback-form').html();
        var markup = Mustache.render(template, data);

        $('body').append(markup);

        if (markup.indexOf('saved') > -1) {
            $('div.feedback-form').find('h4').html('Order Saved Successfully!');
        }

        $('div.feedback-form').fadeIn();
        ub.funcs.centerPatternPopup();

        $('span.ok-btn').on('click', function () {

            var _message = $('textarea#feedback-message').val().trim();

            if (_message.length !== 0) {

                ub.funcs.submitFeedback(_message);

            }

            $('div.feedback-form').remove();

            window.location = redirectLink;

        });

        $('span.cancel-btn').on('click', function () {

            $('div.feedback-form').remove();

        });

    }

    ub.funcs.reload = function () {

        window.location = ub.config.host;

    }

    ub.funcs.imageUpload  = function (file, callback) {

        var formData = new FormData();

        formData.append('file', file);

        if (typeof $.ajaxSettings.headers !== "undefined") {
            delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
        }

        $.ajax({

            data: formData,
            url: ub.config.api_host + "/api/fileUpload",
            type: "POST",
            processData: false,  // tell jQuery not to process the data
            contentType: false,
            crossDomain: true,
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response){

                if(response.success) {

                    // var _extension = response.filename.split('.').pop();
                    window.uploaded_filename = response.filename;
                    callback(response.filename);
                    console.log('[ub.funcs.imageUpload]===>', response.filename);

                }
                else {

                    callback(undefined);
                    console.log('Error Uploading Image');
                    console.log(response.message);

                }

            }

        });

    }

    ub.funcs.prepareImagesPreview = function () {

        ub.front_view.visible = true;
        ub.back_view.visible = true;
        ub.left_view.visible = true;
        ub.right_view.visible = true;
        var _front = ub.getThumbnailImage2('front_view');
        var _back = ub.getThumbnailImage2('back_view');
        var _left = ub.getThumbnailImage2('left_view');
        var _right = ub.getThumbnailImage2('right_view');
        var _frontImage = "<img src ='" + _front + "' alt='...' class='img-thumbnail img-responsive front' />" ;
        var _backImage = "<img src ='" + _back + "' alt='...' class='img-thumbnail img-responsive back' />" ;
        var _leftImage = "<img src ='" + _left + "' alt='...' class='img-thumbnail img-responsive left' />" ;
        var _rightImage = "<img src ='" + _right + "' alt='...' class='img-thumbnail img-responsive right' />" ;
        ub.frontPreview = _frontImage;
        ub.backPreview = _backImage;
        ub.leftPreview = _leftImage;
        ub.rightPreview = _rightImage;
        // ub.showModalTool(_str);

    }

    ub.funcs.freeFeedbackForm = function () {

        ub.feedbackForm = false;
        $('a#feedback').on('click', function () {

            var data = {};

            var template = $('#m-feedback-form-free').html();
            var markup = Mustache.render(template, data);

            $('body').append(markup);

            //     $('div.free-feedback-form').fadeIn();

            if(ub.feedbackForm)
            {
                // do nothing, dont show form if already shown
                console.log('[feedback form is already shown]');
                $('div.free-feedback-form').each(function( index ) {
                    // console.log( index + ": " + $(this) );
                    if (index !== 0) {
                        $(this).remove();
                    }
                });
            } else {
                console.log('[showing feedback form]');

                // this shows the feedback modal form not the commented fade in above
                ub.funcs.centerPatternPopup();

                // $('div.free-feedback-form').fadeIn();
                ub.feedbackForm = true;

                // set value if user is logged in
                if(ub.user) {
                    var fullname = ub.utilities.decodeHtmlEntity(ub.user.fullname);
                    $('#feedback-form .name').val(fullname).attr('disabled','disabled');
                    $('#feedback-form .email').val(ub.user.email).attr('disabled','disabled');
                }

                // set value of material id if exist
                if(ub.config.material_id !== -1) {
                    $('#feedback-form .materialId').val(ub.config.material_id).attr('disabled','disabled').prev().find('small').hide();
                }

                //set the value of saved design id if exist
                if (typeof ub.config.savedDesignInfo !== "undefined") {
                    $('#feedback-form .savedDesignId').val(ub.config.savedDesignInfo.savedDesignID).attr('disabled','disabled').prev().find('small').hide();
                }

                ub.funcs.prepareImagesPreview();

                if(ub.user) {
                    if(ub.current_material.id === -1) {

                    } else {
                        if (ub.frontPreview) {
                            // process perspective preview
                            var _imagePreview = ("<div class='row'>" +
                                "                   <div class='col-md-12'>" +
                                ub.frontPreview +
                                ub.backPreview +
                                ub.leftPreview +
                                ub.rightPreview +
                                "                   </div>" +
                                "                 </div><br/>");

                            $('.feedback-left-panel').prepend(_imagePreview);
                        }
                    }
                }

                $('span.ok-btn').on('click', function () {
                    
                    // initialized plugin and validate feedback form fields using parsley.js, a client side validation plugin.
                    $('#feedback-form').parsley().validate();
                    if($('#feedback-form').parsley().isValid() === false) { return false; }; 

                    var _name          = $('#feedback-form .name').val().trim();
                    var _email         = $('#feedback-form .email').val().trim();
                    var _message       = $('#feedback-form .message').val().trim();
                    var _materialId    = $('#feedback-form .materialId').val().trim();
                    var _savedDesignId = $('#feedback-form .savedDesignId').val().trim();
                    var _upload        = $('img.img-thumbnail.upload')[0].src;

                    if (_upload === 'https://i.imgur.com/aB8nl6x.png') { _upload = ''; }

                    var _data = {
                        name: _name,
                        email: _email,
                        message: _message,
                        screenshot: _upload,
                        material_id: _materialId,
                        saved_design_id: _savedDesignId
                    };

                    ub.funcs.submitFeedback(_data);
                    $('div.free-feedback-form').remove();
                    ub.feedbackForm = false;
                    $.smkAlert({text:'Your message has been successfully sent.', type:'success', time:3});

                });

                $('span.cancel-btn').on('click', function () {

                    $('div.free-feedback-form').remove();
                    ub.feedbackForm = false;

                });

                $('.upload-btn').on('click', function(){ $('#file-input-upload').trigger('click'); });

                // image validation - inksoft supported file types are: [png/bmp/jpeg/jpg/tiff/pdf/eps/svg/ai]
                // isImage() returns boolean.
                function isImage(file) {
                   var imageTypes = [ 
                       'image/png', 
                       'image/bmp', 
                       'image/jpeg', 
                       'image/tiff', 
                       'image/gif', 
                       'image/svg+xml', 
                       // 'application/postscript', 
                       // 'application/pdf'
                       ];
                    return imageTypes.includes(file.type);
                }

                // onchange file input value
                $('#file-input-upload').on('change', function(){
                    // validate file if image.
                    if (isImage(this.files[0]) === false) {
                        var message = 'You have uploaded an invalid image file type.';
                        $.smkAlert({text: message, type:'warning', time: 5, marginTop: '80px'});
                        return false;
                    }

                    $('.upload-btn').find('i').removeClass('fa-cloud-upload').addClass('fa-refresh fa-spin');
                    ub.funcs.imageUpload(this.files[0], function(filename) {
                        if (typeof filename === 'undefined') {
                            $('.upload-btn').find('i').removeClass('fa-refresh fa-spin').addClass('fa-cloud-upload');
                            $.smkAlert({text: 'Error Uploading File', type:'warning', time: 3, marginTop: '80px'});
                        } else {
                            $('.upload-btn').find('i').removeClass('fa-refresh fa-spin').addClass('fa-cloud-upload');
                            $('img.img-thumbnail.upload')[0].src = filename;
                        }
                    });
                });

            }

        });

    }

    ub.funcs.freeFeedbackForm();

    var _viewOrderLink = '';
    var _message = '';

    ub.funcs.postOrderData = function (data, url) {

        var _postData   = data;
        var _url        = url;

        $('span.submit-order').fadeOut();
        $('span.processing').fadeIn();

        delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

        $.ajax({

            url: _url,
            type: "POST",
            data: JSON.stringify(_postData),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response) {

                _viewOrderLink = ub.config.host + '/order/view/' + response.order_code;

                ub.funcs.betaFeaturesChecker('New PDF', function() {
                    // re run pdf service to update with order code
                    ub.pdfService.preview_data.orderId = response.order_code;
                    ub.pdfService.preview_data.searchKey = response.order_code;
                    console.log('UPDATED PREVIEW DATA', ub.pdfService.preview_data);
                }, function() { console.log('LEGACY logged via success'); });

            }
        }).done(function() {

            ub.funcs.betaFeaturesChecker('New PDF', function() {
                console.log('POST ORDER DATA GENERATE PDF');
                ub.funcs.pdfService(true, ub.pdfService.preview_data);
            }, function() { console.log('LEGACY logged via done'); });

            $('div#validate-order-form').remove();
            $('span.processing').fadeOut();
            $('.order-dialog').fadeOut();
            $('.modal-backdrop').fadeOut();

            _message = "Your order is now submitted for processing. A ProLook representative will be reaching out shortly to confirm your order and help finish the ordering process.";

            if (data.order.submitted === 0) {
                _message = "Your order is now saved. You can work on it later by going to [My Orders] and submit it when you are done.";
            }

            ub.funcs.feedbackFormFromOrder(_message, ub.current_material.settings.thumbnails.front_view, ub.current_material.settings.thumbnails.left_view, ub.current_material.settings.thumbnails.right_view, ub.current_material.settings.thumbnails.back_view, _viewOrderLink);

        });

    };

    ub.funcs.setToPending = function () {

        var _url = ub.endpoints.getFullUrlString('updateArtworkStatus');

        $.ajax({

                url: _url,
                data: JSON.stringify({id: ub.config.orderIDParent, artwork_status: 'pending' }),
                type: "POST",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response) {

                    ub.utilities.info('Sucessfully reset artwork status');

                    var _viewOrderLink = ub.config.host + '/order/view/' + ub.config.orderCode;
                    var _message = '';

                    $('div#validate-order-form').remove();
                    $('span.processing').fadeOut();

                    // Go to view order details form after submission
                    window.location = _viewOrderLink;

                }

            });

    }

    ub.funcs.updateOrderItemField = function (object) {

        var _url = ub.endpoints.getFullUrlString('updateOrderItem');

        if (typeof $.ajaxSettings.headers !== "undefined" && typeof $.ajaxSettings.headers["X-CSRF-TOKEN"] !== "undefined") {
            delete $.ajaxSettings.headers["X-CSRF-TOKEN"];
        }

        $.ajax({

            url: _url,
            data: JSON.stringify(object),
            type: "POST",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response) {

                ub.utilities.info('Updated!');
                ub.funcs.resetArtworkStatusToPending();

            }

        });

    }

    ub.funcs.hasCustomArtworkRequests = function () {

        var _result = false;
        _.each(ub.current_material.settings.applications, function (app) {

            if (app.customLogo) { _result = true; }

        });

        return _result;

    }

    ub.funcs.resetArtworkStatusToPending = function () {

        if (ub.funcs.hasCustomArtworkRequests()) {
            ub.funcs.setToPending();
        }

    }

    ub.funcs.resubmitOrderForm = function () {

        ub.funcs.updateOrderItemField({
            id: parseInt(ub.config.orderID),
            builder_customizations: JSON.stringify(ub.current_material.settings),
        });

    }

    // action variable contents are in the ub.constants.order_actions.*
    ub.funcs.submitOrderForm = function (action) {

        var _rosterFormValid    = ub.funcs.isOrderFormValid();

        if (!_rosterFormValid) {

            ub.startModal('Please Complete Order Form Details');
            return;

        }

        var _notes                  = $('textarea#additional-notes').val();
        var _attachments            = [];

        var _factoryCode            = ub.current_material.material.factory_code;
        var _sleeveCut              = '';
        var _lastnameApplication    = '';
        var _itemID                 = parseInt(ub.current_material.material.item_id);
        var _blockPatternID         = parseInt(ub.current_material.material.block_pattern_id);
        var _neckOption             = ub.neckOption;
        var _uniformName            = ub.current_material.material.name;

        var _clientOrgName          = $('input[name="client-organization"]').val();
        var _clientName             = $('input[name="client-name"]').val();
        var _clientEmail            = $('input[name="client-email"]').val();
        var _clientPhone            = $('input[name="client-phone"]').val();
        var _clientFax              = $('input[name="client-fax"]').val();
        var _athleticDirector       = $('input[name="athletic-director"]').val();

        var _billingOrganization    = $('input[name="billing-organization"]').val();
        var _billingContactName     = $('input[name="billing-contact-name"]').val();
        var _billingEmail           = $('input[name="billing-email"]').val();
        var _billingPhone           = $('input[name="billing-phone"]').val();
        var _billingFax             = $('input[name="billing-fax"]').val();

        var _billingAddress         = $('input[name="billing-address"]').val();
        var _billingCity            = $('input[name="billing-city"]').val();
        var _billingState           = $('select[name="billing-state"]').val();
        var _billingZip             = $('input[name="billing-zip"]').val();

        var _shippingOrganization    = $('input[name="shipping-organization"]').val();
        var _shippingContactName     = $('input[name="shipping-contact-name"]').val();
        var _shippingEmail           = $('input[name="shipping-email"]').val();
        var _shippingPhone           = $('input[name="shipping-phone"]').val();
        var _shippingFax             = $('input[name="shipping-fax"]').val();

        var _shippingAddress         = $('input[name="shipping-address"]').val();
        var _shippingCity            = $('input[name="shipping-city"]').val();
        var _shippingState           = $('select[name="shipping-state"]').val();
        var _shippingZip             = $('input[name="shipping-zip"]').val();

        var _transformedRoster      = [];

        if (typeof ub.current_material.settings.custom_artwork === "undefined") {

            ub.current_material.settings.custom_artwork = "";

        }

        _.each (ub.current_material.settings.roster, function (_roster){

            if (_factoryCode === "BLB") {

                _sleeveCut  = "Motion";
                _lastnameApplication = 'N/A';

            }
            else {

                _sleeveCut  = _roster.sleeveType,
                _lastnameApplication = _roster.sleeveType;

            }

            var _obj = {
                Size: _roster.size,
                Number: _roster.number,
                Name: _roster.lastname,
                Sample: 0,
                LastNameApplication: _lastnameApplication,
                SleeveCut: _sleeveCut,
                Quantity: _roster.quantity,
            }

            _transformedRoster.push(_obj);

        });

        var _user_id = ub.user.id;

        if (typeof _user_id === "undefined") {
            _user_id = 0;
        }

        var _type = ub.config.uniform_application_type.toTitleCase();
        var _submitted = '1';
        if (action == ub.constants.order_actions.SAVE_ORDER) {
            _submitted = 0;
        }

        var orderInput = {

            action: action,

            order: {

                brand: ub.current_material.material.brand,
                client: _clientName,
                submitted: _submitted,
                user_id: _user_id,
                user_name: ub.user.fullname,
                origin: ub.config.app_env,
                test_order: ub.funcs.submitAsTestOrder(),

            },
            athletic_director: {

                organization: _clientOrgName,
                contact: _athleticDirector,
                email: _clientEmail,
                phone: _clientPhone,
                fax: _clientFax,

            },
            billing: {

                organization: _billingOrganization,
                contact: _billingContactName,
                email: _billingEmail,
                address: _billingAddress,
                city: _billingCity,
                state: _billingState,
                phone: _billingPhone,
                fax: _billingFax,
                zip: _billingZip,

            },
            shipping: {

                organization: _shippingOrganization,
                contact: _shippingContactName,
                email: _shippingEmail,
                address: _shippingAddress,
                city: _shippingCity,
                state: _shippingState,
                phone: _shippingPhone,
                fax: _shippingFax,
                zip: _shippingZip,

            },
            order_items: [
                {

                    item_id: _itemID,
                    block_pattern_id: _blockPatternID,
                    neck_option: _neckOption,
                    description: _uniformName,
                    type: ub.current_material.material.type,
                    builder_customizations: JSON.stringify(ub.current_material.settings),
                    customizer_style_id: ub.current_material.material.id,
                    set_group_id: 0,
                    factory_order_id: '',
                    design_sheet : ub.current_material.settings.pdfOrderForm,
                    roster: _transformedRoster,
                    price: ub.funcs.getPrice(ub.current_material.material),
                    applicationType: _type,
                    application_type: ub.config.uniform_application_type,
                    additional_attachments: ub.data.orderAttachment,
                    notes: _notes,

                },
            ]
        };

        // If Rejected submit this
        // if (ub.config.orderCode !== "none") { orderInput.order_code = ub.config.orderCode; }

        var _url =  ub.config.api_host + '/api/order';

        ub.funcs.postOrderData(orderInput,_url);

    };

    ub.funcs.displayLinks = function (link) {

        ub.current_material.settings.pdfOrderForm = link;

        var _linkTransformed = link;

        window.scrollTo(0,0);

        $('span.processing-pdf').fadeOut();
        $('span.previewFormPdf').fadeIn();
        $('span.save-order').fadeIn();

        var _qty = ub.funcs.getOrderQty();
        var _sport = ub.current_material.material.uniform_category;

        _result = ub.data.minimumOrder.getQty(_sport);

        $('span.submit-confirmed-order').fadeIn();

        var _url = "/pdfjs/web/viewer.html?file=" + _linkTransformed;
        // var _url = _linkTransformed;

        $('iframe#pdfViewer').attr('src', _url);
        $('a.previewPDFLink').attr('href', _url);

        $('div#validate-order-form > span.processing').fadeOut();

        $('span.submit-confirmed-order').unbind('click');
        $('span.submit-confirmed-order').on('click', function () {

            if ($('span.submit-confirmed-order').html() === 'Submitting Order...' || $('span.submit-confirmed-order').html() === 'Resubmitting Order...') { return; }
            if (_qty < _result.qty) {
                bootbox.alert("Minimum order for " + ub.current_material.material.uniform_category + " is " + _result.qty + " items per style.");
                return;
            }
            // if (ub.config.orderArtworkStatus === "rejected") {

            //     ub.funcs.resubmitOrderForm();
            //     $('span.submit-confirmed-order').html('Resubmitting Order...');

            // }
             if (ub.data.updateOrderFromCustomArtworkRequest) {

                // ub.funcs.updateArtworkRequest(ub.data.artworks, function () {
                 console.log('===> submiting form with artwork status updated');
                    $('span.submit-confirmed-order').html('Resubmitting Order...');

                    $.smkAlert({text: 'Artwork Status updated', type:'info', time: 3, marginTop: '80px'});
                    ub.funcs.resubmitOrderForm();

                // });

            } else {
                console.log('===> submiting form');
                ub.funcs.submitOrderForm(ub.constants.order_actions.SUBMIT_ORDER);
                $('span.submit-confirmed-order').html('Submitting Order...');

                 var dialog = bootbox.dialog({
                     title: 'Please wait while we submit your order. Thank You!',
                     message: '<p class="text-center" style="font-size:30px;"><i class="fa fa-spin fa-spinner"></i> Loading...</p>',
                     className: 'order-dialog',
                     closeButton: false
                 });

                 dialog.init(function(){
                     // setTimeout(function(){
                     //     dialog.find('.bootbox-body').html('I was loaded after the dialog was shown!');
                     // }, 3000);
                 });
            }

        });

        $('span.save-order').unbind('click');
        $('span.save-order').on('click', function () {

            if ($('span.submit-confirmed-order').html() === 'Saving Order...') {
                return;
            }

            ub.funcs.submitOrderForm(ub.constants.order_actions.SAVE_ORDER);
            $('span.save-order').html('Saving Order...');

            var dialog = bootbox.dialog({
                title: 'Please wait while we save your order. Thank You!',
                message: '<p class="text-center" style="font-size:30px;"><i class="fa fa-spin fa-spinner"></i> Loading...</p>',
                className: 'order-dialog',
                closeButton: false
            });

            dialog.init(function(){
                // setTimeout(function(){
                //     dialog.find('.bootbox-body').html('I was loaded after the dialog was shown!');
                // }, 3000);
            });

        });

    };

    ub.funcs.submitAsTestOrder = function () {
        return ub.config.features.isOn('uniforms','testOrders') ? 1 : 0;
    };

    // This is a dublicate of the Submit Order Form, refactor this
        ub.funcs.prepareData = function () {

        var _notes                  = $('textarea#additional-notes').val();
        var _attachments            = [];

        var _factoryCode            = ub.current_material.material.factory_code;
        var _sleeveCut              = '';
        var _lastnameApplication    = '';
        var _itemID                 = parseInt(ub.current_material.material.item_id);
        var _uniformName            = ub.current_material.material.name;

        var _clientName             = $('input[name="client-name"]').val();
        var _clientEmail            = $('input[name="client-email"]').val();
        var _clientPhone            = $('input[name="client-phone"]').val();
        var _clientFax              = $('input[name="client-fax"]').val();
        var _athleticDirector       = $('input[name="athletic-director"]').val();

        var _billingOrganization    = $('input[name="billing-organization"]').val();
        var _billingContactName     = $('input[name="billing-contact-name"]').val();
        var _billingEmail           = $('input[name="billing-email"]').val();
        var _billingPhone           = $('input[name="billing-phone"]').val();
        var _billingFax             = $('input[name="billing-fax"]').val();

        var _billingAddress         = $('input[name="billing-address"]').val();
        var _billingCity            = $('input[name="billing-city"]').val();
        var _billingState           = $('select[name="billing-state"]').val();
        var _billingZip             = $('input[name="billing-zip"]').val();

        var _shippingOrganization    = $('input[name="shipping-organization"]').val();
        var _shippingContactName     = $('input[name="shipping-contact-name"]').val();
        var _shippingEmail           = $('input[name="shipping-email"]').val();
        var _shippingPhone           = $('input[name="shipping-phone"]').val();
        var _shippingFax             = $('input[name="shipping-fax"]').val();

        var _shippingAddress         = $('input[name="shipping-address"]').val();
        var _shippingCity            = $('input[name="shipping-city"]').val();
        var _shippingState           = $('select[name="shipping-state"]').val();
        var _shippingZip             = $('input[name="shipping-zip"]').val();

        var _sortedModifierLabels   = _.indexBy(_.sortBy(ub.data.modifierLabels, 'intGroupID'), 'group_id');

        // console.log('_sortedModifierLabels====>', _sortedModifierLabels);

        var _transformedRoster       = [];

        _.each (ub.current_material.settings.roster, function (_roster){

            if (_factoryCode === "BLB") {

                _sleeveCut  = "Motion";
                _lastnameApplication = 'N/A';

            }
            else {

                _sleeveCut  = _roster.sleeveType,
                _lastnameApplication = _roster.sleeveType;

            }

            var _obj = {
                Size: _roster.size,
                Number: _roster.number,
                Name: _roster.lastname,
                Sample: 0,
                LastNameApplication: _lastnameApplication,
                SleeveCut: _sleeveCut,
                Quantity: _roster.quantity,
            }

            _transformedRoster.push(_obj);

        });

        var _type = ub.config.uniform_application_type.toTitleCase();

        // add modifier labels to settings
        ub.current_material.settings.sorted_modifier_labels = _sortedModifierLabels;

        var orderInput = {

            order: {
                client: _clientName,
                submitted: '1',
                sku: "B-M-FBIJ-INF14-01-F01-17",
                material_id: ub.current_material.material.id,
                url: ub.config.host + window.document.location.pathname,
                user_name: ub.user.fullname,
                test_order: ub.funcs.submitAsTestOrder(),
            },
            athletic_director: {

                contact: _athleticDirector,
                email: _clientEmail,
                phone: _clientPhone,
                fax: _clientFax,

            },
            billing: {

                organization: _billingOrganization,
                contact: _billingContactName,
                email: _billingEmail,
                address: _billingAddress,
                city: _billingCity,
                state: _billingState,
                phone: _billingPhone,
                fax: _billingFax,
                zip: _billingZip,

            },
            shipping: {

                organization: _shippingOrganization,
                contact: _shippingContactName,
                email: _shippingEmail,
                address: _shippingAddress,
                city: _shippingCity,
                state: _shippingState,
                phone: _shippingPhone,
                fax: _shippingFax,
                zip: _shippingZip,
            },
            order_items: [
                {
                    brand: ub.current_material.material.brand,
                    item_id: _itemID,
                    type: ub.current_material.material.type,
                    description: _uniformName,
                    builder_customizations: ub.current_material.settings,
                    customizer_style_id: ub.current_material.material.id,
                    set_group_id: 0,
                    factory_order_id: '',
                    design_sheet : ub.current_material.settings.pdfOrderForm,
                    roster: _transformedRoster,
                    sku: ub.current_material.material.sku,
                    material_id: ub.current_material.material.id,
                    url: ub.config.host + window.document.location.pathname,
                    price: ub.funcs.getPrice(ub.current_material.material),
                    applicationType: _type,
                    application_type: ub.config.uniform_application_type,
                    additional_attachments: ub.data.orderAttachment,
                    notes: _notes,
                    blockPattern: ub.config.blockPattern,
                    neckOption: ub.config.option
                }
            ]
        };

        return orderInput;

    };

    ub.funcs.generatePDF = function () {

        var _rosterFormValid    = ub.funcs.isOrderFormValid();

        if (!_rosterFormValid) {

            ub.startModal('Please Complete Order Form Details');
            return;

        }

        $('span.processing-pdf').fadeIn();
        $('span.previewFormPdf').fadeIn();
        $('iframe#pdfViewer').attr('src', '');
        $('a.previewPDFLink').attr('href', '');
        $('span.submit-confirmed-order').fadeOut();
        $('span.save-order').fadeOut();

        ub.funcs.pushState({data: 'generate-pdf', title: 'Generate PDF', url: '?generate-pdf'});

        // var _bc = ub.current_material.settings;
        var _input = ub.funcs.prepareData();

        console.log('ub.funcs.prepareData() output=====>', _input);

        console.log('PROCESSING!!!');

        var bc = _input.order_items[0].builder_customizations;
        var order_items = _input.order_items[0];
        var stamp = moment(Date.now()).format();

        var _data = {
            selectedSource:"Prolook Customizer",
            selectedTemplate:"Prolook",
            searchKey:"preview-" + order_items.material_id + "-" + order_items.item_id + "-" + stamp.replace(/[:+]/g, "-"),
            thumbnails: bc.thumbnails,
            category: bc.uniform_category,
            fullName: "", // not used in any pdf service templates
            client: _input.order.client,
            orderId: "",
            foid:"",
            description: order_items.description,
            cutPdf: bc.cut_pdf,
            stylesPdf: bc.styles_pdf,
            roster: bc.roster,
            pipings: bc.pipings,
            createdDate: moment(Date.now()).format('YYYY/MM/DD'),
            notes: order_items.notes,
            sizeBreakdown: bc.size_breakdown,
            applications: bc.applications,
            sizingTable: bc.sizingTable,
            upper: bc.upper,
            lower: bc.lower,
            hiddenBody: bc.hiddenBody,
            randomFeeds: bc.randomFeeds,
            legacyPDF:"", // display link if old pdf is generated
            applicationType: order_items.application_type,
            sml: bc.sorted_modifier_labels,
            sku: _.isEmpty(ub.current_material.material.sku) ? '-' : ub.current_material.material.sku
        };

        ub.funcs.betaFeaturesChecker('New PDF', function() {
            console.log('RUNNING REQUEST TO PDF SERVICE');
            ub.funcs.pdfService(true, _data);
            ub.pdfService = {
                preview_data: _data
            };
        }, function() {
            console.log('RUNNING REQUEST TO LEGACY PDF');
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                data: JSON.stringify({builder_customizations: _input}),
                url: ub.config.host + "/generateOrderForm",
                dataType: "json",
                type: "POST",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function(response) {

                    if (response.success) {

                        ub.funcs.displayLinks(response.filename);

                        // if (ub.config.orderArtworkStatus === "rejected") {

                        //     $('span.submit-confirmed-order').html('Resubmit Order ' + '<i class="fa fa-arrow-right" aria-hidden="true"></i>');
                        //     $('span.save-order').hide();

                        // }

                        if (ub.data.updateOrderFromCustomArtworkRequest) {

                            $('span.submit-confirmed-order').html('Resubmit Order ' + '<i class="fa fa-arrow-right" aria-hidden="true"></i>');
                            $('span.save-order').hide();

                        }

                    }
                    else {
                        console.log('error: ');
                        console.log(response.message);
                    }

                },
                error: function(error) {
                    $.smkAlert({
                        text: 'Something went wrong while generating the PDF. Please try again later. Send your feedback if the problem persists. We appreciate your comments. Our team will be working on it as soon as possible.',
                        type: 'warning'
                    });
                }

            });
        });

    };

    ub.funcs.pdfService = function (async, _data) {

        var pdfLink = null;
        // https://34.214.34.246/api/upload

        $.ajax({
            async: async,
            data: JSON.stringify(_data),
            url: "https://pdf-generator.prolook.com/api/upload",
            dataType: "json",
            type: "POST",
            crossDomain: true,
            contentType: 'application/json',
            // headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function(response) {

                if (response.success) {
                    pdfLink = response.pdfUrl;

                    console.log('SENDING TO DISPLAY');
                    ub.funcs.displayLinks(pdfLink);
                }
                else {
                    console.log('error: ');
                    console.log(response);
                    $.smkAlert({
                        text: '[ERROR]' + '\n\n' + '[' + response + ']' + '\n\n' + 'Something went wrong while generating the PDF. Please try again later. Send your feedback if the problem persists. We appreciate your comments. Our team will be working on it as soon as possible.',
                        type: 'warning',
                        permanent: true
                    });
                }

            },
            error: function(error) {
                console.log('===error===', error);
                $.smkAlert({
                    text: '[' + error + ']' + '\n\n' + 'Something went wrong while generating the PDF. Please try again later. Send your feedback if the problem persists. We appreciate your comments. Our team will be working on it as soon as possible.',
                    type: 'warning',
                    permanent: true
                });
            }

        });

        // console.log('[pdfService] - PDF LINK IS', pdfLink);

        // return pdfLink;
    };

    ub.funcs.thumbnailsUploaded = function () {

        var _uploaded = false;
        var _thumbs =  ub.current_material.settings.thumbnails;

        var _frontViewOk    = _thumbs.front_view !== '';
        var _backViewOk     = _thumbs.back_view !== '';
        var _leftViewOk     = _thumbs.left_view !== '';
        var _rightViewOk    = _thumbs.right_view !== '';

        _uploaded = _frontViewOk && _backViewOk && _leftViewOk && _rightViewOk;

        return _uploaded;

    };

    ub.funcs.showValidateOrderForm = function () {

        $("div#validate-order-form").fadeIn();

        $('span.back-to-roster-form-button').unbind('click');
        $('span.back-to-roster-form-button').on('click', function () {

            ub.funcs.reShowOrderFrom();

        });

    };

    ub.funcs.validateOrderForm = function () {

        ub.funcs.hideRosterAndOrderForm();
        ub.funcs.showValidateOrderForm();

        ub.funcs.generatePDF();

    };

    ub.funcs.duplicateClientInfo = function () {

        var _clientName = $('#client-name').val();
        var _athleticDirector = $('#athletic-director').val();
        var _clientEmail = $('#client-email').val();
        var _phone = $('#phone').val();
        var _fax = $('#fax').val();

        if ($('#billing-checkbox').is(':checked')) {

            $('#billing-organization').val(_clientName);
            $('#billing-contact-name').val(_athleticDirector);
            $('#billing-email').val(_clientEmail);
            $('#billing-phone').val(_phone);
            $('#billing-fax').val(_fax);

        }

        if ($('#shipping-checkbox').is(':checked')) {

           $('#shipping-organization').val(_clientName);
           $('#shipping-contact-name').val(_athleticDirector);
           $('#shipping-email').val(_clientEmail);
           $('#shipping-phone').val(_phone);
           $('#shipping-fax').val(_fax);

        }

    };

    ub.funcs.setVal = function (name, val) {

        if (name === "shipping-state" || name === "billing-state") {
            $('select[name="' + name + '"]').val(val);
        } else {
            $('input[name="' + name + '"]').val(val);
        }

    };

    ub.funcs.prepareOrderForm = function (orderInfo) {

        var _loadFrom = orderInfo;
        var _notes = "";

        $('div#order-form').fadeIn();

        if (typeof orderInfo === "undefined") { return; }
        if (typeof _loadFrom.notes !== "undefined") { _notes = _loadFrom.notes.content; }

        if (ub.data.hasProcessedArtworks) {
            _loadFrom = orderInfo.order;
            _notes = _.last(ub.data.orderInfo.notes).content;
        }

        // Client Info

        ub.funcs.setVal('client-name', _loadFrom.client);
        ub.funcs.setVal('athletic-director', _loadFrom.client);
        ub.funcs.setVal('client-email', _loadFrom.email);
        ub.funcs.setVal('client-phone', _loadFrom.phone);
        ub.funcs.setVal('client-fax', _loadFrom.fax);

        // Billing Info

        ub.funcs.setVal('billing-organization', _loadFrom.bill_organization);
        ub.funcs.setVal('billing-contact-name', _loadFrom.bill_contact_person);
        ub.funcs.setVal('billing-email', _loadFrom.bill_email);
        ub.funcs.setVal('billing-phone', _loadFrom.bill_phone);

        ub.funcs.setVal('billing-address', _loadFrom.bill_address);
        ub.funcs.setVal('billing-city', _loadFrom.bill_city);
        ub.funcs.setVal('billing-state', _loadFrom.bill_state);
        ub.funcs.setVal('billing-zip', _loadFrom.bill_zip);

        // Ship Info

        ub.funcs.setVal('shipping-organization', _loadFrom.ship_organization);
        ub.funcs.setVal('shipping-contact-name', _loadFrom.ship_contact_person);
        ub.funcs.setVal('shipping-email', _loadFrom.ship_email);
        ub.funcs.setVal('shipping-phone', _loadFrom.ship_phone);

        ub.funcs.setVal('shipping-address', _loadFrom.ship_address);
        ub.funcs.setVal('shipping-city', _loadFrom.ship_city);
        ub.funcs.setVal('shipping-state', _loadFrom.ship_state);
        ub.funcs.setVal('shipping-zip', _loadFrom.ship_zip);

        // Notes
        $('textarea[name="additional-notes"]').val(_notes);

        // Additional Attachment Link
        var _filename = JSON.parse(orderInfo.items[0].additional_attachments);

        if (util.isImage(_filename)) {

            $('img#additional-attachment-preview').attr('src', _filename);
            $('a#additional-attachment-link').attr('href', _filename);
            $('span#additional-attachment-label').html(_filename);

        }

        $('span#additional-attachment-link').html(JSON.parse(orderInfo.items[0].additional_attachments));

    };

    ub.funcs.showOrderForm = function (orderInfo) {

        ub.funcs.pushState({data: 'order-form', title: 'Order Form', url: '?order-form'});

        $('div#roster-input').fadeOut();
        window.scrollTo(0,0);

        ub.funcs.prepareOrderForm(orderInfo);
        ub.funcs.prepareSizingTable();

        var _total = ub.funcs.getTotalQuantity();
        $('td.uniform-name').html(ub.current_material.material.name);
        $('td.quantity').html(_total);

        //$('span.submit-order').hide();

        var _htmlBuilder = '';
        _.each (ub.current_material.settings.size_breakdown, function (row) {

            _htmlBuilder += '<tr class="tr-size-row">';
            _htmlBuilder +=     '<td>';
            _htmlBuilder +=        row.size;
            _htmlBuilder +=     '</td>';
            _htmlBuilder +=     '<td align="right">';
            _htmlBuilder +=        row.quantity;
            _htmlBuilder +=     '</td>';
            _htmlBuilder += '</tr>';

        });

        _htmlBuilder += '<tr class="items">';
        _htmlBuilder +=     '<td align="right">';
        _htmlBuilder +=        '<strong>TOTAL</strong>';
        _htmlBuilder +=     '</td>';
        _htmlBuilder +=     '<td align="right">';
        _htmlBuilder +=        '<strong>' + _total + '</strong>';
        _htmlBuilder +=     '</td>';
        _htmlBuilder += '</tr>';

        $('table#size-breakdown').find('tr.tr-size-row').remove();
        $('table#size-breakdown').find('tr.items').remove();
        $('table#size-breakdown').append(_htmlBuilder);


        $('span.back-to-roster-form-button').on('click', function () {

            ub.funcs.showRosterForm();

        });

        $("input#additional-attachment").change( function() {

                ub.data.uploading = true;
                ub.data.orderAttachment = "";
                $('span.additional-attachment-message').html('Uploading...' + '<img src="/images/loading.gif" />');

                if (this.files && this.files[0]) {

                    var _filename = ub.funcs.fileUploadAttachment(this.files[0], function (filename, extension, valid) {

                        if (typeof filename === 'undefined') {

                            $.smkAlert({text: 'Error Uploading File', type:'warning', time: 3, marginTop: '80px'});
                            $('span.additional-attachment-message').html('Error Uploading File');

                            return;

                        }

                        if (valid){

                            ub.data.orderAttachment = filename;
                            $('span.additional-attachment-message').html('Upload ok! Please click on the [Continue] button to proceed.');

                        } else {

                            $('span.additional-attachment-message').html('Invalid File Type: ' + extension);
                            $.smkAlert({text: 'Invalid File Type: ' + extension, type:'warning', time: 3, marginTop: '80px'});

                        }

                        ub.data.uploading = false;


                    });

                }

        });

        // initialize an empty array of errors
        var errors = [];

        /*
        * This onblur js event validate if the client-name field have or not have a value
        * and error messages will be displayed accordingly
        */
        $('input#client-name').on('blur', function() {

            if ($('input#client-name').val() != '') {

                errors = [];
                ub.funcs.billingShippingStateAreRequired(errors);
                $(this).removeClass('is-invalid');
            } else {
                errors = [];
                errors.unshift({'message': 'Client name is required!', 'id': 'client-name'});
                ub.funcs.billingShippingStateAreRequired(errors);
                $(this).addClass('is-invalid');
            }
            ub.funcs.displayOrderFormErrors(errors);
        });

        /*
        * This onchange js event validate if the billing-state field has been changed its default value
        * and if not, an error message is displayed accordingly
        */
        $('select#billing-state').on('change', function() {
            if ($('select#billing-state').val() != 0) {
                errors = [];
                ub.funcs.clientNameShippingStateAreRequired(errors);
                $('div.billing-state-form-group span.select2-selection').css('border','1px solid #aaa');
            } else {
                errors = [];
                errors.push({'message': 'State in Billing Info is required!', 'id': 'billing-state'});
                ub.funcs.clientNameShippingStateAreRequired(errors);
                $('div.billing-state-form-group span.select2-selection').css('border','1px solid red');
            }
            ub.funcs.displayOrderFormErrors(errors);
        });

        /*
        * This onchange js event validate if the shipping-state field has been changed its default value
        * and if not, an error message is displayed accordingly
        */
        $('select#shipping-state').on('change', function() {

            if ($('select#shipping-state').val() != 0) {

                errors = [];
                ub.funcs.clientNameBillingStateAreRequired(errors);
                $('div.shipping-state-form-group span.select2-selection').css('border','1px solid #aaa');

            } else {

                errors = [];
                errors.push({'message': 'State in Shipping Info is required!', 'id': 'shipping-state'});
                ub.funcs.clientNameBillingStateAreRequired(errors);
                $('div.shipping-state-form-group span.select2-selection').css('border','1px solid red');

            }

            ub.funcs.displayOrderFormErrors(errors);

        });

        $('span.submit-order').unbind('click');
        $('span.submit-order').on('click', function () {

             var errors = [];

            if ($('input#client-name').val().trim() === "") {

                errors.push({'message': 'Client name is required!', 'id': 'client-name'});

                $('input#client-name').addClass('is-invalid');

            } else {

                $('input#client-name').removeClass('.is-invalid');

            }

            if ($('select#billing-state').val() == 0) {

                errors.push({'message': 'State in Billing Info is required!', 'id': 'billing-state'});
                $('div.billing-state-form-group span.select2-selection').css('border','1px solid red');

            } else {

                $('div.billing-state-form-group span.select2-selection').css('border','1px solid #aaa');

            }

            if ($('select#shipping-state').val() == 0) {

                errors.push({'message': 'State in Shipping Info is required!', 'id': 'shipping-state'});
                $('div.shipping-state-form-group span.select2-selection').css('border','1px solid red');

            } else {

                $('div.shipping-state-form-group span.select2-selection').css('border','1px solid #aaa');

            }

            if(ub.data.uploading) {

                $.smkAlert({text: 'Please wait for uploading to finish.', type:'warning', time: 3, marginTop: '80px'});
                return;

            }

            var html = ub.utilities.buildTemplateString("#m-order-form-error", {errors: errors});

            $('.error-container').html(html);

            if (_.size(errors) > 0) {
                $('.error-container').addClass('has-error');
            } else {
                $('.error-container').removeClass('has-error');
                ub.funcs.validateOrderForm();
            }

        });

        $('div.order-tab-button').on('click', function () {

            if (ub.config.orderArtworkStatus === "rejected") { return; }

            var _name = $(this).data('name');

            $('div.order-tab-button').removeClass('active-tab');
            $(this).addClass('active-tab');
            $('div.order-tab').removeClass('active-tab');
            $('div.order-tab[data-name="' + _name + '"]').addClass('active-tab');

        });

        $('#client-name, #athletic-director, #client-email, #phone, #fax, #shipping-checkbox, #billing-checkbox').on('change', function () {

            ub.funcs.duplicateClientInfo();

        });

        if (typeof ub.data.orderInfo !== "undefined") {

            if (typeof ub.data.orderInfo.items[0].notes !== "undefined") {

                $('textarea#additional-notes').val(orderInfo.items[0].notes);

            }

        }

        // In case the user just goes back then shows the orderform preview again, show the submit order button
        if (ub.funcs.thumbnailsUploaded()) {

            $('span.processing').fadeOut();
            $('span.submit-order').fadeIn();

        }

    }

    ub.funcs.getOrderQty = function () {

        var _qty = 0;

        $('input[name="quantity"]').each(function (index, obj) {

           _qty += parseInt($(obj).val());

        });

        return _qty;

    }

    ub.funcs.proceedToPreview = function (orderInfo) {

        var _validate = ub.funcs.rosterValid();

        if (!_validate.valid) {

            ub.showModal(_validate.messages);
            return;

        }

        ub.current_material.settings.roster = _validate.roster;
        ub.funcs.showOrderForm(orderInfo);

    }

     /*
    * @desc display the error lists (if any) in .error-container html element
    * @param array errors
    * @return array errors
    */
    ub.funcs.displayOrderFormErrors = function (errors) {
        if (_.size(errors) > 0) {
            $('.error-container').addClass('has-error');
        } else {
            $('.error-container').removeClass('has-error');
        }
        var html = ub.utilities.buildTemplateString("#m-order-form-error", {errors: errors});
        $('.error-container').html(html);
        return errors;
    }

    /*
    * @desc validate if the `state` field in Billing and Shipping Info tab have value
    * @param array errors
    * @return array errors
    */
    ub.funcs.billingShippingStateAreRequired = function (errors) {
        if ($('select#billing-state').val() == 0) {
            errors.push({'message': 'State in Billing Info is required!', 'id': 'billing-state'});
            $('div.billing-state-form-group span.select2-selection').css('border','1px solid red');
        }
        if ($('select#shipping-state').val() == 0) {
            errors.push({'message': 'State in Shipping Info is required!', 'id': 'shipping-state'});
            $('div.shipping-state-form-group span.select2-selection').css('border','1px solid red');
        }
        return errors;
    }

    /*
    * @desc validate if the `client name` field in Client Info tab and the `state` field in Shipping Info tab have value
    * @param array errors
    * @return array errors
    */
    ub.funcs.clientNameShippingStateAreRequired = function (errors) {
        if ($('input#client-name').val().trim() === "") {
            errors.unshift({'message': 'Client name is required!', 'id': 'client-name'});
            $('input#client-name').addClass('is-invalid');
        }
        if ($('select#shipping-state').val() == 0) {
            errors.push({'message': 'State in Shipping Info is required!', 'id': 'shipping-state'});
        }
        return errors;
    }

    /*
    * @desc validate if the `client name` field in Client Info tab and the `state` field in Billing Info tab have value
    * @param array errors
    * @return array errors
    */
    ub.funcs.clientNameBillingStateAreRequired = function (errors) {
        if ($('input#client-name').val().trim() === "") {
            errors.unshift({'message': 'Client name is required!', 'id': 'client-name'});
            $('input#client-name').addClass('is-invalid');
        }
        if ($('select#billing-state').val() == 0) {
            errors.push({'message': 'State in Billing Info is required!', 'id': 'billing-state'});
        }
        return errors;
    }

    /*
    * @desc display the active tab and its content in ORDER FORM page according to the given id field
    * @param string id
    */
    ub.funcs.gotoField = function (id) {
        (_.isEqual(id, '#client-name')) ? $(window).scrollTop(300): $(window).scrollTop(900);
        if (_.isEqual(id, '#client-name')) {
            $('div.order-tab-buttons').find('div.active-tab').removeClass('active-tab');
            $('div.order-tabs').find('div.active-tab').removeClass('active-tab');
            $('div.order-tab-button[data-name=client-info]').addClass('active-tab');
            $('div.order-tab[data-name=client-info]').addClass('active-tab');
        } else if (_.isEqual(id, '#billing-state')) {
            $('div.order-tab-buttons').find('div.active-tab').removeClass('active-tab');
            $('div.order-tabs').find('div.active-tab').removeClass('active-tab');
            $('div.order-tab-button[data-name=billing-info]').addClass('active-tab');
            $('div.order-tab[data-name=billing-info]').addClass('active-tab');
        } else {
            $('div.order-tab-buttons').find('div.active-tab').removeClass('active-tab');
            $('div.order-tabs').find('div.active-tab').removeClass('active-tab');
            $('div.order-tab-button[data-name=shipping-info]').addClass('active-tab');
            $('div.order-tab[data-name=shipping-info]').addClass('active-tab');
        }
    }

    ub.funcs.prepareState = function () {

        var _states = ub.utilities.buildTemplateString("#m-us-states", {states: ub.data.usStates.items});

        $('select.billing-state-dropdown').html(_states);
        $('select.shipping-state-dropdown').html(_states);

        $('.billing-state-dropdown').select2();
        $('.shipping-state').select2();

    }


    ub.funcs.perUniformValidation = function (orderInfo) {

        $('span.submit-order').hide();

        ub.funcs.prepareState();

        if (ub.config.orderArtworkStatus === "rejected") {

            $('span.back-to-roster-form-button').hide();

            $('input.form-control').attr('disabled','disabled');
            $('textarea').attr('disabled', 'disabled');
            $('input#additional-attachment').attr('disabled','disabled');

        }

        ub.funcs.proceedToPreview(orderInfo);


    }

    ub.funcs.submitUniform = function (orderInfo) {

        if ($('tr.roster-row').length === 0) {
            ub.funcs.noRosterMessage();
            return;
        }

        ub.funcs.perUniformValidation(orderInfo);

    };

    ub.funcs.initRosterCalled = false;

    ub.funcs.AddRosterRow = function (_size) {

        var _returnValue = [];
        var _currentCount = $('tr.roster-row').length;

        var _markup         = '';
        var $rosterTable    = $('table.roster-table[data-size="' + _size + '"] > tbody');
        var _length         = $rosterTable.find('tr').length;

        data = {
            index: _length + 1,
            size: _size,
            number: _returnValue,
        };

        template = $('#m-roster-table-field').html();
        markup = Mustache.render(template, data);

        $rosterTable.append(markup);
        ub.funcs.hideColumns();

        $('span.clear-row[data-size="' + _size + '"]').unbind('click');
        $('span.clear-row[data-size="' + _size + '"]').on('click', function () {

            var _index          = $(this).data('index');
            var _size           = $(this).data('size');
            var $table          = $('table.roster-table[data-size="' + _size + '"] > tbody');
            var $row            = $('tr[data-size="' + _size + '"][data-index="' + _index + '"]');
            var _number = $row.find('input[name="number"]').val();

            // ub.funcs.setNumberStatus(_number, 'free');

            $row.remove();

            $('table.roster-table[data-size="' + _size + '"] > tbody').find('tr.roster-row').each(function (indexVar){

                var index = indexVar + 1;

                $(this).find('td').first().html(index);
                $(this).find('span.clear-row').attr('data-index', index);
                $(this).attr('data-index', index)

            });

        });

        // var _returnValue = [];

        // $('span.number').each(function(){

        //     if ($(this).data('status') === 'selected') {

        //         var _number = $(this).data('number');
        //         ub.funcs.setNumberStatus(_number,'used');
        //         _returnValue.push(_number);

        //     }

        // });

        // numbers = _returnValue;

        // var _markup         = '';
        // var $rosterTable    = $('table.roster-table[data-size="' + _size + '"] > tbody');
        // var _length         = $rosterTable.find('tr').length;

        // _.each (numbers, function (number){

        //     data = {
        //         index: _length,
        //         size: _size,
        //         number: number,
        //     };

        //     template = $('#m-roster-table-field').html();
        //     markup = Mustache.render(template, data);

        //     $rosterTable.append(markup);

        //     _length += 1;

        // });

        // if (ub.current_material.material.factory_code === "BLB") {

        //     $('select.lastname-application').attr('disabled','disabled');
        //     $('select.lastname-application').val('None');

        //     $('select.sleeve-type').attr('disabled','disabled');
        //     $('select.sleeve-type').val('Motion Cut');

        // }
        // else {

        //     $('select.lastname-application').removeAttr('disabled');
        //     $('select.sleeve-type').removeAttr('disabled');

        // }

        // ub.funcs.hideColumns();

        // $('span.clear-row[data-size="' + _size + '"]').unbind('click');
        // $('span.clear-row[data-size="' + _size + '"]').on('click', function () {

        //     var _index          = $(this).data('index');
        //     var _size           = $(this).data('size');
        //     var $table          = $('table.roster-table[data-size="' + _size + '"] > tbody');
        //     var $row            = $('tr[data-size="' + _size + '"][data-index="' + _index + '"]');
        //     var _number = $row.find('input[name="number"]').val();

        //     ub.funcs.setNumberStatus(_number, 'free');

        //     $row.remove();

        //     $('table.roster-table[data-size="' + _size + '"] > tbody').find('tr.roster-row').each(function (indexVar){

        //         var index = indexVar + 1;

        //         $(this).find('td').first().html(index);
        //         $(this).find('span.clear-row').attr('data-index', index);
        //         $(this).attr('data-index', index)

        //     });

        // });

    }

    ub.funcs.addPlayerToRoster = function (player) {

        var _markup         = '';
        var $rosterTable    = $('table.roster-table[data-size="' + player.Size + '"] > tbody');
        var _length         = $rosterTable.find('tr').length;

        data = {
            index: _length,
            size: player.Size,
            number: player.Number,
            name: player.Name,
        };

        template = $('#m-roster-table-field').html();
        markup = Mustache.render(template, data);

        $.when($rosterTable.append(markup)).then(function () {
                ub.funcs.updateSelect(player.Size, _length);
            }
        );

        _length += 1;

    };

    ub.funcs.prepopulateRoster = function (orderInfo) {

        var _roster = orderInfo.roster;
        var _lastSize;

        _.each(_roster, function (player) {

            var _size       = player.Size;
            var $spanSize   = $('span.size[data-size="' + _size + '"]');
            var _status     = $spanSize.attr('data-status');

            if (_status === "off") { ub.funcs.addSizesTabs(_size, true); }

            $spanSize.addClass('active');

            ub.funcs.addPlayerToRoster(player);
            _lastSize = player.Size;

            if (ub.funcs.isFootball()) {

                var _numberObject = _.find(ub.data.playerNumbers, {number: player.Number})
                _numberObject.status = "used";

            }

        });

        // Remove Roster Item
        $('span.clear-row').unbind('click');
        $('span.clear-row').on('click', function () {

            var _index = $(this).data('index');
            var _size = $(this).data('size');
            ub.funcs.bindRemoveRosterItemButton(_index, _size);
        });

        // Activate last tab
        setTimeout(function(){
            $('span.tabButton[data-size="' + _lastSize + '"]').trigger('click');
        }, 1000);

    }

    ub.funcs.modifyOrderFormUIBySport = function () {

        if (ub.funcs.isSocks()) {
            $('span.adult-sizes').html('ADULT SHOE SIZES: ');
            $('span.adult-header').html('Adult Shoe Sizes: ');

            $('span.youth-sizes').html('YOUTH SHOE SIZES: ');
            $('span.youth-header').html('Youth Shoe Sizes: ');
        }

    }

    ub.funcs.initUniformSizesAndPrices = function () {

        var _youth = [];
        var _adult = [];
        var _youthPrices = undefined;

        ub.current_material.material.parsedPricingTable;

        ub.utilities.info('');
        ub.utilities.info('----- Valid Size / Price -----');

        if (typeof ub.current_material.material.parsedPricingTable.properties !== "undefined") {

            // Youth
            ub.utilities.info('Youth: ');

            _.each(ub.current_material.material.parsedPricingTable.properties.youth, function (item) {

                ub.utilities.info(item.size.lpad(' ', 7) + ' / ' + item.msrp);
                _youth.push(item.size);

            });

            _youthPrices = ub.current_material.material.parsedPricingTable.properties.youth

            if (typeof _youthPrices === "undefined" || typeof _youthPrices === 0) {

                ub.utilities.info('No Youth Prices defined.');

            }

            var _youthSizeConfig = _.find(ub.data.sizes.items, {sport: ub.config.sport, type: 'youth', gender: ub.config.gender });

            if (typeof _youthSizeConfig === "undefined") {

                _youthSizeConfig = {

                    sport: ub.config.sport,
                    type: 'youth',
                    gender: ub.config.gender,

                };

                ub.data.sizes.items.push(_youthSizeConfig);

            }

            _youthSizeConfig.sizes = _youth;

            // Adult
            ub.utilities.info('');
            ub.utilities.info('Adult: ');

            _.each(ub.current_material.material.parsedPricingTable.properties.adult, function (item) {

                ub.utilities.info(item.size.lpad(' ', 7) + ' / ' + item.msrp);
                _adult.push(item.size);

            });

            _adultPrices = ub.current_material.material.parsedPricingTable.properties.adult

            if (typeof _adultPrices === "undefined" || typeof _adultPrices === 0) {

                ub.utilities.info('No Adult Prices defined.');
                _adultPrices = [];

            }

            var _adultSizesConfig = _.find(ub.data.sizes.items, {sport: ub.config.sport, type: 'adult', gender: ub.config.gender });

            if (typeof _adultSizesConfig === "undefined") {

                _adultSizesConfig = {

                    sport: ub.config.sport,
                    type: 'adult',
                    gender: ub.config.gender,

                };

                ub.data.sizes.items.push(_adultSizesConfig);

            }

            _adultSizesConfig.sizes = _adult;

        } else {

            ub.utilities.info('No Pricing Table Detected.');
            // disable order form
            $('a[data-view="team-info"]').addClass('disabled');

        }

        ub.utilities.info('-----------------------------');
        ub.utilities.info('');

    }

    ub.funcs.prepareUniformSizes = function () {

        // Get Sizes from pricing column, if not available from Mock JS Object (ub.data.uniformSizes)

        var _sport = ub.current_material.material.uniform_category;
        var _gender = ub.current_material.material.gender;

        var _youth = ub.data.sizes.getSizes(_sport, _gender, 'youth');
        var _adult = ub.data.sizes.getSizes(_sport, _gender, 'adult');
        var _combinedSizes = _.union(_youth.sizes, _adult.sizes);
        var data = {};
        var _template = '';
        var _markup = '';

        /// Circle Sizes

        data = {
            adult: _adult.sizes,
            youth: _youth.sizes,
        };

        _template = $('#m-circle-sizes').html();
        _markup = Mustache.render(_template, data);

        $('div#sizes').append(_markup);

        if (_adult.sizes.length === 0) { $('span.adult-sizes').hide(); }
        if (_youth.sizes.length === 0) { $('span.youth-sizes').hide(); }

        /// Tab Buttons

         data = {
            adult: _adult.sizes,
            youth: _youth.sizes,
        };

        _template = $('#m-tabButtons-sizes').html();
        _markup = Mustache.render(_template, data);

        $('div.tabButtonsContainer').append(_markup);

        /// Table Rows

        data = {
            tabs: _combinedSizes,
        };

        _template = $('#m-roster-table').html();
        _markup = Mustache.render(_template, data);

        $('div.tabsContainer').append(_markup);

        ub.funcs.modifyOrderFormUIBySport();

    };

    ub.funcs.uiPrepBeforeOrderForm = function () {

        $('div#left-side-toolbar').fadeOut();

        ub.funcs.deactivateMoveTool();
        ub.funcs.turnLocationsOff();

        ub.funcs.resetHighlights();

        $('div#right-pane-column').fadeOut();
        $('div#left-pane-column').fadeOut();

        TeamStoreToolBox.close();

    }

    ub.data.rosterInitialized = false;
    ub.funcs.initRoster = function (orderInfo) {

        if (typeof orderInfo !== "undefined") {
            orderInfo.items[0].roster = JSON.parse(orderInfo.items[0].roster);
        }

        ub.data.rosterInitialized = true;

        if (ub.funcs.initRosterCalled) { return; }
        if (typeof ub.user.id === "undefined") { return; }

        ub.funcs.uiPrepBeforeOrderForm();

        ub.data.orderFormInitialized = true;
        ub.funcs.pushState({data: 'roster-form', title: 'Enter Roster', url: '?roster-form'});

        ub.funcs.initRosterCalled = true;

        ub.current_material.settings.thumbnails = {
            front_view: "",
            back_view: "",
            left_view: "",
            right_view: "",
        }

        ub.uploadThumbnail('front_view');
        ub.uploadThumbnail('back_view');
        ub.uploadThumbnail('left_view');
        ub.uploadThumbnail('right_view');

        ub.funcs.prepareUniformSizes();
        ub.funcs.hideColumns();

        // // Hide Last Name Application and Sleeve Type when not tackle twill football

        if (
            !ub.funcs.isFootball() ||
            (ub.funcs.isFootball() && ub.current_material.material.factory_code === "BLB") ||
            ub.current_material.material.price_item_code === "FBMJ" ||
            ub.data.numberPopupExcemptions.isValid(ub.config.sport, ub.config.type)
        )
        {

            $('div.defaultTypes').hide();

        } else {

            $('div.defaultTypes').show();

        }

        $('div#roster-input').fadeIn();
        console.log('AFTER FADE IN ROSTER INPUT CONTAINER=======>');

        // Setup Events if this is not rejected
        if (ub.config.orderArtworkStatus !== "rejected" && !ub.data.updateOrderFromCustomArtworkRequest) {

            $('button.change-all').unbind('click');
            $('button.change-all').on('click', function () {

                $('select.sleeve-type').val($('select.default-sleeve-type').val());
                $('select.lastname-application').val($('select.default-lastname-application').val());

            });

            $('span.add-player').on('click', function () {
                console.log('ON CLICK ADD PLAYER=======>');

                var _numbers    = '';
                var _size       = '';

                _size           = $(this).data('size');

                if (!ub.funcs.isCurrentSport('Wrestling') &&
                    ub.current_material.material.uniform_group !== "Apparel" &&
                    !ub.data.numberPopupExcemptions.isValid(ub.config.sport, ub.config.type)
                    ) {

                    _numbers = ub.funcs.createNumbersSelectionPopup(_size);

                } else {

                    ub.funcs.AddRosterRow(_size);

                }

            });

            $('span.size').on('click', function () {

                if ($('div#numbersPopup').is(':visible')) { return; }

                var _status = $(this).data('status');
                var _size   = $(this).data('size');

                if (_status === 'off') {

                    $(this).addClass('active');
                    $(this).data('status', 'on');
                    ub.funcs.addSizesTabs(_size);

                }
                else {

                    $(this).removeClass('active');
                    $(this).data('status', 'off');
                    ub.funcs.removeSizesTabs(_size);

                }

            });

            $('span.back-to-customizer-button').on('click', function () {

                ub.funcs.fadeInCustomizer();

            });

        }

        $('span.add-item-to-order').unbind('click');
        $('span.add-item-to-order').on('click', function () {

            if ($('span.size[data-status="on"]').length === 0) {
                ub.funcs.noRosterMessage();
                return;
            }

            ub.funcs.submitUniform(ub.data.orderInfo);

        });

        $('span.tabButton').on('click', function () {

            var _size = $(this).data('size');

            $('span.tabButton').removeClass('active');
            $(this).addClass('active');

            $('div.tabsContainer > div.tab').hide();
            $('div.tab[data-size="' + _size + '"]').fadeIn();

        });

        if (typeof orderInfo !== "undefined") {

            // Reinit using previous roster
            ub.funcs.prepopulateRoster(orderInfo.items[0]);

            $('textarea#additional-notes').val(orderInfo.items[0].notes);

        }

        ub.funcs.hideColumns();
        ub.funcs.reInitHover();

        // Disable Buttons when the order is being resubmitted from a rejected order
        if (ub.config.orderArtworkStatus === "rejected" || ub.data.updateOrderFromCustomArtworkRequest) {

            $('select.default-sleeve-type').attr('disabled', 'disabled');
            $('select.default-lastname-application').attr('disabled', 'disabled');
            $('input[name="lastname"]').attr('disabled', 'disabled');
            $('input[name="number"]').attr('disabled', 'disabled');
            $('input[name="quantity"]').attr('disabled', 'disabled');
            $('select.sleeve-type').attr('disabled', 'disabled');
            $('select.lastname-application').attr('disabled', 'disabled');
            $('span.clear-row').hide();
            $('span.add-player').hide();

        }

    }

    ub.funcs.noRosterMessage = function () {
        $.smkAlert({text: 'Please add Sizes and Roster before proceeding.', type:'warning', permanent: false, time: 5, marginTop: '90px'});
    }

    ub.funcs.goto = function (location) {

        var _location = location;

        switch(_location) {

            case 'home':

                // unbind before opening window
                window.onbeforeunload = null;
                window.location.href = '/';

                break;

            case 'my-saved-designs':

                // unbind before opening window
                window.onbeforeunload = null;
                window.location.href = '/my-saved-designs';

                break;

            default:
                console.warning('Invalid Location: ' + _location);

        }

    }

    ///// Save Design //////

        ub.funcs.checkEmailPopup = function () {

            var _designName = $('input.design-name').val();
            $('div.save-design').fadeOut();

            var template = $('#m-save-design-guest').html();
            var data = { title: 'Save Design', designName: _designName };
            var markup = Mustache.render(template, data);

            var dialog = bootbox.dialog({
                title: 'Success!',
                message: markup,
            });

            dialog.init(function() {

                $('button.close').unbind('click');
                $('button.close').on('click', function () {

                    dialog.modal('hide');

                });

            });

        }

        ub.funcs.updatePopup = function () {

            var _designName = $('input.design-name').val();
            $('div.save-design').fadeOut();

            var template = $('#m-save-design-ok').html();
            var data = { title: 'Save Design', designName: _designName };
            var markup = Mustache.render(template, data);

            var dialog = bootbox.dialog({
                title: 'What do you want to do next?',
                message: markup,
            });

            dialog.init(function() {

                $('button.stay').unbind('click');
                $('button.stay').on('click', function () {

                    dialog.modal('hide');

                });

                $('button.my-saved-designs').unbind('click');
                $('button.my-saved-designs').on('click', function () {

                    dialog.modal('hide');

                    var dialog1 = bootbox.dialog({
                        message: 'Loading My Saved Design...',
                    });

                    ub.funcs.goto('my-saved-designs');

                });

                $('button.select-another-uniform').unbind('click');
                $('button.select-another-uniform').on('click', function () {

                    dialog.modal('hide');
                    var dialog2 = bootbox.dialog({
                        message: 'Loading the Uniform Pickers...',
                    });

                    ub.funcs.goto('home');

                });

            });

         };

        ub.funcs.uploadThumbnailSaveDesign = function (view) {

            var _dataUrl = ub.getThumbnailImage(view);

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                data: JSON.stringify({ dataUrl: _dataUrl }),
                url: ub.config.host + "/saveLogo",
                dataType: "json",
                type: "POST",
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response){

                    if(response.success) {

                        ub.current_material.settings.thumbnails[view] = response.filename;
                        $('img.' + view).attr('src', response.filename);

                        if (ub.funcs.thumbnailsUploaded()) {

                            $('em.uploading').fadeOut();

                            if(ub.data.updateSaveDesignFromCustomArtworkRequest) {

                                // Updating a save design from a custom artwork process
                                ub.funcs.saveDesign();

                            } else {

                                // Normal Save Logic
                                $('div.save-design-footer').fadeIn();


                            }

                        }

                    }
                    else{

                        console.log('Error generating thumbnail for ' + view);
                        console.log(response.message);

                    }

                }

            });

        };

        ub.funcs.postDesign = function (data) {

            var _url = window.ub.config.api_host + '/api/saved_design'

            if (ub.data.updateSaveDesignFromCustomArtworkRequest) {
                _url = window.ub.config.api_host + '/api/saved_design/update';
            }

            // Skip notification when coming from local
            if (ub.config.app_env === 'local') { data.test_data = '1'; }

            delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

            $.ajax({

                url: _url,
                dataType: "json",
                type: "POST",
                data: JSON.stringify(data),
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

                success: function (response){

                    if (response.success) {

                        if (typeof window.ub.user.type !== "undefined") {
                            ub.funcs.checkEmailPopup();
                        } else {
                            ub.funcs.updatePopup();
                        }

                        var is_add_to_team_store = false;
                        if (typeof($('#is_add_to_team_store').val()) == "undefined") {
                            is_add_to_team_store = false;
                        } else {
                            if ($('#is_add_to_team_store:checked').length) {
                                is_add_to_team_store = true;
                            }
                        }

                        if (is_add_to_team_store) {
                            // Make ID available globally; TeamStoreToolBox.js needs this var
                            ub.team_stores_material_id = response.team_stores_material_id;

                            TeamStoreToolBox.add_to_team_store(ub.current_material.material.id);
                        }

                    } else {

                        console.log('Error Saving Design.');
                        console.log(response.message);
                        $('.save-design').fadeOut();
                    }

                }

            });

        }

        ub.funcs.saveDesign = function () {

            //

            $('div.ok-footer').hide();
            $('div.saving-please-wait').show();

            //

            var _userID = ub.user.id;
            var _designName = $('input.design-name').val();
            var _materialID = ub.current_material.material.id;
            var _builderCustomizations = ub.current_material.settings;
            var _sport = ub.current_material.material.uniform_category;
            var _frontView = ub.current_material.settings.thumbnails.front_view;
            var _backView = ub.current_material.settings.thumbnails.back_view;
            var _leftView = ub.current_material.settings.thumbnails.left_view;
            var _rightView = ub.current_material.settings.thumbnails.right_view;
            var _notes = $('#design-notes').val();

            var _data = {

                user_id: _userID.toString(),
                name: _designName,
                material_id: _materialID,
                material_name: ub.current_material.material.name,
                user: ub.user.fullname,
                builder_customizations: _builderCustomizations,
                sport: _sport,
                front_thumbnail: _frontView,
                back_thumbnail: _backView,
                left_thumbnail: _leftView,
                right_thumbnail: _rightView,
                notes: _notes

            };

            if (ub.data.updateSaveDesignFromCustomArtworkRequest) {

                _data.id = ub.config.savedDesignInfo.savedDesignID;
                _data.builder_customizations = _data.builder_customizations;

                delete _data.user;
                delete _data.material_name;

            }

            // Add flag
            if (typeof($('#is_add_to_team_store').val()) !== "undefined") {
                _data.is_add_to_team_store = $('#is_add_to_team_store:checked').length;
            }

            // Add store code if exists
            if (ub.store_code) {
                _data.store_code = ub.store_code;
            }

            ub.funcs.postDesign(_data);

        };

        ub.funcs.cleanupsBeforeSave = function () {

            // // Remove Disabled Random Feeds
            // var _disabledRandomFeed = {};

            // _.each(ub.current_material.settings.randomFeeds, function (randomFeed, key) {

            //     if (randomFeed.enabled === 0) {

            //         _disabledRandomFeed[key] = randomFeed;
            //         delete ub.current_material.settings.randomFeeds[key];

            //     }

            // });

        }

        ub.funcs.initSaveDesign = function () {

            ub['front_view'].visible = true;
            ub['left_view'].visible = true;
            ub['right_view'].visible = true;
            ub['back_view'].visible = true;

            ub.funcs.showSaveDialogBox();
            ub.funcs.turnLocationsOff();

            ub.funcs.cleanupsBeforeSave();

            $('img.front_view').attr('src', '');
            $('img.back_view').attr('src', '');
            $('img.left_view').attr('src', '');
            $('img.right_view').attr('src', '');

            ub.current_material.settings.thumbnails = {

                front_view: "",
                back_view: "",
                left_view: "",
                right_view: "",

            }

            ub.funcs.removeLocations();
            $(this).removeClass('zoom_on');

            ub.funcs.uploadThumbnailSaveDesign('front_view');
            ub.funcs.uploadThumbnailSaveDesign('back_view');
            ub.funcs.uploadThumbnailSaveDesign('left_view');
            ub.funcs.uploadThumbnailSaveDesign('right_view');

        };

        ub.funcs.showSaveDialogBox = function () {

            $('div.save-design').remove();

            var data = {
                title: 'Save Design',
            };

            var template = $('#m-save-design').html();
            var markup = Mustache.render(template, data);

            $('body').append(markup);

            ub.funcs.centerPatternPopup();

            $('div.save-design').fadeIn();

            $('div.save-design span.cancel-btn').on('click', function () {

                $('div.save-design').remove();

            });

            $('div.save-design span.ok-btn').on('click', function () {

                ub.funcs.saveDesign();

            });

            // If from custom artwork request process
            if (ub.data.updateSaveDesignFromCustomArtworkRequest) {

                $('div.save-design > h3').html('<i class="fa fa-floppy-o" aria-hidden="true"></i> Updating Design')

                $('input[name="design-name"]').attr('disabled','disabled');
                $('textarea#design-notes').attr('disabled', 'disabled');

                $('input[name="design-name"]').val(ub.config.savedDesignInfo.name);

            } else {

                $('input[name="design-name"]').removeAttr('disabled');
                $('textarea#design-notes').removeAttr('disabled');

            }

        };

    ///// End Save Design /////

    ub.funcs.checkDefaultRepID = function () {

        if (!_.contains(ub.fontGuideIDs, window.ub.valid)) {

            if(typeof ub.user.defaultRepID === "undefined" ||
                ub.user.defaultRepID === '-1' ||
                ub.user.defaultRepID === '0')  {

                $.smkAlert({text: "You don't have a Rep selected, you can go to your profile to select one.", type: 'warning', time: 10, marginTop: '10px'});

            }

        }

    }

    /// LREST

    ub.funcs.lRest = function (e, p, fromMiddleScreen, src) {

        if (e.trim().length === 0 || p.trim().length === 0) { return; }

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        $.ajax({

            data: JSON.stringify({ email: e, password: p }),
            url: ub.config.host + "/lrest",
            dataType: "json",
            type: "POST",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response) {

                if(response.success) {

                    window.ub.user = {

                        id: parseInt(response.userId),
                        fullname: response.fullname,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                        state: response.state,
                        zip: response.zip,
                        defaultRepID: response.default_rep_id,
                        headerValue: response.accessToken,

                    };

                    var template = $('#m-loggedInNavbar').html();
                    var data = { firstName: response.firstName, }
                    var markup = Mustache.render(template, data);

                    $('div.user-profile.pull-right').html(markup);
                    $.smkAlert({text: response.message + '!', type:'success', time: 3, marginTop: '80px'});

                    ub.funcs.updateMessageCount();

                    $('a.change-view[data-view="save"]').removeClass('disabled');
                    $('a.change-view[data-view="open-design"]').removeClass('disabled');

                    if (typeof fromMiddleScreen !== 'undefined') { // from order btn clicked or save button

                        $('div#primaryQuickRegistrationPopup').remove();

                        if (src === "order") {
                            ub.funcs.initRoster();
                        } else if (src === "save") {
                            ub.funcs.initSaveDesign();
                        }

                    } else {

                        // Return to pickers, if not editing any material
                        if(typeof ub.current_material.material === "undefined") {
                            window.location.href = "/";
                        } else {
                            ub.funcs.ok();
                            ub.funcs.checkDefaultRepID();
                        }

                    }

                    ub.id = response.userID;
                    ub.funcs.afterLogin();

                } else {

                    if (typeof fromMiddleScreen !== 'undefined') {
                        var _forgotPasswordLink = ' <a href="/forgot-password" target="_new">did you forget your password?</a>';
                        $('em.message').html(response.message + ", " + _forgotPasswordLink);
                    } else {
                        $.smkAlert({text: response.message, type: 'warning', time: 3, marginTop: '260px'});
                    }

                }

            }

        });

    }

    $('input#login-email').on('keypress', function (e) {

        var code = (e.keyCode ? e.keyCode : e.which);

        if (code == 13) {

            $('input#login-password').focus();
            e.preventDefault();

        }

    });

    $("form.loginRest").submit( function( event ) { event.preventDefault(); });

    $('button.loginRest').unbind('click');
    $('button.loginRest').on('click', function () {

        var _e = $('input[type="email"]').val();
        var _p = $('input[type="password"]').val();

        ub.funcs.lRest(_e, _p);

    });

    /// END LREST

});