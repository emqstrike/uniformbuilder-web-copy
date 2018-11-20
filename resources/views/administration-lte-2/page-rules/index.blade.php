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
                        @include('administration.partials.flash-message')

                        <table class="data-table table table-bordered patterns" 
                            data-toggle='data' 
                            data-available-normal-roles="{{ json_encode($availableNormalRoles) }}" 
                            data-available-admin-roles="{{ json_encode($availableAdminRoles) }}"
                            data-pages="{{ json_encode($pages) }}"
                        >
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                @if ($pageRules)
                                    @foreach ($pageRules as $pageRule)
                                        <tr data-type="{{ $pageRule->type }}" data-role="{{ $pageRule->role }}" data-allowed-page="{{ $pageRule->allowed_pages }}">
                                            <td>{{ $pageRule->type }}</td>
                                            <td>{{ $pageRule->role }}</td>
                                            <td>
                                                <button class="btn btn-flat btn-primary btn-xs edit-page-rule" data-page-rule-id="{{ $pageRule->id }}" role="button">
                                                    <i class="glyphicon glyphicon-edit"></i>
                                                    Edit
                                                </button>

                                                <button class="btn btn-flat btn-danger btn-xs remove-page-rule" data-page-rule-id="{{ $pageRule->id }}" role="button">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    @endforeach
                                @else
                                    <tr>
                                        <td colspan="5">No page rules found</td>
                                    </tr>
                                @endif
                            </tbody>
                        </table>
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