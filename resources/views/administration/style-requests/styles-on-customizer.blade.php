@extends('administration.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/dropzone/dropzone.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <style>
        .custom-alert {
            border: 1px solid transparent;
            padding: 15px;
            border-radius: 4px;
        }

        .custom-alert.alert-danger {
            margin-bottom: 15px;
        }

        #my-awesome-dropzone {
            border: dashed 1px black;
        }
        .dz-image {
            background-color: gray;
        }
        hr {
            border: none;
            height: 1px;
            background-color: #c1c1c1; /* Modern Browsers */
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h1>
                            Styles on Customizer
                        </h1>
                    </div>

                    <div class="box-body">
                        <table data-toggle='table' id="style_requests_table" class='table table-bordered table-hover style-requests data-table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Style Name</th>
                                    <th>Sport</th>
                                    <th>Block Pattern</th>
                                    <th>
                                        Option
                                        <a href="#" data-toggle="tooltip" data-message="Neck, waist or other options"><span class="glyphicon glyphicon-info-sign"></span></a>
                                    </th>
                                    <th>Brand</th>
                                    <th>Design Sheet</th>
                                    <th>
                                        Item ID
                                        <a href="#" data-toggle="tooltip" data-message="QStrike Item ID"><span class="glyphicon glyphicon-info-sign"></span></a>
                                    </th>
                                    <th>Priority</th>
                                    <th>Deadline</th>
                                    <th>Requested By</th>
                                    <th>Type</th>
                                    <th>Application Type</th>
                                    <th>Uploaded</th>
                                    <th>Customizer ID</th>
                                    <th id="select-filter">Status</th>
                                    <th>Notes</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                @forelse ($style_requests as $style_request)
                                    <tr class='style-request-{{ $style_request->id }}'>
                                        <td class="style-id">{{ $style_request->id }}</td>
                                        <td class="style-name">{{ $style_request->name }}</td>
                                        <td class="style-sport">{{ $style_request->sport }}</td>
                                        <td class="style-block-pattern">{{ $style_request->block_pattern }}</td>
                                        <td class="style-option">{{ $style_request->block_pattern_option }}</td>
                                        <td class="style-brand">{{ $style_request->brand }}</td>
                                        <td>
                                            <input type="hidden" name="style_design_sheet_url"" class="style-design-sheet-url" value="{{ $style_request->design_sheet_url }}">
                                            <a href="#" class="btn btn-defult btn-xs file-link" data-link="{{ $style_request->design_sheet_url }}">Link</a>
                                        </td>
                                        <td class="style-qstrike-item-id">{{ $style_request->qstrike_item_id }}</td>
                                        <td class="style-priority">{{ $style_request->priority }}</td>
                                        <td class="style-deadline">{{ $style_request->deadline }}</td>
                                        <td>{{ $style_request->requested_by }}</td>
                                        <td class="style-type">{{ $style_request->type }}</td>
                                        <td class="style-application-type">{{ $style_request->uniform_application_type }}</td>
                                        <td>
                                            @if($style_request->uploaded)
                                                {{ 'Yes' }}
                                            @else
                                                {{ 'No' }}
                                            @endif
                                            <a href="#" data-toggle="tooltip" data-message="{{ $style_request->uploaded_by }}"><span class="glyphicon glyphicon-info-sign"></span></a>

                                        </td>
                                        <!-- <td class="style-customizer-id">{{ $style_request->customizer_id }}</td> -->
                                        <td>
                                            <input type="hidden" name="style_customizer_id"" class="style-customizer-id" value="{{ $style_request->customizer_id }}">
                                            <a href="#" class="btn btn-defult btn-xs file-link" data-link="http://customizer.prolook.com/builder/0/{{ $style_request->customizer_id }}">{{ $style_request->customizer_id }}</a>
                                        </td>
                                        <td>
                                            <input type="hidden" name="style_status"" class="style-status" value="{{ $style_request->status }}">
                                            <input type="hidden" name="style_is_fixed"" class="style-is-fixed" value="{{ $style_request->is_fixed }}">
                                            <input type="hidden" name="style_customizer_available"" class="style-customizer-available" value="{{ $style_request->customizer_available }}">
                                            {{ $style_request->status }}

                                            @if($style_request->is_fixed == 1 AND $style_request->status == 'rejected')
                                                <a href="#" data-toggle="tooltip" data-message="Fixed"><span class="glyphicon glyphicon-info-sign"></span></a>
                                             @endif
                                        </td>
                                        <td>
                                            <input type="hidden" class="notes" value="{{$style_request->notes}}">
                                            @if($style_request->is_fixed)
                                                <button class="view-notes btn btn-success btn-sm">View</button>
                                            @elseif($style_request->notes != '' AND  $style_request->status == 'pending')
                                                <button class="view-notes btn btn-info btn-sm">View</button>
                                            @elseif($style_request->notes != '' AND  $style_request->status == 'rejected')
                                                <button class="view-notes btn btn-danger btn-sm">View</button>
                                            @else
                                                <button class="view-notes btn btn-default btn-sm">View</button>
                                            @endif
                                        </td>

                                        <td>
                                            <button type="button" class="btn btn-info btn-xs edit" ><i class="glyphicon glyphicon-edit"></i></button>

                                            <a href="#" class="delete-style-request btn btn-xs btn-danger pull-right" data-style-request-id="{{ $style_request->id }}" role="button">
                                                    <i class="glyphicon glyphicon-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                @empty
                                    <tr>
                                        <td colspan='14'>
                                            No Styles
                                        </td>
                                    </tr>
                                @endforelse
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        @include('administration.style-requests.modal.styles-customizer-add-edit')
        @include('administration.style-requests.modal.note')
        @include('partials.confirmation-modal')
    </section>
@endsection

@section('custom-scripts')
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.js"></script>
    <script type="text/javascript" src="/jquery-ui/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/js/bootbox.min.js"></script>
    <script type="text/javascript" src="/dropzone/dropzone.js"></script>
    <script type="text/javascript" src="/underscore/underscore.js"></script>
    <script type="text/javascript" src="/js/administration/styles-on-customizer.js"></script>

@endsection
