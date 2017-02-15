<h1 style="background: black; color: white">
Sizes Breakdown
</h1>

@if ($sizes_count > 0)
<table border="1">
<thead>
<tr>
    <th>Size</th>
    <th>Quantity</th>
</tr>
</thead>
<tbody>
@foreach ($sizes as $sise)
<tr>
    <td>{{ $size['size'] }}</td>
    <td>{{ $size['quantity'] }}</td>
</tr>
@endforeach

<tr>
    <td>Total</td>
    <td>
        <strong>
            {{ $sizes_total }}
        </strong>
    </td>
</tr>
</tbody>
</table>
@endif


@if (!empty($notes))
<div>
    <label>Additional Notes</label>
    <p>
        {{ $notes }}
    </p>
</div>
@endif


@if (!empty($attached_file))
<div>
    <label>Attachment</label>
    <p>
        {{ $attached_file }}
    </p>
</div>
@endif
