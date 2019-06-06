@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/iconpicker/css/fontawesome-iconpicker.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">

    <style type="text/css">
        ul.item {
            list-style: none;
        }

        .mx-3 .v-input__slot {
            margin-bottom: 0px;
        }

        ul.item .menu-container {
            background: #f5f5f5;
            border: 1px solid #ddd;
            cursor: move;
            margin-bottom: 15px;
            padding: 15px;
            width: 800px;
        }

        .v-list__tile {
            border-bottom: 1px solid rgb(221, 221, 221);
            padding: 10px 25px;
        }

        .v-list__tile:hover {
            background: rgba(0,0,0,.04);
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

                        <v-alert :value="true" color="error" v-if="errors.length">
                            <ul>
                                <li v-for="error in errors">@{{ error }}</li>
                            </ul>
                        </v-alert>

                        <h1>Menus</h1>
                    </div>

                    <div class="box-body">
                        <v-app id="inspire">
                            @include('administration-lte-2.menus.modal.menu')
                            @include('administration-lte-2.partials.components.loading-dialog')

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="page-list-container">
                                        <v-toolbar color="#222d32" dark flat>
                                            <v-toolbar-title>Pages</v-toolbar-title>
                                            <v-text-field class="mx-3" flat label="Search" prepend-inner-icon="search" solo-inverted v-model="search" clearable @click:clear="clearSearch"></v-text-field>
                                        </v-toolbar>

                                        <v-list two-line style="border: 1px solid #ddd; max-height: 441px; overflow-y: scroll">
                                            <template v-for="(page, index) in filteredPages">
                                                <v-list-tile :key="page.id" avatar ripple>
                                                    <v-list-tile-content>
                                                        <v-list-tile-title>@{{ page.page_name }}</v-list-tile-title>
                                                        <v-list-tile-sub-title>@{{ page.code }}</v-list-tile-sub-title>
                                                    </v-list-tile-content>

                                                    <v-list-tile-action>
                                                        <input type="checkbox" v-model="selectedPages" :value="page" @change="select()">
                                                    </v-list-tile-action>
                                                </v-list-tile>
                                            </template>
                                        </v-list>

                                        <v-toolbar color="#f5f5f5" flat style="border: 1px solid #ddd; margin-top: -1px;">
                                            <div class="col-md-6" style="padding: 0;">
                                                <button class="btn btn-flat btn-default" @click="checkAll">
                                                    <span v-if="selectedPages.length > 0">Deselect All</span>
                                                    <span v-else>Select All</span>
                                                </button>
                                            </div>

                                            <div class="col-md-6 text-right" style="padding: 0;">
                                                <button class="btn btn-flat btn-success" @click="add">Add Menu</button>
                                            </div>
                                        </v-toolbar>
                                    </div>
                                </div>

                                <div class="col-md-8">
                                    <nested-draggable :menus="menus"/>
                                </div>
                            </div>

                            <div class="text-center">
                                <hr>

                                <button class="btn btn-flat btn-primary" @click="saveMenu">
                                    <span class="glyphicon glyphicon-floppy-disk"></span>
                                    Save
                                </button>
                            </div>
                        </v-app>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Sortable/1.9.0/Sortable.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Vue.Draggable/2.20.0/vuedraggable.umd.min.js"></script>

    <script type="text/x-template" id="nested-draggable">
        <draggable :list="menus" :tag="'ul'" class="item" :group="{name: 'menus'}" swap-threshold="222500" direction="vertical" @end="updateMenuData" @choose="choose"  :move="move">
            <li v-for="menu, index in menus" :key="menu.id" :id="menu.id">
                <div class="menu-container">
                    <div class="row">
                        <div class="col-md-4">
                            <strong>
                                @{{ menu.menu_text }}
                            </strong>
                        </div>

                        <div class="col-md-8 text-right">
                            <button class="btn btn-flat btn-primary btn-xs" @click="edit(menu)">
                                <span class="glyphicon glyphicon-edit"></span>
                                Edit
                            </button>

                            <button class="btn btn-flat btn-danger btn-xs" @click="remove(menu, index)">
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
@endsection