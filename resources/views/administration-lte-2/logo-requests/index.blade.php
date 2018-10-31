@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs-3.3.7/jqc-1.12.4/dt-1.10.13/af-2.1.3/b-1.2.4/b-colvis-1.2.4/r-2.1.0/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="/css/libs/bootstrap-table/bootstrap-table.min.css">
    <link rel="stylesheet" type="text/css" href="/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">

    <style>
        .select2 {
            text-align: left;
        }

        #filter {
            margin-bottom: 30px;
        }

        .select2-selection__rendered {
            line-height: 1.5 !important;
        }

        label {
            margin-left: 10px;
        }

        .select2 {
            margin-left: 10px;
        }

        .badge-success {
            background: #28a745;
        }

        .badge-danger {
            background: #dc3545;
        }

        blockquote {
            font-size: 14px;
        }
    </style>
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Logo Requests')

                    <div class="col-md-4">
                        <h1>Logo Requests</h1>
                    </div>

                    <div class="col-md-8 text-right">
                        <div class="form-inline" style="position: relative; top: 25px;">
                            <label>Origin</label>
                            <select id="origins-filter" class="form-control select2">
                                <option value="all">All</option>

                                @foreach ($origins as $origin)
                                    @if ((isset($filters['origin'])) && ($filters['origin'] == $origin->origin))
                                        <option value="{{ $origin->origin }}" selected="selected">
                                    @else
                                        <option value="{{ $origin->origin }}">
                                    @endif
                                        {{ ucwords($origin->origin) }}
                                    </option>
                                @endforeach
                            </select>

                            <label>Type</label>
                            <select id="types-filter" class="form-control select2">
                                <option value="all">All</option>

                                @foreach ($types as $type)
                                    @if ((isset($filters['type'])) && ($filters['type'] == $type->type))
                                        <option value="{{ $type->type }}" selected="selected">
                                    @else
                                        <option value="{{ $type->type }}">
                                    @endif
                                        {{ ucwords(str_replace('_', ' ', $type->type)) }}
                                    </option>
                                @endforeach
                            </select>

                            <label>Client</label>
                            <select id="client-filter" class="form-control select2">
                                <option value="all">All</option>

                                @foreach ($clientNames as $client)
                                    @if ($client->client_name != '')
                                        @if ((isset($filters['client_name'])) && ($filters['client_name'] == $client->client_name))
                                            <option value="{{ $client->client_name }}" selected="selected">
                                        @else
                                            <option value="{{ $client->client_name }}">
                                        @endif
                                            {{ $client->client_name }}
                                        </option>
                                    @endif
                                @endforeach
                            </select>

                            <label>Status</label>
                            <select id="status-filter" class="form-control select2">
                                <option value="all">All</option>
                                
                                @foreach ($statuses as $status)
                                    @if ($status->status != '')
                                        @if ((isset($filters['status'])) && ($filters['status'] == $status->status))
                                            <option value="{{ $status->status }}" selected="selected">
                                        @else
                                            <option value="{{ $status->status }}">
                                        @endif
                                            {{ ucwords(str_replace('_', ' ', $status->status)) }}
                                        </option>
                                    @endif
                                @endforeach
                            </select>

                            <button id="filter-logo-requests" class="btn btn-success btn-flat">Filter</button>
                            <button id="clear-filter" class="btn btn-default btn-flat">Clear</button>
                        </div>
                    </div>
                </div>

                <div class="box-body">
                    <table class='data-table table table-bordered table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Origin</th>
                                <th>Type</th>
                                <th>Reference ID</th>
                                <th>Client</th>
                                <th>Submitted By</th>
                                <th>Artworks</th>
                                <th>Notes</th>
                                <th>User Notes</th>
                                <th>Status</th>
                                <th>Assigned GA</th>
                                <th>Date Submitted</th>
                                <th>Date Finished</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            @forelse ($logo_requests as $logo_request)
                                <tr data-property="{{ json_encode($logo_request->properties) }}">
                                    <td>{{ $logo_request->id }}</td>
                                    <td>{{ $logo_request->origin }}</td>

                                    <td>
                                        <div>
                                            {{ $logo_request->type }}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {{ $logo_request->reference_id }}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {{ $logo_request->client_name }}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {{ $logo_request->submitted_by_user_id }}
                                        </div>
                                    </td>

                                    <td>
                                        <table>
                                            <tbody>
                                                @if (isset($logo_request->properties))
                                                    <?php $ctr = 0; ?>

                                                    @foreach ($logo_request->properties as $item)
                                                        <tr>
                                                            <td>
                                                                <img src="{{ $item['file'] }}" style="display: block; height: 30px; width: 30px;">
                                                                Application #{{ $item['code'] }}<br>
                                                                <a href="{{ route('v1_add_logo_request', ['logo_request_id' => $logo_request->id, 'logo_index' => $ctr, 'logo_request_user_id' => $logo_request->submitted_by_user_id]) }}" class="btn btn-flat btn-xs btn-primary">
                                                                    Upload Artwork
                                                                </a>
                                                            </td>
                                                        </tr>

                                                        <?php $ctr++; ?>
                                                    @endforeach
                                                @endif
                                            </tbody>
                                        </table>
                                    </td>

                                    <td>
                                        <?php  $notes = []; ?>

                                        @if ($logo_request->properties)
                                            @foreach ($logo_request->properties as $property)
                                                @if (isset($property['notes']))
                                                    @if ($property['notes'] != '')
                                                       <?php $notes[] = $property['notes']; ?>
                                                    @endif
                                                @endif
                                            @endforeach
                                        @endif

                                        @if (! empty($notes))
                                            <button class="btn btn-xs btn-default view-notes">
                                                View notes
                                            </button> <br><br>
                                        @endif

                                        @if ($logo_request->status == 'completed')
                                            <span class="badge badge-success">Approved</span>
                                        @endif
                                    </td>

                                    <td>
                                        <?php  $userNotes = []; ?>

                                        @if ($logo_request->properties)
                                            @foreach ($logo_request->properties as $property)
                                                @if (isset($property['user_notes']))
                                                    @if ($property['user_notes'] != '')
                                                       <?php $userNotes[] = $property['user_notes']; ?>
                                                    @endif
                                                @endif
                                            @endforeach
                                        @endif

                                        @if (! empty($userNotes))
                                            <button class="btn btn-xs btn-default view-user-notes">
                                                View user notes
                                            </button> <br><br>
                                        @endif
                                    </td>

                                    <td>
                                        <div>
                                            {{ $logo_request->status }}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {{ $logo_request->assigned_ga_id }}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {{ $logo_request->created_at }}
                                        </div>
                                    </td>

                                    <td>
                                        <div>
                                            {{ $logo_request->datetime_finished }}
                                        </div>
                                    </td>

                                    <td>
                                        <a href="#" class="btn btn-flat btn-danger btn-xs reject-logo" data-user-id="{{ $logo_request->submitted_by_user_id }}" data-code="{{ $logo_request->reference_id }}" data-type="{{ $logo_request->type }}">Reject</a>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan='14'>
                                        No New Artwork Requests
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>

                    @include('administration-lte-2.partials.pagination')
                </div>
            </div>
        </div>
    </section>

    @include('administration-lte-2.logo-requests.modal.notes')
    @include('administration-lte-2.logo-requests.modal.user-notes')
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/administration/common.js"></script>
    <script type="text/javascript" src="/js/bootbox.min.js"></script>
    <script type="text/javascript" src="/js/administration/logo-requests.js"></script>
    <script>
        $(document).ready(function() {
            $('#filter-logo-requests').click(function() {
                var origin = $('#origins-filter').val();
                var type = $('#types-filter').val();
                var client = $('#client-filter').val();
                var status = $('#status-filter').val();

                var url = "{{ route('v1_logo_requests') }}?origin=" + origin + "&type=" + type + "&client_name=" + client + "&status=" + status;
                window.location.href = url;
            });

            $('#clear-filter').click(function() {
                window.location.href = "{{ route('v1_logo_requests') }}";
            });

            $('.select2').select2();

            $('.view-notes').click(function() {
                var html = "";

                var properties = $(this).closest('tr').data('property');
                
                $.each(properties, function(key, property) {
                    $.each(property, function(key, value) {
                        if (key == 'notes') {
                            html += "<blockquote>" + value + "</blockquote>";
                        }
                    });
                });

                $('#notes-modal #notes-container').append(html);
                $('#notes-modal').modal('show');
            });

            $('#notes-modal').on('hidden.bs.modal', function (e) {
                $('#notes-modal #notes-container').empty();
            });

            $('.view-user-notes').click(function() {
                var html = "";

                var properties = $(this).closest('tr').data('property');
                
                $.each(properties, function(key, property) {
                    $.each(property, function(key, value) {
                        if (key == 'notes') {
                            html += "<blockquote>" + value + "</blockquote>";
                        }
                    });
                });

                $('#user-notes-modal #user-notes-container').append(html);
                $('#user-notes-modal').modal('show');

                $('#user-notes-modal').modal('show');
            });

            $('#user-notes-modal').on('hidden.bs.modal', function (e) {
                $('#user-notes-modal #user-notes-container').empty();
            });
        });
    </script>
@endsection