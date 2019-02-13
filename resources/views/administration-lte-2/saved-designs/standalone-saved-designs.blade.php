@inject('sampleMenu', 'App\Menus\V1Menu')
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Administration | {{ env('APP_TITLE') }}</title>

<!-- Tell the browser to be responsive to screen width -->
<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
<!-- Bootstrap 3.3.7 -->
<link rel="stylesheet" href="/admin-lte-2/bootstrap/dist/css/bootstrap.min.css">
<!-- Datatables -->
<link rel="stylesheet" href="/admin-lte-2/datatables/css/dataTables.bootstrap.min.css">
<!-- Font Awesome -->
<link rel="stylesheet" href="/admin-lte-2/font-awesome/css/font-awesome.min.css">
<!-- Ionicons -->
<link rel="stylesheet" href="/admin-lte-2/Ionicons/css/ionicons.min.css">
<!-- Theme style -->
<link rel="stylesheet" href="/admin-lte-2/dist/css/AdminLTE.min.css">
<!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
<link rel="stylesheet" href="/admin-lte-2/dist/css/skins/_all-skins.min.css">
<!-- PNotify -->
<link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/pnotify/pnotify.custom.min.css">
<!-- Spectrum -->
<link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/spectrum/spectrum.css">
<!-- Select2 -->
<link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/select2/select2.min.css">

<link rel="stylesheet" href="/plugins/datepicker/datepicker3.css">
<link rel="stylesheet" href="/plugins/daterangepicker/daterangepicker-bs3.css">

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

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
    </style>
</head>
<body class="skin-black sidebar-mini sidebar-collapse">
    <div class="wrapper">
        <div class="content-wrapper">
               <section class="content">
                <section class="content">
                    <div class="row">
                        <div class="box">
                            <div class="box-header">
                                @section('page-title', 'Saved Designs')

                                <div class="row">
                                    <div class="col-md-4">
                                        <h1>Saved Designs</h1>
                                    </div>

                                    <div class="col-md-8 text-right" style="margin-top: 20px;">
                                        <div class="form-inline">
                                            <input id="searchNameSavedDesigns" type="text" class="form-control" style="margin: 0 10px 0;">
                                            <button id="searchSavedDesigns" class="btn btn-flat btn-primary">Search</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="box-body">
                                <div id="filter" class="row">
                                    <div class="col-md-12 text-right">
                                        <div class="form-inline">
                                            <label>Sports</label>
                                            <select id="sportFilter" class="form-control select2">
                                                <option value="all">All</option>

                                                @foreach ($sports as $sport)
                                                    @if ($sport->sport != null)
                                                        @if ((isset($filters['sport'])) && ($filters['sport'] == $sport->sport))
                                                            <option value="{{ $sport->sport }}" selected="selected">{{ $sport->sport }}</option>
                                                        @else
                                                            <option value="{{ $sport->sport }}">{{ $sport->sport }}</option>
                                                        @endif
                                                    @endif
                                                @endforeach
                                            </select>

                                            <label>Block Pattern</label>
                                            <select id="blockPatternFilter" class="form-control select2">
                                                <option value="all">All</option>

                                                @foreach ($block_patterns as $block_pattern)
                                                    @if ($block_pattern->name != null)
                                                        @if ((isset($filters['blockPattern'])) && ($filters['blockPattern'] == $block_pattern->name))
                                                            <option value="{{ $block_pattern->name }}" selected="selected">{{ $block_pattern->name }}</option>
                                                        @else
                                                            <option value="{{ $block_pattern->name }}">{{ $block_pattern->name }}</option>
                                                        @endif
                                                    @endif
                                                @endforeach
                                            </select>

                                            <label>Option</label>
                                            <select id="optionFilter" class="form-control select2">
                                                <option value="all">All</option>

                                                @foreach ($neck_options as $neck_option)
                                                    @if ((isset($filters['neckOption'])) && ($filters['neckOption'] == $neck_option->option))
                                                        <option value="{{ $neck_option->option }}" selected="selected">{{ $neck_option->option }}</option>
                                                    @else
                                                        <option value="{{ $neck_option->option }}">{{ $neck_option->option }}</option>
                                                    @endif
                                                @endforeach
                                            </select>

                                            <label>User</label>
                                            <select id="userFilter" class="form-control select2">
                                                <option value="all">All</option>

                                                @foreach ($users as $user)
                                                    @if (! is_null($user->email) && (! $user->email == ""))
                                                        @if ((isset($filters['user'])) && ($filters['user'] == $user->email))
                                                            <option value="{{ $user->email }}" selected="selected">{{ $user->first_name }} {{ $user->last_name }}</option>
                                                        @else
                                                            <option value="{{ $user->email }}">{{ $user->first_name }} {{ $user->last_name }}</option>
                                                        @endif
                                                    @endif
                                                @endforeach
                                            </select>

                                            <label>Date</label>
                                            <div class="input-group input-daterange" style="margin: 0 10px;">
                                                <input id="startDate" type="text" class="form-control">
                                                <div class="input-group-addon">to</div>
                                                <input id="endDate" type="text" class="form-control">
                                            </div>

                                            <button id="filterSavedDesign" class="btn btn-success btn-flat">Filter</button>
                                            <button id="clearFilter" class="btn btn-default btn-flat">Clear</button>
                                        </div>
                                    </div>
                                </div>

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
                                                    <a href="{{ env('CUSTOMIZER_HOST') }}/my-saved-design/{{ $design->id }}" class="btn btn-primary btn-xs" target="_blank">View in Customizer</a>
                                                </td>
                                            </tr>
                                        @empty
                                            <tr>
                                                <td colspan='6'>
                                                    No Designs
                                                </td>
                                            </tr>
                                        @endforelse
                                    </tbody>
                                </table>

                                <ul class="pagination">
                                    @foreach ($paginator->getPages() as $page)
                                        @if ($page['url'])
                                            <li @if ($page['isCurrent']) class="active" @endif>
                                                <a href="{{ $page['url'] }}/{{ $page['num'] }}?{{ $queryString }}">
                                                    {{ $page['num'] }}
                                                </a>
                                            </li>
                                        @else
                                            <li class="disabled">
                                                <span>{{ $page['num'] }}</span>
                                            </li>
                                        @endif
                                    @endforeach
                                </ul>

                            </div>
                        </div>
                    </div>
            </section>
        </section>

        </div>
    </div>

<script type="text/javascript" src="/admin-lte-2/jquery/dist/jquery-3.3.1.min.js"></script>

<script type="text/javascript" src="/admin-lte-2/jquery-ui/dist/jquery-ui.min.js"></script>

<script type="text/javascript" src="/admin-lte-2/datatables/js/jquery.dataTables.min.js"></script>

<script type="text/javascript" src="/admin-lte-2/datatables/js/dataTables.bootstrap.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="/admin-lte-2/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- SlimScroll -->
<script src="/admin-lte-2/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="/admin-lte-2/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="/admin-lte-2/dist/js/adminlte.min.js"></script>
<!-- AdminLTE for demo purposes -->
<!-- <script src="/admin-lte-2/dist/js/demo.js"></script> -->
<script type="text/javascript" src="/js/bootbox.min.js"></script>
<!-- PNotify -->
<script type="text/javascript" src="/admin-lte-2/js/libs/pnotify/pnotify.custom.min.js"></script>
<!-- Spectrum -->
<script type="text/javascript" src="/admin-lte-2/js/libs/spectrum/spectrum.js"></script>
<!-- Underscore -->
<script type="text/javascript" src="/admin-lte-2/js/libs/underscore/underscore-min.js"></script>
<!-- Select2 -->
<script type="text/javascript" src="/admin-lte-2/js/libs/select2/select2.min.js"></script>
<!-- Common -->
<script type="text/javascript" src="/js/administration/common.js"></script>

<script src="/plugins/daterangepicker/daterangepicker.js"></script>
<script src="/plugins/datepicker/bootstrap-datepicker.js"></script>

    <script>
        $(document).ready(function() {
            $('.select2').select2();

            var date = new Date();
            var currentMonth = date.getMonth();
            var currentYear = date.getFullYear();
            var startDate = new Date(currentYear, currentMonth, 1);
            var endDate = new Date(currentYear, currentMonth + 1, 0);

            $('#startDate').datepicker({
                format: "yyyy-mm-dd"
            });

            $('#endDate').datepicker({
                format: "yyyy-mm-dd"
            });

            @if (isset($filters['range']))
                $('#startDate').datepicker('setDate', '{{ $filters['range'][0] }}');
                $('#endDate').datepicker('setDate', '{{ $filters['range'][1] }}');
            @endif

            $('#searchSavedDesigns').click(function() {
                filter();
            });

            $('#filterSavedDesign').click(function() {
                filter();
            });

            $('#clearFilter').click(function() {
                window.location.href = "{{ route('saved_designs_stand_alone') }}";
            });

            function filter() {
                var name = $('#searchNameSavedDesigns').val();
                var sport = $('#sportFilter').val();
                var blockPattern = $('#blockPatternFilter').val();
                var option = $('#optionFilter').val();
                var user = $('#userFilter').val();

                var dateRange = "";

                if (($('#startDate').val() != '') && ($('#endDate').val() != '')) {
                    dateRange = '&range[]=' + $('#startDate').val() + '&range[]=' + $('#endDate').val();
                }

                var url = "{{ route('saved_designs_stand_alone') }}?name=" + name + "&sport=" + sport + "&blockPattern=" + blockPattern + "&neckOption=" + option + "&user=" + user + dateRange;
                window.location.href = url;
            }
        });
    </script>

</body>

</html>


