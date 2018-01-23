$(document).ready(function(){

    var sizes = ['XS','S','M','L','XL','2XL','3XL','4XL','5XL','5-7','8-12','13-14','YXS','YS','YM','YL','YXL','Y2XL','Y3XL','1 Size','22-30','32-44','46-54','24-34','36-48','50-54','30-36','38-42'];
    var size_properties = {};

    $('.autosized').autosize({append: "\n"});
    initSizes();
    selectChange();

    var defaultElem = $( ".prop-row" ).clone();    

    $('.add-property').on('click', function(e){
        e.preventDefault();
        var x  = $( ".prop-row:first" ).clone();
        y = "<td><a href='#' class='btn btn-xs btn-danger remove-prop'><span class='glyphicon glyphicon-remove'></span></a></td>";

        $('.property-body').append(x);
        $(x).append(y);
        deleteButton();
        selectChange();
        updateProperties();
    });

    function selectChange(){
        $( "select" ).change(function() {
            updateProperties();
        });
        $( ".qx-item-id" ).on('keyup', function() {
            updateProperties();
        });
    }

    function deleteButton(){
        $('.remove-prop').on('click', function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
            updateProperties();
        });
    }

    function initSizes(){
        _.each(sizes, function(i){
            var elem = '<option value="' + i + '">' + i + '</option>';
            $('.size').append(elem);
        });
    }

    function updateProperties(){
      var data = [];
      $(".prop-row").each(function(i) {
            var temp = {
                "size" : $(this).find('.size').val(),
                "qx_item_id" : $(this).find('.qx-item-id').val(),
            };
            data.push(temp);
            console.log(JSON.stringify(data));
        });
        $('#size_property').val(JSON.stringify(data));
    }
});