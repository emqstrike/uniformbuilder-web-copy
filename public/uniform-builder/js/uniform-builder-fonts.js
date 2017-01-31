$(document).ready(function() {

    ub.funcs.processFonts = function () {

        ub.data.fonts = _.filter(ub.data.fonts, {active: "1"});
        ub.data.fonts = _.sortBy(ub.data.fonts, "name");

        _.each (ub.data.fonts, function (font) {

            var _fontSizeTables = font.font_size_tables;
            var _parsedFontSizeTables = undefined;

            if (typeof _fontSizeTables !== "undefined" && _fontSizeTables !== null) {

                _parsedFontSizeTables = JSON.parse(font.font_size_tables);
                
            }

            font.parsedFontSizeTables = _parsedFontSizeTables;
            
        });

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

        if (ub.current_material.material.uniform_category === "Baseball") { return; }
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

});