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
                <div class="panel-heading">Add New mascot</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="/administration/materials_fabric/add" enctype="multipart/form-data" id='create-mascot-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                       
                        <div class="form-group">
                            <label class="col-md-4 control-label">Material Id</label>
                            <div class="col-md-6">
                                <input type="number" class="form-control material-id" name="material_id" value="{{ old('material_id') }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Materials</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control material-name" name="material_name" value="{{ old('material-name') }}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Factorys</label>
                            <div class="col-md-6">
                                <select name='factory_id' class="form-control factory-code">
                                    @foreach ($factories as $factory)
                                        @if ($factory->active)
                                            <option value='{{ $factory->id }}'>{{ $factory->name }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                 
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-mascot">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Mascot
                                </button>
                                <a href="/administration/mascots_categories" class="btn btn-danger">
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
<script type="text/javascript" src="/js/administration/mascots.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('select:not(:has(option))').attr('visible', false);

    $('.ma-default-color').change(function(){
        var color = $('option:selected', this).data('color');
        $(this).css('background-color', color);
    });
});
</script>
@endsection