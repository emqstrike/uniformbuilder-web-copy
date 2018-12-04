@extends('administration-lte-2.lte-main')

@section('styles')

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
                        <a href="/administration/v1-0/tagged_styles" class="btn btn-default btn-sm btn-flat add-record">
                            Back
                        </a>
                    </h2>
                <textarea name="hide" style="display:none;" id="tagged-styles-data"><?php echo json_encode($tagged_styles, JSON_FORCE_OBJECT);?></textarea>
                </div>
                <div class="box-body">
                    <table class='table table-bordered table-hover display'>
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
