<h1 style="background: black; color: white">
Applications
</h1>

<table border="1">
<thead>
    <tr>
        <th>Location</th>
        <th>Application Type</th>
        <th>Font / Mascot Detail</th>
        <th>Size</th>
        <th>Colors</th>
    </tr>
</thead>

<tbody>
@foreach ($applications as $application)

@php

$application_type = strtoupper(str_replace("_"," ",$application['application_type']));

if ($application_type == "FREE") continue;

@endphp

<tr>
    <td>{{ $application['code'] }}</td>
    <td>{{ $application_type }}</td>


    <td>
    @if (in_array($application_type, ['TEAM NAME', 'PLAYER NAME', 'SHOULDER NUMBER', 'SLEEVE NUMBER', 'FRONT NUMBER', 'BACK NUMBER']))

        <div>
            <label>
                <small>Accent:</small>
                <strong>{{ $application['accent_obj']['title'] }}</strong>
            </label>
        </div>
        <div>
            <label>
                <small>Font:</small>
                <strong>{{ $application['font']['name'] }}</strong>
            </label>
        </div>
        <div>
            <label>
                <small>Text:</small>
                <strong>{{ strtoupper( $application['text'] ) }}</strong>
            </label>
        </div>

    @elseif ($application_type == "MASCOT")

        <div>
            <label>{{ $application['mascot']['name'] }}</label>

            @if ($application['mascot']['name'] == 'Custom Logo')

            <a href="{{ $application['customFilename'] }}" target="_new">
                Uploaded File
            </a>

                @php

                // Dissect file name
                // TODO: rewrite this code block
                $filename = $application['customFilename'];
                $extension = strtolower(substr($filename, strrpos($filename, '.') + 1));

                @endphp

                @if (in_array($extension, ['png', 'gif', 'jpg', 'jpeg', 'bmp']))

                <img src="{{ $application['customFilename'] }}" width="50" height="50" />

                @endif


            @else

            <img src="{{ $application['mascot']['icon'] }}" width="50" height="50" />

            @endif

        </div>

    @else
    &nbsp;
    @endif
    </td>


    <td>
    @if (in_array($application_type, ['TEAM NAME', 'PLAYER NAME', 'SHOULDER NUMBER', 'SLEEVE NUMBER', 'FRONT NUMBER', 'BACK NUMBER']))

        @if ($is_wrestling)

        Refer to thumbnail

        @else

            @if (isset($application['font']))
                {{ $application['font'] }}
            @elseif (isset($application['font_size']))
                {{ $application['font_size'] }}
            @endif

        @endif

    @else
    @endif        
    </td>

    <td>
        @php
        $colors = [];
        foreach ($application['color_array'] as $color):
            $colors[] = $color['color_code'];
        endforeach;
        @endphp

        {{ explode(',', $colors) }}

    </td>


</tr>

@endforeach
</tbody>

</table>