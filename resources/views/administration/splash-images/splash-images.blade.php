@extends('administration.lte-main')



@section('content')
<style type="text/css">
    table.table.table-bordered.splash_images td:nth-child(-n+5) {
        width: 10%;
    }
      table.table.table-bordered.splash_images td:nth-child(1) {
        width: 15%;
    }
</style>
<script src="">
    

</script>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>                       
                        Splash Image
                    </h1>
                     <small>
                            <a href="/administration/splash_image/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add  Splash Image
                            </a>
                    </small>
                      
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered splash-images'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Show Date</th>
                                <th>Front Image</th>
                                <th>Back Image</th>                                
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            @forelse ($splash_images as $key => $splash_image)
                                <tr class='splash-image-{{ $splash_image -> id }} '>
                                    <td>{{ $splash_image -> name  }}</td>
                                    <td>{{ $splash_image -> category  }}</td>
                                    <td>{{ $splash_image -> show_time  }}</td>
                                    <td><img src="{{ $splash_image -> front_image  }}" height="100" width="100"></td>
                                    <td><img src="{{ $splash_image -> back_image  }}" height="100" width="100"></td>
                                    <td>
                                        <a href="#" class="btn btn-default btn-xs disable-splash-image hello" data-splash-image-id="{{ $splash_image->id }}" role="button" {{ ($splash_image -> active) ? : 'disabled="disabled"' }}>
                                            <i class="glyphicon glyphicon-eye-close"></i>
                                              Disable
                                        </a>
                                        <a href="#" class="btn btn-info btn-xs enable-splash-image hello" data-splash-image-id="{{ $splash_image->id }}" role="button" {{ ($splash_image -> active) ? 'disabled="disabled"' : '' }}>
                                            <i class="glyphicon glyphicon-eye-open"></i>
                                              Enable
                                        </a>   
                                        <a href="/administration/splash_image/edit/{{ $splash_image->id }}" class="btn btn-primary btn-xs edit-splash_image" data-splash_image-id="{{ $splash_image->id }}" role="button">
                                            <i class="glyphicon glyphicon-edit"></i>
                                            Edit
                                        </a>
                                        <a href="#" class="btn btn-danger pull-right btn-xs delete-splash-image " data-splash-image-id="{{ $splash_image->id }}" role="button">
                                            <i class="glyphicon glyphicon-trash"></i>
                                            Remove
                                        </a>
                                    </td>
                                </tr>
                            
                            @empty

                                <tr>
                                    <td colspan='4'>
                                        No Splash
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
    
@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>

<script type="text/javascript" class="loadScript">
$(document).ready(function(){
    $(document).on('click', '.delete-splash-image', function(){
      $.confirm({
      title: 'Accent',
      content: 'Are you want to delete splash-image?',
      confirmButton: 'YES',
      cancelButton: 'NO',
      confirmButtonClass: 'confirmButtonYes btn-danger',
      cancelButtonClass: 'confirmButtonNo btn-success',
      });
      $(".confirmButtonYes").attr('data-splash-image-id',$(this).data('splash-image-id'));
     

     
    });
    $(document).on('click', '.enable-splash-image', function(){
  
    console.log("enable");
        var id = $(this).data('splash-image-id');
         var url = "//" + api_host + "/api/splash_image/enable/";
        //var url = "//localhost:8888/api/splash_image/enable";
        console.log(JSON.stringify({id: id}));
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
                    var elem = '.splash-image-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-splash-image').removeAttr('disabled');
                    $(elem + ' .enable-splash-image').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }else{
                    console.log("failed");
                }

            }
        });
    });
    $(document).on('click', '.disable-splash-image', function(){

        var id = $(this).data('splash-image-id');

        console.log(id );
        var url = "//" + api_host + "/api/splash_image/disable/";
        //var url = "//localhost:8888/api/splash_image/disable";
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
                    var elem = '.splash-image-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-splash-image').removeAttr('disabled');
                    $(elem + ' .disable-splash-image').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });

    $(document).on('click', '.confirmButtonYes', function(){
      
        var id = $(this).data('splash-image-id');
       // var url = "https://localhost:8888/api/splash_image/delete";
        var url = "//" + api_host + "/api/splash_image/delete/";
                   
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
                    // $('#confirmation-modal').modal('hide');
                    $('.font-' + id).fadeOut();   

                    $(".splash-images").load(location+" .splash-images");

                }
            }
        });
     });
  });
</script>

@endsection
