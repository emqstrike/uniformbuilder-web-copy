@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
@endsection

@section('content')

<section class='content'>
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="glyphicon glyphicon-user"></span>
                        Users
                        <small>
                            <a href="/administration/user/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New User
                            </a>
                        </small>
                    </h1>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-hover users-table display' cellspacing="0">
                        <thead>
                            <input type="hidden" id="users-data" value="{{ $users_string }}">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Account Type</th>
                                <th>Date registered</th>
                                <th>Email</th>
                                <th id="select-filter">Rep Name</th>
                                <th id="select-filter">Dealership</th>
                                <th>Last Login</th>
                                <th>Active Status</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                        @forelse ($users as $user)

                            <tr class='user-{{ $user->id }} {{ (!$user->active) ? ' inactive' : '' }}'>
                                <td>
                                    {{ $user->id }}
                                </td>
                                <td>
                                    {{ $user->first_name }} {{ $user->last_name }}
                                </td>
                                <td>
                                    {{ ucfirst($user->type) }}
                                    {{-- <span class="label label-{{ ($user->type == 'administrator') ? 'danger' : 'info' }}">{{ ucfirst($user->type) }}</span> --}}
                                </td>
                                <td>
                                    {{ $user->created_at }}
                                </td>
                                <td>
                                    {{ $user->email }}
                                    {{-- <span class="label label-primary">{{ $user->email }}</span> --}}
                                </td>
                                <td>
                                    {{ $user->rep_first_name }} {{ $user->rep_last_name }} 
                                </td>
                                 <td>
                                    {{ $user->rep_dealer }} 
                                </td>
                                <td>
                                    {{ $user->last_login }}
                                </td>
                                <td>
                                    <a href="#" class="btn btn-default btn-xs disable-user" data-user-id="{{ $user->id }}" role="button" {{ ($user->active) ? : 'disabled="disabled"' }}>
                                        <i class="glyphicon glyphicon-eye-close"></i>
                                        Disable
                                    </a>
                                    <a href="#" class="btn btn-info btn-xs enable-user" data-user-id="{{ $user->id }}" role="button" {{ ($user->active) ? 'disabled="disabled"' : '' }}>
                                        <i class="glyphicon glyphicon-eye-open"></i>
                                        Enable
                                    </a>
                                </td>
                                <td>
                                    <a href="/administration/user/edit/{{ $user->id }}" class="btn btn-primary btn-xs edit-user" data-user-id="{{ $user->id }}" role="button">
                                        <i class="glyphicon glyphicon-edit"></i>
                                        Edit
                                    </a>
                                    @if (1 == 0)
                                        @if ($user->email != Session::get('email'))
                                        <a href="#" class="btn btn-danger pull-right btn-xs delete-user" data-user-id="{{ $user->id }}" role="button">
                                            <i class="glyphicon glyphicon-trash"></i>
                                            Remove
                                        </a>
                                        @else
                                        <a href="#" class="btn btn-warning pull-right btn-xs" role="button">
                                            <i class="fa fa-diamond"></i>
                                            This is YOU
                                        </a>
                                        @endif
                                    @endif
                                </td>
                            </tr>

                        @empty

                            <tr>
                                <td colspan='10'>
                                    No Users
                                </td>
                            </tr>

                        @endforelse
                        </tbody>
                          <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>                             
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>                                
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
</div>

@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/js/administration/users.js"></script>
<script type="text/javascript">
$(document).ready(function(){

@if (Session::has('message'))
    new PNotify({
        title: 'Success',
        text: "{{ Session::get('message') }}",
        type: 'success',
        hide: true
    });
@endif
});
</script>

@endsection
