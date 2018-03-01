$(document).ready(function(){

    window.sport_id = null;
    window.block_patterns = null;

    window.parts = null;
    window.material_id = null;
    window.parts_options = null;

    window.questions_list = null;
    window.item_id = null;
    window.questions_options = null;
    window.question_names = null;
    window.type = null;
    window.types = ['Color', 'Pattern', 'Material' , 'Team_Color', 'Piping', 'Sock_Color', 'Allowed_Fabrics'];
    window.fabrics = null;
    


$('.delete-part').on('click', function(){


       var id = [];
       id.push( $(this).data('part-id'));
       
   
       modalConfirm('Remove part', 'Are you sure you want to delete the part?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//api-dev.qstrike.com/api/parts_alias/delete/";
        //var url = "//localhost:8888/api/parts_alias/delete/";
       
        $.ajax({
           url: url,
           type: "POST",
           data: JSON.stringify({id: id}),
           dataType: "json",
           crossDomain: true,
           contentType: 'application/json',
           //headers: {"accessToken": atob(headerValue)},
           success: function(response){
               if (response.success) {
                   new PNotify({
                       title: 'Success',
                       text: response.message,
                       type: 'success',
                       hide: true
                   });
                   $('#confirmation-modal').modal('hide');
                  $.each(id, function (index, value) {
                     // console.log(value);
                     $('.part-' + value).fadeOut();

                     // Will stop running after "three"
                     
                   });
                   

               }
           }
       });
   });

    
    function updateJSON(){
       var temp =[];
        $(".layer-row").each(function(i) {
            var x = {
                    "part_name" : $(this).find('.part-name').val(),
                    "part_questions" : $(this).find('.part-questions').val(),
                    "edit_part_name" : $(this).find('.edit-part-name').val(),
                    "edit_part_value" : $(this).find('.edit-part-value').val(),
                    "fabrics" : $(this).find('.fabrics').val(),
                    "input_type" : $(this).find('.type').val(),
                 };
                temp.push(x);
        });
        
        var properties = JSON.stringify(temp);

        $('#properties').val(properties);
        
        var data = JSON.parse(properties);              
    }

    function setValue(thisObj){
      var value_part_name = thisObj.parent().parent().find('.part-name').val();
      var row_type = thisObj.parent().parent().find('.type').val();
      var part_value = value_part_name+'_'+row_type;
      part_value = part_value.toLowerCase();
      part_value = part_value.replace(/ /g, "_");
      thisObj.parent().parent().find('.edit-part-value').val(part_value);
      }

    $('.load-props').on('click', function(e){
      e.preventDefault();
      var properties = $('#properties').val();

      var material_id = $('.material-id-parts').val();
      window.material_id = material_id;
      getParts(function(parts){ window.parts = parts; });
      var part_names = $.map(window.parts, function(value, index) {
          return [value];
      });

    var item_id = $('.item-id').val();
    window.item_id = item_id;

      getQuestionsList(function(questions_list){ window.questions_list = questions_list; });

      var arranged_questions = _.sortBy(window.questions_list, function(e){ return e.QuestionID; });

      getSourceFabrics(function(materials_fabrics){ window.source_fabrics = materials_fabrics; });
      if(properties !== ""){  
        $('#getPartsModal').modal('show');

        setTimeout(function(){

          var data = JSON.parse(properties);
          data.forEach(function(entry){

            var part_name = entry.part_name;
            window.parts_options_names = null;
            var part_name_options_elem = '';

            part_names.forEach(function(entry) {
                if(entry == part_name){
                    part_name_options_elem += '<option value="'+entry+'" selected>'+entry+'</option>';
                } else {
                    part_name_options_elem += '<option value="'+entry+'">'+entry+'</option>';
                }
            });

            window.parts_options_names = part_name_options_elem;
            var q_id = entry.part_questions;
            var q_name = entry.edit_part_name;
            
            window.questions_options = null;
            var part_question_id_elem = '';
            var question_names_elem = '';
            window.questions_names = null;
            arranged_questions.forEach(function(entry) {
                if(entry.QuestionID == q_id){
                    part_question_id_elem += '<option value="'+entry.QuestionID+'" selected>['+entry.QuestionID+'] '+entry.Question+' --- '+entry.QuestionGroup+'</option>';
                }
                else {
                    part_question_id_elem += '<option value="'+entry.QuestionID+'">['+entry.QuestionID+'] '+entry.Question+' --- '+entry.QuestionGroup+'</option>';
                }
                if(entry.Question==q_name){
                    question_names_elem += '<option value="'+entry.Question+'" selected>'+entry.Question+'</option>';
                }
                else {
                    question_names_elem += '<option value="'+entry.Question+'">'+entry.Question+'</option>';
                }  
            });
            window.questions_options = part_question_id_elem;
            window.question_names = question_names_elem; 
            window.type = null;
            var type_elem = '';
            types.forEach(function(type) {
                if (type == entry.input_type) {
                    type_elem += '<option value="'+type+'" selected>'+type+'</option>';
                }
                else {
                    type_elem += '<option value="'+type+'">'+type+'</option>';
                }
            });
            window.type = type_elem;
            window.fabrics = null;

            var fabric_elem = '<option value="null"></option>';
            $.each(window.source_fabrics, function (i, item){
                if(item.material_name == entry.fabrics) {
                    fabric_elem += `<option value="`+item.material_name+`" selected>`+item.material_name+` [`+item.factory_name+`]</option>`;
                } else {
                    fabric_elem += `<option value="`+item.material_name+`">`+item.material_name+` [`+item.factory_name+`]</option>`;    
                }                           
            });
            window.fabrics = fabric_elem;

            var td_open = '<td>';
            var td_close = '</td>';
            var input_part_name = '<select class="part-name">'+window.parts_options_names+'</select>';                   
            var input_question_id = '<select class="part-questions">'+window.questions_options+'</select>';
            var input_edit_part_name = '<select class="edit-part-name">'+window.question_names+'</select>';
            var input_edit_part_value = '<input type="text" class="edit-part-value" value="'+entry.edit_part_value+'">';
            var fabrics = '<select class="fabrics from-control">'+window.fabrics+'</select>';
            var input_type = '<select class="type from-control">'+window.type+'</select>';
            var delete_row = '<a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>';
            var elem = '<tr class="layer-row">' +
                            td_open +
                                input_part_name +
                            td_close +
                            td_open +
                                input_question_id +
                            td_close +
                            td_open +
                                input_edit_part_name +
                            td_close +
                            td_open +
                                input_edit_part_value +
                            td_close +
                            td_open +
                                fabrics +
                            td_close +
                            td_open +
                                input_type +
                            td_close +
                            td_open +
                                delete_row +
                            td_close +
                        '</tr>';
            $('.properties-content').append(elem);
           });
          }, 1000); //end timeout
      }

    });
    

    
   //updateJSON EVENTS
    $("#part_aliases_form").on("keyup", ".edit-part-value", function(e){    
        e.preventDefault();
        updateJSON();     
    });         
                
    $("#part_aliases_form").on("change", ".part-name", function(e){
            e.preventDefault();
            setValue($(this));
            updateJSON();
    });

    $("#part_aliases_form").on("change", ".part-questions", function(e){
            e.preventDefault();
            updateJSON();
    });

    $("#part_aliases_form").on("change", ".fabrics", function(e){
            e.preventDefault();
            updateJSON();
    });
    $("#part_aliases_form").on("change", ".edit-part-name", function(e){
            e.preventDefault();
            updateJSON();
    });

    $("#part_aliases_form").on("change", ".type", function(e){
            e.preventDefault();
            setValue($(this));
            updateJSON();
    });

    $("#part_aliases_form").on("click", ".delete-row", function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
            updateJSON();
    });

    $('.add-props').on('click', function(e){
        e.preventDefault();
        var td_open = '<td>';
        var td_close = '</td>';
        var input_part_name = '<select class="part-name">'+window.parts_options+'</select>';
        var input_question_id = '<select class="part-questions">'+window.questions_options+'</select>';
        var input_edit_part_name = '<select class="edit-part-name">'+window.question_names+'</select>';
        var input_edit_part_value = '<input type="text" class="edit-part-value" value="">';
        var fabrics = '<select class="fabrics from-control">'+window.fabrics+'</select>';
        var input_type = `<select class="type from-control">
                                <option value="Pattern">Pattern</option>
                                <option value="Color">Color</option>
                                <option value="Material">Material</option>
                                <option value="Team_Color">Team Color</option>
                                <option value="Piping">Piping</option>
                                <option value="Sock_Color">Sock Color</option>
                                <option value="Allowed_Fabrics">Allowed Fabrics</option>
                            </select>`;
        var delete_row = '<a href="#" class="btn btn-danger btn-xs delete-row"><span class="glyphicon glyphicon-remove"></span></a>';
        var elem = '<tr class="layer-row">' +
                        td_open +
                            input_part_name +
                        td_close +
                        td_open +
                            input_question_id +
                        td_close +
                        td_open +
                            input_edit_part_name +
                        td_close +
                        td_open +
                            input_edit_part_value +
                        td_close +
                        td_open +
                            fabrics +
                        td_close +
                        td_open +
                            input_type +
                        td_close +
                        td_open +
                            delete_row +
                        td_close +
                    '</tr>';
        $('.properties-content').prepend(elem);
        updateJSON();

    });

    function deleteButton(){
        $('.delete-row').on('click', function(e){
            e.preventDefault();
            $(this).parent().parent().remove();
            updateJSON();
        });
    }

    $('.get-parts').on('click', function(e){
        e.preventDefault();
        //Open loading modal
        $('#getPartsModal').modal('show');
        setTimeout(function(){
            var material_id = $('.material-id-parts').val();
            window.material_id = material_id;
            getParts(function(parts){ window.parts = parts; });
            var z = $.map(window.parts, function(value, index) {
                return [value];
            });
            //$('part-name').html();
            var elem = '';
            window.parts_options = null;
            z.forEach(function(entry) {
                elem += '<option value="'+entry+'">'+entry+'</option>';
            });
            window.parts_options = elem;
        }, 1000);
        
    });

    $('.get-questions').on('click', function(e){
        e.preventDefault();
        getFabrics();
         //Open loading modal
        $('#getPartsModal').modal('show');

        setTimeout(function(){
            var item_id = $('.item-id').val();
            window.item_id = item_id;

            getQuestionsList(function(questions_list){ window.questions_list = questions_list; });

            window.questions_options = null;

            $('part-questions').html();
            var elem = '';
            var question_names = '';
            window.questions_options = null;
            var arranged_questions = _.sortBy(window.questions_list, function(e){ return e.QuestionID; });

            arranged_questions.forEach(function(entry) {
                elem += '<option value="'+entry.QuestionID+'">['+entry.QuestionID+'] '+entry.Question+' --- '+entry.QuestionGroup+'</option>';
                question_names += '<option value="'+entry.Question+'">'+entry.Question+'</option>';
            });
            window.questions_options = elem;
            window.question_names = question_names;
            }, 1000);
    });

    function getBlockPatternsBySportId(callback){
        var block_patterns;
        var url = "//api-dev.qstrike.com/api/block_pattern/sport/"+window.sport_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                block_patterns = data['block_patterns'];
                if(typeof callback === "function") callback(block_patterns);
            }
        });
    }

    function getParts(callback){
        var parts;
        var url = "//api-dev.qstrike.com/api/materials_options/list_parts_names/"+window.material_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                parts = data['parts'];
                if(typeof callback === "function") callback(parts);
                //Close loading modal
                $('#getPartsModal').modal('hide');
            }
        });
    }

    function getSourceFabrics(callback){
        var materials_fabrics;
        var url = "http://api-dev.qstrike.com/api/materials_fabrics/";
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                materials_fabrics = data['materials_fabrics'];
                if(typeof callback === "function") callback(materials_fabrics);
                //Close loading modal
                $('#getPartsModal').modal('hide');
            }
        });
    }

    function getQuestionsList(callback){
        var questions_list;
        var url = "http://qx.azurewebsites.net/api/itemquestion?itemid="+window.item_id;
        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                questions_list = data;
                if(typeof callback === "function") callback(questions_list);
                //Close loading modal
                $('#getPartsModal').modal('hide');
            }
        });
    }

    function getFabrics(){
      window.fabrics = null;
      var fabric;
      var url = "http://api-dev.qstrike.com/api/materials_fabrics/";
      $.ajax({
          url: url,
          async: false,
          type: "GET",
          dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                fabric = data['materials_fabrics'];
            }
        });
      var elem = '<option value="" selected></option>';
      $.each(fabric, function (i, item){
          elem += `<option value="`+item.material_name+`">`+item.material_name+` [`+item.factory_name+`]</option>`;
               
      });
      window.fabrics = elem;
    }

    $('.uniform-category-id').on('change', function(){
        // console.log($(this).val());
        window.sport_id = $(this).val();
        getBlockPatternsBySportId(function(colors){ window.block_patterns = block_patterns; });
        // console.log(window.sport_id);
    });

});