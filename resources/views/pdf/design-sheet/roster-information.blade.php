<h1 style="background: black; color: white">
Roster
</h1>

@if (count($roster) > 0)
<table border="1">
<tr>
    <th>Size</th>
    <th>Quantity</th>
    <th>Last Name</th>
    @if (!$is_wrestling)
    <th>Number</th>
    <th>Last Name Application</th>
    <th>Sleeve Type</th>
    @endif
</tr>
</thead>

@foreach ($roster as $member)

<tr>
    <td>{{ $member['size'] }}</td>
    <td>{{ $member['quanitity'] }}</td>
    <td>{{ $member['lastname'] }}</td>
    @if (!$is_wrestling)
    <td>{{ $member['number'] }}</td>
    <td>{{ $member['lastNameApplication'] }}</td>
    <td>{{ $member['sleeveType'] }}</td>
    @endif
</tr>

@endforeach

</table>
@endif