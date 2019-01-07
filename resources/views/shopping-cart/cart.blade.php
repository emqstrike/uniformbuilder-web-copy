@extends('shopping-cart.layout')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <h1 class="page-header">My Cart</h1>

            <div class="row">
                {{-- <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Item 1</h1>
                        </div>
                        <div class="panel-body">
                            <img src="https://via.placeholder.com/300" class="img-responsive" alt="" />
                        </div>
                    </div>
                </div> --}}

                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <button class="btn btn-success pull-right btn-xs"><span class="glyphicon glyphicon-pencil"></span> Edit In Customizer</button>
                            <h1 class="panel-title">Gator 11</h1>
                        </div>
                        <div class="panel-body">
                            {{-- <img src="https://via.placeholder.com/150" class="img-responsive" alt="" />
                            <hr> --}}

                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-3">
                                        <label for="size">Select Size</label>

                                        <select name="size" class="form-control">
                                            <option value="24">24</option>
                                            <option value="26">26 (YS)</option>
                                            <option value="28">28 (YM)</option>
                                            <option value="30">30</option>
                                            <option value="32">32 (YL)</option>
                                            <option value="34">34 (YXL)</option>
                                            <option value="36">36 (S)</option>
                                            <option value="38">38 (M)</option>
                                            <option value="40">40</option>
                                            <option value="42">42 (L)</option>
                                            <option value="44">44</option>
                                            <option value="46">46 (XL)</option>
                                            <option value="48">48</option>
                                            <option value="50">50 (2XL)</option>
                                            <option value="52">52</option>
                                            <option value="54">54 (3XL)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div role="tabpanel">
                                <!-- Nav pills -->
                                <ul class="nav hidden" role="tablist" id="tab-sizes">
                                    <li role="presentation" class="active">
                                        <a href="#size-24" aria-controls="tab" role="tab" data-toggle="tab">24</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-26" aria-controls="tab" role="tab" data-toggle="tab">26 (YS)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-28" aria-controls="tab" role="tab" data-toggle="tab">28 (YM)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">30</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-32" aria-controls="tab" role="tab" data-toggle="tab">32 (YL)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-34" aria-controls="tab" role="tab" data-toggle="tab">34 (YXL)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-36" aria-controls="tab" role="tab" data-toggle="tab">36 (S)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-38" aria-controls="tab" role="tab" data-toggle="tab">38 (M)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-40" aria-controls="tab" role="tab" data-toggle="tab">40</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-42" aria-controls="tab" role="tab" data-toggle="tab">42 (L)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-44" aria-controls="tab" role="tab" data-toggle="tab">44</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-46" aria-controls="tab" role="tab" data-toggle="tab">46 (XL)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-48" aria-controls="tab" role="tab" data-toggle="tab">48</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">50 (2XL)</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">52</a>
                                    </li>
                                    <li role="presentation">
                                        <a href="#size-30" aria-controls="tab" role="tab" data-toggle="tab">54 (3XL)</a>
                                    </li>
                                </ul>

                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane fade in active" id="size-24">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Last Name</th>
                                                    <th>Number</th>
                                                    <th>Quantity</th>
                                                    <th>Ok/Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>
                                                        <input type="text" name="last_name" class="form-control" />
                                                    </td>
                                                    <td>
                                                        <input type="text" name="number" class="form-control" />
                                                    </td>
                                                    <td>
                                                        <input type="text" name="quantity" class="form-control" />
                                                    </td>
                                                    <td>
                                                        <div class="btn-group" role="group">
                                                            <button class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok-sign"></span></button>
                                                            <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove-sign"></span></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <button class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign"></span> Add Player</button>
                                    </div>
                                    <div role="tabpanel" class="tab-pane fade" id="size-26">world</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <a href="{{ route('shopping-cart.billing') }}" class="btn btn-primary">Checkout</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script type="text/javascript">
$(document).ready(function() {
    $(':input[name="size"]').change(function(event) {
        var size = $(this).val();
        $('#tab-sizes li a[href="#size-'+size+'"]').tab('show');
    });
});
</script>
@endsection