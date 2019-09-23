@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('content')
<div class="row">
    <div class="col-xs-12">
        <div class="box">
            <div class="box-header">
                @section('page-title', 'Qx7 Parts Report')
                <h1>
                    <span class="fa fa-list-alt"></span>
                    Qx7 Parts Report
                </h1>
            </div>
            <div class="box-body">
                <table class="table data-table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>MATERIAL ID</th>
                        <th>STYLE REQUEST ID</th>
                        <th>STYLE NAME</th>
                        <th>STYLE ID</th>
                        <th>RULE ID</th>
                        <th>COMPLETE RULE PART NAMES</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($style_requests as $style_request)
                    <tr>
                        <td>{{ $style_request->material_id }}</td>
                        <td>{{ $style_request->id }}</td>
                        <td>{{ $style_request->style_name }}</td>
                        <td>{{ $style_request->style_id }}</td>
                        <td>{{ $style_request->rule_id }}</td>
                        <td>@if(isset($style_request->complete_part_names)) {{ $style_request->complete_part_names ? 'YES' : 'NO' }} @endif</td>
                    </tr>
                    @endforeach
                </tbody>
                </table>
			</div>
	    </div>
    </div>
</div>
@endsection

@section('scripts')

<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
<script type="text/javascript">
$(document).ready( function () {
    $('table').DataTable( {
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        pageLength: 20,
        dom: 'Btip',
        buttons: [
            {
                extend: 'excelHtml5',
                filename: 'QX7 Report'
            },
        ]
    } );

});
</script>
@endsection

