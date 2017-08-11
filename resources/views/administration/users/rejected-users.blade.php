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
                    <h3>
                        <span class="glyphicon glyphicon-user"></span>
                        Rejected Users
                    </h3>
                </div>
                <div class="box-body">
                    <table class='data-table table table-bordered table-hover users-table display' cellspacing="0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Date registered</th>
                                <th>Email</th>                              
                            </tr>
                        </thead>

                        <tbody>
                        @forelse ($users as $user)

                            <tr class='user-{{ $user->id }}'>
                                <td>
                                    {{ $user->id }}
                                </td>
                                <td>
                                    {{ $user->first_name }} {{ $user->last_name }}
                                </td>
                                <td>
                                    {{ $user->created_at }}
                                </td>
                                <td>
                                    <span class="label label-danger">{{ $user->email }}</span>
                                </td>
                             
                            </tr>

                        @empty

                            <tr>
                                <td colspan='4'>
                                    No Users
                                </td>
                            </tr>

                        @endforelse
                        </tbody>
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
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    $('.data-table').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false
    });
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
