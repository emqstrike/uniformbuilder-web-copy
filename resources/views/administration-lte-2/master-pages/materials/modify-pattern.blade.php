@extends('administration-lte-2.lte-main')

@section('styles')
    <style>
        table .btn {
            margin-left: 5px;
        }

        span.color {
            display: inline-block;
            height: 25px;
            vertical-align: middle;
            width: 25px;
        }

        select.color-dropdown, .color-dropdown option {
            color: #ffffff !important;
            text-shadow: 0px 1px #000000 !important;
            -webkit-text-shadow: 0px 1px #000000 !important;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Modify Pattern')

                        <div class="row">
                            <div class="col-md-6">
                                <h1>Modify Pattern</h1>
                            </div>

                            <div class="col-md-6 text-right" style="padding-top: 20px;">
                                <button class="btn btn-flat btn-default">Copy</button>
                                <button class="btn btn-flat btn-default">Load</button>
                            </div>
                        </div>

                        <hr>
                    </div>

                    <div class="box-body">
                        <button class="btn btn-flat btn-success" @click="addPattern()">Add Pattern</button>

                        <table v-for="(patternDetail, patternDetailIndex) in patternDetails" style="margin-top: 30px;" class="table table-bordered">
                            <thead>
                                <tr>
                                    <th colspan="6">
                                        <h4 style="display: inline;">Pattern Details</h4>

                                        <button class="btn btn-flat btn-sm btn-danger pull-right" @click="removePatternDetail(patternDetailIndex)">Remove</button>
                                        <button class="btn btn-flat btn-sm btn-danger pull-right" @click="removeSelectedLayers(patternDetailIndex)">Remove Selected</button>
                                        <button class="btn btn-flat btn-sm btn-primary pull-right" @click="addLayer(patternDetailIndex)">Add Layer</button>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td colspan="6">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="row">
                                                    <div class="col-md-1">
                                                        <div v-if="patternDetail.thumbnail == null" style="border: 1px solid #ccc; height: 50px; width: 50px;"></div>
                                                        <img v-else-if="! patternDetail.thumbnail" :src="patternDetail.thumbnail" style="border: 1px solid #ccc; height: 50px; width: 50px;">
                                                    </div>

                                                    <div class="col-md-6">
                                                        <label>Upload thumbnail</label>
                                                        <input type="file" class="form-control">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6">
                                                <label>Pattern Name</label>
                                                <select v-model="patternDetail.pattern_id" class="form-control" style="width: auto">
                                                    <option value="0">None</option>

                                                    <option v-for="pattern in patterns" :value="pattern.id">
                                                        @{{ pattern.name }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colspan="6">
                                        <table class="table table-striped table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        <input v-model="patternDetail.isCheckAll" type="checkbox" @click="toggleCheckbox(patternDetailIndex)">
                                                    </th>
                                                    <th>Layer Property</th>
                                                    <th>Team Color ID</th>
                                                    <th>Front</th>
                                                    <th>Back</th>
                                                    <th>Left</th>
                                                    <th>Right</th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr v-for="(layer, layerIndex) in patternDetail.layers">
                                                    <td>
                                                        <input v-model="patternDetail.selectedLayers" type="checkbox" @change="selectLayer(patternDetailIndex)" :value="layerIndex">
                                                    </td>
                                                    <td>
                                                        <label>Layer Color @{{ layerIndex + 1 }}</label>

                                                        <select v-model="layer.layer_color_id" class="form-control color-dropdown" :style="'background: #' + backgroundColor(layer.layer_color_id)">
                                                            <option value="0" style='background: #ffffff;'>None</option>

                                                            <option v-for="color in colors" :style="'background: #' + color.hex_code" :value="color.id">
                                                                @{{ color.name }}
                                                            </option>
                                                        </select>
                                                    </td>

                                                    <td>
                                                        <label>&nbsp;</label>
                                                       <input type="number" v-model="layer.team_color_id" class="form-control">
                                                    </td>

                                                    <td>
                                                        <div class="row">
                                                            <div class="col-md-2">
                                                                <div v-if="layer.front == null" style="border: 1px solid #ccc; height: 50px; width: 50px;"></div>
                                                                <img v-else-if="! layer.front" :src="layer.front" style="border: 1px solid #ccc; height: 50px; width: 50px;">
                                                            </div>

                                                            <div class="col-md-10">
                                                                <input type="file" class="form-control">
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div class="row">
                                                            <div class="col-md-2">
                                                                <div v-if="layer.back == null" style="border: 1px solid #ccc; height: 50px; width: 50px;"></div>
                                                                <img v-else-if="! layer.back" :src="layer.back" style="border: 1px solid #ccc; height: 50px; width: 50px;">
                                                            </div>

                                                            <div class="col-md-10">
                                                                <input type="file" class="form-control">
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div class="row">
                                                            <div class="col-md-2">
                                                                <div v-if="layer.left == null" style="border: 1px solid #ccc; height: 50px; width: 50px;"></div>
                                                                <img v-else-if="! layer.left" :src="layer.left" style="border: 1px solid #ccc; height: 50px; width: 50px;">
                                                            </div>

                                                            <div class="col-md-10">
                                                                <input type="file" class="form-control">
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td>
                                                        <div class="row">
                                                            <div class="col-md-2">
                                                                <div v-if="layer.right == null" style="border: 1px solid #ccc; height: 50px; width: 50px;"></div>
                                                                <img v-else-if="! layer.right" :src="layer.right" style="border: 1px solid #ccc; height: 50px; width: 50px;">
                                                            </div>

                                                            <div class="col-md-10">
                                                                <input type="file" class="form-control">
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script src="/js/administration-lte-2/materials/modify-pattern.js"></script>
@endsection