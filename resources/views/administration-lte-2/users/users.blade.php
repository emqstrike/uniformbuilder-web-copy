@extends('administration-lte-2.lte-main')

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
                                @include('administration-lte-2.users.components.loading-dialog')
                                @include('administration-lte-2.users.components.allowed-pages-dialog')

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
                                                    <button class="btn btn-primary btn-xs btn-flat" @click="edit(props.item)" :disabled="((props.item.deleted_at != null) || (props.item.active == 0))">Edit</button>
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
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-pattern-filters/slideout.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/users/users-vue.js"></script>
@endsection
