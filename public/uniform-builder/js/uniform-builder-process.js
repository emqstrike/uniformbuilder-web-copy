$(document).ready(function() {                    


    ub.funcs.fadeOutCustomizer = function () {

        $('div#right-pane-column').fadeOut();        
        $('div#left-pane-column').fadeOut();
        $('div#roster-input').fadeIn();

        if (ub.funcs.getCurrentUniformCategory() === "Wrestling" || ub.current_material.material.type === "lower") {

            $('div.defaultTypes').hide();

        }

        $('button.change-all').unbind('click');
        $('button.change-all').on('click', function () {

            $('select.sleeve-type').val($('select.default-sleeve-type').val());
            $('select.lastname-application').val($('select.default-lastname-application').val());
                
        });

    }

    ub.funcs.fadeInCustomizer = function () {

        $('div#roster-input').fadeOut();

        $('div#right-pane-column').fadeIn();        
        $('div#left-pane-column').fadeIn(); 

    }

    ub.funcs.addSizesTabs = function (size) {

        $('span.tabButton[data-size="' + size + '"]').css('display','inline-block');
        $('span.tabButton:visible').first().trigger('click');
        $('span.size[data-size="' + size + '"]').attr('data-status','on');

        // var _rosterSize = _.find(ub.current_material.settings.roster, {size: size});

        if ($('tr.roster-row[data-size="' + size + '"]').length === 0) {

            $('span.tabButton[data-size="' + size + '"]').trigger('click');
            $('span.add-player[data-size="' + size + '"]').trigger('click');

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

    ub.funcs.getActiveSizes = function () {

        var _activeSizes = [];

        $('span.size[data-status="on"]').each (function () {

            var _size = $(this).data('size');
            
            _activeSizes.push(_size);

        });

        return _activeSizes;

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

        if (ub.funcs.getCurrentUniformCategory() === "Wrestling") {

            $('td.PlayerNumberInput, th.thPlayerNumberInput, td.sleevetype, td.lastnameapplication, th.sleevetype, th.lastnameapplication').hide();
            
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

            if (ub.current_material.material.factory_code === "BLB") {

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

            $('span.clear-row[data-size="' + _size + '"]').unbind('click');
            $('span.clear-row[data-size="' + _size + '"]').on('click', function () {

                var _index          = $(this).data('index');
                var _size           = $(this).data('size');
                var $table          = $('table.roster-table[data-size="' + _size + '"] > tbody');
                var $row            = $('tr[data-size="' + _size + '"][data-index="' + _index + '"]');
                var _number = $row.find('input[name="number"]').val();

                ub.funcs.setNumberStatus(_number, 'free');

                $row.remove();

                $('table.roster-table[data-size="' + _size + '"] > tbody').find('tr.roster-row').each(function (indexVar){

                    var index = indexVar + 1;

                    $(this).find('td').first().html(index);
                    $(this).find('span.clear-row').attr('data-index', index);
                    $(this).attr('data-index', index)

                });

            });

            ub.funcs.reInitHover();
            $('div#numbersPopup').remove();

        });

    };

    ub.funcs.extractFields = function (row) {

        var _index              = row.data('index');
        var _size               = row.find('input.size').val();
        var _lastname           = row.find('input.lastname').val();
        var _number             = row.find('input.number').val();
        var _quantity           = row.find('input.quantity').val();
        var _sleeveType         = row.find('select.sleeve-type').val();
        var _lastNameApplication = row.find('select.lastname-application').val();

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

    ub.funcs.getTotalQuantity = function () {

        var _total = 0;

        var _prepareSize = [];

        _.each (ub.current_material.settings.roster, function (roster){

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

    ub.funcs.submitFeedback = function (message) {

        var _user_id = ub.user.id;
        var _user_email = ub.user.email;

        if (typeof _user_id === "undefined") {

            _user_id = 0;
            _user_email = '';

        }

        var _postData   = {

            "subject" : "Feedback",
            "order_code" : "",
            "content" : message,
            "type" : "feedback",
            "email" : _user_email,
            "user_id" : _user_id,

        };

        var _url = 'http://api-dev.qstrike.com/api/feedback';

        //delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

        $.ajax({
            
            url: _url,
            type: "POST", 
            data: JSON.stringify(_postData),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            success: function (response){

                console.log(response);

            }
            
        });

    }
 
    ub.funcs.feedbackForm = function (initMessage, imgFront, imgLeft, imgRight, imgBack) {

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
        $('div.feedback-form').fadeIn();
        ub.funcs.centerPatternPopup();

        $('span.ok-btn').on('click', function () {

            var _message = $('textarea#feedback-message').val().trim();

            if (_message.length !== 0) {

                ub.funcs.submitFeedback(_message);

            }

            $('div.feedback-form').remove();

        });

        $('span.cancel-btn').on('click', function () {

            $('div.feedback-form').remove();

        });

    }

    ub.funcs.freeFeedbackForm = function () {

        $('a#feedback').on('click', function () {

            var data = {};

            var template = $('#m-feedback-form-free').html();
            var markup = Mustache.render(template, data);

            $('body').append(markup);
            $('div.free-feedback-form').fadeIn();
            ub.funcs.centerPatternPopup();

            $('span.ok-btn').on('click', function () {

                var _message = $('textarea#feedback-message').val().trim();

                if (_message.length !== 0) {

                    ub.funcs.submitFeedback(_message);

                }

                $('div.free-feedback-form').remove();

            });

            $('span.cancel-btn').on('click', function () {

                $('div.free-feedback-form').remove();

            });

        });

    }

    ub.funcs.freeFeedbackForm();

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
            success: function (response){

                $('div#validate-order-form').remove();
                $('span.processing').fadeOut();

                ub.funcs.feedbackForm('Your order is now submitted for processing. A ProLook representative will be reaching out shortly to confirm your order and help finish the ordering process.', ub.current_material.settings.thumbnails.front_view, ub.current_material.settings.thumbnails.left_view, ub.current_material.settings.thumbnails.right_view, ub.current_material.settings.thumbnails.back_view);
                ub.funcs.initGenderPicker();

            }
            
        });

    };

    ub.funcs.submitOrderForm = function () {

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
        var _billingState           = $('input[name="billing-state"]').val();
        var _billingZip             = $('input[name="billing-zip"]').val();

        var _shippingOrganization    = $('input[name="shipping-organization"]').val();
        var _shippingContactName     = $('input[name="shipping-contact-name"]').val();
        var _shippingEmail           = $('input[name="shipping-email"]').val();
        var _shippingPhone           = $('input[name="shipping-phone"]').val();
        var _shippingFax             = $('input[name="shipping-fax"]').val();
        
        var _shippingAddress         = $('input[name="shipping-address"]').val();
        var _shippingCity            = $('input[name="shipping-city"]').val();
        var _shippingState           = $('input[name="shipping-state"]').val();
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

        var _type = '';
        
        if (ub.current_material.material.factory_code === "BLB") {

            _type = "Sublimated";

        } else {

            _type ="Tackle Twill";

        }

        var orderInput = {

            order: {
                client: _clientName,  
                submitted: '1',
                user_id: _user_id,
                user_name: ub.user.fullname,
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
                    description: _uniformName,
                    type: ub.current_material.material.type,
                    builder_customizations: JSON.stringify(ub.current_material.settings),
                    set_group_id: 0,
                    factory_order_id: '',
                    design_sheet : ub.current_material.settings.pdfOrderForm,
                    roster: _transformedRoster,
                    attached_files: ub.current_material.settings.custom_artwork,
                    price: ub.funcs.getPrice(ub.current_material.material),
                    applicationType: _type,
                    notes: _notes,

                },
            ]
        };

        var _url = 'http://api-dev.qstrike.com/api/order';

        ub.funcs.postOrderData(orderInput,_url);

    };

    ub.funcs.displayLinks = function (link) {

        ub.current_material.settings.pdfOrderForm = link;

        var _linkTransformed = link;

        window.scrollTo(0,0);

        $('span.processing-pdf').fadeOut();
        $('span.previewFormPdf').fadeIn();
        $('span.submit-confirmed-order').fadeIn();

        var _url = "/pdfjs/web/viewer.html?file=" + _linkTransformed;

        $('iframe#pdfViewer').attr('src', _url)
        $('a.previewPDFLink').attr('href', _url);

        $('div#validate-order-form > span.processing').fadeOut();

        $('span.submit-confirmed-order').on('click', function () {

            if ($('span.submit-confirmed-order').html() === 'Submitting Order...') {
                return;
            }

            ub.funcs.submitOrderForm();
            $('span.submit-confirmed-order').html('Submitting Order...');

        });

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
        var _billingState           = $('input[name="billing-state"]').val();
        var _billingZip             = $('input[name="billing-zip"]').val();

        var _shippingOrganization    = $('input[name="shipping-organization"]').val();
        var _shippingContactName     = $('input[name="shipping-contact-name"]').val();
        var _shippingEmail           = $('input[name="shipping-email"]').val();
        var _shippingPhone           = $('input[name="shipping-phone"]').val();
        var _shippingFax             = $('input[name="shipping-fax"]').val();
        
        var _shippingAddress         = $('input[name="shipping-address"]').val();
        var _shippingCity            = $('input[name="shipping-city"]').val();
        var _shippingState           = $('input[name="shipping-state"]').val();
        var _shippingZip             = $('input[name="shipping-zip"]').val();

        var _transformedRoster      = [];

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

        var _type = '';

        if (ub.current_material.material.factory_code === "BLB") {

            _type = "Sublimated";

        } else {

            _type ="Tackle Twill";

        }

        var orderInput = {

            order: {
                client: _clientName,  
                submitted: '1',
                sku: "B-M-FBIJ-INF14-01-F01-17",
                material_id: ub.current_material.material.id,
                url: ub.config.host + window.document.location.pathname,
                user_name: ub.user.fullname,
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
                    item_id: _itemID,
                    type: ub.current_material.material.type,
                    description: _uniformName,
                    builder_customizations: ub.current_material.settings,
                    set_group_id: 0,
                    factory_order_id: '',
                    design_sheet : ub.current_material.settings.pdfOrderForm,
                    roster: _transformedRoster,
                    sku: ub.current_material.material.sku,
                    material_id: ub.current_material.material.id,
                    url: ub.config.host + window.document.location.pathname,
                    attached_files: ub.current_material.settings.custom_artwork,
                    price: ub.funcs.getPrice(ub.current_material.material),
                    applicationType: _type,
                    notes: _notes,
                },
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

        var _bc = ub.current_material.settings;
        var _input = ub.funcs.prepareData();

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
        
            success: function (response){
                
                if(response.success) {
                    ub.funcs.displayLinks(response.filename);
                    console.log('pdf filename: ' + response.filename);
                }
                else{
                    console.log('error: ');
                    console.log(response.message);
                }

            }
        
        });


    }

    ub.funcs.thumbnailsUploaded = function () {

        var _uploaded = false;
        var _thumbs =  ub.current_material.settings.thumbnails;

        var _frontViewOk    = _thumbs.front_view !== '';
        var _backViewOk     = _thumbs.back_view !== '';
        var _leftViewOk     = _thumbs.left_view !== '';
        var _rightViewOk    = _thumbs.left_view !== '';
        
        _uploaded = _frontViewOk && _backViewOk && _leftViewOk && _rightViewOk;

        return _uploaded;

    };

    ub.funcs.showValidateOrderForm = function () {

        $("div#validate-order-form").fadeIn();

    }

    ub.funcs.validateOrderForm = function () {

        ub.funcs.hideRosterAndOrderForm();
        ub.funcs.showValidateOrderForm();

        ub.funcs.generatePDF();

    }

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

    }

    ub.funcs.showOrderForm = function () {

        $('div#roster-input').fadeOut();
        window.scrollTo(0,0);
        $('div#order-form').fadeIn();
        var _total = ub.funcs.getTotalQuantity();
        $('td.uniform-name').html(ub.current_material.material.name);
        $('td.quantity').html(_total);

        var _htmlBuilder = '';
        _.each (ub.current_material.settings.size_breakdown, function (row) {

            _htmlBuilder += '<tr>';
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

        $('table#size-breakdown').find('tr.items').remove();
        $('table#size-breakdown').append(_htmlBuilder);

        $('span.back-to-roster-form-button').on('click', function () {

            ub.funcs.showRosterForm();

        });

        $('span.submit-order').on('click', function () {

            ub.funcs.validateOrderForm();

        });

        $('div.order-tab-button').on('click', function () {

            var _name = $(this).data('name');

            $('div.order-tab-button').removeClass('active-tab');
            $(this).addClass('active-tab');
            $('div.order-tab').removeClass('active-tab');
            $('div.order-tab[data-name="' + _name + '"]').addClass('active-tab');

        });

        $('#client-name, #athletic-director, #client-email, #phone, #fax, #shipping-checkbox, #billing-checkbox').on('change', function () {

            ub.funcs.duplicateClientInfo();

        });

    }

    ub.funcs.submitUniform = function () {

        if ($('tr.roster-row').length === 0) { 
            
            $.smkAlert({text: 'Please add Sizes and Roster before proceeding.', type:'warning', permanent: false, time: 5, marginTop: '90px'});

            return; 
        }

        var _validate = ub.funcs.rosterValid();

        if (!_validate.valid) {

            ub.showModal(_validate.messages);
            return;

        }

        ub.current_material.settings.roster = _validate.roster;
        ub.funcs.showOrderForm();

    };

    ub.funcs.prepareUniformSizes = function () {

        if (ub.funcs.getCurrentUniformCategory() === "Wrestling") {

            var _toHide = ['4XL','5XL','YXS', 'YXL', 'Y2XL', 'Y3XL'];

            _.each(_toHide, function (item) {

                $('span[data-size="' + item + '"]').hide();

            });

            

        }

    };

    ub.funcs.initRosterCalled = false;

    ub.funcs.AddRosterRow = function (_size) {

        console.log('Size: ');
        console.log(_size);

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

    ub.data.rosterInitialized = false;
    ub.funcs.initRoster = function () {

        ub.data.rosterInitialized = true;

        if (ub.funcs.initRosterCalled) { return; }
        if (typeof ub.user.id === "undefined") { return; }

        ub.funcs.prepareUniformSizes();

        $('span.undo-btn').hide();
        ub.funcs.deactivateMoveTool();
        ub.funcs.turnLocationsOff();
        ub.funcs.initRosterCalled = true;
        ub.funcs.resetHighlights();

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

        ub.funcs.fadeOutCustomizer();

        var data = {
            tabs: ub.data.uniformSizes[0].sizes,
        };

        var template = $('#m-roster-table').html();
        var markup = Mustache.render(template, data);

        ub.funcs.prepareUniformSizes();

        $('div.tabsContainer').append(markup);
        ub.funcs.hideColumns();

        $('span.add-player').on('click', function () {

            var _numbers    = ''; 
            var _size       = '';

            _size           = $(this).data('size');

            if (!ub.funcs.isCurrentSport('Wrestling')) {

                _numbers         = ub.funcs.createNumbersSelectionPopup(_size);

            } else {

                ub.funcs.AddRosterRow(_size);

            }

        });

        $('span.back-to-customizer-button').on('click', function (){

            ub.funcs.fadeInCustomizer();

        });

        $('span.add-item-to-order').on('click', function () {

            ub.funcs.submitUniform();

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

        $('span.tabButton').on('click', function () {

            var _size = $(this).data('size');

            $('span.tabButton').removeClass('active');
            $(this).addClass('active');

            $('div.tabsContainer > div.tab').hide();
            $('div.tab[data-size="' + _size + '"]').fadeIn();

        });

        ub.funcs.reInitHover();
        
    }

    ub.funcs.goto = function (location) {

        var _location = location;

        switch(_location) {
        
            case 'my-saved-designs':
          
                window.location.href = '/my-saved-designs';
                break;
          
            default:
                console.warning('Invalid Location: ' + _location);

        }        

    }

    ///// Save Design //////

         ub.funcs.updatePopup = function () {

            var _designName = $('input.design-name').val();
            $('div.save-design').fadeOut();
            alert('Design ' + _designName + ' Saved!');

            ub.funcs.goto('my-saved-designs');

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

                            $('div.save-design-footer').fadeIn();
                            $('em.uploading').fadeOut();

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

            // $.ajaxSetup({
            //     headers: {
            //         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            //     }
            // });

            delete $.ajaxSettings.headers["X-CSRF-TOKEN"];

            $.ajax({

                url: window.ub.config.api_host + '/api/saved_design',
                dataType: "json",
                type: "POST",
                data: JSON.stringify(data),
                crossDomain: true,
                contentType: 'application/json',
                headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            
                success: function (response){
                    
                    if (response.success) {

                        ub.funcs.updatePopup();

                    }
                    else {

                        console.log('Error Saving Design.');
                        console.log(response.message);
                        
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
                notes: _notes,

            };

            ub.funcs.postDesign(_data);

        };

        ub.funcs.initSaveDesign = function () {

            ub.funcs.showSaveDialogBox();
            ub.funcs.turnLocationsOff();

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
                tabs: ub.data.uniformSizes[0].sizes,
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

        };

    ///// End Save DEsign /////

});