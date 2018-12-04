<ul class="pagination">
    @foreach ($paginator->getPages() as $page)
        @if ($page['url'])
            <li @if ($page['isCurrent']) class="active" @endif>
                <a href="{{ $page['url'] }}/{{ $page['num'] }}?{{ $queryString }}">
                    {{ $page['num'] }}
                </a>
            </li>
        @else
            <li class="disabled">
                <span>{{ $page['num'] }}</span>
            </li>
        @endif
    @endforeach
</ul>