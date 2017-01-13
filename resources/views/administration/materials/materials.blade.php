@extends('administration.lte-main')

@section('styles')

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<link rel="stylesheet" type="text/css" href="/css/custom.css">

@endsection

@section('content')

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <i class="fa fa-bookmark"></i>
                        Materials
                    </h1>
                </div>
                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered materials display'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Preview</th>
                                <th>Name</th>
                                <th>Sport</th>
                                <th>Block Pattern</th>
                                <th>Neck</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
        @forelse ($materials as $material)
            <tr>
                <td>
                    {{ $material->id }}
                </td>
                <td>
                    <center><img src="{{ $material->thumbnail_path }}" style="height: 45px; width: 35px;" data-toggle="popover"></center>
                </td>
                <td>
                    {{ $material->name }}
                </td>
                <td>
                    {{ $material->uniform_category }}
                </td>
                <td>
                    {{ $material->block_pattern }}
                </td>
                <td>
                    {{ $material->neck_option }}
                </td>
                <td>
                    {{ $material->type }}
                </td>
                <td>
                    <a href="#" class="btn btn-xs btn-primary">Edit</a>
                    <a href="#" class="btn btn-xs btn-primary">View Material Options</a>
                    <a href="#" class="btn btn-xs btn-danger">Delete</a>
                </td>
            </tr>
            
        @empty
            <p>No Materials</p>
        @break
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
            </tr>
        </tfoot>
        </table>
        </div>
        </div>
        </div>
        </div>
        </section>

</div>

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-material-option'])

@include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-duplicate-material'])

@endsection

@section('scripts')
<script type="text/javascript" src="/js/administration/common.js"></script>
<script type="text/javascript" src="/fabricjs/fabric.min.js"></script>
<script type="text/javascript" src="/isotope/isotope.pkgd.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
<script type="text/javascript" src="/js/administration/materials-main.js"></script>
@endsection