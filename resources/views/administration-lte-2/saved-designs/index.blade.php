@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Saved Designs')
                    <h1>Saved Designs</h1>
                </div>

                <div class="box-body">
                    <table class="data-table table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Sport</th>
                                <th>Block Pattern</th>
                                <th>Option</th>
                                <th>Front</th>
                                <th>Back</th>
                                <th>Left</th>
                                <th>Right</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Date Saved</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            @forelse ($savedDesigns as $design)
                                <tr class='design-{{ $design->id }}'>
                                    <td>{{ $design->id }}</td>
                                    <td>{{ $design->name }}</td>
                                    <td>{{ $design->sport }}</td>
                                    <td>{{ $design->block_pattern }}</td>
                                    <td>{{ $design->option }}</td>
                                    <td>
                                        <a href="{{ $design->front_thumbnail }}" class="btn btn-defult btn-xs file-link" target="_blank">
                                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="{{ $design->back_thumbnail }}" class="btn btn-defult btn-xs file-link" target="_blank">
                                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="{{ $design->left_thumbnail }}" class="btn btn-defult btn-xs file-link" target="_blank">
                                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="{{ $design->right_thumbnail }}" class="btn btn-defult btn-xs file-link" target="_blank">
                                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                                        </a>
                                    </td>
                                    <td>{{ $design->first_name }} {{ $design->last_name }}</td>
                                    <td>{{ $design->email }}</td>
                                    <td>{{ $design->created_at }}</td>
                                    <td>
                                        <a href="http://customizer.prolook.com/my-saved-design/{{ $design->id }}" class="btn btn-primary btn-xs" target="_blank">View in Customizer</a>
                                    </td>
                            @empty
                                <tr>
                                    <td colspan='6'>
                                        No Designs
                                    </td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script type="text/javascript" src="/js/libs/bootstrap-table/bootstrap-table.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $('.data-table').DataTable({
                "paging": true,
                "lengthChange": false,
                "searching": true,
                "ordering": false,
                "info": true,
                "autoWidth": false
            });
        });
    </script>
@endsection