@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/iconpicker/css/fontawesome-iconpicker.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">

    <style type="text/css">
        div#box_body {
            overflow-y: scroll;
            max-height: 500px;
        }

        div#page-list-container .panel-body {
            overflow-y: scroll;
            max-height: 300px;
        }

        .sortable, .sortable ol {
            list-style: none;
        }

        .sortable li {
            width: 500px;
        }

        .dragged {
            position: absolute;
            opacity: 0.5;
            z-index: 2000;
        }

        ol.sortable li.placeholder {
            border: 1px solid #000;
            position: relative;
            width: 500px;
        }

        .sortable li div.sortable-container {
            background: #f5f5f5;
            border: 1px solid #ddd;
            cursor: move;
            margin-bottom: 10px;
            padding: 15px 0 0;
            width: 500px;
        }

        .sortable .arrow-down {
            cursor: pointer;
            display: inline-block;
            height: 20px;
            text-align: center;
            width: 20px;
        }

        .sortable-head {
            padding: 0 15px 15px;
        }

        .sortable-body {
            background: #ffffff;
            border-top: 1px solid #ddd;
            cursor: default;
            display: none;
            padding: 10px 15px;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Menus')

                        <h1>Menus</h1>
                    </div>

                    <div class="box-body">
                        @include('administration.partials.flash-message')

                        <div class="col-md-4">
                            <div id="page-list-container" class="panel panel-default">
                                <div class="panel-heading">
                                    Pages
                                    <input type="text" id="search-page" class="form-control" placeholder="Search page" style="margin-top: 10px;">
                                </div>

                                <div class="panel-body">
                                    @forelse ($pages as $page)
                                        <div class="page" data-page-name="{{ $page->page_name }} {{ $page->code }}">
                                            <input type="checkbox" value="{{ $page->id }}" data-page-name="{{ $page->page_name}}" data-page-code="{{ $page->code }}"> 
                                            <strong>{{ $page->page_name }}</strong> ({{ $page->code }})
                                        </div>
                                    @empty
                                        <p>No items.</p>
                                    @endforelse
                                </div>
                                <div class="panel-footer">
                                    <button id="select-all-pages" class="btn btn-default">Select All</button>
                                    <button id="add-page-to-menu" class="btn btn-primary pull-right">Add Menu</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-8">
                            <form action="{{ route('v1_store_new_menu') }}" method="POST">
                                {{ csrf_field() }}
                                
                                <ol class="sortable">
                                    @foreach ($menus as $menu)
                                        @include('administration-lte-2.menus.partials.menu-list')
                                    @endforeach
                                </ol>

                                <hr>

                                <div class="form group">
                                    <div class="col-md-12" style="padding-left: 40px; margin-bottom: 30px;">
                                        <button class="btn btn-flat btn-primary" type="submit">
                                            <span class="glyphicon glyphicon-floppy-disk"></span>
                                            Save
                                        </button>

                                        <a href="{{ route('v1_menus') }}" class="btn btn-flat btn-danger">
                                            <span class="glyphicon glyphicon-arrow-left"></span>
                                            Cancel
                                        </a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @include('administration-lte-2.menus.modal.icon-picker')
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration/jquery-sortable.js"></script>
    <script type="text/javascript" src="/js/administration/menu.js"></script>
    <script type="text/javascript" src="/iconpicker/js/fontawesome-iconpicker.min.js"></script>
@endsection