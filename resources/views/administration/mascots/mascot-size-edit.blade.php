@extends('administration.lte-main')

@section('custom-styles')
select:hover {
  background-color: transparent;
}
@endsection

@section('content')
<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-info">
                <div class="panel-heading">Add New Mascot Size</div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="/administration/mascot_size/update" enctype="multipart/form-data" id='create-mascot-size-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="mascot_size_id" value="{{ $mascot_size->id }}">
                        <div class="form-group">
                            <label class="col-md-4 control-label">Sport</label>
                            <div class="col-md-6">
                                <select class="form-control" name='sport'>
                                @foreach ($sports as $sport)
                                    @if($mascot_size->sport == $sport->name)
                                        <option value='{{ $sport->name }}' selected>{{ $sport->name }}</option>
                                    @else
                                        <option value='{{ $sport->name }}'>{{ $sport->name }}</option>
                                    @endif
                                    
                                @endforeach
                                </select>

                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Size</label>
                            <div class="col-md-6">
                                <input type="number" step="0.01" class="form-control" name="size" value="{{ $mascot_size->size }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Scale</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="scale" value="{{ $mascot_size->scale }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-mascot-size">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Mascot Size
                                </button>
                                <a href="/administration/mascot-sizes_categories" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="/js/administration/mascot-sizes.js"></script> -->
<script type="text/javascript">
$(document).ready(function(){

});
</script>
@endsection