@extends('administration-lte-2.lte-main')

@section('styles')
    <link rel="stylesheet" href="/plugins/datepicker/datepicker3.css">
    <link rel="stylesheet" href="/plugins/daterangepicker/daterangepicker-bs3.css">
@endsection

@section('content')
    <section class="content">
        <div class="row">
            <div class="box">
                <div class="box-header">
                    @section('page-title', 'Analytics')
                    
                    <div class="col-md-8">
                        <h1>Analytics</h1>
                    </div>

                    <div class="col-md-4" style="margin-top: 20px;">
                        <div class="col-md-10">
                            <div class="input-group input-daterange">
                                <input id="startDate" type="text" class="form-control">
                                <div class="input-group-addon">to</div>
                                <input id="endDate" type="text" class="form-control">
                            </div>
                        </div>

                        <div class="col-md-2">
                            <button id="fetch-data-btn" class="btn btn-primary">Fetch data</button>
                        </div>
                    </div>
                </div>

                <div class="box-body">
                    <table data-toggle='table' class='data-table table table-bordered'>
                        <thead>
                            <tr>
                                <th>Endpoint</th>
                                <th>Number of visits</th>
                                <th>Origin</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            @forelse ($endpointVisits as $endpointVisit)
                                <tr>
                                    <td>{{ $endpointVisit['endpoint'] }}</td>
                                    <td>{{ $endpointVisit['page_views'] }}</td>
                                    <td>{{ $endpointVisit['country'] }}</td>
                                    <td>{{ $endpointVisit['date'] }}</td>
                                </tr>
                            @empty
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('scripts')
    <script type="text/javascript">
        $(document).ready(function() {
            $('.data-table').DataTable();
            
            var date = new Date();
            var currentMonth = date.getMonth();
            var currentYear = date.getFullYear();
            var startDate = new Date(currentYear, currentMonth, 1);
            var endDate = new Date(currentYear, currentMonth + 1, 0);

            $('#startDate').datepicker({
                format: "yyyy-mm-dd"
            });

            @if ($startDate)
                $('#startDate').datepicker('setDate', '{{ $startDate }}');
            @else
                $('#startDate').datepicker('setDate', startDate);
            @endif

            $('#endDate').datepicker({
                format: "yyyy-mm-dd"
            });

            @if ($endDate)
                $('#endDate').datepicker('setDate', '{{ $endDate }}');
            @else
                $('#endDate').datepicker('setDate', endDate);
            @endif

            $('#fetch-data-btn').click(function() {
                var startDate = $('#startDate').val();
                var endDate = $('#endDate').val();

                window.location.href = "{{ route('v1_analytics_index') }}/?startDate=" + startDate + "&endDate=" + endDate;
            });
        });
    </script>
@endsection