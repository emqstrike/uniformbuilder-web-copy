@extends('administration-lte-2.lte-main')

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Fabrics')

                    <h1>Fabrics</h1>
                    <a href="{{ route('v1_create_fabric') }}" class="btn btn-flat btn-sm btn-success">Add</a>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='table table-bordered fonts' id="fabrics-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Material ID</th>
                                <th>Material</th>
                                <th>Material Abbreviation</th>
                                <th>Thumbnail</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            @foreach ($fabrics as $fabric)
                                <tr>
                                    <td>{{ $fabric->id }}</td>
                                    <td>{{ $fabric->factory_material_id }}</td>
                                    <td>{{ $fabric->material }}</td>
                                    <td>{{ $fabric->material_abbreviation }}</td>
                                    <td>
                                        @if ($fabric->thumbnail)
                                            <img src="{{ $fabric->thumbnail }}" style="width: 50px; height: 50px;">
                                        @endif
                                    </td>
                                    <td>
                                        <a href="{{ route('v1_edit_fabric', ['id' => $fabric->id]) }}" class="btn btn-flat btn-xs btn-primary">Edit</a>
                                        <button type="button" data-id="{{ $fabric->id }}" class="btn btn-flat btn-xs btn-danger remove-fabric">Remove</button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            $('#fabrics-table').DataTable({
                "paging": true,
                "searching": true,
            });

            $(document).on('click', '.remove-fabric', function() {
                let remove = confirm('Are you sure you want to remove this fabric?'); 

                var data = {id: $(this).data('id')};

                if (remove == true) {
                    axios.post('fabric/delete', data).then((response) => {
                        if (response.data.success == true) {
                            location.reload();
                        }
                    });
                }
            });
        });
    </script>
@endsection