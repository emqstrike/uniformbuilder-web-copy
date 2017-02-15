<table border="1">
<thead>
<tr style="background: black; color: white">
    <th colspan="2">Uniform Information</th>
</tr>
</thead>
<tbody>
@if (isset($uniform['description']))
<tr>
    <td>Uniform Name</td>
    <td>{{ $uniform['description'] }}</td>
</tr>
@endif

@if (isset($uniform['applicationType']))
<tr>
    <td>Application Type</td>
    <td>{{ $uniform['applicationType'] }}</td>
</tr>
@endif

@if (isset($uniform['sku']))
<tr>
    <td>SKU</td>
    <td>{{ $uniform['sku'] }}</td>
</tr>
@endif

@if (isset($uniform['price']))
<tr>
    <td>Price</td>
    <td>{{ $uniform['price'] }}</td>
</tr>
@endif

@if (isset($uniform['url']))
<tr>
    <td>Uniform URL</td>
    <td>{{ $uniform['url'] }}</td>
</tr>
@endif

@if (isset($pdf_url))
<tr>
    <td>PDF URL</td>
    <td>{{ $pdf_url }}</td>
</tr>
@endif
</tbody>
</table>