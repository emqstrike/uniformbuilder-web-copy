@extends('administration-lte-2.lte-main')

@section('styles')
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">

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

        .thumbnail-container {
            position: relative;
        }

        .thumbnail-container:hover .remove-thumbnail-container {
            visibility: visible;
        }

        .remove-thumbnail-container {
            display: table;
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            visibility: hidden;
            width: 100%;
        }

        .remove-thumbnail {
            display: table-cell;
            text-align: center;
            vertical-align: middle;
        }

        select {
            text-transform: capitalize;
            -webkit-appearance: menulist !important;
        }

        input[type='file'] {
            height: auto !important;
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

                        @include('administration.partials.flash-message')

                        <div class="row">
                            <div class="col-md-6">
                                <h1>Modify Pattern</h1>
                            </div>

                            <div class="col-md-6 text-right" style="padding-top: 20px;">
                                <button class="btn btn-flat btn-default" @click="copyModifyPatternDialog = ! copyModifyPatternDialog">Copy</button>
                                <button class="btn btn-flat btn-default" @click="loadModifyPatternDialog = ! loadModifyPatternDialog">Load</button>
                            </div>
                        </div>

                        <hr>
                    </div>

                    <div class="box-body">
                        <v-app id="inspire">
                            @include('administration-lte-2.master-pages.materials.modal.copy-modify-pattern-modal')
                            @include('administration-lte-2.master-pages.materials.modal.load-modify-pattern-modal')

                            <div class="row">
                                <div class="col-md-1">
                                    <button class="btn btn-flat btn-success" @click.prevent="addPattern()">Add Pattern</button>
                                </div>
                            </div>

                            <form method="POST" class="form-horizontal" action="{{ route('v1_save_modify_pattern', ['id' => $material->id]) }}">
                                {{ csrf_field() }}
                                <input type="hidden" name="id" value="{{ $material->id }}">

                                <textarea name="patterns" style="display:none" :value="JSON.stringify(patternDetails)"></textarea>

                                <table v-for="(patternDetail, patternDetailIndex) in patternDetails" style="margin-top: 30px;" class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th colspan="6">
                                                <h4 style="display: inline;">Pattern Details</h4>

                                                <button class="btn btn-flat btn-sm btn-danger pull-right" @click.prevent="removePatternDetail(patternDetailIndex)">Remove</button>
                                                <button class="btn btn-flat btn-sm btn-danger pull-right" @click.prevent="removeSelectedLayers(patternDetailIndex)">Remove Selected</button>
                                                <button class="btn btn-flat btn-sm btn-primary pull-right" @click.prevent="addLayer(patternDetailIndex)">Add Layer</button>
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

                                                                <div v-else-if="patternDetail.thumbnail" style="border: 1px solid #ccc; height: 50px; width: 50px;" class="thumbnail-container">
                                                                    <div class="remove-thumbnail-container">
                                                                        <div class="remove-thumbnail">
                                                                            <button class="btn btn-xs btn-flat btn-danger" style="margin: 0px;" @click.prevent="patternDetail.thumbnail = null">
                                                                                <span class="glyphicon glyphicon-trash"></span>
                                                                            </button>
                                                                        </div>
                                                                    </div>

                                                                    <img :src="patternDetail.thumbnail" style="height: 50px; width: 50px;">
                                                                </div>
                                                            </div>

                                                            <div class="col-md-6">
                                                                <label>Upload thumbnail</label>
                                                                <input type="file" class="form-control" @change="onFileChange($event, patternDetail)" @click="clear($event)">
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
                                                                <input v-model="patternDetail.isCheckAll" type="checkbox" @click.prevent="toggleCheckbox(patternDetailIndex)">
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

                                                                        <div v-else-if="layer.front" class="thumbnail-container"  style="border: 1px solid #ccc; height: 50px; width: 50px;">
                                                                            <div class="remove-thumbnail-container">
                                                                                <div class="remove-thumbnail">
                                                                                    <button class="btn btn-xs btn-flat btn-danger" style="margin: 0px;" @click.prevent="layer.front = null">
                                                                                        <span class="glyphicon glyphicon-trash"></span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                            <img :src="layer.front" style="height: 50px; width: 50px;">
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-10">
                                                                        <input type="file" class="form-control" @change="onFileChange($event, layer, 'front')" @click="clear($event)">
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div class="row">
                                                                    <div class="col-md-2">
                                                                        <div v-if="layer.back == null" style="border: 1px solid #ccc; height: 50px; width: 50px;"></div>
                                                                        
                                                                        <div v-else-if="layer.back" class="thumbnail-container"  style="border: 1px solid #ccc; height: 50px; width: 50px;">
                                                                            <div class="remove-thumbnail-container">
                                                                                <div class="remove-thumbnail">
                                                                                    <button class="btn btn-xs btn-flat btn-danger" style="margin: 0px;" @click.prevent="layer.back = null">
                                                                                        <span class="glyphicon glyphicon-trash"></span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                            <img :src="layer.back" style="height: 50px; width: 50px;">
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-10">
                                                                        <input type="file" class="form-control" @change="onFileChange($event, layer, 'back')" @click="clear($event)">
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div class="row">
                                                                    <div class="col-md-2">
                                                                        <div v-if="layer.left == null" style="border: 1px solid #ccc; height: 50px; width: 50px;"></div>
                                                                        
                                                                        <div v-else-if="layer.left" class="thumbnail-container"  style="border: 1px solid #ccc; height: 50px; width: 50px;">
                                                                            <div class="remove-thumbnail-container">
                                                                                <div class="remove-thumbnail">
                                                                                    <button class="btn btn-xs btn-flat btn-danger" style="margin: 0px;" @click.prevent="layer.left = null">
                                                                                        <span class="glyphicon glyphicon-trash"></span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                            <img :src="layer.left" style="height: 50px; width: 50px;">
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-10">
                                                                        <input type="file" class="form-control" @change="onFileChange($event, layer, 'left')" @click="clear($event)">
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div class="row">
                                                                    <div class="col-md-2">
                                                                        <div v-if="layer.right == null" style="border: 1px solid #ccc; height: 50px; width: 50px;"></div>
                                                                        
                                                                        <div v-else-if="layer.right" class="thumbnail-container"  style="border: 1px solid #ccc; height: 50px; width: 50px;">
                                                                            <div class="remove-thumbnail-container">
                                                                                <div class="remove-thumbnail">
                                                                                    <button class="btn btn-xs btn-flat btn-danger" style="margin: 0px;" @click.prevent="layer.right = null">
                                                                                        <span class="glyphicon glyphicon-trash"></span>
                                                                                    </button>
                                                                                </div>
                                                                            </div>

                                                                            <img :src="layer.right" style="height: 50px; width: 50px;">
                                                                        </div>
                                                                    </div>

                                                                    <div class="col-md-10">
                                                                        <input type="file" class="form-control" @change="onFileChange($event, layer, 'right')" @click="clear($event)">
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

                                <div class="row">
                                    <div class="col-md-12 text-center">
                                        <button type="submit" class="btn btn-flat btn-primary">Update Pattern</button>
                                        <a href="{{ route('v1_materials_index') }}" class="btn btn-flat btn-danger" style="margin-right: 15px;">
                                            Cancel
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </v-app>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script>
        var patternDetailsData = [];

        @if ($material->patterns)
            patternDetailsData = {!! $material->patterns !!};
        @endif
    </script>

    <script src="/js/administration-lte-2/materials/modify-pattern.js"></script>
@endsection