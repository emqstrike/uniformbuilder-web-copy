<table border="1">
<thead>
<tr style="background: black; color: white">
    <th colspan="2">Shipping Information</th>
</tr>
</thead>
<tbody>
@if (isset($shipping['organization']))
<tr>
    <td>Organization</td>
    <td>{{ $shipping['organization'] }}</td>
</tr>
@endif

@if (isset($shipping['contact']))
<tr>
    <td>Contact Person</td>
    <td>{{ $shipping['contact'] }}</td>
</tr>
@endif

@if (isset($shipping['email']))
<tr>
    <td>Email Address</td>
    <td>{{ $shipping['email'] }}</td>
</tr>
@endif

@if (isset($shipping['phone']))
<tr>
    <td>Phone Number</td>
    <td>{{ $shipping['phone'] }}</td>
</tr>
@endif

@if (isset($shipping['fax']))
<tr>
    <td>Fax Number</td>
    <td>{{ $shipping['fax'] }}</td>
</tr>
@endif

@if (isset($shipping['address']))
<tr>
    <td>Address</td>
    <td>{{ $shipping['address'] }}</td>
</tr>
@endif

@if (isset($shipping['city']))
<tr>
    <td>City</td>
    <td>{{ $shipping['city'] }}</td>
</tr>
@endif

@if (isset($shipping['state']))
<tr>
    <td>State</td>
    <td>{{ $shipping['state'] }}</td>
</tr>
@endif

@if (isset($shipping['zip']))
<tr>
    <td>Zip Code</td>
    <td>{{ $shipping['zip'] }}</td>
</tr>
@endif
</tbody>
</table>