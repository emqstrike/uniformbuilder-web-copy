@if (isset($client))
<table border="1">
<thead>
<tr style="background: black; color: white">
    <th colspan="2">Client Information</th>
</tr>
</thead>
<tbody>
<tr>
    <td>Client / Organization</td>
    <td>{{ $client }}</td>
</tr>
</tbody>
</table>
@endif