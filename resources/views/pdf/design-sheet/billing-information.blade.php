<table border="1">
<thead>
<tr style="background: black; color: white">
    <th colspan="2">Billing Information</th>
</tr>
</thead>
<tbody>
@if (isset($billing['organization']))
<tr>
    <td>Organization</td>
    <td>{{ $billing['organization'] }}</td>
</tr>
@endif

@if (isset($billing['contact']))
<tr>
    <td>Contact Person</td>
    <td>{{ $billing['contact'] }}</td>
</tr>
@endif

@if (isset($billing['email']))
<tr>
    <td>Email Address</td>
    <td>{{ $billing['email'] }}</td>
</tr>
@endif

@if (isset($billing['phone']))
<tr>
    <td>Phone Number</td>
    <td>{{ $billing['phone'] }}</td>
</tr>
@endif

@if (isset($billing['fax']))
<tr>
    <td>Fax Number</td>
    <td>{{ $billing['fax'] }}</td>
</tr>
@endif

@if (isset($billing['address']))
<tr>
    <td>Address</td>
    <td>{{ $billing['address'] }}</td>
</tr>
@endif

@if (isset($billing['city']))
<tr>
    <td>City</td>
    <td>{{ $billing['city'] }}</td>
</tr>
@endif

@if (isset($billing['state']))
<tr>
    <td>State</td>
    <td>{{ $billing['state'] }}</td>
</tr>
@endif

@if (isset($billing['zip']))
<tr>
    <td>Zip Code</td>
    <td>{{ $billing['zip'] }}</td>
</tr>
@endif
</tbody>
</table>