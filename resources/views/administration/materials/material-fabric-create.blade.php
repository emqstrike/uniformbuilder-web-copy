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
                <div class="panel-heading">Add New Material Factory</div>
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
                            <label class="col-md-4 control-label">Material</label>
                            <div class="col-md-6">
                                <select name='material_id' class="form-control material-id">
                                    @foreach ($fabrics as $fabric)
                                        @if ($fabric->active)
                                            <option value='{{ $fabric->factory_material_id }}'>{{ $fabric->material }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Factory</label>
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
                                    Add New Fabric Factory
                                </button>
                                <a href="/administration/materials_fabrics" class="btn btn-danger">
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


@endsection