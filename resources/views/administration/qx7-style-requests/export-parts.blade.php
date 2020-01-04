@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.3.1/css/buttons.dataTables.min.css">
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">
<style>
    .scrollable-cell {
        overflow-y: scroll;
        height: 100px;
    }
</style>
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
                        <th>CUT ID</th>
                        <th>STYLE ID</th>
                        <th>RULE ID</th>
                        <th>COMPLETE RULE PART NAMES</th>
                        <th>BRAND</th>
                        <th>UNSET MATERIAL OPTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($style_requests as $style_request)
                    <tr>
                        <td>{{ $style_request->material_id }}</td>
                        <td>{{ $style_request->id }}</td>
                        <td>{{ $style_request->style_name }}</td>
                        <td>{{ $style_request->cut_id }}</td>
                        <td>{{ $style_request->style_id }}</td>
                        <td>{{ $style_request->rule_id }}</td>
                        <td>@if(isset($style_request->complete_part_names)) {{ $style_request->complete_part_names ? 'YES' : 'NO' }} @endif</td>
                        <td>{{ $style_request->brand }}</td>
                        <td>
                            @if(!empty($style_request->empty_material_options))
                            <div class="scrollable-cell">
                            @foreach($style_request->empty_material_options as $option)
                                {{ $option }}<br/>
                            @endforeach
                            @endif
                            </div>
                        </td>
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
<script type="text/javascript" src="//code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/buttons/1.3.1/js/dataTables.buttons.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.flash.min.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
<script type="text/javascript" src="//cdn.datatables.net/buttons/1.3.1/js/buttons.html5.min.js"></script>
    <script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
    <script type="text/javascript" src="/js/bootbox.min.js"></script>

<script type="text/javascript">
$(document).ready( function () {
    $('table').DataTable( {
        "lengthChange": false,
        // "searching": false,
        "ordering": false,
        pageLength: 20,
        dom: 'Bftip',
        buttons: [
            {
                extend: 'excelHtml5',
                filename: 'QX7 Report',
                exportOptions: {
                    columns: [2, 3, 4, 5, 6, 7, 8, 0, 1 ],
                    format: {
                        body: function ( data, column, row ) {
                            if (row === 6) {
                                data = data.replace( /<div class="scrollable-cell">/g, "" );
                                data = data.replace( /<\/div>/g, "" );
                                //split at each new line
                                trimData = data.split('<br>');
                                splitData = [];
                                _.each(trimData, function (str) {
                                    splitData.push(str.trim());
                                })
                                data = splitData;
                                return data;
                            }
                            return data;
                        }
                    }
                },
                customize: function( xlsx ) {
                    var sheet = xlsx.xl.worksheets['sheet1.xml'];
                    $('row c', sheet).attr( 's', '55' );
                    $('row:first c', sheet).attr( 's', '2');
                    $('row* ', sheet).each(function(index) {
                        if (index > 0) {
                            $(this).attr('ht', 60);
                            $(this).attr('customHeight', 1);
                        }
                    });
                }
            },
        ]
    } );

});
</script>
@endsection
