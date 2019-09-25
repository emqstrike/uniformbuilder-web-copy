@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
@endsection

@section('content')
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h3>Brands</h3>
                    <a href="/administration/brandings/add" class='btn btn-md btn-default brandings-add'>
                        <span class="glyphicon glyphicon-plus"></span> Add
                    </a>
                </div>
                <div class="box-body">
                    <input type="hidden" id="user_email" value="{{ Session::get('email') }}">
                    <table class='data-table table table-bordered table-striped table-hover col-lg-8' id='brands-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Active</th>
                            <th>Template Folder</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($brandings as $item)
                        <tr class='branding-{{ $item->id }}'>
                            <td>
                               {{$item->id}}
                            </td>
                            <td>
                                {{$item->site_name}}
                            </td>
                            <td>
                                {{$item->site_code}}
                            </td>
                            <td>
                                <div class="onoffswitch">
                                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-brand" id="switch-{{ $item->id }}" data-brand-id="{{ $item->id }}" {{ ($item->is_active) ? 'checked' : '' }}>
                                    <label class="onoffswitch-label" for="switch-{{ $item->id }}">
                                        <span class="onoffswitch-inner"></span>
                                        <span class="onoffswitch-switch"></span>
                                    </label>
                                </div>
                            </td>
                            <td>
                                <a href="#" class="btn btn-default btn-xs file-link" data-link="{{ $item->template_folder }}">View</a>
                            </td>
                            <td class="td-buttons">
                              {{--   <a href="#" class="btn btn-default btn-xs " >
                                    <i class="glyphicon glyphicon-info-sign"> Info</i>
                                </a> --}}
                                <a href="/administration/brandings/edit/{{$item->id}}" class="edit-branding btn btn-info btn-xs">
                                    <i class="glyphicon glyphicon-edit"> Edit</i>
                                </a>
                                <a href="#" class="delete-branding btn btn-xs btn-danger" data-branding-id="{{ $item->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"> Remove</i>
                                </a>

                            </td>
                        </tr>

                    @empty

                        <tr>
                            <td colspan='6'>
                                No Record
                            </td>
                        </tr>

                    @endforelse

                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

@include('partials.confirmation-modal')
@endsection

@section('scripts')
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    $('.file-link').on('click', function(){
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
    });

    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": false,
        "info": true,
        "autoWidth": false
    });

    function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
    }

    $('#brands-table').on('click', '.delete-branding', function(){
       var id = [];
       id.push( $(this).data('branding-id'));
       console.log(id);
       modalConfirm('Remove Branding', 'Are you sure you want to delete the branding?', id);
   });

   $('#confirmation-modal .confirm-yes').on('click', function(){
        var id = $(this).data('value');
        var url = "//" + api_host + "/api/v1-0/branding/delete";
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
                   new PNotify({
                       title: 'Success',
                       text: response.message,
                       type: 'success',
                       hide: true
                   });
                   $('#confirmation-modal').modal('hide');
                  $.each(id, function (index, value) {
                     console.log(value);
                     $('.branding-' + value).fadeOut();
                     // Will stop running after "three"

                   });

               }
           }
       });
   });

  $("#brands-table").on("click", ".toggle-brand", function(e){
        e.preventDefault();
        var id = $(this).data('brand-id');
        var user_email = $('#user_email').val();
        bootbox.confirm({
          size: "medium",
          title: "Set Active Brand",
          message: "Are you sure you want to set this as Active Brand?",
          buttons: {
              'cancel': {
                  label: 'Cancel'
              },
              'confirm': {
                  label: 'Yes',
                  className: 'btn-danger pull-right'
              }
          },
          callback: function(result){
            if(result){
                bootbox.prompt({
                size: "medium",
                inputType: "password",
                title: "Enter your Password",
                buttons: {
                    'cancel': {
                        label: 'Cancel'
                    },
                    'confirm': {
                        label: 'Confirm',
                        className: 'btn-warning pull-right'
                    }
                },
                callback: function(password){
                  if(confirm != "") {
                    confirmUser(user_email, password);
                  }
                }
              });
            }
          }
        });
        function setActive(id) {
        var url = "//" + api_host + "/api/v1-0/branding/toggle";
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
                    var elem = '.branding-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    console.log('toggle success');

                 window.location.reload(true);
                } else {
                    console.log('toggle fail');
                }
            }
        });
        }

        function confirmUser(user_email, password) {
          var url = "//" + api_host + "/api/user/confirmUser";
          $.ajax({
             url: url,
             type: "POST",
             data: JSON.stringify({email:user_email, password:password }),
             dataType: "json",
             crossDomain: true,
             contentType: 'application/json',
             headers: {"accessToken": atob(headerValue)},
             success: function(response){
                        if(response.success) {
                          setActive(id);
                        }
                      }

          });
        }
    });

});
</script>
@endsection
