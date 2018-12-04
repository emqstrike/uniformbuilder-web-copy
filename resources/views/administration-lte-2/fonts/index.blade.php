@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">

    <style>
        @foreach ($fonts as $font)
            @font-face { font-family: "{{ $font->name }}"; src: url("{{ $font->font_path }}"); }
        @endforeach

        td .btn {
            display: block;
            margin-bottom: 5px;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Fonts')
                    <h1>
                        Fonts

                        <a href="{{ route('v1_create_fonts') }}" class='btn btn-flat btn-xs btn-success'>
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add New Font
                        </a>
                    </h1>
                </div>

                <div class="box-body">
                    <div class="form-inline">
                        <label>Sports</label>
                        <select id="sportsFilter" class="form-control">
                            @if ($sportsFilter == 'all')
                                <option value="all" selected="selected">All</option>
                            @else
                                <option value="all">All</option>
                            @endif

                            @foreach ($sports as $sport)
                                @if (! is_null($sport->name) && ($sport->name != ""))
                                    @if ($sportsFilter == $sport->name)
                                        <option value="{{ $sport->name }}" selected="selected">{{ $sport->name }}</option>
                                    @else
                                        <option value="{{ $sport->name }}">{{ $sport->name }}</option>
                                    @endif
                                @endif
                            @endforeach
                        </select>

                        <label style="margin-left: 25px;">Brands</label>
                        <select id="brandsFilter" class="form-control">
                            <option value="all" @if ($brandsFilter == 'all') selected="selected" @endif>All</option>
                            <option value="prolook" @if ($brandsFilter == 'prolook') selected="selected" @endif>Prolook</option>
                            <option value="richardson" @if ($brandsFilter == 'richardson') selected="selected" @endif>Richardson</option>
                        </select>
                    </div>

                    <hr>

                    <table data-toggle='table' class='table table-bordered fonts' id="fonts_table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>
                                    <a href="#" class="btn btn-flat btn-danger btn-xs multiple-delete-font" role="button">
                                        <i class="glyphicon glyphicon-trash"></i>
                                        Remove Checked
                                    </a>
                                </th>
                                <th>Font Name</th>
                                <th>Tail Sweep</th>
                                <th>Script</th>
                                <th>Block Font</th>
                                <th>Sports</th>
                                <th>Block Patterns</th>
                                <th>Options</th>
                                <th>Brand</th>
                                <th>Active Status</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody class="isotope">
                            @forelse ($fonts as $font)
                                <tr class='font-{{ $font->id }} {{ (!$font->active) ? ' inactive' : '' }} {{ $font->brand }} all-brand'>
                                    <td>{{ $font->id }}</td>
                                    <td>
                                        <div class="checkbox">
                                            <input type="checkbox" id="multipleDelete" name="remove[]" data-font-id="{{ $font->id }}" value="">
                                        </div>
                                    </td>

                                    <td>
                                        {{ $font->name }}<br />
                                        @if ($font->type == 'default')
                                            <span class="label label-info">
                                        @else
                                            <span class="label label-success">
                                        @endif
                                            {{ $font->type }}
                                        </span>
                                    </td>

                                     <td>
                                        @if ($font->tail_sweep)
                                            Yes
                                        @else
                                            No
                                        @endif
                                    </td>

                                    <td>
                                        @if ($font->script)
                                            Yes
                                        @else
                                            No
                                        @endif
                                    </td>

                                    <td>
                                        @if ($font->block_font)
                                            Yes
                                        @else
                                            No
                                        @endif
                                    </td>

                                    <td  id ="sports-column">
                                        {{ $font->sports }}
                                    </td>

                                    <td>
                                        {{ $font->block_patterns }}
                                    </td>

                                    <td>
                                        {{ $font->block_pattern_options }}
                                    </td>

                                    <td id ="brand-column">
                                        {{ $font->brand }}
                                    </td>

                                    <td>
                                        <a href="#" class="btn btn-flat btn-default btn-xs disable-font" data-font-id="{{ $font->id }}" role="button" {{ ($font->active) ? : 'disabled="disabled"' }}>
                                            <i class="glyphicon glyphicon-eye-close"></i>
                                            Disable
                                        </a>
                                        <a href="#" class="btn btn-flat btn-info btn-xs enable-font" data-font-id="{{ $font->id }}" role="button" {{ ($font->active) ? 'disabled="disabled"' : '' }}>
                                            <i class="glyphicon glyphicon-eye-open"></i>
                                            Enable
                                        </a>
                                    </td>
                                    <td>
                                        {{ $font->updated_at }}
                                    </td>
                                    <td>
                                        @if ($font->active)
                                            <a href="{{ route('v1_edit_font', ['id' => $font->id]) }}" class="btn btn-flat btn-primary btn-xs edit-font" data-font-id="{{ $font->id }}" role="button">
                                                <i class="glyphicon glyphicon-edit"></i>
                                                Edit
                                            </a>
                                        
                                            <a href="#" class="btn btn-flat btn-default btn-xs clone-font" data-font-id="{{ $font->id }}" role="button">
                                                <i class="glyphicon glyphicon-copy"></i>
                                                Clone
                                            </a>
                                        @endif

                                        <a href="#" class="btn btn-flat btn-danger pull-right btn-xs delete-font" data-font-id="{{ $font->id }}" role="button">
                                            <i class="glyphicon glyphicon-trash"></i>
                                            Remove
                                        </a>
                                    </td>
                                </tr>
                            @empty
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>

    <!-- Confirmation Modal -->
    <div class="modal confirmation-modal" id="clone-confirmation-modal" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Title</h4>
                </div>

                <div class="modal-body">Message</div>

                <div class="modal-footer">
                    <button class="btn btn-flat btn-danger @if (isset($yes_class_name)) {{ $yes_class_name }} @else confirm-yes @endif" data-value=''
                        @if (isset($attributes))
                            @if (count($attributes) > 0)
                                @foreach ($attributes as $attribute)
                                    data-{{ $attribute }}=""
                                @endforeach
                            @endif
                        @endif
                    >
                        <li class="glyphicon glyphicon-ok"></li>
                        Yes
                    </button>

                    <button class="btn btn-flat btn-default confirm-no" data-dismiss="modal">
                        <li class="glyphicon glyphicon-remove"></li>
                        No
                    </button>
                </div>
            </div>
        </div>
    </div>

    @include('partials.confirmation-modal')
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/fonts/fonts.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $("tr").each(function(i) {
                if ($(this).hasClass("inactive")) {
                    $(this).css('background-color', '#e8e8e8');
                }
            });

            $('#fonts_table').DataTable({
                "paging": true,
                "searching": true,
                "autoWidth": false,
                "columnDefs": [{
                    "searchable": false,
                    "targets": [12]
                }]
            });

            $('#sportsFilter').change(function() {
                var brand = $('#brandsFilter').val();
                var sports = $(this).val();

                window.location = "{{ route('v1_fonts_index') }}/?sports=" + sports + "&brand=" + brand; 
            });

            $('#brandsFilter').change(function() {
                var brand = $(this).val();
                var sports = $('#sportsFilter').val();

                window.location = "{{ route('v1_fonts_index') }}/?sports=" + sports + "&brand=" + brand; 
            })
        });
    </script>
@endsection