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
        <form action="{{ route('v1_update_material_options') }}"  method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" name="cleanup_material_id" id="material_id" value="{{ $tyle_id }}">

            <input type="hidden" id="material_block_pattern" value="">
            <input type="hidden" id="material_neck_option" value="">

            <div class="row">
                <div class="col-xs-12">
                    <div class="box">
                        <div class="box-header">
                            <div class="row">
                                <div class="col-md-6">
                                    <a href="{{ route('v1_materials_index') }}" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; border-radius: 0;">
                                        Back
                                    </a>
                                    <a href="{{ route('v1_view_material_option', ['id' => $material->id]) }}" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; border-radius: 0;">
                                        Materials Options
                                    </a>
                                </div>
                            </div>

                            @section('page-title', 'Material Options Setup')

                            <h1>Material Options of: Style Name</h1>
                            <a href="{{ route('v1_material_edit', ['id' => $style_id]) }}" class="btn btn-default btn-xs edit-material" role="button" style="border: 1px solid #808080; border-radius: 0px;">
                                Edit
                            </a>
                            <a href="#" class='btn btn-xs btn-default delete-multiple-material-option' style="border: 1px solid #808080; border-radius: 0px;">
                                Delete Selected
                            </a>
                            <input type="submit" class='btn btn-xs btn-default update-all-material-option' style="border: 1px solid #808080; border-radius: 0px;" value="Update Changes">
                            <a href="#" class='btn btn-xs btn-default format-names' style="border: 1px solid #808080; border-radius: 0px;">
                                Format Names
                            </a>
                        </div>

                        <div class="box-body">
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
