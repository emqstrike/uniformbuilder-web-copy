$(document).ready(function() {

    ub.funcs.processFonts = function () {

        ub.data.fonts = _.filter(ub.data.fonts, {active: "1"});
        ub.data.fonts = _.sortBy(ub.data.fonts, "name");

        _.each (ub.data.fonts, function (font) {

            if (font.name === "") { return; }

            var _fontSizeTables = font.font_size_tables;
            var _parsedFontSizeTables = undefined;

            if (typeof _fontSizeTables !== "undefined" && _fontSizeTables !== null && _fontSizeTables !== "") {

               _parsedFontSizeTables = JSON.parse(_fontSizeTables);
                
            }

            font.parsedFontSizeTables = _parsedFontSizeTables;
            
        });

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

            ub.data.offSetResult = _perspectiveData;
            _offsetResult = _.find(_perspectiveData.sizes, {application_number: location.toString(), inputSize: fontSize.toString()});
            
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

        } else {

            if(_fontSizeTable === null) {

                _returnFontSize     = _.find(ub.data.defaultFontSizes, {size: parseFloat(fontSize)}).outputSize;

            } else {

                _fontSizeTable      = JSON.parse(_fontSizeTable.slice(1,-1));

                _fontProperties     = _.find(_fontSizeTable, { inputSize: fontSize.toString()});
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