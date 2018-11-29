@extends('administration-lte-2.lte-main')

@section('styles')

@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h2>
                        <i class="glyphicon glyphicon-blackboard"></i>
                        @if($user)
                        {{ $user->first_name }} {{$user->last_name}} Orders and Saved Designs Page
                        @else
                        User Orders and Saved Designs
                        @endif
                    </h2>
                    <div class="col-md-3">
                        <input type="number" class="form-control user-id" placeholder="Enter User ID: ...">
                    </div>
                    <div class="col-md-2">
                    <a href="#" class="btn btn-success btn-flat active-user" style="width: 100px;">Search</a><hr>
                    </div>
                </div>
                <div class="box-body">
                      <h3>
                        Orders
                    </h3>
                    <table class='data-table-o table table-bordered table-hover display'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Order code</th>
                            <th>Client</th>
                            <th>Order Status</th>
                            <th>FOID</th>
                            <th>Date Submitted</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($user_orders as $order)
                        <tr>
                            <td>
                                {{ $order->id }}
                            </td>
                            <td>
                                {{ $order->order_id }}
                            </td>
                            <td>
                            <div>
                                {{ $order->client }}
                            </div>
                            </td>
                            <td>
                               {{$order->status}}
                            </td>
                            <td>
                                {{ $order->factory_order_id }}
                            </td>
                            <td>
                                {{ $order->created_at }}
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan='8'>
                                No Orders
                            </td>
                        </tr>

                    @endforelse

                    </tbody>
                    </table>
                     <h3>
                        Saved Designs
                    </h3>
                    <table class='data-table-sd table table-bordered display'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Sport</th>
                            <th>Front</th>
                            <th>Back</th>
                            <th>Left</th>
                            <th>Right</th>
                            <th>Date Saved</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse ($user_designs as $design)
                        <tr class='design-{{ $design->id }}'>
                            <td>
                                {{ $design->id }}
                            </td>
                            <td>
                                {{ $design->name }}
                            </td>
                            <td>
                                {{ $design->sport }}
                            </td>
                            <td>
                               <a href="#" class="btn btn-flat btn-defult btn-xs file-link" data-link="{{ $design->front_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                            </td>
                            <td>
                                <a href="#" class="btn btn-flat btn-defult btn-xs file-link" data-link="{{ $design->back_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                            </td>
                            <td>
                                <a href="#" class="btn btn-flat btn-defult btn-xs file-link" data-link="{{ $design->left_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>

                            </td>
                            <td>
                                <a href="#" class="btn btn-flat btn-defult btn-xs file-link" data-link="{{ $design->right_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                            </td>
                            <td>
                                {{ $design->created_at }}
                            </td>
                            <td>
                                <a href="http://customizer.prolook.com/my-saved-design/{{ $design->id }}" class="btn btn-flat btn-primary btn-xs">View in Customizer</a>
                            </td>
                        </tr>

                    @empty
                        <tr>
                            <td colspan='9'>
                                No Designs
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

@include('partials.confirmation-modal')

@endsection

@section('scripts')

<script type="text/javascript">
$(document).ready(function(){

    $(document).on('click', '.file-link', function(e) {
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
    });

    try {
        $('.data-table-o').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": false,
            "pageLength": 15
        });
    } catch (err) {
        console.log(err);
    }

    try {
        $('.data-table-sd').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": false,
            "pageLength": 15
        });
    } catch (err) {
        console.log(err);
    }

    function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }

    $(document).on('click', '.active-user', function() {
        $user = $('.user-id').val();
        if ($user == null || $user == '') {
            $user = 0;
        }
        console.log($user);
        window.location = "/administration/v1-0/user/transactions/"+$user;
    });

});
</script>
@endsection
