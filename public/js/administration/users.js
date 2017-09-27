$(document).ready(function(){

   $('.data-table').DataTable({
    "paging": true,
    "lengthChange": false,
    "searching": true,
    "ordering": false,
    "info": true,
    "autoWidth": false,
       initComplete: function () {
        this.api().columns('#select-filter').every( function () {

            var column = this;
            var select = $(`<select><option value=""></option></select>`)
                .appendTo( $(column.footer()).empty() )
                .on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );

                    column
                    .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                } );

            column.data().unique().sort().each( function ( d, j ) {

                select.append( `<option value="`+d+`">`+d+`</option>` );
            } );
        } );
    }
    });

    $('.enable-user').on('click', function(){
        var id = $(this).data('user-id');
        var url = "//" + api_host + "/api/user/enable/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    var elem = '.user-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-user').removeAttr('disabled');
                    $(elem + ' .enable-user').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $('.disable-user').on('click', function(){
        var id = $(this).data('user-id');
        var url = "//" + api_host + "/api/user/disable/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    var elem = '.user-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-user').removeAttr('disabled');
                    $(elem + ' .disable-user').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $('.delete-user').on('click', function(){
        var id = $(this).data('user-id');
        modalConfirm('Remove user', 'Are you sure you want to delete the user?', id);
    });

    $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/user/delete/";
        $.ajax({
            url: url,
            type: "POST",
            data: JSON.stringify({id: id, loggedInUser: window.loggedInUser}),
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": atob(headerValue)},
            success: function(response){
                if (response.success) {
                    $('#confirmation-modal').modal('hide');
                    $('.user-' + id).fadeOut();
                } else {
                    $('#confirmation-modal').modal('hide');
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                }
            }
        });
    });

    // $(document).on('change','#rep-filter',function(){
    // var rep_selected = $(this).find("option:selected").val();
    // var users_data = $("#users-data").val();
    // users_data = JSON.parse(users_data);

    // if(rep_selected != ""){
    // $("#dealer-filter select option").hide();
    //     $.each(users_data, function(i, item){         
    //         if(rep_selected == item.rep_last_name){
    //             // $('#block-patterns-filter select option[value="' + item.block_pattern + '"]').show();
    //              $('#dealer-filter select option[value=""]').show();
    //         }
    //     });
    //     // $("#necks-filter select option").hide();
    //     // $.each(users_data, function(i, item){         
    //     //     if(rep_selected == item.uniform_category){
    //     //         console.log(rep_selected);
    //     //         console.log(item.uniform_category);
    //     //         console.log(item.neck_option);
    //     //         $('#necks-filter select option[value="' + item.neck_option + '"]').show();
    //     //         $('#necks-filter select option[value=""]').show();
    //     //     }               
    //     // });
    // }else{
    //     $("#dealer-filter select option").show();
    // }   


    // });
});