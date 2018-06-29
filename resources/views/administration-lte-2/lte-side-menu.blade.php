@inject('v1Menu', 'App\Menus\V1Menu')

<aside class="main-sidebar">
    <section class="sidebar">
        @if ($v1Menu->getMenu())
            <ul class="sidebar-menu" data-widget="tree">
                @foreach ($v1Menu->getMenu() as $key => $menu)
                    @include('administration-lte-2.partials.menus.menu')
                @endforeach
            </ul>
        @endif
    </section>
</aside>