@extends('administration-lte-2.lte-main')

@section('styles')
    <link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet">

    <style>
        .theme--light.application {
            background: none !important;
        }

        a.v-list__tile:hover {
            text-decoration: none;
        }

        .form-control {
            height: auto !important;
        }

        [type='number'] {
            width: 100% !important;
        }

        #font-size-table .form-inline {
            margin-bottom: 15px;
            margin-top: 15px;
        }

        #font-size-table .form-inline .form-control {
            width: 90px !important;
        }

        .v-tabs__div a:hover {
            color: #ffffff;
            text-decoration: none;
        }

        .v-tabs .v-window {
            margin-top: 30px;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <v-app id="inspire">
            <div class="row">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Edit Font')

                        <div class="row">
                            <div class="col-md-6">
                                <h1>Edit Font</h1>
                            </div>

                            <div class="col-md-6 text-right">
                                <v-menu bottom left style="z-index: 999999999;">
                                    <template v-slot:activator="{ on }">
                                        <v-btn light icon v-on="on">
                                            <v-icon>more_vert</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-list>
                                        <v-list-tile @click="toggleMenu('general-details')">
                                            <v-list-tile-title>General Details</v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile @click="toggleMenu('font-size-table')">
                                            <v-list-tile-title>Font Size Table</v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile @click="toggleMenu('twill')">
                                            <v-list-tile-title>Twill</v-list-tile-title>
                                        </v-list-tile>

                                        <v-list-tile @click="toggleMenu('sublimated')">
                                            <v-list-tile-title>Sublimated</v-list-tile-title>
                                        </v-list-tile>
                                    </v-list>
                                </v-menu>
                            </div>
                        </div>
                    </div>

                    <div class="box-body">
                        <form class="form-horizontal">
                            @include('administration-lte-2.fonts.components.general-details')
                            @include('administration-lte-2.fonts.components.font-size-table')
                            @include('administration-lte-2.fonts.components.twill-font-size-table')
                            @include('administration-lte-2.fonts.components.sublimated-font-size-table')
                        </form>
                    </div>
                </div>
            </div>
        </v-app>
    </section>
@endsection

@section('scripts')
    <script>
        var font = [];

        @if ($font)
            font = {!! $font !!};
        @endif
    </script>

    <script src="/js/administration-lte-2/fonts/edit-font.js"></script>
@endsection