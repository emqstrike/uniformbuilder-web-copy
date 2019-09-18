<div style="display:;">
<table border="1">
    <thead>
        <tr>
            <th>MATERIAL ID</th>
            <th>STYLE REQUEST ID</th>
            <th>STYLE ID</th>
            <th>RULE ID</th>
            <th>COMPLETE RULE PART NAMES</th>
        </tr>
    </thead>
    <tbody>
        @foreach($style_requests as $style_request)
        <tr>
            <td>{{ $style_request->material_id }}</td>
            <td>{{ $style_request->id }}</td>
            <td>{{ $style_request->style_id }}</td>
            <td>{{ $style_request->rule_id }}</td>
            <td>y/n</td>
        </tr>
        @endforeach
    </tbody>
</table>
sdasdasd
</div>
<script type="text/javascript" src="/admin-lte-2/jquery/dist/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="/admin-lte-2/jquery-ui/dist/jquery-ui.min.js"></script>
<script type="text/javascript" src="/admin-lte-2/js/libs/underscore/underscore-min.js"></script>
