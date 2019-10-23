@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Add new fabric')
                    <h1>Add new fabric</h1>
                </div>

                <div class="box-body">
                    <form action="{{ route('v1_store_fabric') }}" class="form-horizontal" method="POST" enctype="multipart/form-data">
                        {{ csrf_field() }}

                        <div class="form-group">
                            <label class="col-md-5 control-label">Material ID</label>

                            <div class="col-md-4">
                                <input type="number" class="form-control" name="factory_material_id">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Material</label>

                            <div class="col-md-4">
                                <input type="text" class="form-control" name="material">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Material Abbreviation</label>

                            <div class="col-md-4">
                                <input type="text" class="form-control" name="material_abbreviation">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Thumbnail File</label>

                            <div class="col-md-4">
                                <input type="file" class="form-control" name="thumbnail">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Description</label>

                            <div class="col-md-4">
                                <textarea name="description" class="form-control"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">RCH Alias</label>

                            <div class="col-md-4">
                                <input type="text" class="form-control" name="rch_alias">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-5">&nbsp;</div>
                            <div class="col-md-4">
                                <button type="submit" class="btn btn-flat btn-primary">Add new fabric</button>
                                <a href="{{ route('v1_index_fabrics') }}" class="btn btn-flat btn-danger">Cancel</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection
