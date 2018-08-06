@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <div class="row">
                            <div class="col-md-6">
                                <a href="{{ route('v1_materials_index') }}" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; border-radius: 0;">
                                    Back
                                </a>
                                <a href="{{ route('v1_materials_options_setup', ['id' => $material->id]) }}" class="btn btn-default btn-lg" role="button" style="border: 1px solid #808080; margin-top: 25px; border-radius: 0;">
                                    Materials Options (Minified)
                                </a>
                            </div>
                        </div>

                        @section('page-title', 'Material Options Setup')

                        <h1>Material Options of: {{ ucfirst($material->name) }}</h1>
                        <a href="/administration/material/edit/{{ $material->id }}" class="btn btn-default btn-xs edit-material" role="button" style="border: 1px solid #808080; border-radius: 0px;">
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
@endsection