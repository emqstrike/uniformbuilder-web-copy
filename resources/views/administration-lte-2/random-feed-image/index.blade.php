@extends('administration-lte-2.lte-main')

@section('styles')
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">

    <style>
        input[type='file'] {
            height: auto !important;
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
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Random Feed Image')

                        <h1>Random Feed Image</h1>

                        <button class='btn btn-flat btn-sm btn-success' @click="add()">
                            Add
                        </button>
                    </div>

                    <div class="box-body">
                        <v-app id="inspire">
                            @include('administration-lte-2.partials.components.loading-dialog')

                            <div>
                                @include('administration-lte-2.random-feed-image.modal.random-feed-image-modal')

                                <v-data-table :headers="headers" :items="randomFeedImages" hide-actions :pagination.sync="computedPagination" :total-items="totalItems" class="elevation-1">
                                    <template slot="items" slot-scope="props">
                                        <td>@{{ props.item.id }}</td>
                                        <td>@{{ props.item.sport }}</td>
                                        <td>@{{ props.item.block_pattern }}</td>
                                        <td>@{{ props.item.block_pattern_option }}</td>
                                        <td>
                                            <a :href="props.item.thumbnail" target="_blank">
                                                <span class="fa fa-image"></span>
                                            </a>
                                        </td>
                                        <td>@{{ props.item.set }}</td>
                                        <td>@{{ props.item.alias }}</td>
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
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration-lte-2/random-feed-images/random-feed-images.js"></script>
@endsection