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
                                <th>Brand</th>
                                <th>Gender</th>
                                <th>Sport</th>
                                <th>Application Type</th>
                                <th>Style Category</th>
                                <th>Item ID</th>
                                <th>Design Sheet</th>
                                <th>Priority</th>
                                <th>Deadline</th>
                                <th>Requested By:</th>
                                <th>Notes</th>
                                <th>Customizer ID</th>
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

    $(document).on('click', '.open-design-sheet', function(e) {
        e.preventDefault();

    });

    function generateStyleRequests() {
        var elem = '';
        var url = "qx7_style_request/";
        _.each(window.style_requests, function (request) {
            link = url + request.id
            elem += `
                <tr>
                    <td>` + request.style_name + `</td>
                    <td>` + request.brand.brand + `</td>
                    <td>` + request.gender.gender + `</td>
                    <td>` + request.sport.sport_name + `</td>
                    <td>` + request.application_type.application_type + `</td>
                    <td>` + request.style_category.style_category + `</td>
                    <td>` + request.quickstrike_item_id + `</td>
                    <td> <a href="#" class="btn btn-default btn-xs open-design-sheet" data-url="` + request.design_sheet + `" role="button">Open</a></td>
                    <td>` + request.priority + `</td>
                    <td>` + request.deadline + `</td>
                    <td>` + request.user.first_name + ` `+ request.user.last_name + `</td>
                    <td>` + request.notes + `</td>
                    <td>` + request.style_id + `</td>
                    <td>
                        <a href="`+link+`" class="btn btn-default btn-xs" role="button">View</a>`
                        if (request.style_id == null) {
                            elem += `<a href="/administration/v1-0/qx7_style_requests/create_style/`+request.id+ `" class="btn btn-default btn-xs" data-style-id="` + request.id + `" role="button">Create Style</a>`
                        } else {
                            elem += `<a href="/administration/v1-0/qx7_style_requests/edit/`+request.id+ `" class="btn btn-default btn-xs" data-style-id="` + request.id + `" role="button">Update Style</a>`
                        }
                    `</td>
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
            var url = "//" + qx7_host + "/api/style_requests/formatted";
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
