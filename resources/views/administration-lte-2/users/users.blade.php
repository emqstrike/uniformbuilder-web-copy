@extends('administration-lte-2.lte-main')

@section('slidein-panel')
    @include('administration-lte-2.users.users-modal')
@endsection

@section('panel-overlay')
    <div v-show="dialog" class="panel-overlay"></div>
@endsection

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
    <link rel="stylesheet" href="/css/administration-lte-2/users.css">
@endsection

@section('content')
    <section class='content'>
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Users')
                        <h1>
                            <span class="glyphicon glyphicon-user"></span>Users
                            <button class="btn btn-success btn-sm btn-flat" @click="add()">Add</button>
                        </h1>
                    </div>

                    <div class="box-body">
                        <div id="app">
                            <v-app id="inspire">
                                <div class="text-xs-center">
                                    <v-dialog v-model="dialog" hide-overlay persistent width="300">
                                        <v-card color="primary" dark>
                                            <v-card-text>
                                                Please stand by
                                                <v-progress-linear indeterminate color="white"  class="mb-0"></v-progress-linear>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </div>

                                <div>
                                    <v-data-table ref="userTable" :headers="headers" :items="users" :search="search" hide-actions :pagination.sync="computedPagination" :total-items="totalItems" class="elevation-1">
                                        <template slot="items" slot-scope="props">
                                            <td>@{{ props.item.id }}</td>
                                            <td>@{{ props.item.first_name }} @{{ props.item.last_name }}</td>
                                            <td>@{{ props.item.type }}</td>
                                            <td>@{{ props.item.role }}</td>
                                            <td>@{{ props.item.email }}</td>
                                            <td>@{{ props.item.rep_first_name }} @{{ props.item.rep_last_name }}</td>
                                            <td>@{{ props.item.last_login }}</td>
                                            <td>
                                                <button class="btn btn-default btn-xs btn-flat" :disabled="props.item.active == 0" @click=toggleActiveStatus(props.item)>Disable</button>
                                                <button class="btn btn-primary btn-xs btn-flat" :disabled="props.item.active == 1" @click=toggleActiveStatus(props.item)>Enable</button>
                                            </td>
                                            <td>
                                                <div class="btn-container">
                                                    <button class="btn btn-primary btn-xs btn-flat" @click="edit(props.item)">Edit</button>
                                                    <button class="btn btn-success btn-xs btn-flat" :disabled="(! props.item.role) || (! props.item.active)">Edit Allowed Pages</button>
                                                    <a :href="'/administration/v1-0/user/transactions/' + props.item.id" class="btn btn-primary btn-xs btn-flat" target="_blank">View Transactions</a>
                                                </div>
                                            </td>
                                        </template>
                                    </v-data-table>

                                    <div class="text-xs-center pt-2">
                                        <v-pagination v-model="pagination.page" :length="pages" :total-visible="15"></v-pagination>
                                    </div>
                                </div>
                            </v-app>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @include('administration-lte-2.users.allowed-pages-modal')
    @include('partials.confirmation-modal')
@endsection

@section('scripts')
    <script src="https://unpkg.com/vue@2.5.18/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.js"></script>
    @include('administration-lte-2.partials.users.allowed-pages-scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-pattern-filters/slideout.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/users/users-vue.js"></script>
@endsection
