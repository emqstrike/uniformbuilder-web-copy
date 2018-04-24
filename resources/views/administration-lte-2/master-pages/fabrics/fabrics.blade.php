@extends('administration-lte-2.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
@endsection

@section('custom-styles')

@endsection

@section('content')

</style>
<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        Fabrics Master List
                    </h1>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table data-table table-bordered master-fabrics' id="master_fabrics_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Code</th>
                            <th>Brand</th>
                            <th>Name</th>
                            <th>Factory</th>
                            <th class="col-md-1"></th>
                        </tr>
                    </thead>
                    <tbody class="isotope">

                    @forelse ($fabrics as $fabric)

                    <tr>
                        <td>{{ $fabric->id }}</td>
                        <td>{{ $fabric->code }}</td>
                        <td>{{ $fabric->brand_id }}</td>
                        <td>{{ $fabric->name }}</td>
                        <td>{{ $fabric->factory_id }}</td>
                        <td class="col-md-1">
                            <center>
                                <a href="#" class="btn btn-primary btn-sm btn-flat">Edit</a>
                                <a href="#" class="btn btn-danger btn-sm btn-flat delete-record">Delete</a>
                            </center>
                        </td>
                    </tr>

                    @empty

                        <tr>
                            <td colspan='6'>
                                No Fabric Data Found
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

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
<script type="text/javascript">
$(document).ready(function(){
console.log('it gets here');
// $('.data-table').DataTable({
//     "paging": true,
//     "lengthChange": false,
//     "searching": true,
//     "ordering": false,
//     "info": true,
//     "autoWidth": true
// });

$('.delete-record').on('click', function(e){
    // e.preventDefault();

    // var data = {};
    // data.subject = "This order was rejected because of the following reasons: ";
    // data.order_code = $(this).data('order-code');
    // // data.status = "rejected";
    // data.type = "ORDERS";
    // data.sender_id = "0";
    // data.recipient_id = $(this).data('user-id').toString();

    // console.log(data);

    bootbox.prompt({
        size: "medium",
        title: "Delete Record.",
        message: "Reject artwork?",
        buttons: {
            'cancel': {
                label: 'Cancel'
                // className: 'btn-default pull-left'
            },
            'confirm': {
                label: 'Reject Artwork',
                className: 'btn-danger pull-right'
            }
        },
        callback: function(result){ /* result is a boolean; true = OK, false = Cancel*/
            // if(result){
            //     bootbox.dialog({ message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>' });
            //     var order_link = 'http://customizer.prolook.com/order/'+data.order_code;
            //     var message = "Please edit the order and submit it again using this link: "+order_link;
            //     data.content = result+". "+message; // message content
            //     console.log(data);
            //     insertMessage(data);
            // } else {
            //     console.log('Canceled.');
            // }
        }
    });
});

});
</script>
@endsection
