@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Fonts')
                    <h1>
                        Fonts

                        <button class='btn btn-flat btn-xs btn-success'>
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add New Font
                        </button>
                    </h1>
                </div>

                <div class="box-body">
                    <v-app id="inspire">
                        @include('administration-lte-2.partials.components.loading-dialog')

                        <div>
                            <v-data-table ref="fontsTable" :headers="headers" :items="fonts" :search="search" hide-actions :pagination.sync="computedPagination" :total-items="totalItems" class="elevation-1">
                                <template slot="items" slot-scope="props">
                                    <td>@{{ props.item.id }}</td>
                                    <td>@{{ props.item.name }}</td>
                                    <td>@{{ getValue(props.item.tail_sweep) }}</td>
                                    <td>@{{ getValue(props.item.script) }}</td>
                                    <td>@{{ getValue(props.item.block_font) }}</td>
                                    <td>@{{ getValue(props.item.sports) }}</td>
                                    <td>@{{ getValue(props.item.block_patterns) }}</td>
                                    <td>@{{ props.item.brand }}</td>
                                    <td>@{{ props.item.updated_at }}</td>
                                    <td>
                                        <button class="btn btn-default btn btn-xs btn-flat" :disabled="props.item.active == 0">Disable</button>
                                        <button class="btn btn-primary btn btn-xs btn-flat" :disabled="props.item.active == 1">Enable</button>
                                    </td>

                                    <td>
                                        <button class="btn btn-flat btn-primary btn-xs">Edit</button>
                                        <button class="btn btn-flat btn-default btn-xs">Clone</button>
                                        <button class="btn btn-flat btn-danger btn-xs">Remove</button>
                                    </td>
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