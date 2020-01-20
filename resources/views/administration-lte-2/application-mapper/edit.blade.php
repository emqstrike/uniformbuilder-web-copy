@extends('administration-lte-2.lte-main')

@section('styles')
    <style>
        table .form-control {
            width: 75px;
        }

        #copy-to-clipboard-tooltip {
            background: #555555;
            border-radius: 6px;
            display: none;
            color: #ffffff;
            left: 0;
            margin: 0 auto;
            padding: 8px;
            position: absolute;
            right: 0;
            top: -15px;
            width: 150px;
        }

        #copy-to-clipboard-tooltip:after {
            border-color: #555 transparent transparent transparent;
            border-style: solid;
            border-width: 5px;
            bottom: -10px;
            content: "";
            left: 70px;
            position: absolute;
        }

    </style>
@endsection

@section('content')
    <section id="application-container" class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Edit application mapper')
                        <!-- <h1>Edit application mapper</h1> -->
                        <div class="row">
                            <div class="col-md-6">
                                <h1>Edit application mapper</h1>
                            </div>

                            <div class="col-md-6 text-right" style="padding-top: 20px;">
                                <a href="#" class="btn btn-flat btn-default copy-gradient">
                                    Copy
                                </a>

                                <a href="#" class="btn btn-flat btn-default open-load-gradient-modal-button">Load</a>
                            </div>
                        </div>

                    </div>

                    <div class="box-body">
                        <form action="{{ route('v1_update_application_mapper') }}" method="POST">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <input type="hidden" name="id" value="{{ $applicationMapper->id }}">


                            <textarea name="properties" style="display: block;" :value="JSON.stringify(properties)" @change="updateProps"></textarea>

                            <div class="form-inline text-center">
                                <label>3D Block Pattern</label>

                                <select name="master_block_pattern_id" class="form-control">
                                    @foreach ($masterBlockPatterns as $masterBlockPattern)
                                        @if ($masterBlockPattern->id == $applicationMapper->master_block_pattern_id)
                                            <option value="{{ $masterBlockPattern->id}}" selected="selected">
                                        @else
                                            <option value="{{ $masterBlockPattern->id}}">
                                        @endif
                                            {{ $masterBlockPattern->block_pattern_name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="row" style="margin-top: 30px; margin-bottom: 30px;">
                                <div class="col-md-12 text-center">
                                    <button type="button" class="btn btn-flat btn-success" @click="addProperty">Add row</button>
                                </div>
                            </div>

                            <div class="row" style="margin-top: 30px; margin-bottom: 30px;">
                                <div class="col-md-12">
                                    <table class="table data-table table-bordered table-hover display" style="width: 33.33%; margin: 0 auto;">
                                        <thead>
                                            <tr>
                                                <th>QX7 Application Location</th>
                                                <th>Customizer Application Location</th>
                                                <th></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr v-for="(property, index) in properties">
                                                <td>
                                                    <input onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control" v-model="properties[index].qx_7_application_location" type="number">
                                                </td>

                                                <td>
                                                    <input onkeypress="return (event.charCode == 8 || event.charCode == 0 || event.charCode == 13) ? null : event.charCode >= 48 && event.charCode <= 57" class="form-control" v-model="properties[index].customizer_application_location" type="number">
                                                </td>

                                                <td>
                                                    <button type="button" class="btn btn-flat btn-danger btn-sm" @click="removeRow(index)">
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <button type="submit" class="btn btn-flat btn-primary">Update</button>
                                    <a href="{{ route('v1_application_mappers') }}" class="btn btn-flat btn-danger">Cancel</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @include('administration-lte-2.master-pages.materials.modal.copy-app-map-props')
    @include('administration-lte-2.master-pages.materials.modal.load-app-map-props')

@endsection

@section('scripts')
    <script type="text/javascript">
        var properties = {
            qx_7_application_location: null,
            customizer_application_location: null
        };

        @if ($applicationMapper->properties)
            properties = {!! $applicationMapper->properties !!};
        @endif



        new Vue({
            el: '#application-container',
            data: function() {
                return {
                    properties: properties
                }
            },
            methods: {
                addProperty: function() {
                    this.properties.push({
                        qx_7_application_location: null,
                        customizer_application_location: null
                    });
                },
                removeRow: function(index) {
                    if (this.properties.length > 1) {
                        this.properties.splice(index, 1);
                    }
                },
                updateProps: function(e) {
                    this.properties = JSON.parse(e.target.value);
                },
            }
        });
    </script>
    <script>
        $(document).ready(function() {
            $('#copy-data-to-clipboard').click(function() {
                $('#copy-app-map-props-modal textarea').select();
                document.execCommand('copy');

                $('#copy-to-clipboard-tooltip').fadeIn();

                setTimeout(function() {
                    $('#copy-to-clipboard-tooltip').fadeOut();
                }, 500);
            });

            $('.open-load-properties-modal-button').click(function() {
                $('#load-app-map-props-modal').modal('show');
            });
        });
    </script>
@endsection
