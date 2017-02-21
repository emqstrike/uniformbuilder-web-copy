<h1 style="background: black; color: white">
Parts
</h1>

@if (count($parts) > 0)
<table border="1">

<thead>
    <tr>
        <th>Part</th>
        <th>Color</th>
        <th>Pattern</th>
    </tr>
</thead>

<tbody>
@foreach ($parts as $part)

<tr>
    <td>{{ $part['code'] }}</td>
    <td>{{ $part['color'] }}</td>
    <td>
        <div>
            <label>{{ $part['pattern']['pattern_obj']['name'] }}</label>
        </div>
    </td>
</tr>

@endforeach
</tbody>

</table>
@endif
