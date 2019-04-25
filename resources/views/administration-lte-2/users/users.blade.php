@extends('administration-lte-2.lte-main')

@section('slidein-panel')
    @include('administration-lte-2.users.users-modal')
@endsection

@section('panel-overlay')
    <div v-show="isPanelVisible" class="panel-overlay"></div>
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
                            <button class="btn btn-success btn-sm btn-flat">Add</button>
                        </h1>
                    </div>

                    <div class="box-body">
                        <table class='data-table table table-bordered table-hover users-table display' cellspacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th id="select-filter">Account Type</th>
                                    <th class="select-filter">Role</th>
                                    <th>Email</th>
                                    <th id="select-filter">Rep Name</th>
                                    <th>Last Login</th>
                                    <th>Active Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="user, index in users" :key="user.id">
                                    <td>@{{ user.id }}</td>
                                    <td>@{{ user.first_name }} @{{ user.last_name }}</td>
                                    <td>@{{ user.type }}</td>
                                    <td>@{{ user.role }}</td>
                                    <td>@{{ user.email }}</td>
                                    <td>@{{ user.rep_first_name }} @{{ user.rep_last_name }}</td>
                                    <td>@{{ user.last_login }}</td>
                                    <td>
                                        <button class="btn btn-default btn-xs btn-flat" :disabled="user.active == 0" @click="toggle(index)">Disable</button>
                                        <button class="btn btn-primary btn-xs btn-flat" :disabled="user.active == 1" @click="toggle(index)">Enable</button>
                                    </td>
                                    <td>
                                        <button class="btn btn-primary btn-xs btn-flat" @click="edit(index)">Edit</button>
                                        <button class="btn btn-success btn-xs btn-flat" :disabled="(! user.role) || (! user.active)">Edit Allowed Pages</button>
                                        <a :href="'/administration/v1-0/user/transactions/' + user.id" class="btn btn-primary btn-xs btn-flat" target="_blank">View Transactions</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    @include('administration-lte-2.users.allowed-pages-modal')
    @include('partials.confirmation-modal')
@endsection

@section('scripts')
    <script>
        var users = {!! $users !!};
    </script>

    <script src="https://unpkg.com/vue@2.1.3/dist/vue.js"></script>

    @include('administration-lte-2.partials.users.allowed-pages-scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-pattern-filters/slideout.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/users/users-vue.js"></script>
@endsection
