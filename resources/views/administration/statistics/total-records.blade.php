@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>

@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h2>
                        <i class="glyphicon glyphicon-blackboard"></i>
                        Tables Total Records
                    </h2>
                    <div class="row">
                        <label class="col-md-1 col-md-offset-2 control-label">Table</label>
                        <div class="col-md-2">
                            <select class="form-control table-name" name="table_name">
                                <option value="none" @if($active_table == "none") selected="selected"@endif >none</option>
                                <option value="uniform_categories" @if($active_table == "uniform_categories") selected="selected"@endif >Uniform Categories</option>
                                <option value="saved_designs" @if($active_table == "saved_designs") selected="selected"@endif >Saved Designs</option>
                                <option value="materials" @if($active_table == "materials") selected="selected"@endif >Materials</option>
                                <option value="block_patterns" @if($active_table == "block_patterns") selected="selected"@endif >Block Patterns</option>
                                <option value="neck_options" @if($active_table == "neck_options") selected="selected"@endif >Block Pattern Options</option>
                                <option value="users" @if($active_table == "users") selected="selected"@endif >Users</option>
                                <option value="orders" @if($active_table == "orders") selected="selected"@endif >Orders</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <a href="#" class="btn btn-default active-table-name" style="width: 100px;">Count</a><hr>
                        </div>
                    </div>
                </div>
                <div class="box-body">
                    <table class='table table-bordered table-striped table-hover'>
                        <thead>
                            <tr>
                                <th width="40%">Table</th>
                                <th width="60%">Total No. of Records</th>
                            </tr>
                        </thead>
                        <tbody class="tbody-data">
                            @if ($active_table == 'neck_options')
                                @foreach ($count as  $data)
                                    <tr>
                                        <td>{{ $data->name }}</td>
                                        <td>{{ $data->total }}</td>
                                    </tr>
                                @endforeach
                            @else
                                <tr>
                                    <td>{{ ucfirst(str_replace('_', ' ', $active_table)) }}</td>
                                    <td>{{ $count }}</td>
                                </tr>
                            @endif
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script src="/underscore/underscore.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.file-link').on('click', function(e){
        console.log('file link');
        var url = $(this).data('link');
        OpenInNewTab(url);
    });

    function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }

    $(document).on('click', '.active-table-name', function() {
        $table = $('.table-name').val();
        if ($table == null || $table == '') {
            $table = 'none';
        }
        window.location = "/administration/total_records/"+$table;
    });
});
</script>
@endsection
