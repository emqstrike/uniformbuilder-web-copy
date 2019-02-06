$(function() {

    try {
        $('.data-table').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "info": false,
            "autoWidth": false,
            "stateSave": true,
            "drawCallback" : function() {
                $('[data-toggle="tooltip"]').popover({
                    html: true,
                    trigger: 'hover',
                    placement: 'top',
                    content: function(){
                        return $(this).data('message');
                    }
                });
            }
        });
    } catch(e) {
        console.log(e);
    }

    window.sport_value = null;
    window.block_pattern_value = null;
    window.option_value = null;

    $('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' });

    $(document).on('click', '.file-link', function(e) {
        e.preventDefault()
        var url = $(this).data('link');
        var win = window.open(url, '_blank');
        win.focus();
    });

    $(document).on('change', '.sport', function() {
        var exist = false;
        window.uniform_category_id = $('.sport option:selected').data('uniform-category-id');
        $('.block-pattern').html('');
        var ucid = window.uniform_category_id.toString();
        var filtered_block_patterns = _.filter(window.block_pattern, function(e){ return e.uniform_category_id == ucid; });
        var sorted_block_patterns = _.sortBy(filtered_block_patterns, function(o) { return o.name; });

        var block_pattern_value = window.block_pattern_value;
        $('#block_pattern').html('');

        sorted_block_patterns.forEach(function(entry) {
            if (block_pattern_value == entry.name) {
                exist = true;
                var elem = '<option value="'+entry.name+'" data-block-pattern-id="'+entry.id+'" selected>'+entry.name+'</option>'
                $('.block-pattern').append(elem);
            } else {
                var elem = '<option value="'+entry.name+'" data-block-pattern-id="'+entry.id+'">'+entry.name+'</option>'
                $('.block-pattern').append(elem);
            }
        });

        if (! exist && block_pattern_value != null) {
            $('.enable_custom_bp').prop('checked', true);
            $('.custom_block_pattern').val(block_pattern_value);
            $('.enable_custom_bp').trigger('change');
        }

        $('.block-pattern').trigger('change');
    });

    $(document).on('change', '.block-pattern', function() {
        var exist = false;
        window.block_pattern_id = $('.block-pattern option:selected').data('block-pattern-id');
          $('.block-pattern').html('');
        $('.block-pattern-option').html('<option value="none" data-block-pattern-id="0">Select Block Pattern Option</option>');

        if (window.block_pattern_id != undefined) {
            var block_pattern = _.filter(window.block_pattern, function(e) {
                return e.id == window.block_pattern_id.toString();
            });

            if (block_pattern[0].neck_options != "null") {
                var x = JSON.parse(block_pattern[0].neck_options);

                var list = [];
                _.each(x, function(item){
                    list.push(_.omit(item, 'children'));
                    list.push(_.flatten(_.pick(item, 'children')));
                });

                var result = _.flatten(list);

                var option_value = window.option_value;
                $('.block-pattern-option').html('');

                result.forEach(function(entry) {
                    if (option_value == entry.name) {
                        exist = true;
                        var elem = '<option value="'+entry.name+'" selected>'+entry.name+'</option>'
                        $('.block-pattern-option').append(elem);
                    } else {
                       var elem = '<option value="'+entry.name+'">'+entry.name+'</option>'
                        $('.block-pattern-option').append(elem);
                    }
                });
            }
        }

        if (! exist && option_value != null) {
            $('.enable_custom_bpo').prop('checked', true);
            $('.custom_option').val(option_value);
            $('.enable_custom_bpo').trigger('change');
        }
    });

    window.data = {};
    window.sports = null;
    window.block_pattern = null;
    window.block_pattern_option = null;
    window.uniform_category_id = null;

    window.rowIndex = null;
    window.rowData = null;

    $(document).on('click', '.save-data', function(e) {
        e.preventDefault();
        $('#myModal .custom-alert.alert-danger').fadeOut();
        $('#myModal .custom-alert.alert-danger ul').remove();

        if ($('.enable_custom_bp').is(':checked')) {
            var block_pattern = $('.custom_block_pattern').val();
        } else {
            var block_pattern = $('.block-pattern').val();
        }

        if ($('.enable_custom_bpo').is(':checked')) {
            var block_pattern_option = $('.custom_option').val();
        } else {
            var block_pattern_option = $('.block-pattern-option').val();
        }

        if ($('.is_fixed').is(':checked')) {
            var is_fixed = 1;
        } else {
            var is_fixed = 0
        }

        if ($('.customizer_available').is(':checked')) {
            var customizer_available = 1;
        } else {
            var customizer_available = 0
        }

        var id = $('.id').val();
        var name = $('.name').val();
        var sport = $('.sport').val();
        var qstrike_item_id = $('.qstrike-item-id').val();
        var priority = $('.priority').val();
        var deadline = $('#datepicker').val();
        var design_sheet_url = $('.design-sheet-path').val();
        var customizer_id = $('.customizer-id').val();
        var status = $('.status').val();
        var notes = $('#input_notes').val();
        var application_type = $('.application_type').val();
        var type = $('.type').val();
        var brand = $('.brand').val();
        var gender = $('.gender').val();

        var data = {
            'id' : id,
            'name' : name,
            'block_pattern' : block_pattern,
            'block_pattern_option' : block_pattern_option,
            'sport' : sport,
            'qstrike_item_id' : qstrike_item_id,
            'priority' : priority,
            'design_sheet_url' : design_sheet_url,
            'customizer_id' : customizer_id,
            'deadline' : deadline,
            'status' : status,
            'notes' : notes,
            'uniform_application_type' : application_type,
            'is_fixed' : is_fixed,
            'type' : type,
            'brand' : brand,
            'gender' : gender,
            'customizer_available' : customizer_available
        };

        updateData(data);

        var is_update = false;

        if (data.id != '') {
            is_update = true;
            var url = "//" + api_host + "/api/v1-0/style_request/update";
        } else {
            delete data.id;
            data.customizer_id = 0;

            var url = "//" + api_host + "/api/v1-0/style_request";
        }

        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify(data),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response) {
                if (response.success == "false") {
                    var html = "<ul>";

                    if (response.errors.length != 0) {
                        $.each(response.errors, function(key, value) {
                            html += "<li>" + value + "</li>";
                        });
                    }

                    html += "</ul>";

                    $('#myModal .custom-alert.alert-danger').append(html);
                    $('#myModal .custom-alert.alert-danger').fadeIn();
                }

                if (response.success == true) {

                    $('#myModal').modal('hide');

                    if (is_update) {
                        var oTable = $('.data-table').DataTable();
                        oTable.row(window.rowIndex).data(window.rowData).invalidate().draw("full-hold");
                    } else {
                        window.location.reload();
                    }
                }
            }
        });
    });

    function updateData(data) {
        if (data.id) {
            window.rowData[1] = data.name;
            window.rowData[2] = data.sport;
            window.rowData[3] = data.block_pattern;
            window.rowData[4] = data.block_pattern_option;
            window.rowData[5] = data.brand;
            window.rowData[6] = '<input type="hidden" name="style_design_sheet_url"" class="style-design-sheet-url" value="' + data.design_sheet_url + '"><a href="#" class="btn btn-defult btn-xs file-link" data-link="' + data.design_sheet_url + '">Link</a>';
            window.rowData[7] = data.qstrike_item_id;
            window.rowData[8] = data.priority;
            window.rowData[11] = data.type;
            window.rowData[12] = data.uniform_application_type;
            window.rowData[14] = `<input type="hidden" name="style_customizer_id" class="style-customizer-id" value='`+ data.customizer_id +`'><a href="#" class="btn btn-defult btn-xs file-link" data-link='http://customizer.prolook.com/builder/0/`+data.customizer_id+`'>`+data.customizer_id+`</a>`;
            window.rowData[15] = `<input type="hidden" name="style_status" class="style-status" value='`+ data.status +`'><input type="hidden" name="style_is_fixed" class="style-is-fixed" value='`+data.is_fixed+`'>`+data.status;

            if (data.is_fixed == 1 && data.status == 'rejected') {
                window.rowData[15] += `<a href="#" data-toggle="tooltip" data-message="Fixed"><span class="glyphicon glyphicon-info-sign"></span></a>`;
            }

            window.rowData[16] = `<input type="hidden" class="notes" value="`+data.notes+`">`

            if (data.is_fixed == 1) {
                window.rowData[16] += `<button class="view-notes btn btn-success btn-sm">View</button>`;
            } else if(data.notes != '' && data.status == 'pending') {
                window.rowData[16] += `<button class="view-notes btn btn-info btn-sm">View</button>`;
            } else if(data.notes != '' && data.status == 'rejected') {
                window.rowData[16] += `<button class="view-notes btn btn-danger btn-sm">View</button>`;
            } else {
                window.rowData[16] += `<button class="view-notes btn btn-default btn-sm">View</button>`;
            }
        }
    }

    var files = [];
    var filesData = [];
    this.addRemoveLinks = true;

    Dropzone.options.myAwesomeDropzone = {
        addRemoveLinks: true,
        success: function(file, response) {
            filesData.push({
                'name' : file.name,
                'url' : response
            });
            $('.design-sheet-path').val(filesData[0].url);
            console.log(response);
            $('.save-data').removeAttr('disabled');
        },
        complete: function(file){
            files.push(file.name);

        },
        removedfile: function(file) {
            files.splice(files.indexOf(file.name), 1);
            file.previewElement.remove();
        },
        drop: function(){
            $('.save-data').attr('disabled','disabled');
        }
    };

    getSports(function(sports){ window.sports = sports; });

    function getSports(callback) {
        var sports;
        var url = "//" +api_host+ "/api/categories";

        $.ajax({
            url: url,
            async: false,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(data){
                sports = data['categories'];
                if (typeof callback === "function") {
                    callback(sports);
                }
            }
        });
    }

    getBlockPatterns(function(block_patterns){ window.block_pattern = block_patterns; });
    function getBlockPatterns(callback) {
        var block_patterns;
        var url = "//" +api_host+ "/api/block_patterns";
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

    buildSportsDropdown();
    function buildSportsDropdown(){
        var sorted_sports = _.sortBy(window.sports, function(o) { return o.name; });
        var sport_value = window.sport_value;
        $( '.sport' ).html('');
        sorted_sports.forEach(function(entry) {
            if ( sport_value == entry.name) {
                var elem = '<option value="'+entry.name+'" data-uniform-category-id="'+entry.id+'" selected>'+entry.name+'</option>'
                $('.sport').append(elem);
            } else {
                var elem = '<option value="'+entry.name+'" data-uniform-category-id="'+entry.id+'">'+entry.name+'</option>'
                $('.sport').append(elem);
            }
        });
    }

    $(document).on('click', '.edit', function(e){
        e.preventDefault();
        getValues($(this));
        $('#deadline').attr({"style": "display: none;"});
        $('#customizer').removeAttr('style');
        $('#status_div').removeAttr('style');
        $('#is_fixed_div').removeAttr('style');
        $('#is_customizer_available_div').removeAttr('style');
    });

    $('.data-table tbody').on( 'click', 'tr', function () {
        var oTable = $('.data-table').DataTable();
        window.rowData =  oTable.row(this).data();
        window.rowIndex = oTable.row(this).index();
    });

    $("#myModal").on("hidden.bs.modal", function() {
        window.sport_value = null;
        buildSportsDropdown();
        $('.sport').trigger('change');
        $('.id').val('');
        $('.name').val('');
        $('.qstrike-item-id').val('');
        $('.customizer-id').val('');
        $('.status').val('pending');
        $('#input_notes').val('');
        $('.type').val('upper');
        $('.application_type').val('none');
        $('.is_fixed').prop('checked', false);
        $('.customizer_available').prop('checked', false);
        $('.custom_block_pattern').val(null);
        $('.enable_custom_bp').prop('checked', false);
        $('.custom_option').val(null);
        $('.enable_custom_bpo').prop('checked', false);
        $('.is_fixed, .enable_custom_bpo, .enable_custom_bp, .customizer_available').trigger('change');

        $('#deadline').attr({"style": "display: block;"});
        $('#customizer').attr({"style": "display: none;"});
        $('#status_div').attr({"style": "display: none;"});
        $('#is_fixed_div').attr({"style": "display: none;"});
        $('#is_customizer_available_div').attr({"style": "display: none;"});
        $('#input_notes').text('');
        $('.design-sheet-path').val('');
        $('.brand').val('none');

        $('#myModal .custom-alert.alert-danger').fadeOut();
        $('#myModal .custom-alert.alert-danger ul').remove();
    });

    $('.enable_custom_bp').on('change', function() {
        if ($(this).is(':checked')) {
            $('.block-pattern').attr('disabled','true');
            $('.custom_block_pattern').removeAttr('disabled');
        } else {
            $('.block-pattern').removeAttr('disabled');
            $('.custom_block_pattern').attr('disabled','true');
        }
    });

    $('.enable_custom_bpo').on('change', function() {
        if ($(this).is(':checked')) {
            $('.block-pattern-option').attr('disabled','true');
            $('.custom_option').removeAttr('disabled');
        } else {
            $('.block-pattern-option').removeAttr('disabled');
            $('.custom_option').attr('disabled','true');
        }
    });

    $(".sport, .block-pattern, .block-pattern-option, .enable_custom_bp, .enable_custom_bpo, .status, .application_type, .is_fixed, .type, .design-sheet-path, .brand, .customizer_available").on("change", function(e){
        e.preventDefault();
        var name = document.getElementById("name").value;
        var qx_id = document.getElementById("qstrike_item_id").value;
        if ( name.length > 0 && qx_id.length > 0) {
            $('.save-data').removeAttr('disabled');
        }
        else {
            $('.save-data').attr('disabled','disabled');
        }
    });

    function getValues(thisObj) {
        var id = thisObj.parent().parent().find('.style-id').html();
        var name = thisObj.parent().parent().find('.style-name').html();
        var sport = thisObj.parent().parent().find('.style-sport').html();
        var block_pattern = thisObj.parent().parent().find('.style-block-pattern').html();
        var option = thisObj.parent().parent().find('.style-option').html();
        var item_id = thisObj.parent().parent().find('.style-qstrike-item-id').html();
        var priority = thisObj.parent().parent().find('.style-priority').html();
        var customizer_id = thisObj.parent().parent().find('.style-customizer-id').val();
        var status = thisObj.parent().parent().find('.style-status').val();
        var notes = thisObj.parent().parent().find('.notes').val();
        var type = thisObj.parent().parent().find('.style-type').html();
        var application_type = thisObj.parent().parent().find('.style-application-type').html();
        var is_fixed = thisObj.parent().parent().find('.style-is-fixed').val();
        var design_sheet_url = thisObj.parent().parent().find('.style-design-sheet-url').val();
        var deadline = thisObj.parent().parent().find('.style-deadline').html();
        var brand = thisObj.parent().parent().find('.style-brand').html();
        var customizer_available = thisObj.parent().parent().find('.style-customizer-available').val();
        window.sport_value = sport;
        window.block_pattern_value = block_pattern;
        window.option_value = option;

        buildSportsDropdown();

        $('.sport').trigger('change');
        $('.id').val(id);
        $('.name').val(name);
        $('.qstrike-item-id').val(item_id);
        $('.priority').val(priority);
        $('.customizer-id').val(customizer_id);
        $('.status').val(status);
        $('#input_notes').val(notes);
        $('.type').val(type);
        $('.application_type').val(application_type);
        $('.design-sheet-path').val(design_sheet_url);
        $('.brand').val(brand);
        $('#datepicker').val(deadline);

        if (is_fixed == 1) {
            $('.is_fixed').prop('checked', true);
        } else {
            $('.is_fixed').prop('checked', false);
        }

        if (customizer_available == 1) {
            $('.customizer_available').prop('checked', true);
        } else {
            $('.customizer_available').prop('checked', false);
        }

        $('#myModal').modal('show');
    }

    $('#style_requests_table').on('click', '.view-notes', function(e){
        e.preventDefault();
        //Open loading modal
        getNotes($(this));
        $('#viewModal').modal('show');
    });

    function getNotes(thisObj) {
        var notes = thisObj.parent().parent().find('.notes').val();
        $('#notes_text').text(notes);
    }

    $('#style_requests_table').on('click', '.delete-style-request', function(){
        var id = [];
        id.push( $(this).data('style-request-id'));
        modalConfirm('Remove Style Request', 'Are you sure you want to delete the request?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function() {
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/style_request/delete";

        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: function(response) {
                if (response.success) {
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });

                    $('#confirmation-modal').modal('hide');
                    $.each(id, function (index, value) {
                        $('.style-request-' + value).fadeOut();
                    });
                }
            }
        });
    });
});
