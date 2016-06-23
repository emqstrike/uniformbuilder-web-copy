@extends('administration.lte-main')



@section('content')
    <script src=""></script>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        
                        Accents
                        <small>
                            <a href="/administration/accent/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Accent
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered accents'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Thumbnail</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($accents as $key => $accent)
                    
                      <tr class='accent-{{ $accent->id }} '>
	                      <td>{{ $accent->name }}</td>
	                      <td>{{ $accent->code }}</td>
	                      <td>
                          <!-- <img src="{{ $accent->thumbnail_path }}" height="100" width="100"> -->
                          </td>
	                       <td>
                      
                          <a href="#" class="btn btn-default btn-xs disable-accent" data-accent-id="{{ $accent->id }}" role="button" {{ ($accent->active) ? : 'disabled="disabled"' }}>
                              <i class="glyphicon glyphicon-eye-close"></i>
                              Disable
                          </a>
                          <a href="#" class="btn btn-info btn-xs enable-accent" data-accent-id="{{ $accent->id }}" role="button" {{ ($accent->active) ? 'disabled="disabled"' : '' }}>
                              <i class="glyphicon glyphicon-eye-open"></i>
                              Enable
                          </a>       
                                    
            							<a href="/administration/accent/edit/{{ $accent->id }}" class="btn btn-primary btn-xs edit-accent" data-accent-id="{{ $accent->id }}" role="button">
            							    <i class="glyphicon glyphicon-edit"></i>
            							    Edit
            							</a>
                                    @if(  $key  > -1)
            							<a href="#" class="btn btn-danger pull-right btn-xs delete-accent" data-accent-id="{{ $accent->id }}" role="button">
            							    <i class="glyphicon glyphicon-trash"></i>
            							    Remove
            							</a>
                                @endif
                            </td>
                               
                            

                      </tr>

                    @empty

                        <tr>
                            <td colspan='4'>
                                No Accents
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
<script type="text/javascript">
    $(document).on('click', '.delete-accent', function(){
      $.confirm({
      title: 'Accent',
      content: 'Are you want to delete accent?',
      confirmButton: 'YES',
      cancelButton: 'NO',
      confirmButtonClass: 'confirmButtonYes btn-danger',
      cancelButtonClass: 'confirmButtonNo btn-success',
      });
      $(".confirmButtonYes").attr('data-accent-id',$(this).data('accent-id'));
     

     
    });
     $(document).on('click', '.enable-accent', function(){

      console.log("enable-accent");
        var id = $(this).data('accent-id');
         var url = "//" + api_host + "/api/accent/enable/";
        //var url = "//localhost:8888/api/accent/enable/";
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
                    var elem = '.accent-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .disable-accent').removeAttr('disabled');
                    $(elem + ' .enable-accent').attr('disabled', 'disabled');
                    $(elem).removeClass('inactive');
                }
            }
        });
    });

    $(document).on('click', '.disable-accent', function(){
   
        var id = $(this).data('accent-id');
        var url = "//" + api_host + "/api/accent/disable/";
        //var url = "//localhost:8888/api/accent/disable/";
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
                    var elem = '.accent-' + id;
                    new PNotify({
                        title: 'Success',
                        text: response.message,
                        type: 'success',
                        hide: true
                    });
                    $(elem + ' .enable-accent').removeAttr('disabled');
                    $(elem + ' .disable-accent').attr('disabled', 'disabled');
                    $(elem).addClass('inactive');
                }
            }
        });
    });
    $(document).on('click', '.confirmButtonYes', function(){
      
        var id = $(this).data('accent-id');
        console.log(id);
        // var url = "http://localhost:8888/api/accent/delete";
        var url = "//" + api_host + "/api/accent/delete/";
                   
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
                     $( ".accents" ).load( location+" .accents" );  

                }
            }
        });
     });
</script>
<!-- <script type="text/javascript" src="/js/administration/accents.js"></script> -->

@endsection
