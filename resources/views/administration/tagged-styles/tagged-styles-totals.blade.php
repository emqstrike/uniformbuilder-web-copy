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
                        Tagged Styles Totals
                    </h2>
                <textarea name="hide" style="display:none;" id="tagged-styles-data"><?php echo json_encode($tagged_styles, JSON_FORCE_OBJECT);?></textarea>
                </div>
                <div class="box-body">
                    <table class='table table-bordered table-striped table-hover'>
                    <thead>
                        <tr>
                            <th width="40%">Material ID</th>
                            <th width="60%">Total Tagged Styles</th>
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


    var tagged_styles_data = null;

    tagged_styles_data = $('#tagged-styles-data').text();
    var data = JSON.parse(tagged_styles_data);
    var element = '';
    var all_tagged_styles = Object.keys(data).length;
        element =   `<tr>
                        <td>
                           All
                        </td>
                        <td>`
                            +all_tagged_styles+
                        `</td>
                    </tr>`;

    var group_by_material = _.groupBy(data, "uniform_id");
    var material_ids = _.keys(group_by_material);
    var material_tagged_styles = [];
    var tagged_styles = 0;
     _.each(group_by_material, function(material){
        var tagged_styles = Object.keys(material).length;
        material_tagged_styles.push(tagged_styles);
    });

     _.each(material_ids, function(material_id, i) {
            element +=  `<tr>
                        <td>
                            `+material_id+
                        `</td>
                        <td>`
                            +material_tagged_styles[i]+
                        `</td>
                    </tr>`;
        });

    $('.tbody-data').append(element);

});
</script>
@endsection
