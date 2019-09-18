@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/administration-lte-2/materials.css">

    <style>
        .material-option {
            border-radius: 3px;
            margin-bottom: 15px;
        }

        .form-control {
            width: 48% !important;
        }

        .select2-container .select2-selection--single {
            height: auto !important;
        }

        .select2-container {
            width: 50% !important;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        <h1>Edit Rule Part Names</h1>
                        @section('page-title', 'Edit Rule Part Names')
                    </div>

                    <div class="box-body">
                        @if (Session::has('message'))
                            <div class="alert alert-success" role="alert">
                                {{ Session::get('message') }}
                            </div>
                        @endif

                        <div id="rule-part-names-container">
                            @foreach ($bodyPartColorGroups as $bodyPartColorGroup)
                                <div class="form-group">
                                    <div>
                                        <label>{{ $bodyPartColorGroup['Body Part Group'] }}</label>
                                    </div>

                                    <select class="select2" multiple="multiple" disabled="disabled">
                                        @foreach ($bodyPartColorGroup['Body Parts'] as $bodyPart)
                                            <option value="{{ $bodyPart}}" selected="selected">
                                                {{ $bodyPart }}
                                            </option>
                                        @endforeach
                                    </select>
                                </div>
                            @endforeach
                        </div>

                        <form action="{{ route('v1_qx7_update_rule_part_names') }}" method="POST">
                            {{ csrf_field() }}

                            <input type="hidden" name="style_id" value="{{ $style->id }}">

                            <table class="col-md-12">
                                <thead>
                                    <th>
                                        <h3>Front</h3>
                                    </th>

                                    <th>
                                        <h3>Back</h3>
                                    </th>

                                    <th>
                                        <h3>Left</h3>
                                    </th>

                                    <th>
                                        <h3>Right</h3>
                                    </th>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            @foreach ($frontPerspectiveOptions as $option)
                                                <div class="material-option form-inline">
                                                    <input disabled type="text" class="form-control" value="{{ $option->name }}">
                                                    <input type="hidden" name="material_option_id[]" value="{{ $option->id }}">

                                                    <select class="form-control select2" name="rule_part_name[]">
                                                        <option value="">None</option>
                                                        @foreach ($bodyParts as $bodyPart)
                                                            <option value="{{ $bodyPart }}" @if ($option->rule_part_name == $bodyPart) selected="selected" @endif>
                                                                {{ $bodyPart }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            @endforeach
                                        </td>

                                        <td>
                                            @foreach ($backPerspectiveOptions as $option)
                                                <div class="material-option form-inline">
                                                    <input disabled type="text" class="form-control" value="{{ $option->name }}">
                                                    <input type="hidden" name="material_option_id[]" value="{{ $option->id }}">

                                                    <select class="form-control select2" name="rule_part_name[]">
                                                        <option value="">None</option>
                                                        @foreach ($bodyParts as $bodyPart)
                                                            <option value="{{ $bodyPart }}" @if ($option->rule_part_name == $bodyPart) selected="selected" @endif>
                                                                {{ $bodyPart }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            @endforeach
                                        </td>

                                        <td>
                                            @foreach ($leftPerspectiveOptions as $option)
                                                <div class="material-option form-inline">
                                                    <input disabled type="text" class="form-control" value="{{ $option->name }}">
                                                    <input type="hidden" name="material_option_id[]" value="{{ $option->id }}">

                                                    <select class="form-control select2" name="rule_part_name[]">
                                                        <option value="">None</option>
                                                        @foreach ($bodyParts as $bodyPart)
                                                            <option value="{{ $bodyPart }}" @if ($option->rule_part_name == $bodyPart) selected="selected" @endif>
                                                                {{ $bodyPart }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            @endforeach
                                        </td>

                                        <td>
                                            @foreach ($rightPerspectiveOptions as $option)
                                                <div class="material-option form-inline">
                                                    <input disabled type="text" class="form-control" value="{{ $option->name }}">
                                                    <input type="hidden" name="material_option_id[]" value="{{ $option->id }}">

                                                    <select class="form-control select2" name="rule_part_name[]">
                                                        <option value="">None</option>
                                                        @foreach ($bodyParts as $bodyPart)
                                                            <option value="{{ $bodyPart }}" @if ($option->rule_part_name == $bodyPart) selected="selected" @endif>
                                                                {{ $bodyPart }}
                                                            </option>
                                                        @endforeach
                                                    </select>
                                                </div>
                                            @endforeach
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <button style="margin-top: 30px;" type="submit" class="btn btn-flat btn-primary">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            $('.select2').select2();
        });
    </script>
@endsection