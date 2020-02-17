@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Edit fabric')
                    <h1>Edit fabric</h1>
                </div>

                <div class="box-body">
                    <form action="{{ route('v1_update_fabric') }}" class="form-horizontal" method="POST" enctype="multipart/form-data">
                        {{ csrf_field() }}
                        <input type="hidden" name="id" value="{{ $fabric->id }}">
                        <input type="hidden" name="thumbnail" value="{{ $fabric->thumbnail }}" id="thumbnail">

                        <div class="form-group">
                            <label class="col-md-5 control-label">Material ID</label>

                            <div class="col-md-4">
                                <input type="number" class="form-control" name="factory_material_id" value="{{ $fabric->factory_material_id }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Material</label>

                            <div class="col-md-4">
                                <input type="text" class="form-control" name="material" value="{{ $fabric->material }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Material Abbreviation</label>

                            <div class="col-md-4">
                                <input type="text" class="form-control" name="material_abbreviation" value="{{ $fabric->material_abbreviation }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">
                                Thumbnail File

                                @if ($fabric->thumbnail)
                                    <div style="margin-top: 15px;">
                                        <button type="button" class="btn btn-flat btn-xs btn-danger remove-thumbnail">Remove thumbnail</button>
                                    </div>
                                @endif
                            </label>

                            <div class="col-md-4">
                                <input type="file" class="form-control" name="new_thumbnail">

                                @if ($fabric->thumbnail)
                                    <div class="img">
                                        <img src="{{ $fabric->thumbnail }}">
                                    </div>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">Description</label>

                            <div class="col-md-4">
                                <textarea name="description" class="form-control">{{ $fabric->description }}</textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-5 control-label">RCH Alias</label>

                            <div class="col-md-4">
                                <input type="text" class="form-control" name="rch_alias" value="{{ $fabric->rch_alias }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-5">&nbsp;</div>
                            <div class="col-md-4">
                                <button type="submit" class="btn btn-flat btn-primary">Update fabric</button>
                                <a href="{{ route('v1_index_fabrics') }}" class="btn btn-flat btn-danger">Cancel</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            $('.remove-thumbnail').click(function(e) {
                e.preventDefault();

                $('#thumbnail').val('');
                $('.img').remove();
                $(this).remove();
            });
        })
    </script>
@endsection
