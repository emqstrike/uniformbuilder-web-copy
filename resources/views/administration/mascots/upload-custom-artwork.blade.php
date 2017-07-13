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
                    <div class="panel-heading">Add New Team Store Mascot [Custom Artwork]</div>

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

                        <form action="/administration/artwork/add" class="form-horizontal" role="form" method="POST" enctype="multipart/form-data" id="create-mascot-form">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="layers_properties" id="layers-properties">
                            <input type="hidden" name="artwork_request_id" value="{{ $customArtworkRequest->id }}">
                            <input type="hidden" name="artwork_index" value="{{ $customArtworkIndex }}">
                            <input type="hidden" name="custom_artwork_request" value="1">

                            <div>Mascot Color(s):</div>
                            <table class="table table-bordered table-striped">
                                @foreach ($mascotColors as $color)
                                    <tr style="width: 100px;">
                                        <td style="width: 30px; height: 30px; background-color: #{{ $color->hex_code }};"></td>
                                        <td>{{ $color->name }}</td>
                                    </tr>
                                @endforeach
                            </table>

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
                                    @foreach ($mascotCategories as $mascotCategory)
                                        <option value='{{ $mascotCategory }}'>{{ $mascotCategory }}</option>
                                    @endforeach
                                    </select>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-4 control-label">Layers
                                <div>
                                    <a class="btn btn-primary clone-row btn-xs"><i class="fa fa-plus"></i> Add Layer</a>
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
                                                    <a class="btn btn-danger btn-xs btn-remove-layer"><i class="fa fa-remove"></i> Remove</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary create-mascot">
                                        <span class="glyphicon glyphicon-floppy-disk"></span>
                                        Add New Mascot
                                    </button>
                                    <a href="/administration/artwork_requests/processing" class="btn btn-danger">
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