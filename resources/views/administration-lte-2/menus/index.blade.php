@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/iconpicker/css/fontawesome-iconpicker.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">

    <style type="text/css">
        ul.item {
            list-style: none;
        }

        ul.item .menu-container {
            background: #f5f5f5;
            border: 1px solid #ddd;
            cursor: move;
            margin-bottom: 15px;
            padding: 15px;
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
                        <nested-draggable :menus="menus"/>
                    </div>
                </div>
            </div>
        </div>
    </section>

    @include('administration-lte-2.menus.modal.icon-picker')
@endsection

@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.9.0/Sortable.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js"></script>

    <script type="text/x-template" id="nested-draggable">
        <draggable :list="menus" :tag="'ul'" class="item" :group="{name: 'menus'}" swap-threshold="222500" direction="vertical">
            <li v-for="menu, index in menus" :key="menu.id">
                <div class="menu-container">
                    <div class="row">
                        <div class="col-md-4">
                            <strong>
                                @{{ menu.menu_text }}
                            </strong>
                        </div>

                        <div class="col-md-8 text-right">
                            <button class="btn btn-flat btn-primary btn-xs">
                                <span class="glyphicon glyphicon-edit"></span>
                                Edit
                            </button>

                            <button class="btn btn-flat btn-danger btn-xs" @click="removeMenu(menu, index)">
                                <span class="glyphicon glyphicon-trash"></span>
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <nested-draggable :menus="menu.menus"></nested-draggable>
            </li>
        </draggable>
    </script>

    <script type="text/javascript" src="/js/administration/menu.js"></script>
    <script type="text/javascript" src="/iconpicker/js/fontawesome-iconpicker.min.js"></script>
@endsection