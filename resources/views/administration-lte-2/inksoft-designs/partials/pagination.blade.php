<ul class="pagination">
    @if ($paginator->getPrevUrl())
        <li><a href="{{ $paginator->getPrevUrl()}}/{{$current_page - 1}}">&laquo; Previous</a></li>
    @else
    @endif
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
    @if ($paginator->getNextUrl())
        <li><a href="{{ $paginator->getNextUrl() }}/{{$current_page + 1}}">Next &raquo;</a></li>
    @else
    @endif
</ul>
