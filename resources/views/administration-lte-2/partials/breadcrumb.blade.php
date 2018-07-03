<div id="breadcrumbs">
    <div class="row">
        <div class="col-xs-12">
            <ol class="breadcrumb">
                @foreach ($breadcrumbs as $key => $value)
                    @if ($key != 0)
                        @foreach ($value as $title => $url)
                            @if ($key == 1)
                                <li class="breadcrumb-item"><a href="{{ url($url) }}">Dashboard</a></li>
                            @else
                                <li class="breadcrumb-item"><a href="{{ url($url) }}">{{ ucwords(str_replace('_', ' ', $title)) }}</a></li>
                            @endif
                        @endforeach
                    @endif
                @endforeach
            </ol>
        </div>
    </div>
</div>