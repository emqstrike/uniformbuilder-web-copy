@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('content')

<div class="container-fluid main-content">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-info">
                <div class="panel-heading">Modify Piping</div>
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

                    <form class="form-horizontal" role="form" method="POST" action="/administration/material/piping/update" enctype="multipart/form-data" id='edit-piping-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="material_id" value="{{ $material->id }}">
                        <input type="hidden" name="case" value="{{ $case }}">
                        <input type="hidden" name="piping_properties_json" value="{{ $piping_properties_json }}">

                        <table class="table table-bordered table-striped">
                            <tbody>
                                <tr>
                                    <td colspan="4" class="alert alert-success"><h4>Size: 1/8</h4></td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <label class="col-md-5 control-label">Name</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control material-name" name="name_oe" value="{{ ( ! empty($piping_properties['1/8']['name']) ? $piping_properties['1/8']['name'] : '') }}">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>FRONT
                                        <a href="#" class="btn btn-default btn-xs 1-8-front polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/8']['front_pos_1']) ? $piping_properties['1/8']['front_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/8']['front_pos_2']) ? $piping_properties['1/8']['front_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/8']['front_pos_3']) ? $piping_properties['1/8']['front_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                    <td>BACK
                                        <a href="#" class="btn btn-default btn-xs 1-8-back polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/8']['back_pos_1']) ? $piping_properties['1/8']['back_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/8']['back_pos_2']) ? $piping_properties['1/8']['back_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/8']['back_pos_3']) ? $piping_properties['1/8']['back_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                    <td>LEFT
                                        <a href="#" class="btn btn-default btn-xs 1-8-left polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/8']['left_pos_1']) ? $piping_properties['1/8']['left_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/8']['left_pos_2']) ? $piping_properties['1/8']['left_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/8']['left_pos_3']) ? $piping_properties['1/8']['left_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                    <td>RIGHT
                                        <a href="#" class="btn btn-default btn-xs 1-8-right polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/8']['right_pos_1']) ? $piping_properties['1/8']['right_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/8']['right_pos_2']) ? $piping_properties['1/8']['right_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/8']['right_pos_3']) ? $piping_properties['1/8']['right_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                </tr>
                                <tr>
                                    <td>@if(isset($piping_properties['1/8']['front_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="f_position_1_18" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/8']['back_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="b_position_1_18" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/8']['left_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="l_position_1_18" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/8']['right_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="r_position_1_18" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td>@if(isset($piping_properties['1/8']['front_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="f_position_2_18" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/8']['back_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="b_position_2_18" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/8']['leftt_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="l_position_2_18" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/8']['right_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="r_position_2_18" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td>@if(isset($piping_properties['1/8']['front_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="f_position_3_18" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/8']['back_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="b_position_3_18" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/8']['left_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="l_position_3_18" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/8']['right_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="r_position_3_18" accept="image/*"></td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-bordered table-striped">
                            <tbody>
                                <tr>
                                    <td colspan="4" class="alert alert-info"><h4>Size: 1/4</h4></td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <label class="col-md-5 control-label">Name</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control material-name" name="name_of" value="{{ ( ! empty($piping_properties['1/4']['name']) ? $piping_properties['1/4']['name'] : '') }}">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>FRONT
                                        <a href="#" class="btn btn-default btn-xs 1-4-front polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/4']['front_pos_1']) ? $piping_properties['1/4']['front_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/4']['front_pos_2']) ? $piping_properties['1/4']['front_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/4']['front_pos_3']) ? $piping_properties['1/4']['front_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                    <td>BACK
                                        <a href="#" class="btn btn-default btn-xs 1-4-back polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/4']['back_pos_1']) ? $piping_properties['1/4']['back_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/4']['back_pos_2']) ? $piping_properties['1/4']['back_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/4']['back_pos_3']) ? $piping_properties['1/4']['back_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                    <td>LEFT
                                        <a href="#" class="btn btn-default btn-xs 1-4-left polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/4']['left_pos_1']) ? $piping_properties['1/4']['left_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/4']['left_pos_2']) ? $piping_properties['1/4']['left_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/4']['left_pos_3']) ? $piping_properties['1/4']['left_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                    <td>RIGHT
                                        <a href="#" class="btn btn-default btn-xs 1-4-right polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/4']['right_pos_1']) ? $piping_properties['1/4']['right_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/4']['right_pos_2']) ? $piping_properties['1/4']['right_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/4']['right_pos_3']) ? $piping_properties['1/4']['right_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                </tr>
                                <tr>
                                    <td>@if(isset($piping_properties['1/4']['front_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="f_position_1_14" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/4']['back_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="b_position_1_14" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/4']['left_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="l_position_1_14" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/4']['right_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="r_position_1_14" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td>@if(isset($piping_properties['1/4']['front_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="f_position_2_14" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/4']['back_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="b_position_2_14" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/4']['left_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="l_position_2_14" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/4']['right_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="r_position_2_14" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td>@if(isset($piping_properties['1/4']['front_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="f_position_3_14" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/4']['back_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="b_position_3_14" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/4']['left_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="l_position_3_14" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/4']['right_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="r_position_3_14" accept="image/*"></td>
                                </tr>
                            </tbody>
                        </table>

                        <table class="table table-bordered table-striped">
                            <tbody>
                                <tr>
                                    <td colspan="4" class="alert alert-warning"><h4>Size: 1/2</h4></td>
                                </tr>
                                <tr>
                                    <td colspan="4">
                                        <label class="col-md-5 control-label">Name</label>
                                        <div class="col-md-2">
                                            <input type="text" class="form-control material-name" name="name_oh" value="{{ ( ! empty($piping_properties['1/2']['name']) ? $piping_properties['1/2']['name'] : '') }}">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>FRONT
                                        <a href="#" class="btn btn-default btn-xs 1-2-front polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/2']['front_pos_1']) ? $piping_properties['1/2']['front_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/2']['front_pos_2']) ? $piping_properties['1/2']['front_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/2']['front_pos_3']) ? $piping_properties['1/2']['front_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                    <td>BACK
                                        <a href="#" class="btn btn-default btn-xs 1-2-back polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/2']['back_pos_1']) ? $piping_properties['1/2']['back_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/2']['back_pos_2']) ? $piping_properties['1/2']['back_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/2']['back_pos_3']) ? $piping_properties['1/2']['back_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                    <td>LEFT
                                        <a href="#" class="btn btn-default btn-xs 1-2-left polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/2']['left_pos_1']) ? $piping_properties['1/2']['left_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/2']['left_pos_2']) ? $piping_properties['1/2']['left_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/2']['left_pos_3']) ? $piping_properties['1/2']['left_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                    <td>RIGHT
                                        <a href="#" class="btn btn-default btn-xs 1-2-right polygon-button"
                                        data-postion1-image="{{ ( ! empty($piping_properties['1/2']['right_pos_1']) ? $piping_properties['1/2']['right_pos_1'] : '') }}"
                                        data-postion2-image="{{ ( ! empty($piping_properties['1/2']['right_pos_2']) ? $piping_properties['1/2']['right_pos_2'] : '') }}"
                                        data-postion3-image="{{ ( ! empty($piping_properties['1/2']['right_pos_3']) ? $piping_properties['1/2']['right_pos_3'] : '') }}"
                                        >
                                            <i class="glyphicon glyphicon-screenshot"></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                    <td><center><img src="#" width="200px" height="200px"></center></td>
                                </tr>
                                <tr>
                                    <td>@if(isset($piping_properties['1/2']['front_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="f_position_1_12" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/2']['back_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="b_position_1_12" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/2']['left_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="l_position_1_12" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/2']['right_pos_1']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="r_position_1_12" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td>@if(isset($piping_properties['1/2']['front_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="f_position_2_12" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/2']['back_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="b_position_2_12" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/2']['left_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="l_position_2_12" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/2']['right_pos_2']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="r_position_2_12" accept="image/*"></td>
                                </tr>
                                <tr>
                                    <td>@if(isset($piping_properties['1/2']['front_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="f_position_3_12" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/2']['back_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="b_position_3_12" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/2']['left_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="l_position_3_12" accept="image/*"></td>
                                    <td>@if(isset($piping_properties['1/2']['right_pos_3']))<span class="glyphicon glyphicon-ok pull-right" aria-hidden="true"></span>@endif<input type="file" name="r_position_3_12" accept="image/*"></td>
                                </tr>
                            </tbody>
                        </table>

                        <div class="form-group col-md-12">
                            <!-- <div class="col-md-4 col-md-offset-4"> -->
                                <center>
                                    <button type="submit" class="btn btn-primary edit-material">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Piping
                                    </button>
                                    <!-- <a href="#" class="btn btn-success edit-material">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Update Material
                                    </a> -->
                                    <a href="/administration/materials" class="btn btn-danger" style="margin-right: 15px;">
                                        <span class="glyphicon glyphicon-arrow-left"></span>
                                        Cancel
                                    </a>
                                </center>
                            <!-- </div> -->
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@include('administration.materials.material-piping-polygon-modal')

@include('partials.confirmation-modal', ['attributes' => ['field'], 'yes_class_name' => 'confirm-delete-field'])

@endsection

@section('scripts')
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/fabricjs/customiseControls.js"></script>
<script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/administration/polygon.js"></script>
@endsection