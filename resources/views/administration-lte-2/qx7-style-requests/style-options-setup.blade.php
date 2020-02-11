@extends('administration-lte-2.lte-main')

@section('styles')
    <style>
        th h3 {
            text-align: center;
        }

        tr.ui-sortable-handle:nth-child(odd) {
            background: #d3ccd0;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <form action="{{ route('v1_qx7_update_option') }}"  method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="cleanup_material_id" id="material_id" value="{{ $style->id }}">

            <input type="hidden" id="material_block_pattern" value="">
            <input type="hidden" id="material_neck_option" value="">

            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <div class="row">
                                <div class="col-md-6">
                                    <a href="{{ route('v1_qx7_style_requests') }}" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; border-radius: 0;">
                                        Back
                                    </a>
                                    <a href="{{ route('v1_qx7_style_options', ['id' => $style->id]) }}" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; border-radius: 0;">
                                        Style Options
                                    </a>
                                </div>
                            </div>

                            @section('page-title', 'Style Options Setup')

                            <h1>Material Options of: {{ $style->name }}</h1>
        <!--                     <a href="{{ route('v1_qx7_edit_style', ['id' => $style->id]) }}" class="btn btn-default btn-xs edit-material" role="button" style="border: 1px solid #808080; border-radius: 0px;">
                                Edit
                            </a> -->
                            <a href="#" class='btn btn-xs btn-default delete-multiple-material-option' style="border: 1px solid #808080; border-radius: 0px;">
                                Delete Selected
                            </a>
                            <input type="submit" class='btn btn-xs btn-default update-all-material-option' style="border: 1px solid #808080; border-radius: 0px;" value="Update Changes">
                            <a href="#" class='btn btn-xs btn-default format-names' style="border: 1px solid #808080; border-radius: 0px;">
                                Format Names
                            </a>
                        </div>

                        <ul class="nav nav-tabs col-12">
                            @foreach($materials as $key => $item)
                            <li class="mid-tab {{ $key === 0 ? 'active' : '' }}"><a href="#material-{{ $item->id }}" role="tab" data-toggle="tab">Material: {{ $item->name }} ({{ $item->id }})</a></li>
                            @endforeach
                        </ul>

                        <div class="box-body tab-content">
                            @foreach($materials as $key => $item)
                            <div class="tab-pane fade in {{ $key === 0 ? 'active' : '' }}" id="material-{{ $item->id }}">
                                <div class="row">
                                    <div class="col-md-3">
                                        @include('administration-lte-2.master-pages.materials.partials.material-options-setup.front')
                                    </div>

                                    <div class="col-md-3">
                                        @include('administration-lte-2.master-pages.materials.partials.material-options-setup.back')
                                    </div>

                                    <div class="col-md-3">
                                        @include('administration-lte-2.master-pages.materials.partials.material-options-setup.left')
                                    </div>

                                    <div class="col-md-3">
                                        @include('administration-lte-2.master-pages.materials.partials.material-options-setup.right')
                                    </div>
                                </div>
                            </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>

    @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal-multiple-material-option'])
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/administration/style-options-setup.js"></script>
@endsection
