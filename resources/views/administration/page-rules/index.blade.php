@extends('administration.lte-main')

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

        select {
            text-transform: capitalize;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <di class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h1>Page Rules</h1>

                        <a href="{{ route('add_new_page_rule') }}" class='btn btn-xs btn-success'>
                            <span class="glyphicon glyphicon-plus-sign"></span>
                            Add new page rule
                        </a>
                    </div>

                    <div class="box-body">
                        @include('administration.partials.flash-message')

                        <table class="data-table table table-bordered patterns" data-toggle='data'>
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Role</th>
                                    <th>Allowed Pages</th>
                                    <th>Brand</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                @if ($pageRules)
                                    @foreach ($pageRules as $pageRule)
                                        <tr>
                                            <td>{{ $pageRule->type }}</td>
                                            <td>{{ $pageRule->role }}</td>
                                            <td>
                                                <ul>
                                                    @foreach (json_decode($pageRule->allowed_pages, true) as $allowedPage)
                                                        <li>{{ $allowedPage }}</li>
                                                    @endforeach
                                                </ul>
                                            </td>
                                            <td>{{ $pageRule->brand }}</td>
                                            <td>
                                                <a href="{{ route('edit_page_rule', ['id' => $pageRule->id]) }}" class="btn btn-primary btn-xs"  role="button">
                                                    <i class="glyphicon glyphicon-edit"></i>
                                                    Edit
                                                </a>

                                                <a href="{{ route('delete_page_rule', ['id' => $pageRule->id]) }}" class="btn btn-danger btn-xs" role="button">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                                    Remove
                                                </a>
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
@endsection