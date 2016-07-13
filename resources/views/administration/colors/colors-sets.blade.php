@extends('administration.lte-main')
 
@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        Colors Sets
                        <small>
                            <a href="/administration/colors_set/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Colors Set
                            </a>
                        </small>
                    </h1>
                    <!-- <small>
                        <a href="/administration/colors/updateAll" class='btn btn-xs btn-primary'>
                            <span class="glyphicon glyphicon-refresh"></span>
                            Update Colors
                        </a>
                    </small> -->
                </div>
                <div class="box-body">
                    <input type="hidden" class="colors-all" value='<?php echo json_encode($colors, JSON_FORCE_OBJECT);?>'>
                    <table class='data-table table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Color Set Name</th>
                            <th>Uniform Application Type</th>
                            <th>Colors</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($colors_sets as $set)
                        <tr class='set-{{ $set->id }}'>
                            <td>
                                {{ $set->id }}
                            </td>
                            <td>
                                {{ $set->name }}
                            </td>
                            <td>
                                {{ $set->uniform_type }}
                            </td>
                            <td>
                            <ul class="nav nav-pills colors-column">
                            </ul>
                                <input type="hidden" class="colors" value='<?php echo json_encode($set->colors, JSON_FORCE_OBJECT);?>'>
                            </td>
                            <td>
                                <a href="#" class="btn btn-danger">Remove</a>
                            </td>
                        </tr>
                    @empty

                        <tr>
                            <td colspan='3'>
                                No Colors Sets
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
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript">
$(document).ready(function(){



    var all_colors = JSON.parse( $('.colors-all').val() );
    // console.log( all_colors );



    $(".colors").each(function(i) {
        var strColors = $(this).val().replace(/\\"/g, '"');
        strColors = strColors.substring(1, strColors.length-1);
        strColors = JSON.parse(strColors);
        var elem = "";
        var thisElem = $(this);
        strColors.forEach(function(entry) {
            $.each(all_colors, function(i, item) {
                if( entry == item.color_code ){
                    elem += '<li style="background-color: #' + item.hex_code +'"><a href="#" style="text-shadow: 1px 1px #000; color: #fff; ">' + item.name + '</a></li>';
                }
            });
        });
        $(this).siblings('.colors-column').append(elem);
    });



});
</script>
@endsection