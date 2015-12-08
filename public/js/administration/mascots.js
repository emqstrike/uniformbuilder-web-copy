$(document).ready(function() {

	$(document).on('change', function() {
        var length = $('.layers-row').length;
        renumberRows(length);
    });

    $( "tbody" ).disableSelection();
    $( "tbody" ).sortable({
        start: function( ) {
            $('.ui-sortable-placeholder').css('background-color','#e3e3e3');
        },
        stop: function( ) {
            var length = $('.layers-row').length;
            $(".layers-row").each(function(i) {
                $(this).find(".layer-number").text(length);
                $(this).find(".layer-number").val(length);
                length = length-1;
            });
            var newLength = $('.layers-row').length;
            renumberRows(newLength);
        }
    });

    var layers_properties = {};

    function renumberRows(length){
        $(".layers-row").each(function(i) {
            var thisLayer = "layer"+length;
            var layer_class = ".ma-layer.layer" + length;

            layers_properties[thisLayer] = {};
            layers_properties[thisLayer]['default_color'] = {};
            layers_properties[thisLayer]['layer_number'] = {};
            layers_properties[thisLayer]['filename'] = {};

            $(this).find('.ma-layer').removeClass().addClass("ma-layer");
            $(this).find('.ma-layer').addClass(thisLayer);
            $(this).find(layer_class).addClass('ma-layer');

            $(this).find('.ma-default-color').removeClass().addClass("ma-default-color");
            $(this).find('.ma-default-color').addClass(thisLayer);
            var default_color_class = ".ma-default-color.layer" + length;
            $(this).find(default_color_class).addClass('ma-default-color');

            $(this).find('.ma-options-src').removeClass().addClass("ma-options-src");
            $(this).find('.ma-options-src').addClass(thisLayer);
            var src_class = ".ma-options-src.layer" + length;
            $(this).find(src_class).addClass('ma-options-src');

            layers_properties[thisLayer]['default_color'] = $(this).find(default_color_class).val();
            layers_properties[thisLayer]['layer_number'] = $(this).find(layer_class).val();
            layers_properties[thisLayer]['filename'] = $(this).find(src_class).val();

            length--;
        });
        var moProperties = JSON.stringify(layers_properties);
        console.log("[[[MO-AP]]] --- "+moProperties);
    }

    $(document).on('click', '.clone-row', function() {

    	$( ".layers-row:first" ).clone().appendTo( "#layers-row-container" );

        var length = $('.layers-row').length;
        $(".layers-row").each(function(i) {
            $(this).find(".layer-number").text(length);
            $(this).find(".layer-number").val(length);
            length = length-1;
        });
        var newLength = $('.layers-row').length;
    });

});