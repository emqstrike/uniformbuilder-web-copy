<div id="breadcrumbs">
    <div class="row">
        <div class="col-xs-12">
            <ol class="breadcrumb">
                <?php $counter = 1; ?>

                @foreach ($breadcrumbs as $key => $value)
                    @if ($value)
                        @if ($key != 0)
                            @foreach ($value as $title => $url)
                                @if ($key == 1)
                                    <li class="breadcrumb-item"><a href="{{ url($url) }}">Dashboard</a></li>
                                @else
                                    <li class="breadcrumb-item">
                                        <a href="{{ url($url) }}">
                                            @if ($counter == count($breadcrumbs))
                                                @yield('page-title')
                                            @else
                                                {{ ucwords(str_replace('_', ' ', $title)) }}
                                            @endif
                                        </a>
                                    </li>
                                @endif
                            @endforeach
                        @endif
                    @endif
                    
                    <?php $counter++; ?>
                @endforeach
            </ol>
        </div>
    </div>
</div>