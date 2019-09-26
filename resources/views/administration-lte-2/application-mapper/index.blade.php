@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="col-md-12">
                <div class="box">
                    <div class="box-header">
                        @section('page-title', 'Application Mappers')
                        <h1>Application Mappers</h1>
                    </div>

                    <div class="box-body">
                        <a href="{{ route('v1_create_application_mapper') }}" class="btn btn-flat btn-primary">
                            Create application mapper
                        </a>

                        <div style="margin-top: 30px; margin-bottom: 30px;">
                            @include('administration.partials.flash-message')
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <table class="table data-table table-bordered table-hover display" width="100%">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>3D Block Pattern</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        @foreach ($applicationMappers as $applicationMapper)
                                            <tr>
                                                <td>{{ $applicationMapper->id }}</td>
                                                <td>
                                                    @foreach ($masterBlockPatterns as $masterBlockPattern)
                                                        @if ($masterBlockPattern->id == $applicationMapper->master_block_pattern_id)
                                                            {{ $masterBlockPattern->block_pattern_name }}
                                                        @endif
                                                    @endforeach
                                                </td>

                                                <td>
                                                    <a href="{{ route('v1_edit_application_mapper', ['id' => $applicationMapper->id]) }}" class="btn btn-flat btn-success">Edit</a>
                                                    <button class="btn btn-flat btn-danger remove" data-id="{{ $applicationMapper->id }}">Delete</button>
                                                </td>
                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            $('.remove').click(function() {
                var id = $(this).data('id');

                let remove = confirm('Are you sure you want to remove this application mapper?');

                if (remove == true) {
                    axios.get('application_mapper/' + id + '/delete').then((response) => {
                        if (response.data.success === true) {
                            location.reload();
                        }
                    });
                }
            });
        });
    </script>
@endsection