$(function(){  
window.materials = null;
var $materials = $('.materials');
var url = "//api-dev.qstrike.com/api/materials";
//var url = "//localhost:8888/api/materials";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                window.materials = data['materials'];
                
            }
        });

    var sortedMaterials = _(window.materials).chain().sortBy(function(item){
        return item.name;
    }).sortBy(function(item){
        return item.block_pattern;
    }).sortBy(function(item){
        return item.price_item_template_id;
    }).sortBy(function(item){
        return item.uniform_application_type;
    }).sortBy(function(item){
        return item.uniform_category;
    }).reverse().sortBy(function(item){
        return item.asset_target;
    }).reverse().value();

    _.each(sortedMaterials, function(element, index, list){
        var result =`<tr>
                        <td class="m-id">`+element.id+`</td>
                        <td class="m-name">`+element.name+`</td>
                        <td class="m-pattern">`+element.block_pattern+`</td>
                        <td class="m-neck">`+element.neck_option+`</td>
                        <td class="m-sport">`+element.uniform_category+`</td>
                        <td class="m-type">`+element.design_type+`</td>
                        <td class="m-application">`+element.uniform_application_type+`</td>
                        <td class="m-price">`+element.price_item_template_id+`</td>
                        <td class="m-target">`+element.asset_target+`</td>
                        <td class="m-sku"><div id="sku-data">`+element.sku+`</div></td>
                        <td class="m-part-alias-id"><div id="alias-data">`+element.parts_alias_id+`</div></td>
                        <td class="m-item-id"><div id="item-id">`+element.item_id+`</div></td>
                        <td>
                            <button type="button" class="btn btn-info btn-xs edit"><i class="glyphicon glyphicon-edit"></i></button>
                            <button type="button" class="btn btn-default btn-xs submit"><i class="glyphicon glyphicon-floppy-save"></i></button>
                        </td>
                    </tr>`;
    
        $('.materials').append(result);

        $('.submit').attr('disabled','disabled');    
    });

    $('.submit').on('click', function(e){
        e.preventDefault();
        getValue($(this));
        $(this).parent().parent().find('#sku-data').attr('contenteditable', 'false');
        $(this).parent().parent().find('#alias-data').attr('contenteditable', 'false');
        $(this).parent().parent().find('#item-id').attr('contenteditable', 'false');

    });

    $(".m-sku, .m-part-alias-id, .m-item-id").on("keyup", function(e){    
        e.preventDefault();
        $(this).parent().find('.submit').removeAttr('disabled');     
    });

    $('.edit').on('click', function(e){
        e.preventDefault();
        $(this).parent().parent().find('#sku-data').attr('contenteditable', 'true');
        $(this).parent().parent().find('#alias-data').attr('contenteditable', 'true');
        $(this).parent().parent().find('#item-id').attr('contenteditable', 'true');
    });

    function getValue(thisObj){
        var temp = [];
            var x = {
                    "id" : thisObj.parent().parent().find('.m-id').text(),
                    "sku" : thisObj.parent().parent().find('.m-sku').text(),
                    "parts_alias_id" : thisObj.parent().parent().find('.m-part-alias-id').text(),
                    "item_id" : thisObj.parent().parent().find('.m-item-id').text()
        };

            temp.push(x);          
            var material = JSON.stringify(temp);
            console.log(material);


        var updateurl = "//api-dev.qstrike.com/api/material/updatePartial";          
        $.ajax({
            url: updateurl,
            type: "POST",
            data: JSON.stringify(x),
            dataTYPE: "json",
            crossDomain: true,
            contentType: 'application/json',
            // headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success){
                    new PNotify({
                    title: 'Success',
                    text: response.message,
                    type: 'success',
                    hide: true
                    });
                    $('.submit').attr('disabled','disabled');  
                  
                }

            }
        })
    }

    $('.material-table').DataTable( {
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        dom: 'Bfrtip',
        buttons: [
            'excel'
        ]
    } );
      


 });