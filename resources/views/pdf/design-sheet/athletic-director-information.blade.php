<table border="1">
<thead>
<tr style="background: black; color: white">
    <th colspan="2">Athletic Director Information</th>
</tr>
</thead>

<tbody>
@if (isset($athletic_director['contact']))
<tr>
    <td>Contact Person</td>
    <td>{{ $athletic_director['contact'] }}</td>
</tr>
@endif

@if (isset($athletic_director['email']))
<tr>
    <td>Email Address</td>
    <td>{{ $athletic_director['email'] }}</td>
</tr>
@endif

@if (isset($athletic_director['phone']))
<tr>
    <td>Phone Number</td>
    <td>{{ $athletic_director['phone'] }}</td>
</tr>
@endif

@if (isset($athletic_director['fax']))
<tr>
    <td>Fax Number</td>
    <td>{{ $athletic_director['fax'] }}</td>
</tr>
@endif
</tbody>
</table>