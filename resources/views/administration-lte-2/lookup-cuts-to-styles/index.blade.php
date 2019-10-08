@extends('administration-lte-2.lte-main')

@section('styles')

@endsection
@section('content')
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Lookup Cuts to Styles')
                    <h1>
                        <span class="fa fa-list-alt"></span>
                        Lookup Cuts to Styles
                    </h1>
                </div>
                <div class="box-body">
                    @if (Session::has('message'))
                        <div class="alert alert-success" role="alert" style="margin-top: 30px;">
                            {{ Session::get('message') }}
                        </div>
                    @elseif (Session::has('error_message'))
                        <div class="alert alert-danger" role="alert" style="margin-top: 30px;">
                            {{ Session::get('error_message') }}
                        </div>
                    @endif
                    <div class="col-md-4">
                        <form action="{{ route('v1_upload_cuts_to_styles') }}" role="form" method="POST" enctype="multipart/form-data">
                            {{ csrf_field() }}
                            <div class="form-group">
                                <label for="exampleInputFile">File Upload</label>
                                <input type="file" name="file" class="form-control" accept=".xlsx, .xls" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

@section('scripts')

<script>
$(document).ready(function(){

});
</script>
@endsection
