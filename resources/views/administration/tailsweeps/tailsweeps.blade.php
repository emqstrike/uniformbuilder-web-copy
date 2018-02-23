@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection



@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="fa fa-tailsweep"></span>
                        Tailsweeps
                        <small>
                            <a href="/administration/tailsweep/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Tailsweep
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered tailsweeps'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tailsweep Name</th>
                            <th>Code</th>
                            <th>Title</th>
                            <th>Thumbnail</th>
                            <th>Short</th>
                            <th>Medium</th>
                            <th>Long</th>
                             <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    @forelse ($tailsweeps as $tailsweep)

                        <tr class='tailsweep-{{ $tailsweep->id }} '>
                            <td>
                                {{ $tailsweep->id }}
                            </td>
                            <td>
                                {{ $tailsweep->name }}<br />     
                            </td>
                            <td>
                                {{ $tailsweep->code }}
                            </td>
                            <td>
                                {{ $tailsweep->title }}
                            </td>
                            <td>

                            <img src="{{ $tailsweep->thumbnail }}" height="45" width="35">

                            </td>
                            <td>
                                {{ $tailsweep->short }}
                            </td>
                             <td>
                                {{ $tailsweep->medium }}
                            </td>
                             <td>
                                {{ $tailsweep->long }}
                            </td>
                             <td>     
                                        
                                <a href="/administration/tailsweep/edit/{{ $tailsweep->id }}" class="btn btn-primary btn-xs edit-tailsweep" data-tailsweep-id="{{ $tailsweep->id }}" role="button">
                                    <i class="glyphicon glyphicon-edit"></i>
                                    Edit
                                </a>

                                <a href="#" class="btn btn-danger pull-right btn-xs delete-tailsweep" data-tailsweep-id="{{ $tailsweep->id }}" role="button">
                                    <i class="glyphicon glyphicon-trash"></i>
                                    Remove
                                </a>
                            
                            </td>
                   
                        </tr>

                    @empty

                        <tr>
                            <td colspan='4'>
                                No Tailsweeps
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<!-- <script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/tailsweeps.js"></script> -->
<script type="text/javascript">
    $(document).on('click', '.delete-tailsweep', function(){
      $.confirm({
      title: 'Tailsweep',
      content: 'Are you want to delete tailsweep?',
      confirmButton: 'YES',
      cancelButton: 'NO',
      confirmButtonClass: 'confirmButtonYes btn-danger',
      cancelButtonClass: 'confirmButtonNo btn-success',
      });
      $(".confirmButtonYes").attr('data-tailsweep-id',$(this).data('tailsweep-id'));
     

     
    });

    $(document).on('click', '.confirmButtonYes', function(){
      
        var id = $(this).data('tailsweep-id');
        console.log(id);
        // var url = "https://localhost:8888/api/tailsweep/delete";
       var url = "//" + api_host + "/api/tailsweep/delete/";
                   
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
                     $( ".tailsweeps" ).load( location+" .tailsweeps" );  

                }
            }
        });
     });
</script>
@endsection