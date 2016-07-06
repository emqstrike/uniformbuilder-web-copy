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
                    <table class='data-table table table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Uniform Type</th>
                            <th>Colors</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($colors_sets as $set)
                        <tr class='set-{{ $set->id }} {{ (!$set->active) ? ' inactive' : '' }}'>
                            <td>
                                {{ $set->id }}
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/colors.js"></script>
<script type="text/javascript">
$(document).ready(function(){

});
</script>
@endsection