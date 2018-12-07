@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Add new mascot [Custom artwork request]')

                    <div class="col-md-12">
                        <h1>Add new mascot [Custom artwork request]</h1>
                    </div>
                </div>

                <div class="box-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ route('v1_store_logo_request') }}" enctype="multipart/form-data" id='create-mascot-form'>
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="hidden" name="layers_properties" id="layers-properties">
                        <input type="hidden" name="logo_request_id" value="{{ $logo_request_id }}">
                        <input type="hidden" name="logo_index" value="{{ $logo_index }}">
                        <input type="hidden" name="logo_request_user_id" value="{{ $logo_request_user_id }}">

                        <a href="{{ route('v1_add_existing_logo', ['logo_request_id' => $logo_request_id, 'logo_index' => $logo_index, 'logo_request_user_id' => $logo_request_user_id]) }}" class="btn btn-flat btn-primary">
                            Choose existing mascot
                        </a>
                        
                        <h3>Upload mascot details:</h3>
                        
                        <div class="form-group">
                            <label class="col-md-4 control-label">Mascot Name</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-name" name="name" value="{{ old('name') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Code</label>
                            <div class="col-md-6">
                                <input type="name" class="form-control mascot-code" name="code" value="{{ old('code') }}">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Icon</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control icon" name="icon" accept="image/*">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">File</label>
                            <div class="col-md-6 front-view">
                                <input type="file" class="form-control ai-file" name="ai_file" accept=".ai,.pdf">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Category</label>
                            <div class="col-md-6">
                                <select name='category' class="form-control mascot-category">
                                @foreach ($mascots_categories as $mascot_category)
                                    <option value='{{ $mascot_category }}'>{{ $mascot_category }}</option>
                                @endforeach
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label" >Brand</label>
                           <div class="col-md-6">
                                <select name="brand" class="form-control" required="true">
                                        <option value="none">None</option>
                                        <option value="prolook">Prolook</option>
                                        <option value="richardson">Richardson</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Layers
                            <div>
                                <a class="btn btn-flat btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Layer</a>
                            </div>
                            </label>
                            <div class="col-md-8">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Layer</th>
                                            <th>Team Color ID</th>
                                            <th>File</th>
                                            <th>Default Color</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="layers-row-container">
                                        <tr class="layers-row">
                                            <td>
                                                <select class="ma-layer layer1"  name="ma_layer[]" disabled>
                                                    <option value = '1' class="layer-number">1</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select class="ma-team-color-id layer1" name="ma_team_color_id[]">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="file" class="ma-options-src layer1" name="ma_image[]">
                                            </td>
                                            <td>
                                                <select class="form-control ma-default-color layer1" name="default_color[]" style="background-color: #000; color: #fff;text-shadow: 1px 1px #000;">
                                                    @foreach ($colors as $color)
                                                        @if ($color->active)
                                                            <option data-color="#{{ $color->hex_code }}" style="background-color: #{{ $color->hex_code }}; text-shadow: 1px 1px #000;" value="{{ $color->color_code }}">
                                                                {{ $color->name }}
                                                            </option>
                                                        @endif
                                                    @endforeach

                                                    <option data-color="" value="" id="saved-default-color"></option>
                                                </select>
                                            </td>
                                            <td>
                                                <a class="btn btn-flat btn-danger btn-xs btn-remove-layer"><i class="fa fa-remove"></i> Remove</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-flat btn-primary create-mascot">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Add New Mascot
                                </button>

                                <a href="{{ route('v1_logo_requests') }}" class="btn btn-flat btn-danger">
                                    <span class="glyphicon glyphicon-arrow-left"></span>
                                    Cancel
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
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