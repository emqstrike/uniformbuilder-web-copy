@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-info">
                    @section('page-title', 'Create Material')
                    <div class="panel-heading">Create Material</div>

                    <div class="panel-body">
                        @include('administration.partials.validation-error')

                        <form class="form-horizontal" role="form" method="POST" action="" enctype="multipart/form-data" id='create-style'>
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">

                            <div class="form-group">
                                <label class="col-md-4 control-label">Sytle Name</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control material-name" name="name">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Brand</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-brand" name="brand">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Gender</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-gender" name="gender">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Sport</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-sport" name="uniform_category">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Application Type</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-application-type" name="uniform_application_type">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Style Category</label>
                                <div class="col-md-6">
                                    <input type="text" class="form-control style-category" name="type">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Qstrike Item ID</label>
                                <div class="col-md-6">
                                    <input type="number" class="form-control style-item-id" name="item_id">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-4 control-label">Factory</label>
                                <div class="col-md-6">
                                    <input type="number" class="form-control style-factory" name="factory_code">
                                </div>
                            </div>
                            <hr>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary create-user">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Add New Style
                                    </button>
                                    <a href="{{ route('v1_qx7_style_requests') }}" class="btn btn-danger">
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
    </section>
@endsection

@section('scripts')

<script type="text/javascript">

</script>
@endsection
