@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">

    <style type="text/css">
        div#box_body {
            overflow-y: scroll;
            max-height: 500px;
        }

        table.data-table {
            table-layout: fixed;
            word-wrap: break-word;
        }

        .modal .row {
            margin-bottom: 15px;
        }

        .select2 {
            width: 100% !important;
        }

        li.select2-selection__choice {
            color: black !important;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Page Rules')

                        <h1>Page Rules</h1>

                        <button class='btn btn-flat btn-xs btn-success add-page-rule'>
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add new page rule
                        </button>
                    </div>

                    <div class="box-body">
                        <v-app id="inspire">
                            @include('administration-lte-2.partials.components.loading-dialog')

                            <div>
                                <v-data-table ref="pageRuleTable" :headers="headers" hide-actions :items="pageRules" class="elevation-1" :total-items="100">
                                    <template slot="items" slot-scope="props">
                                        <td>@{{ props.item.type }}</td>
                                        <td>@{{ props.item.role }}</td>
                                        <td>
                                            <button class="btn btn-flat btn-primary btn-xs">
                                                <i class="glyphicon glyphicon-edit"></i>
                                                Edit
                                            </button>

                                            <button class="btn btn-flat btn-danger btn-xs">
                                                <i class="glyphicon glyphicon-trash"></i>
                                                Remove
                                            </button>
                                        </td>
                                    </template>
                                </v-data-table>
                            </div>
                        </v-app>
                    </div>
                </div>
            </di>
        </div>
    </section>

    @include('administration-lte-2.page-rules.modal.add')
    @include('administration-lte-2.page-rules.modal.edit')
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
    <script type="text/javascript" src="/js/administration-lte-2/page-rules/page-rules.js"></script>
@endsection