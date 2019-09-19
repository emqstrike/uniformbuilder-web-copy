<div style="display:none;">
<table border="1" id="table">
    <thead style="background-color:#000000">
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
            <td>@if(isset($style_request->complete_part_names)) {{ $style_request->complete_part_names ? 'YES' : 'NO' }} @endif</td>
        </tr>
        @endforeach
    </tbody>
</table>
</div>
<script type="text/javascript" src="/admin-lte-2/jquery/dist/jquery-3.3.1.min.js"></script>
<script type="text/javascript">
$(document).ready( function () {
    function exportTable() {
        var table = document.getElementById("table");
        var html = table.outerHTML;
        var url = 'data:application/vnd.ms-excel,' + escape(html) + 'xls'; // Set your html table into url

        var link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "QX7 Parts Report.xls"); // Choose the file name
        link.click()
        return false;
    }
    exportTable();
} );</script>
