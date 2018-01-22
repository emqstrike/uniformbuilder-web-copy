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
                        <textarea name="hide" style="display:none;" id="table-data"><?php echo json_encode($table, JSON_FORCE_OBJECT);?></textarea>
                        <textarea name="hide" style="display:none;" id="sports-data"><?php echo json_encode($sports, JSON_FORCE_OBJECT);?></textarea>
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

    var table_data = null;
    var table_name = $('.table-name option:selected').text();
    var table_data = $('#table-data').text();
    var data = JSON.parse(table_data);
    var element = '';

    //For Block Pattern Options
    if (table_name === 'Block Pattern Options') {
        var bp_options = [];
        var all_data_counts = 0;
        var unique_data_counts = 0;
        _.each(data, function(bp) {
            var bp_name = bp.name;
            _.each(data, function(item) {
                if (item.name == bp_name) {
                    var opts = JSON.parse(item.neck_options);
                    _.each(opts, function (opt) {
                        bp_options.push(opt.name);
                    });
                }
            });
        });

        _.each(bp_options, function(i) {
            all_data_counts++;
        });
        var unique_options = _.sortBy(_.uniq(bp_options));
            _.each(unique_options, function(i) {
                unique_data_counts++;
        });

        element =  `<tr>
                        <td>
                            Total Block Pattern Options
                        </td>
                        <td>`
                            +all_data_counts+
                        `</td>
                    </tr>
                    <tr>
                        <td>
                            Unique Block Pattern Options
                        </td>
                        <td>`
                            +unique_data_counts+
                        `</td>
                    </tr>`;

        var sports = _.groupBy(data, "uniform_category_id");
        var sports_ids = _.keys(sports);
        var options_per_sport = [];
        var sports_options_count = 0;
            _.each(sports, function(sport) {
                var sport_bp_options = 0;
                _.each(sport, function(bp) {
                    var options = bp.neck_options;
                    var data_options = JSON.parse(options);
                    if (data_options == '' || data_options == null || data_options == undefined) {
                        sports_options_count = 0;
                    } else {
                        sports_options_count = Object.keys(data_options).length;
                    }
                    sport_bp_options += sports_options_count;
                });
            options_per_sport.push(sport_bp_options);
            });

        var sports_data = JSON.parse($('#sports-data').text());
        _.each(sports_ids, function(sport_id, i) {
            var sportOK = _.find(sports_data, function(e){
                return e.id == sport_id;
                });
            element +=  `<tr>
                        <td>
                            Block Pattern Options of `+sportOK.name+
                        `</td>
                        <td>`
                            +options_per_sport[i]+
                        `</td>
                    </tr>`;
        });

    } else {
        var data_count = Object.keys(data).length;
        element =   `<tr>
                        <td>`
                            +table_name+
                        `</td>
                        <td>`
                            +data_count+
                        `</td>
                    </tr>`;
    }

    $('.tbody-data').append(element);

});
</script>
@endsection
