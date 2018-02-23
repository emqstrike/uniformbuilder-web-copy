@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>

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
                        {{ $user->first_name }} {{$user->last_name}} Orders and Saved Designs
                        @else
                        User Orders and Saved Designs
                        @endif
                    </h2>
                    <div class="col-md-2">
                        <input type="number" name="user_id" class="form-control user-id">
                    </div>
                    <div class="col-md-2">
                    <a href="#" class="btn btn-default active-user" style="width: 100px;">Search</a><hr>
                    </div>
                </div>
                <div class="box-body">
                      <h3>
                        Orders
                    </h3>
                    <table class='table table-bordered table-striped table-hover'>
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
                    <table class='data-table table table-bordered table-striped'>
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
                               <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $design->front_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                {{-- <img src="{{ $design->front_thumbnail }}" height="100px" width="80px"> --}}

                            </td>
                            <td>
                                <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $design->back_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                {{-- <img src="{{ $design->back_thumbnail }}" height="100px" width="80px"> --}}

                            </td>
                            <td>
                                <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $design->left_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                {{-- <img src="{{ $design->left_thumbnail }}" height="100px" width="80px"> --}}

                            </td>
                            <td>
                                <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $design->right_thumbnail }}"><i class="fa fa-picture-o" aria-hidden="true"></i></a>
                                {{-- <img src="{{ $design->right_thumbnail }}" height="100px" width="80px"> --}}
                            </td>
                            <td>
                                {{ $design->created_at }}
                            </td>
                            <td>
                                <a href="https://r.prolook.com/my-saved-design/{{ $design->id }}" class="btn btn-primary btn-xs">View in Customizer</a>
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
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript" src="/js/administration/common.js"></script>
<!-- <script type="text/javascript" src="/js/administration/colors.js"></script> -->
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){

    $('.file-link').on('click', function(e){
    console.log('file link');
    var url = $(this).data('link');
    OpenInNewTab(url);
    });

    // try {
    //     $('.data-table').DataTable({
    //         "paging": true,
    //         "lengthChange": false,
    //         "searching": true,
    //         "ordering": false,
    //         "info": true,
    //         "autoWidth": false
    //     });
    // } catch (err) {
    //     console.log(err);
    // }

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
        window.location = "/administration/user/orders/"+$user;
    });

});
</script>
@endsection
