<!-- Left side column. contains the sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">MAIN NAVIGATION</li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="../../index.html"><i class="fa fa-circle-o"></i> Dashboard v1</a></li>
            <li><a href="../../index2.html"><i class="fa fa-circle-o"></i> Dashboard v2</a></li>
          </ul>
        </li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-shopping-cart"></i> <span>Orders</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/administration/{{ env('ENDPOINT_VERSION') }}/ordersMinified"><i class="fa fa-cart-plus"></i> Orders</a></li>
            <li><a href="../layout/boxed.html"><i class="fa fa-search"></i> Search Orders</a></li>
            <li><a href="../layout/fixed.html"><i class="fa fa-paper-plane"></i> Sent Orders</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-github-square"></i> <span>Brands</span>
          </a>
        </li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-list-alt"></i> <span>Master Data</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="../tables/simple.html"><i class="fa fa-th-large"></i> Block Patterns</a></li>
            <li><a href="../tables/simple.html"><i class="fa fa-tint"></i> Colors</a></li>
            <li><a href="/administration/{{ env('ENDPOINT_VERSION') }}/fabrics"><i class="fa fa-map"></i> Fabrics <span class="pull-right-container"><small class="label pull-right bg-green"><i class="fa fa-exclamation"></i></small></span></a></li>
            <li><a href="../tables/data.html"><i class="fa fa-building"></i> Factories</a></li>
            <li><a href="/administration/{{ env('ENDPOINT_VERSION') }}/fonts"><i class="fa fa-font"></i> Fonts <span class="pull-right-container"><small class="label pull-right bg-green"><i class="fa fa-exclamation"></i></small></span></a></li>
            <li><a href="../tables/data.html"><i class="fa fa-bars"></i> Gradients</a></li>
            <li><a href="../tables/data.html"><i class="fa fa-github-alt"></i> Mascots</a></li>
            <li><a href="/administration/{{ env('ENDPOINT_VERSION') }}/patterns"><i class="fa fa-table"></i> Patterns<span class="pull-right-container"><small class="label pull-right bg-green"><i class="fa fa-exclamation"></i></small></span></a></li>
          </ul>
        </li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-users"></i> <span>Users</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/administration/{{ env('ENDPOINT_VERSION') }}/users"><i class="fa fa-users"></i> All Users<span class="pull-right-container"><small class="label pull-right bg-green"><i class="fa fa-exclamation"></i></small></span></a></li>
            <li><a href="../tables/data.html"><i class="fa fa-folder"></i> User Transactions</a></li>
          </ul>
        </li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-list-alt"></i> <span>User Interactions</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="../tables/simple.html"><i class="fa fa-comments"></i> Feedbacks</a></li>
            <li><a href="../tables/simple.html"><i class="fa fa-object-ungroup"></i> Inksoft Designs</a></li>
            <li><a href="../tables/data.html"><i class="fa fa-linux"></i> Logo Requests</a></li>
            <li><a href="../tables/data.html"><i class="fa fa-image"></i> Saved Designs</a></li>
            <li><a href="../tables/data.html"><i class="fa fa-tags"></i> Tagged Styles</a></li>
            <li><a href="../tables/data.html"><i class="fa fa-user-plus"></i> User Pairings</a></li>
          </ul>
        </li>

        <li class="header">STYLES CONFIGURATIONS</li>
        <li class="treeview">
          <a href="#">
            <i class="fa fa-cubes"></i> <span>Styles</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="../tables/simple.html"><i class="fa fa-cubes"></i> All styles</a></li>
            <li><a href="../tables/simple.html"><i class="fa fa-bars"></i> Style Sets</a></li>
            <li><a href="../tables/data.html"><i class="fa fa-search"></i> Search Style</a></li>
            <li><a href="../tables/data.html"><i class="fa fa-plus-square"></i> Request a Style</a></li>
          </ul>
        </li>

        <li class="treeview">
          <a href="#">
            <i class="fa fa-dollar"></i> <span>Pricing & Sizes</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/administration/{{ env('ENDPOINT_VERSION') }}/price_templates"><i class="fa fa-dollar"></i> Price Item Templates<span class="pull-right-container"><small class="label pull-right bg-green"><i class="fa fa-exclamation"></i></small></span></a></li>
            <li><a href="../layout/boxed.html"><i class="fa fa-arrows"></i> Templates & Sizes</a></li>
          </ul>
        </li>
         <li class="treeview">
          <a href="#">
            <i class="fa fa-tint"></i> <span>Colors</span>
            <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
          </a>
          <ul class="treeview-menu">
            <li><a href="/administration/{{ env('ENDPOINT_VERSION') }}/colors"><i class="fa fa-paint-brush"></i> Colors<span class="pull-right-container"><small class="label pull-right bg-green"><i class="fa fa-exclamation"></i></small></span></a></li>
            <li><a href="../layout/boxed.html"><i class="fa fa-paint-brush"></i> Color Set</a></li>
          </ul>
        </li>

        <li class="header">HELPERS</li>
        <li><a href="https://adminlte.io/docs"><i class="fa fa-book"></i> <span>Documentation</span></a></li>
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>
