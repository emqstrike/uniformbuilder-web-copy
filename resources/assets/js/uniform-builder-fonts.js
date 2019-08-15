$(document).ready(function() {

    // Custom Stroke
    ub.data.fontStroke = {
        items: [],
        getStroke: function (brand, sport, blockPattern, fontSize, accentName, neckOption, fontName) {
            var result = undefined;
            result = _.filter(this.items, {brand: brand, sport: sport, blockPattern: blockPattern, fontSize: fontSize, accentName: accentName}).find(function (items) {
                return _.contains(items.neckOptions, neckOption) && _.contains (items.fontNames, fontName);
            });
            return result;
        }
        
   }

    ub.funcs.getSampleFont = function () {

        // TODO: Use first available font if there's no match

        var _uniformCategory = ub.current_material.material.uniform_category;
        var _sampleFont = ub.data.sampleFonts.getSampleFont(_uniformCategory);
        var _result = ub.funcs.getFontByName(_sampleFont.fontName);
        
        if (typeof _result === "undefined") {

            if (ub.data.fonts.length === 0) {

                ub.utilities.warn('There are no fonts loaded!');

            }

            _result = _.first(ub.data.fonts);
            if (typeof _result !== "undefined") { ub.utilities.warn('No Sample Font Set for ' + ub.current_material.material.uniform_category + ' using ' + _result.name); }

        }

        return _result;

    }

    ub.funcs.initFonts = function (sport, option, blockPattern) {

        ub.data.fonts = _.filter(ub.data.fonts, function (font) {

            var sports = JSON.parse(font.sports);
            
            var options = undefined;
            var optionOK = true;

            var blockPatterns = undefined;
            var blockPatternOK = true;

            if (font.block_pattern_options !== null && font.block_pattern_options !== '""' ) {

                options = JSON.parse(font.block_pattern_options);    
                
                if (options !== '') {

                    if (options !== null)  {

                        options = options.split(',');
                        optionOK = _.contains(options, option);

                    }

                }

            }

            if (font.block_patterns !== null && font.block_patterns !== '""') {

                if (blockPattern !== '') {

                    blockPatterns = JSON.parse(font.block_patterns);

                    if (blockPatterns !== null)  {

                        blockPatterns = blockPatterns.split(',');
                        blockPatternOK = _.contains(blockPatterns, blockPattern);

                    } else {
                        
                        console.log('');
                        ub.utilities.error('Block Pattern Null for ' + font.name  + '(' + font.id + ')');

                    }
                
                }

            }

            if (sports === null) {

                return;

            } else {

                if (sports[0] === "" || sports[0] === "All") {

                    return;

                } else { 

                    var _result = _.contains(sports, sport);

                    return _result && optionOK && blockPatternOK;

                }

            }

        });

        _.each(ub.data.fonts, function (font) {

            font.caption = font.alias;

        });

        // Hide Richardson Fonts #Richardson
        // if (!_.contains(ub.fontGuideIDs, window.ub.valid)) {
        //     ub.data.fonts = _.filter(ub.data.fonts, {brand: 'prolook'})
        // }

        var _brand = ub.current_material.material.brand; 
        ub.data.fonts = _.filter(ub.data.fonts, {brand: _brand});

    };

    ub.funcs.processFonts = function () {

        ub.funcs.initFonts(ub.config.sport, ub.config.option, ub.config.blockPattern);
        
        ub.data.fonts = _.filter(ub.data.fonts, {active: "1"});
        ub.data.fonts = _.sortBy(ub.data.fonts, "name");

        _.each (ub.data.fonts, function (font) {

            if (font.name === "") { return; }

            var _fontSizeTables = font.font_size_tables;
            var _sublimatedFontSizeTables = font.sublimated_font_size_tables;
            var _parsedFontSizeTables = undefined;
            var _parsedSublimatedFontSizeTables = undefined;

            if (typeof _fontSizeTables !== "undefined" && _fontSizeTables !== null && _fontSizeTables !== "") {

               _parsedFontSizeTables = JSON.parse(_fontSizeTables);

            }

            if (typeof _sublimatedFontSizeTables !== "undefined" && _sublimatedFontSizeTables !== null && _sublimatedFontSizeTables !== "") {

                _parsedSublimatedFontSizeTables = JSON.parse(_sublimatedFontSizeTables);
                
            }

            if (ub.config.uniform_application_type === "sublimated") {
                _parsedFontSizeTables = _parsedSublimatedFontSizeTables;
            }

            font.parsedFontSizeTables = _parsedFontSizeTables;
            font.sublimatedParsedFontSizeTables = _parsedSublimatedFontSizeTables;

            // console.log('Parsed Font Size Table');
            // console.log(font.parsedFontSizeTables);

            // console.log('Sublimated Parsed Font Size Table: ');
            // console.log(font.sublimatedParsedFontSizeTables);

        });

        if (ub.data.fonts.length > 0) {

            console.log(' ');
            ub.utilities.info("Fonts: ");

            ub.utilities.info(ub.data.fonts.length + " fonts loaded for " + ub.config.brand.toTitleCase());
            ub.utilities.info(ub.config.gender.toTitleCase() + ' / ' + ub.config.sport + ' / ' + ub.config.blockPattern + ' / ' + ub.config.option);
            
            // filter for Hockey Socks block pattern fonts
            // get all fonts dedicated for `Hockey Socks` block pattern only
            var material = ub.current_material.material;
            if (material.uniform_category === "Hockey" && material.block_pattern === "Hockey Socks") { 
                ub.data.fonts = _.filter(ub.data.fonts, function(font) {
                    var parsedBlockPatterns = JSON.parse(font.block_patterns);
                    if(_.isEqual(parsedBlockPatterns, 'Hockey Socks')) {
                        return font;
                    }
                });
            }

            ub.displayDoneAt( ub.data.fonts[0].name + ' preloaded.');

            WebFont.load({

                custom: {
                  families: [ub.data.fonts[0].name,]
                },

            });

            console.log(' ');    

        } else {

            ub.utilities.error('No fonts loaded for ' + ub.config.sport + " / " + ub.config.option + "!");

        }

    }

    ub.funcs.getFontByName = function (fontName) {

        var _fontObj = _.find(ub.data.fonts, {name: fontName});

        if (typeof _fontObj === "undefined") { 

            console.warn('Font ' + name + ' not found!');

        }

        return _fontObj;

    };

    ub.funcs.getFontOffsetsByName = function (fontName, perspective, size, applicationNo) {

        var _fontObj = ub.funcs.getFontByName(fontName);
        var _perspectiveData = undefined;
        var _offsetData = undefined;

        if (typeof _fontObj === "undefined") {

            console.warn('Font ' + fontName + ' not found.');
            return;

        }

        _perspectiveData = _.find(_fontObj.parsedFontSizeTables, {perspective: perspective});

        if (typeof _perspectiveData === "undefiend") {

            console.warn('Perspective Data for ' + _fontName + ', ' + perspective + ' is undefined.');
            return;

        }

        _offsetData = _.find(_perspectiveData.sizes, {inputSize: size.toString(), application_number: applicationNo.toString()});

        if (typeof _offsetData === "undefined") {

            console.warn('offset data for ' + _fontName + ', ' + perspective + ', size: ' + size + ' not found.');
            return;

        }

        return _offsetData;

    };

    // Get offsets from new multiple perspective font size tables
    ub.funcs.getFontOffsetsfromParsedFontTables = function (fontName, perspective, location, fontSize) {

        var _font = _.find(ub.data.fonts, {name: fontName});
        var _perspectiveData = undefined;
        var _offsetResult = undefined;

        if (typeof _font !== "undefined") {

            _perspectiveData = _.find(_font.parsedFontSizeTables, {perspective: perspective});

            if (typeof _perspectiveData === "undefined") {

                console.log('Font Name: ');
                console.log(fontName);

                console.log('Perspective: ');
                console.log(perspective);

                console.log('Location: ');
                console.log(location);

                console.log('Font Size');
                console.log(fontSize);
                
                console.log(_font);

            }

            ub.data.offSetResult = _perspectiveData;
            _offsetResult = _.find(_perspectiveData.sizes, {application_number: location.toString(), inputSize: fontSize.toString()});

            if (ub.config.ignoreFontRulesOnSublimatedAndTwill(ub.config.brand)) {
                
                _perspectiveData = _.find(_font.sublimatedParsedFontSizeTables, {perspective: perspective});
                _offsetResult = _.find(_perspectiveData.sizes, { inputSize: fontSize.toString() });
                
                ub.utilities.info('');
                ub.utilities.info(ub.config.brand + ' brand is detected. Ignoring font rules between sublimated and twill.');
                ub.utilities.info('Using sublimated font behavior on application #' + location.toString() + ', size: ' + fontSize + ', perspective: ' + perspective);
                ub.utilities.info('{ inputSize: ' +  _offsetResult.inputSize + ', outputSize: ' + _offsetResult.outputSize + ', offset: (x:' + _offsetResult.x_offset + ', y: ' + _offsetResult.y_offset + '), scale: (x: ' + _offsetResult.x_scale + ', y: ' + _offsetResult.y_scale + ') }');

            }
            
        }

        // Not Matching Settings, get a similar size from the front, without specifying the application number
        if (typeof _offsetResult === "undefined") {

            _perspectiveData = _.find(_font.sublimatedParsedFontSizeTables, {perspective: perspective});

            _offsetResult = _.find(_perspectiveData.sizes, { inputSize: fontSize.toString() });

            ub.utilities.info('');
            ub.utilities.info('No font size record found for location ' + location.toString() + ', size: ' + fontSize + ', perspective ' + perspective);
            ub.utilities.info('Temporary using settings for location #' + _offsetResult.application_number);
            ub.utilities.info('{ inputSize: ' +  _offsetResult.inputSize + ', outputSize: ' + _offsetResult.outputSize + ', offset: (x:' + _offsetResult.x_offset + ', y: ' + _offsetResult.y_offset + '), scale: (x: ' + _offsetResult.x_scale + ', y: ' + _offsetResult.y_scale + ') }');
            
        }

        return _offsetResult;

    }

    ub.funcs.getFontOffsets = function (fontName, fontSize, perspective, location) {

        var _offsetObject = _.find(ub.funcs.fontOffSets, {fontName: fontName, size: fontSize.toString(), perspective: perspective, location: location.toString()});
        var _returnObject = {

            offsetX: 0, 
            offsetY: 0,
            scaleX: 1, 
            scaleY: 1,

        }

        if (typeof _offsetObject === "undefined" && ub.funcs.isCurrentSport('Football')) { 

            ub.utilities.warn('Football Font (' + fontName + ') should have old settings...')

        }

        if (typeof _offsetObject === "undefined") {

            var _fontSizeTable = ub.funcs.getFontOffsetsfromParsedFontTables(fontName, perspective, location.toString());
        
            _returnObject.offsetX   = parseFloat(_fontSizeTable.x_offset);
            _returnObject.offsetY   = parseFloat(_fontSizeTable.y_offset);
            _returnObject.scaleX    = parseFloat(_fontSizeTable.x_scale);
            _returnObject.scaleY    = parseFloat(_fontSizeTable.y_scale);

            return _returnObject;

        }

        if (typeof _offsetObject === "undefined") {

            _returnObject.offsetX   = 0;
            _returnObject.offsetY   = 0;
            _returnObject.scaleX    = 1;
            _returnObject.scaleY    = 1;

            console.error('Offsets for ' + fontName + ' not found, using defaults. please add values to ub.funcs.fontOffsets')
            console.error('fontName: ' + fontName);
            console.error('fontSize: ' + fontSize);
            console.error('perspective: ' + perspective);
            console.error('location: ' + location);
            console.error('typeof location: ' + typeof location);

        }
        else {

            _returnObject.offsetX = parseFloat(_offsetObject.adjustmentX) - parseFloat(_offsetObject.origX);
            _returnObject.offsetY = parseFloat(_offsetObject.adjustmentY) - parseFloat(_offsetObject.origY);
            _returnObject.scaleX = parseFloat(_offsetObject.scaleX);
            _returnObject.scaleY = parseFloat(_offsetObject.scaleY);

        }

        return _returnObject;

    }

    ub.funcs.mirrorApp = function (baseApp, backOa, backOb, frontOa, frontOb) {

        if (baseApp.application_type === 'mascot' || baseApp.application_type === 'free') { return; }

        var _totalWidthFront    = ub.totalWidth; 
        var _totalWidthBack     = ub.totalWidth;

        backOb.rotation         = backOa.rotation * -1;
        frontOa.rotation        = frontOb.rotation * -1;

        // frontOa.position.x      = _totalWidthFront - frontOb.position.x + 4;
        // backOb.position.x       = _totalWidthBack - backOa.position.x;
        
        frontOa.position.y      = frontOb.position.y;
        backOb.position.y       = backOa.position.y;

    }

    ub.funcs.mirrorRotation = function () {

        if (!ub.data.sportsMain.currentOk()) { return; }
        if (ub.data.rosterInitialized) { return; }

        if (ub.current_material.material.type === "lower") { return; }

        var _backOa = undefined;
        var _backOb = undefined; 
        var _frontOa = undefined;
        var _frontOb = undefined; 
        var _baseApp = undefined;

        // 9 and 10

        _baseApp = ub.current_material.settings.applications[9];

        _backOa = ub.objects.back_view.objects_10;
        _backOb = ub.objects.back_view.objects_9;

        _frontOa = ub.objects.front_view.objects_10;
        _frontOb = ub.objects.front_view.objects_9;

        if (typeof _backOa !== 'undefined' && _backOb !== 'undefined' && _frontOb !== 'undefined' && _frontOa !== 'undefined') {

            ub.funcs.mirrorApp(_baseApp, _backOa, _backOb, _frontOa, _frontOb);

        }


        // 43 and 44 

        _backOa     = undefined;
        _backOb     = undefined; 
        _frontOa    = undefined;
        _frontOb    = undefined; 
        _baseApp    = undefined;

        _baseApp    = ub.current_material.settings.applications[43];

        _backOa     = ub.objects.back_view.objects_44;
        _backOb     = ub.objects.back_view.objects_43;

        _frontOa    = ub.objects.front_view.objects_44;
        _frontOb    = ub.objects.front_view.objects_43;

        if (typeof _backOa !== 'undefined' && _backOb !== 'undefined' && _frontOb !== 'undefined' && _frontOa !== 'undefined') {

            ub.funcs.mirrorApp(_baseApp, _backOa, _backOb, _frontOa, _frontOb);

        }


        // 41 and 42 

        _backOa     = undefined;
        _backOb     = undefined; 
        _frontOa    = undefined;
        _frontOb    = undefined; 
        _baseApp    = undefined;

        _baseApp    = ub.current_material.settings.applications[41];

        _backOa     = ub.objects.back_view.objects_42;
        _backOb     = ub.objects.back_view.objects_41;

        _frontOa    = ub.objects.front_view.objects_42;
        _frontOb    = ub.objects.front_view.objects_41;

        if (typeof _backOa !== 'undefined' && _backOb !== 'undefined' && _frontOb !== 'undefined' && _frontOa !== 'undefined') {

            ub.funcs.mirrorApp(_baseApp, _backOa, _backOb, _frontOa, _frontOb);

        }

    }

    ub.funcs.fixAlignments = function () {

        if (ub.current_material.material.uniform_category !== "Football" && ub.current_material.material.uniform_category !== "Wrestling") { return; }
        if (ub.data.rosterInitialized) { return; }

        if (typeof ub.objects.back_view.objects_10 !== 'undefined' && ub.objects.back_view.objects_9 !== 'undefined' && ub.objects.front_view.objects_9 !== 'undefined' && ub.objects.front_view.objects_10 !== 'undefined') {

            var _totalWidthFront = ub.totalWidth; 
            var _totalWidthBack = ub.totalWidth;
            var _application9 = ub.current_material.settings.applications[9];
            var is9BuffsBold;

            if (_application9.application_type === 'mascot' || _application9.application_type === 'free') { return; }

            is9BuffsBold = ub.current_material.settings.applications[9].font_obj.name === 'Buffs Bold';

            if (is9BuffsBold) {

                var _result = ub.data.buffsBoldAdjustment;

                if (typeof _result !== 'undefined') {

                    ub.objects.front_view.objects_9.position.x = _result.x;

                }

            }

            if (typeof ub.data.blockPatternLength !== 'undefined') {

                _totalWidthFront    = ub.data.blockPatternLength.widthFront;
                _totalWidthBack     = ub.data.blockPatternLength.widthBack;

            }

            if (ub.current_material.material.block_pattern === "ARIZONA") {

                ub.objects.back_view.objects_10.position.x = 115;
                ub.objects.front_view.objects_9.position.x = 118

            }

            if (ub.current_material.material.block_pattern === "DELUXE 1") {

                ub.objects.back_view.objects_10.position.x = 115;
                ub.objects.front_view.objects_9.position.x = 115

            }

            if (ub.current_material.material.block_pattern === "DELUXE 2") {

                ub.objects.front_view.objects_9.position.x = 110

            }

            if (ub.current_material.material.block_pattern === "PRO COMBAT") {

                ub.objects.back_view.objects_10.position.x = 115;

            }

            if (ub.current_material.material.block_pattern === "TEXAS TECH 14") {

                ub.objects.back_view.objects_10.position.x = 115;

                _totalWidthFront     = 1003;
                _totalWidthBack      = 1004;

            }

            if (ub.current_material.material.block_pattern === "UA") {}

            if (ub.current_material.material.block_pattern === "USC") {
                
                ub.objects.back_view.objects_10.position.x = 115;

            }

            if (ub.current_material.material.block_pattern === "UTAH") {

                ub.objects.back_view.objects_10.position.x = 115;

            }

            ub.objects.back_view.objects_9.rotation     = ub.objects.back_view.objects_10.rotation * -1;
            ub.objects.front_view.objects_10.rotation   = ub.objects.front_view.objects_9.rotation * -1;

            ub.objects.front_view.objects_10.position.x = _totalWidthFront - ub.objects.front_view.objects_9.position.x;
            ub.objects.back_view.objects_9.position.x   = _totalWidthBack - ub.objects.back_view.objects_10.position.x;

            ub.objects.front_view.objects_10.position.y = ub.objects.front_view.objects_9.position.y;
            ub.objects.back_view.objects_9.position.y   = ub.objects.back_view.objects_10.position.y;

        }

    }

    //set the configuration flag if the material's saved design settings should be retained.
    ub.funcs.setupRetain = function () {

        var retain = ub.current_material.material.retain_settings_from_saved_design;

        if (retain === 1 || retain === '1') {
            ub.config.retain = true;
        }

    }

    ub.data.getPixelFontSize = function (fontID, fontSize, perspective, application) {

        var _fontObj        = _.find(ub.data.fonts, {id: fontID});

        var _fontSizeTable  = _fontObj.font_size_table;
        var _fontSizeData;

        var _fontProperties;
        var _inputFontSize  = '0';
        var _xOffset        = 0;
        var _yOffset        = 0;
        var _xScale         = 0;
        var _yScale         = 0;
        var _fontSizeTables = _fontObj.parsedFontSizeTables;

        // If the font has the multi-perspective settings use it instead

        if (_fontSizeTables !== null && typeof _fontSizeTables !== "undefined") {

            var _fontSizeTable = ub.funcs.getFontOffsetsfromParsedFontTables(_fontObj.name, perspective, application.id.toString(), fontSize);

            _fontSizeData =  {

                inputSize: _fontSizeTable.inputSize,
                pixelFontSize: _fontSizeTable.outputSize,
                xOffset: parseFloat(_fontSizeTable.x_offset),
                yOffset: parseFloat(_fontSizeTable.y_offset),
                xScale: parseFloat(_fontSizeTable.x_scale),
                yScale: parseFloat(_fontSizeTable.y_scale),

            };

            // if retain is true, ignore fontOffsets
            if (ub.config.retain) {
                _fontSizeData.xOffset = 0;
                _fontSizeData.yOffset = 0;
            }

        } else {

            if(_fontSizeTable === null) {

                _returnFontSize     = _.find(ub.data.defaultFontSizes, {size: parseFloat(fontSize)}).outputSize;

            } else {

                _fontSizeTable      = JSON.parse(_fontSizeTable.slice(1,-1));
                _fontProperties     = _.find(_fontSizeTable, { inputSize: fontSize.toString()});

                if (typeof _fontProperties === "undefined") { ub.utilities.error('Font settings for ' + _fontObj.name + ' / ' + fontSize + ' not found.'); }

                _inputFontSize      = _fontProperties.inputSize;
                _returnFontSize     = _fontProperties.outputSize;
                _xOffset            = _fontProperties.xOffset;
                _yOffset            = _fontProperties.yOffset;
                _xScale             = _fontProperties.xScale;
                _yScale             = _fontProperties.yScale;

            }

            _fontSizeData =  {

                inputSize: _inputFontSize,
                pixelFontSize: _returnFontSize,
                xOffset: _xOffset,
                yOffset: _yOffset,
                xScale: _xScale,
                yScale: _yScale,

            };

        }

        if (ub.data.sportsMain.currentOk()) {

            if (ub.current_material.material.one_inch_in_px === null) { 
                ub.utilities.warn('No one_inch_in_px set for this uniform.'); 
            }

            _fontSizeData.pixelFontSize = fontSize * parseInt(ub.current_material.material.one_inch_in_px);
                
        }

        // apply new Font Metrics (one_inch_in_px) on sports that has false value 'ub.data.sportsMain.currentOk()'
        // and has application_type of 'sublimated' and 'knitted'
        if (!ub.data.sportsMain.currentOk() 
            && (ub.current_material.material.uniform_application_type === "sublimated" || ub.current_material.material.uniform_application_type === "knitted")) {
                
                if (ub.current_material.material.one_inch_in_px     !== 0 
                    && ub.current_material.material.one_inch_in_px  !== 'undefined'
                    && ub.current_material.material.one_inch_in_px  !== null) {

                    _fontSizeData.pixelFontSize = fontSize * parseInt(ub.current_material.material.one_inch_in_px);

                }

        }

        return _fontSizeData;

    };

    ub.funcs.getTailSweepByID = function (id) {

        var _tailSweepObj = _.find(ub.data.tailSweeps, {id: id.toString()});

        if (typeof _tailSweepObj === "undefined") { console.warn('Tailsweep with id ' + id + ' not found.'); }

        return _tailSweepObj;

    };

    ub.funcs.getTailSweepByCode = function (code) {

        var _tailSweepObj = _.find(ub.data.tailSweeps, {code: code});

        if (typeof _tailSweepObj === "undefined") { console.warn('Tailsweep with code "' + name + '" not found.'); }

        return _tailSweepObj;

    };

});