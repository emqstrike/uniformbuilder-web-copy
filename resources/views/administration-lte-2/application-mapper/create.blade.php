@extends('administration-lte-2.lte-main')

@section('styles')
    <style>
        table .form-control {
            width: 75px;
        }
    </style>
@endsection

@section('content')
    <section id="application-container" class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header text-center">
                        @section('page-title', 'Add new application mapper')
                        <h1>Add new application mapper</h1>
                    </div>

                    <div class="box-body">
                        <form action="{{ route('v1_store_application_mapper') }}" method="POST">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">

                            <textarea name="properties" style="display: none;" :value="JSON.stringify(properties)"></textarea>

                            <div class="form-inline text-center">
                                <label>3D Block Pattern</label>

                                <select name="master_block_pattern_id" class="form-control">
                                    @foreach ($masterBlockPatterns as $masterBlockPattern)
                                        <option value="{{ $masterBlockPattern->id}}">
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
                                    <button type="submit" class="btn btn-flat btn-primary">Submit</button>
                                    <a href="{{ route('v1_application_mappers') }}" class="btn btn-flat btn-danger">Cancel</a>
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
        new Vue({
            el: '#application-container',
            data: function() {
                return {
                    properties: [
                        {
                            qx_7_application_location: null,
                            customizer_application_location: null
                        }
                    ]
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
                }
            }
        });
    </script>
@endsection