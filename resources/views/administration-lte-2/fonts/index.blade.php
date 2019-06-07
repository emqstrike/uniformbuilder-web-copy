@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">

    <style>
        select {
            text-transform: capitalize;
            -webkit-appearance: menulist !important;
        }

        #filter-container label {
            margin-left: 10px;
        }

        td button {
            display: block !important;
            margin: 5px 0 !important;
            width: 100%;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Fonts')

                    <div class="row">
                        <div class="col-md-4">
                            <h1>
                                Fonts

                                <button class='btn btn-flat btn-xs btn-success'>
                                    <span class="glyphicon glyphicon-plus-sign"></span>
                                    Add New Font
                                </button>
                            </h1>
                        </div>

                        <div class="col-md-8 text-right" style="margin-top: 25px;">
                            <button class="btn btn-flat btn-danger btn-sm" @click="removeMultipleFonts()">Delete selected fonts</button>
                        </div>
                    </div>

                    <div id="filter-container" style="margin-top: 30px;">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-inline">
                                    <label>Sport</label>
                                    <select v-model="selectedSportFilter" class="form-control" @change="filter">
                                        <option value="all">all</option>
                                        <option v-for="sport in sports" :value="sport.name" v-if="sport.name != ''">@{{ sport.name }}</option>
                                    </select>

                                    <label>Brand</label>
                                    <select v-model="selectedBrandFilter" class="form-control" @change="filter">
                                        <option value="all">all</option>
                                        <option v-for="brand in brands" :value="brand">@{{ brand }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box-body">
                    <v-app id="inspire">
                        @include('administration-lte-2.partials.components.loading-dialog')

                        <div>
                            <v-data-table v-model="selected" ref="fontsTable" :headers="headers" :items="fonts" :search="search" select-all hide-actions :pagination.sync="computedPagination" :total-items="totalItems" class="elevation-1">
                                <template v-slot:headers="props">
                                    <tr>
                                        <th>
                                            <v-checkbox :input-value="props.all" :indeterminate="props.indeterminate" primary hide-details @click.stop="toggleAll"></v-checkbox>
                                        </th>

                                        <th v-for="header in props.headers" :key="header.text">
                                            @{{ header.text }}
                                        </th>
                                    </tr>
                                </template>
                                <template slot="items" slot-scope="props">
                                    <tr :active="props.selected" @click="select(props, $event)">
                                        <td>
                                            <v-checkbox :input-value="props.selected" primary hide-details></v-checkbox>
                                        </td>

                                        <td>@{{ props.item.id }}</td>
                                        <td>@{{ props.item.name }}</td>
                                        <td>@{{ getValue(props.item.tail_sweep) }}</td>
                                        <td>@{{ getValue(props.item.script) }}</td>
                                        <td>@{{ getValue(props.item.block_font) }}</td>
                                        <td>@{{ props.item.sports }}</td>
                                        <td>@{{ props.item.block_patterns }}</td>
                                        <td>@{{ props.item.brand }}</td>
                                        <td>@{{ props.item.updated_at }}</td>
                                        <td>
                                            <button class="btn btn-default btn btn-xs btn-flat" :disabled="props.item.active == 0" @click="toggleActiveStatus(props.item)">Disable</button>
                                            <button class="btn btn-primary btn btn-xs btn-flat" :disabled="props.item.active == 1" @click="toggleActiveStatus(props.item)">Enable</button>
                                        </td>

                                        <td>
                                            <button class="btn btn-flat btn-primary btn-xs">Edit</button>
                                            <button class="btn btn-flat btn-default btn-xs" @click="clone(props.item)" :disabled="props.item.active == 0">Clone</button>
                                            <button class="btn btn-flat btn-danger btn-xs" @click="remove(props.item)">Remove</button>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>

                            <div class="text-xs-center pt-2">
                                <v-pagination v-model="pagination.page" :length="paginationPages" :total-visible="10"></v-pagination>
                            </div>
                        </div>
                    </v-app>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/fonts/fonts.js"></script>
@endsection