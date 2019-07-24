@extends('administration-lte-2.lte-main')

@section('styles')

@endsection
@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Qx7 Style Requests')
                    <h1>
                        <span class="fa fa-list-alt"></span>
                        Qx7 Style Requests
                    </h1>
                </div>
                <div class="box-body">
                    <table class="table data-table table-bordered table-hover display" id="qx7-style-requests" width="100%">
                        <thead>
                            <tr>
                                <th>Style Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody class="style-request-row">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('scripts')

<script>
$(document).ready(function(){

    getQx7StyleRequests( function (style_requests) {
        window.style_requests = style_requests;
    });

    $(document).on('click', '.view-style', function(e) {
        e.preventDefault();
    });

    function generateStyleRequests() {
        var elem = '';
        _.each(window.style_requests, function (request) {
            elem += `
                <tr>
                    <td>` + request.style_name + `</td>
                    <td><a href="#" class="" data-style-request-id="1" role="button">View</a></td>
                </tr>
            `;
        });

        $('.style-request-row').append(elem);
        refreshDatatable();
    }

    function refreshDatatable() {
        $('.data-table').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "info": true,
            "pageLength" : 15,
            "ordering": false,
            "autoWidth": false,
        });
    }

    function getQx7StyleRequests(callback){
            var style_requests;
            var url = "//" + qx7_host + "/api/style_requests";
            $.ajax({
                url: url,
                async: false,
                type: "GET",
                dataType: "json",
                crossDomain: true,
                contentType: 'application/json',
                success: function(data){
                    style_requests = data['style_requests'];
                    if(typeof callback === "function") callback(style_requests);
                }
            });
    }

    getQx7StyleRequests();
    generateStyleRequests();

});
</script>
@endsection
