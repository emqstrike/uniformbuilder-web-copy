@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">

    <style type="text/css">
        div#box_body {
            overflow-y: scroll;
            max-height: 500px;
        }

        .row {
            margin-bottom: 15px;
        }
    </style>
@endsection

@section('content')
    <input type="hidden" name="_token" value="{{ csrf_token() }}" id="x-csrf-token">
    
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Pages')

                        <div class="row">
                            <div class="col-md-4">
                                <h1>Pages</h1>

                                <button class='btn btn-flat btn-xs btn-success' @click="createPage()">
                                    <span class="glyphicon glyphicon-plus-sign"></span>
                                    Add a page
                                </button>
                            </div>

                            <div id="filter-container" class="col-md-8 text-right" style="margin-top: 20px;">
                                <div class="form-inline">
                                    <label>Search page by:</label>

                                    <select v-model="searchPageFilter" class="form-control">
                                        <option value="name">Name</option>
                                        <option value="code">Code</option>
                                        <option value="id">ID</option>
                                    </select>

                                    <input type="text" class="form-control" v-model="search" v-on:keyup.enter="searchPage()">

                                    <button class="btn btn-flat btn-primary" @click="searchPage()">Search</button>
                                    <button class="btn btn-flat btn-default" @click="clearSearchPages()">Clear</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="box-body">
                        <v-app id="inspire">
                            @include('administration-lte-2.partials.components.loading-dialog')

                            <div>
                                @include('administration-lte-2.pages.modal.page-modal')

                                <v-data-table ref="pageTable" :headers="headers" :items="pages" hide-actions :pagination.sync="computedPagination" :total-items="totalItems" class="elevation-1">
                                    <template slot="items" slot-scope="props">
                                        <td>@{{ props.item.id }}</td>
                                        <td>@{{ props.item.code }}</td>
                                        <td>@{{ props.item.page_name }}</td>
                                        <td>@{{ props.item.brand }}</td>
                                        <td>
                                            <button class="btn btn-flat btn-primary btn-xs" @click="edit(props.item)">
                                                <i class="glyphicon glyphicon-edit"></i>
                                                Edit
                                            </button>

                                            <button class="btn btn-flat btn-danger btn-xs" @click="remove(props)">
                                                <i class="glyphicon glyphicon-trash"></i>
                                                Remove
                                            </button>

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
        </div>
    </section>

    @include('administration-lte-2.pages.modal.add-edit')
@endsection

@section('scripts')
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/pages/page.js"></script>
@endsection