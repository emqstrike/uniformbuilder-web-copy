@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('custom-styles')

@endsection

@section('content')

</style>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Look up Cut Style')

                    <h1>
                        Lookup Cut to Style
                    </h1>
                    <a href="#" class="btn btn-success btn-sm btn-flat add-record" data-target="#myModal" data-toggle="modal" >Add</a>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table data-table table-bordered ' id="">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cut ID</th>
                            <th>Style ID</th>
                            <th>Hybris SKU</th>
                            <th>Style Category</th>
                            <th>Gender</th></th>

                            <th class="col-md-1"></th>
                        </tr>
                    </thead>
                    <tbody class="isotope">

                    @forelse ($cutStyles as $cutStyle)

                    <tr>
                        <td class="td-cutStyle-id">{{ $cutStyle->id }}</td>
                        <td class="td-cutStyle-cut_id">{{ $cutStyle->cut_id }}</td>
                        <td class="td-cutStyle-style_id-id">{{ $cutStyle->style_id }}</td>
                        <td class="td-cutStyle-hybris_sku">{{ $cutStyle->hybris_sku }}</td>
                        <td class="td-cutStyle-style_category">{{ $cutStyle->style_category }}</td>
                        <td class="td-cutStyle-gender">{{ $cutStyle->gender }}</td>

                        <td class="col-md-1">
                            <center>
                                <a href="#" class="btn btn-primary btn-sm btn-flat edit-record" data-target="#myModal" data-toggle="modal">Edit</a>
                                <a href="#" class="btn btn-danger btn-sm btn-flat delete-record">Delete</a>
                            </center>
                        </td>
                    </tr>

                    @empty

                        <tr>
                            <td colspan='6'>
                                No cutStyles Data Found
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
<textarea id="cutStyle_list" style="display: none;"><?php echo json_encode($cutStyles, JSON_FORCE_OBJECT);?></textarea>



<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close"
                   data-dismiss="modal">
                       <span aria-hidden="true">&times;</span>
                       <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title" id="myModalLabel">

                </h4>
            </div>

            <!-- Modal Body -->
            <div class="modal-body">

                <form id="myForm" role="form" action="#" method="POST">

                  <div class="form-group">
                    <label>Cut Id</label>
                      <input type="text" class="form-control input-cut-id" placeholder="Enter Cut Id" required>
                  </div>
                  <div class="form-group">
                    <label>Style Id</label>
                      <input type="text" class="form-control input-style-id" placeholder="Enter Style Id" required>
                  </div>
                  <div class="form-group">
                    <label>Hybris SKU</label>
                      <input type="text" class="form-control input-sku" placeholder="hybris sku" required>
                  </div>
                   <div class="form-group">
                    <label>Style Category</label>
                      <select class="form-control input-style-category">
                        <option value="jerseys">jerseys</option>
                        <option value="pants">pants</option>
                      </select>
                      <input type="hidden" class="input-id">
                  </div>

                  <div class="form-group">
                    <label>Gender</label>
                      <select class="form-control input-gender">
                        <option value="youth">Youth</option>
                        <option value="men">Men</option>
                        
                      </select>
                      <input type="hidden" class="input-id">
                  </div>
                  <center><button type="submit" class="btn btn-success submit-new-record">Add Record</button></center>
                  <br>
                </form>

            </div>

        </div>
    </div>
</div>


@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>

<script type="text/javascript">
$(document).ready(function(){

window.delete_data_html = null;
window.modal_action = null;

$('.data-table').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": true,
    "ordering": false,
    "info": true,
    "autoWidth": true,
});



$("#myForm").submit(function(e) {
    e.preventDefault();
    var data = {};
    data.cut_id = $('.input-cut-id').val();
    data.style_id = $('.input-style-id').val();
    data.hybris_sku = $('.input-sku').val();
    data.style_category = $('.input-style-category').val();
    data.gender = $('.input-gender').val();

    if(window.modal_action == 'add'){
        var url = "//" + api_host + "/api/lookup_cut_to_style";
        addUpdateRecord(data, url);
    } else if(window.modal_action == 'update'){
        data.id =  $('.input-id').val();
        var url = "//" + api_host + "/api/lookup_cut_to_style/update";
        addUpdateRecord(data, url);
    }
    $('.submit-new-record').attr('disabled', 'true');
});

    $("#myModal").on("hidden.bs.modal", function() {
        $('.submit-new-record').removeAttr('disabled');
    });

$(document).on('click', '.add-record', function(e) {
    e.preventDefault();
    window.modal_action = 'add';
    $('.submit-new-record').text('Add Record');
  
    $('.modal-title').text('Add Cut Style Information');

    $('.input-cut-id').val('');
    $('.input-style-id').val('');
    $('.input-sku').val('');
   
});



$(document).on('click', '.edit-record', function(e) {
    
    e.preventDefault();
    window.modal_action = 'update';
    $('.modal-title').text('Edit Cut Style Information');
    $('.submit-new-record').text('Update Record');
    var data = {};
    data.id = $(this).parent().parent().parent().find('.td-cutStyle-id').text();
    data.cut_id = $(this).parent().parent().parent().find('.td-cutStyle-cut_id').text();
    data.style_id = $(this).parent().parent().parent().find('.td-cutStyle-style_id-id').text();
    data.hybris_sku = $(this).parent().parent().parent().find('.td-cutStyle-hybris_sku').text();
    data.gender = $(this).parent().parent().parent().find('.td-cutStyle-gender').text();

    data.style_category = $(this).parent().parent().parent().find('.td-cutStyle-style_category').text();
    data.gender = $(this).parent().parent().parent().find('.td-cutStyle-gender').text();

    $('.input-id').val(data.id);
    $('.input-cut-id').val(data.cut_id);
    $('.input-style-id').val(data.style_id);
    $('.input-style-category').val(data.style_category);
    $('.input-sku').val(data.hybris_sku);
    $('.input-gender').val(data.gender);

});

$(document).on('click', '.delete-record', function(e) {

    window.delete_data_html = '';
    window.delete_record_id = $(this).parent().parent().parent().find('.td-cutStyle-id').text();
    elem = `<table class="table table-bordered table-striped">`+
            `<tr><td><h4>ID</h4></td><td>`+window.delete_record_id+`</td></tr>`+
            `<tr><td><h4>Cut Style ID</h4></td><td>`+$(this).parent().parent().parent().find('.td-cutStyle-cut_id').text()+`</td></tr>`+
            `<tr><td><h4>Style Id</h4></td><td>`+$(this).parent().parent().parent().find('.td-cutStyle-style_id-id').text()+`</td></tr>`+
            `<tr><td><h4>Hybris SKU</h4></td><td>`+$(this).parent().parent().parent().find('.td-cutStyle-hybris_sku').text()+`</td></tr>`+

            `<tr><td><h4>Style Category</h4></td><td>`+$(this).parent().parent().parent().find('.td-cutStyle-style_category').text()+`</td></tr>`+
            `<tr><td><h4>Gender</h4></td><td>`+$(this).parent().parent().parent().find('.td-cutStyle-gender').text()+`</td></tr>`+

            `</table>`;
    window.delete_data_html = elem;

    bootbox.confirm({
        size: "medium",
        title: "Delete Record?",
        message: window.delete_data_html,
        buttons: {
            'cancel': {
                label: 'Cancel'
            },
            'confirm': {
                label: 'Delete',
                className: 'btn-danger pull-right'
            }
        }, 
        callback: function(result){
            if(result){
                bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });

                var url = "//" + api_host + "/api/lookup_cut_to_style/delete";
                var data = {};
                data.id = window.delete_record_id;

                deleteRecord(data, url);
            } else {
                console.log('Deletion Canceled.');
            }
        }
    });
});

function deleteRecord(data, url){
    console.log(data);
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json;',
        headers: {"accessToken": atob(headerValue)},
        success: function (data) {
            console.log('Successfully deleted record.');
            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

function addUpdateRecord(data, url){
    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json;',
        headers: {"accessToken": atob(headerValue)},
        success: function (data) {
            if(window.modal_action == 'add'){
                console.log('Successfully added record.');
            } else if(window.modal_action == 'update'){
                console.log('Successfully updated record.');
            }

            window.location.reload();
        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}

});
</script>
@endsection
