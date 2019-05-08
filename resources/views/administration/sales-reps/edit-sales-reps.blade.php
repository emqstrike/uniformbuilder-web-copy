@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style type="text/css">
    
li.select2-selection__choice {
    color: black !important;
}

.animated {
    -webkit-transition: height 0.2s;
    -moz-transition: height 0.2s;
    transition: height 0.2s;
}
.inputs {
    width: 45px;
}
</style>
@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading"><h3>Edit Sales Representative Profile</h3></div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/sales_reps/update" enctype="multipart/form-data" id='sales_reps_form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="id" value="{{$rep->id}}">
                        <input type="hidden" name="active">     
                        <div class="form-group">
                            <label class="col-md-4 control-label">Firstname : </label>
                            <div class="col-md-4">
                                <input type="text" name="first_name" class="form-control" value="{{$rep->first_name}}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Lastname : </label>
                            <div class="col-md-4">
                                <input type="text" name="last_name" class="form-control" value="{{$rep->last_name}}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Sales Representative ID : </label>
                           <div class="col-md-1">
                                <input type="number" name="rep_id" class="form-control" value="{{$rep->rep_id}}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Email : </label>
                            <div class="col-md-4">
                                <input type="email" name="user_id" class="form-control" value="{{$rep->user_id}}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">ZIP Codes : </label>
                           <div class="col-md-4">
                                <input type="text" name="zip_codes" class="form-control" value="{{$rep->zip_codes}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Is manager? </label>
                           <div class="col-md-1">
                                <select name="is_manager" class="form-control">
                                         <option value="1" @if($rep->is_manager == 1) selected="selected"@endif>Yes</option>
                                         <option value="0" @if($rep->is_manager == 0) selected="selected"@endif>No</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Rep ID Manager</label>
                            <div class="col-md-1">
                                <input type="number" name="rep_id_manager" class="form-control" value="{{$rep->rep_id_manager}}">
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="col-md-4 control-label" >Is corporate? </label>
                           <div class="col-md-1">
                                <select name="is_corporate" class="form-control">
                                        <option value="1" @if($rep->is_corporate == 1) selected="selected"@endif>Yes</option>
                                        <option value="0" @if($rep->is_corporate == 0) selected="selected"@endif>No</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Dealer ID : </label>
                           <div class="col-md-1">
                                <input type="number" name="dealer_id" class="form-control" value="{{$rep->dealer_id}}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Dealer : </label>
                           <div class="col-md-2">
                                <select name="dealer" class="form-control">
                                @foreach ($dealers as $dealer)
                                        <option value="{{ $dealer }}" @if($dealer == $rep->dealer) selected="selected"@endif">{{ $dealer }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Status : </label>
                           <div class="col-md-1">
                                <select name="active" class="form-control">
                                         <option value="1" @if($rep->active == 1) selected="selected"@endif>Active</option>
                                         <option value="0" @if($rep->active == 0) selected="selected"@endif>Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-md-4 control-label">Alias : </label>
                            <div class="col-md-4">
                                <input type="text" name="alias" class="form-control" value="{{$rep->alias}}">
                            </div>
                        </div>
                        <br>
                        <hr>                               
                        <br>    
                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary create-sales-rep">
                                    <span class="glyphicon glyphicon-user"></span>
                                    Update Profile
                                </button>
                                <a href="/administration/sales_reps" class="btn btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                        <br><br>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('custom-scripts')
<script src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script src="/js/administration/common.js"></script>
<script src="/jquery-ui/jquery-ui.min.js"></script>
<script src="/js/libs/select2/select2.min.js"></script>
<script src="/js/ddslick.min.js"></script>
<script src="/underscore/underscore.js"></script>

<script>

</script>
@endsection
