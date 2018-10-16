@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">

    <style>
        .onoffswitch {
            position: relative; width: 61px;
            -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
        }
        .onoffswitch-checkbox {
            display: none;
        }
        .onoffswitch-label {
            display: block; overflow: hidden; cursor: pointer;
            border: 2px solid #999999; border-radius: 9px;
        }
        .onoffswitch-inner {
            display: block; width: 200%; margin-left: -100%;
            transition: margin 0.3s ease-in 0s;
        }
        .onoffswitch-inner:before, .onoffswitch-inner:after {
            display: block; float: left; width: 50%; height: 20px; padding: 0; line-height: 20px;
            font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
            box-sizing: border-box;
        }
        .onoffswitch-inner:before {
            content: "ON";
            padding-left: 5px;
            background-color: #02C723; color: #FFFFFF;
        }
        .onoffswitch-inner:after {
            content: "OFF";
            padding-right: 5px;
            background-color: #BF5050; color: #FFFFFF;
            text-align: right;
        }
        .onoffswitch-switch {
            display: block; width: 18px; margin: 1px;
            background: #FFFFFF;
            position: absolute; top: 0; bottom: 0;
            right: 37px;
            border: 2px solid #999999; border-radius: 9px;
            transition: all 0.3s ease-in 0s;
        }
        .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
            margin-left: 0;
        }
        .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
            right: 0px;
        }

        .badge-danger {
            background: #d9534f;
        }

        .badge-success {
            background: #28a745;
        }

        .col-md-3 {
            width: 211px;
        }

        table .btn {
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
                    @section('page-title', 'Block Patterns')
                    <h1>Block Patterns</h1>
                    <a href="{{ route('v1_add_block_pattern') }}" class="btn btn-flat btn-success btn-add-new">
                        Add new block pattern
                    </a>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Options</th>
                                <th>Thumbnail</th>
                                <th>Sport</th>
                                <th>Gender</th>
                                <th>Alias</th>
                                <th>Placeholder Overrides</th>
                                <th>Active</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            @forelse ($block_patterns as $block_pattern)
                                <tr class='block-pattern-{{ $block_pattern->id }} {{ (! $block_pattern->active) ? ' inactive' : '' }}'>
                                    <td>
                                        {{ $block_pattern->name }}
                                    </td>

                                    <td class="neck-options-cell">
                                        <input type="hidden" value="{{ $block_pattern->neck_options }}" class="neck-options-container">

                                        @if ($block_pattern->neck_options)
                                            <?php 
                                                $options = json_decode($block_pattern->neck_options, true); 
                                                $count = count($options);
                                            ?>

                                            @for ($index = 1; $index <= $count; $index++)
                                                <div class="col-md-3">
                                                    <div class="panel panel-default">
                                                        <div class="panel-heading">
                                                            <strong>{{ $options[$index]['name'] }}</strong>
                                                        </div>

                                                        <div class="panel-body">
                                                            @if (isset($options[$index]['thumbnail_path']))
                                                                @if ($options[$index]['thumbnail_path'] && ($options[$index]['thumbnail_path'] != 'undefined'))
                                                                    <img src="{{ $options[$index]['thumbnail_path'] }}" style="background: #000000; height: 100px; width: 100px;">
                                                                @else
                                                                    <img src="https://via.placeholder.com/100x100?text=no%20image">
                                                                @endif
                                                            @else
                                                                <img src="https://via.placeholder.com/100x100?text=no%20image">
                                                            @endif
                                                        </div>
                                                    </div>
                                                </div>
                                            @endfor
                                        @endif
                                    </td>

                                    <td>
                                        @if ($block_pattern->thumbnail_path)
                                            <img class="img-thumbnail" src="{{ $block_pattern->thumbnail_path }}" style="width: 140px;">
                                        @else
                                            <img src="https://via.placeholder.com/210x320?text=no%20image" class="img-thumbnail" style="height: 173px; width: 117px;">
                                        @endif
                                    </td>

                                    <td>
                                        {{ $block_pattern->uniform_category }}
                                    </td>

                                    <td>{{ $block_pattern->gender }}</td>
                                    <td>{{ $block_pattern->alias }}</td>

                                    <td>
                                        @if ( !isset($block_pattern->placeholder_overrides) || $block_pattern->placeholder_overrides == "" )
                                            <span class="badge badge-danger">No</span>
                                        @else
                                            <span class="badge badge-success">Yes</span>
                                        @endif
                                    </td>

                                    <td>
                                        <div class="onoffswitch">
                                            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-block-pattern" id="switch-{{ $block_pattern->id }}" data-block-pattern-id="{{ $block_pattern->id }}" {{ ($block_pattern->active) ? 'checked' : '' }}>
                                            <label class="onoffswitch-label" for="switch-{{ $block_pattern->id }}">
                                                <span class="onoffswitch-inner"></span>
                                                <span class="onoffswitch-switch"></span>
                                            </label>
                                        </div>
                                    </td>

                                    <td>
                                        <a href="{{ route('v1_modify_block_pattern', ['id' => $block_pattern->id]) }}" class="btn btn-flat btn-primary btn-xs edit-block-pattern" data-block-pattern-id="{{ $block_pattern->id }}" role="button">
                                            <i class="glyphicon glyphicon-edit"></i>
                                            Edit
                                        </a>

                                        <a href="#" class="btn btn-flat btn-danger btn-xs delete-block-pattern" data-block-pattern-id="{{ $block_pattern->id }}" data-block-pattern-name="{{ $block_pattern->name }}" role="button">
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

    @include('partials.confirmation-modal', ['confirmation_modal_id' => 'confirmation-modal'])
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="/js/administration/datatables.min.js"></script>
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/block-patterns/block-patterns.js"></script>

    <script type="text/javascript">
        $(document).ready(function($) {
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