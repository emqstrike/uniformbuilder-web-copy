<link rel="stylesheet" type="text/css" href="/font-awesome-latest/css/font-awesome.min.css">
<ul class="sidebar-menu">
  <li class="header">MAIN NAVIGATION</li>
  <li class="active">
    <a href="/administration">
      <i class="fa fa-dashboard"></i> <span>Dashboard</span></i>
    </a>
  </li>
  <li class="treeview" data-step="2" data-intro="View Orders" data-position='right'>
    <a href="#" >
      <i class="glyphicon glyphicon-list-alt"></i>
      <span>Orders</span>
      <i class="fa fa-angle-left pull-right"></i>
    </a>
    <ul class="treeview-menu">
      <li data-position='right'>
        <a href="/administration/{{ env('ENDPOINT_VERSION') }}/ordersMinified">
          <i class="glyphicon glyphicon-list-alt"></i> <span>Orders *NEW*</span>
        </a>
      </li>
    </ul>
  </li>
  <li class="treeview" data-step="2" data-intro="Manage price items" data-position='right'>
    <a href="#" >
      <i class="fa fa-money"></i>
      <span>Price Items</span>
      <i class="fa fa-angle-left pull-right"></i>
    </a>
    <ul class="treeview-menu">
      <li data-step="4" data-intro="Configure features." data-position='right'>
        <a href="/administration/price_items">
          <i class="fa fa-money"></i> <span>Dashboard</span>
        </a>
      </li>
      <li  data-step="5" data-intro="Helper information">
        <a href="/administration/price_item_templates">
          <i class="fa fa-cube"></i> <span>Templates</span>
        </a>
      </li>
    </ul>
  </li>
  <li class="treeview" data-step="3" data-intro="For builder settings." data-position='right'>
    <a href="#" >
      <i class="fa fa-bookmark"></i>
      <span>Features and Helpers</span>
      <i class="fa fa-angle-left pull-right"></i>
    </a>
    <ul class="treeview-menu">
      <li data-step="4" data-intro="Configure features." data-position='right'>
        <a href="/administration/feature_flags">
          <i class="fa fa-bookmark"></i> <span>Feature Flags</span>
        </a>
      </li>
      <li  data-step="5" data-intro="Helper information">
        <a href="/administration/helpers">
          <i class="fa fa-info"></i> <span>Helpers</span>
        </a>
      </li>
      <li  data-step="6" data-intro="Total Records">
        <a href="/administration/total_records">
          <i class="fa fa-info-circle"></i> <span>Total Records</span>
        </a>
      </li>

      <li data-step="6" data-intro="Analytics">
          <a href="{{ route('analytics') }}">
              <i class="fa fa-bar-chart"></i>
              <span>Analytics</span>
          </a>
      </li>
    </ul>
  </li>

    <li class="treeview" data-position='right'>
        <a href="#" >
            <i class="glyphicon glyphicon-picture"></i>
            <span>Artworks</span>
        </a>

        <ul class="treeview-menu">
      <!--       <li>
                <a href="/administration/artwork_requests" >
                    <i class="glyphicon glyphicon-picture"></i> <span>Artwork Requests (Orders)</span>
                </a>
            </li>
            <li>
                <a href="#" >
                    <i class="glyphicon glyphicon-picture"></i> <span>Artwork Requests (Saved Designs)</span>
                </a>
            </li>
            <li>
                <a href="/administration/custom_artwork_requests">
                    <i class="glyphicon glyphicon-picture"></i>
                    <span>Custom Artwork Requests</span>
                </a>
            </li> -->
            <li>
                <a href="/administration/logo_requests" >
                    <i class="glyphicon glyphicon-picture"></i> <span>Logo Requests ( ALL )</span>
                </a>
            </li>
        </ul>
    </li>

  <li class="treeview" data-step="3" data-intro="For builder settings." data-position='right'>
    <a href="#" >
      <i class="fa fa-gear"></i>
      <span>Uniform Settings</span>
      <i class="fa fa-angle-left pull-right"></i>
    </a>
    <ul class="treeview-menu">
      <li data-step="4" data-intro="For Accents settings." data-position='right'>
        <a href="/administration/accents">
          <i class="fa fa-star"></i> <span>Accents</span>
        </a>
      </li>
      <li data-step="4" data-intro="For Application Sizes settings." data-position='right'>
        <a href="/administration/application_sizes">
          <i class="fa fa-cube"></i> <span>Application Sizes</span>
        </a>
      </li>
      <li  data-step="5" data-intro="For Block patterns settings.">
        <a href="/administration/block_patterns">
          <i class="fa fa-star"></i> <span>Block Patterns</span>
        </a>
      </li>
      <li  data-step="6" data-intro="For Design Sets settings.">
        <a href="/administration/design_sets">
          <i class="fa fa-shirtsinbulk"></i> <span>Design Sets</span>
        </a>
      </li>
      <li  data-step="6" data-intro="For Item Sizes settings.">
        <a href="/administration/item_sizes">
          <i class="fa fa-arrows-v"></i> <span>Item Sizes</span>
        </a>
      </li>
      <li  data-step="7" data-intro="For Mascots settings.">
        <a href="/administration/mascots">
          <i class="fa fa-linux"></i> <span>Mascots</span>
        </a>
      </li>
      <li  data-step="8" data-intro="For Mascots category settings.">
        <a href="/administration/mascots_categories">
          <i class="fa fa-circle"></i> <span>Mascots Categories</span>
        </a>
      </li>
      <li  data-step="8" data-intro="For Mascots group category settings.">
        <a href="/administration/mascots_groups_categories">
          <i class="fa fa-circle"></i> <span>Mascots Groups Categories</span>
        </a>
      </li>
      <li  data-step="7" data-intro="For Mascots settings.">
        <a href="/administration/mascot_sizes">
          <i class="fa fa-linux"></i> <span>Mascot Sizes</span>
        </a>
      </li>
      <li data-step="9" data-intro="For Materials settings.">
        <a href="/administration/materials/Football 2017">
          <i class="fa fa-cubes"></i> <span>Materials</span>
        </a>
      </li>
      <li data-step="9" data-intro="For Materials settings.">
        <a href="/administration/material/single_page">
          <i class="fa fa-cubes"></i> <span>Materials (Single Page)</span>
        </a>
      </li>
      <li data-step="9" data-intro="For Materials Fabric settings.">
        <a href="/administration/materials_fabrics">
          <i class="fa fa-cubes"></i> <span>Fabric Factory</span>
        </a>
      </li>
<!--       <li data-step="9" data-intro="For Mockup Sets.">
        <a href="/administration/mockup_sets">
          <i class="fa fa-cubes"></i> <span>Mockup Sets</span>
        </a>
      </li> -->
      <li data-step="9" data-intro="For Materials settings.">
        <a href="/administration/news_letters">
          <i class="fa fa-cubes"></i> <span>News Letters</span>
        </a>
      </li>
      <li  data-step="10" data-intro="For Factories settings.">
        <a href="/administration/factories">
          <i class="fa fa-building-o"></i> <span>Factories</span>
        </a>
      </li>
      <li  data-step="11" data-intro="For Uniform Categories settings.">
        <a href="/administration/categories">
          <i class="fa fa-soccer-ball-o"></i> <span>Uniform Categories</span>
        </a>
      </li>
      <li  data-step="12" data-intro="For Fabrics settings.">
        <a href="/administration/fabrics">
          <i class="fa fa-cut"></i> <span>Fabrics</span>
        </a>
      </li>
      <li  data-step="13" data-intro="For Colors settings.">
        <a href="/administration/colors">
          <i class="fa fa-paint-brush"></i> <span>Colors</span>
        </a>
      </li>
      <li  data-step="13" data-intro="For Colors settings.">
        <a href="/administration/colors_sets">
          <i class="fa fa-paint-brush"></i> <span>Colors Sets</span>
        </a>
      </li>
      <li  data-step="14" data-intro="For Patterns settings.">
        <a href="/administration/patterns">
          <i class="fa fa-table"></i> <span>Patterns</span>
        </a>
      </li>
      <li  data-step="15" data-intro="For PlaceHolders settings.">
        <a href="/administration/placeholders">
          <i class="fa fa-table"></i> <span>Placeholders</span>
        </a>
      </li>
      <li  data-step="16" data-intro="For preferrence settings.">
        <a href="/administration/preferences">
          <i class="glyphicon glyphicon-bookmark"></i> <span>Preferences</span>
        </a>
      </li>
      <li  data-step="17" data-intro="For Fonts settings.">
        <a href="/administration/fonts">
          <i class="fa fa-font"></i> <span>Fonts</span>
        </a>
      </li>
      <li  data-step="18" data-intro="For Gradients settings.">
        <a href="/administration/gradients">
          <i class="fa fa-adjust"></i> <span>Gradients</span>
        </a>
      </li>
      <li  data-step="19" data-intro="For Linings settings.">
        <a href="/administration/linings">
          <i class="fa fa-cubes"></i> <span>Linings</span>
        </a>
      </li>
      <li  data-step="20" data-intro="For Splash Image settings.">
        <a href="/administration/splash_images">
          <i class="fa fa-cubes"></i> <span>Splash Image</span>
        </a>
      </li>
      <li  data-step="21" data-intro="For Reversible Groups settings.">
        <a href="/administration/reversible_groups">
          <i class="fa fa-retweet"></i> <span>Reversible Groups</span>
        </a>
      </li>
    </ul>
  </li>

  <li class="treeview" data-step="3" data-intro="For Accounts settings." data-position='right'>
      <a href="#">
      <i class="glyphicon glyphicon-user"></i>
      <span>Accounts</span>
        <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li  data-step="17" data-intro="For User settings.">
            <a href="/administration/users">
            <i class="glyphicon glyphicon-user"></i> <span>Users</span>
            </a>
          </li>
          <li  data-step="17" data-intro="For SalesReps settings.">
            <a href="/administration/sales_reps">
          <i class="glyphicon glyphicon-user"></i> <span>Sales Reps</span>
          </a>
          </li>
           <li  data-step="17" data-intro="For User Orders.">
            <a href="/administration/user/orders/0">
          <i class="glyphicon glyphicon-user"></i> <span>User Orders</span>
          </a>
          </li>
        </ul>
  </li>
  <li data-position='right'>
    <a href="/administration/feedbacks" >
      <i class="glyphicon glyphicon-envelope"></i> <span>Feedbacks</span>
    </a>
  </li>
  <li data-position='right'>
    <a href="/administration/saved_designs" >
      <i class="glyphicon glyphicon-blackboard"></i> <span>Saved Designs</span>
    </a>
  </li>
    <li class="treeview" data-step="3" data-intro="For builder settings." data-position='right'>
    <a href="#" >
      <i class="fa fa-font"></i>
      <span>Fonts</span>
      <i class="fa fa-angle-left pull-right"></i>
    </a>
    <ul class="treeview-menu">
      <li  data-step="17" data-intro="For Fonts settings.">
        <a href="/administration/fonts">
          <i class="fa fa-font"></i> <span>Fonts</span>
        </a>
      </li>
      <li  data-step="17" data-intro="For Fonts settings.">
        <a href="/administration/tailsweeps">
          <i class="fa fa-font"></i> <span>Tailsweeps</span>
        </a>
      </li>
    </ul>
  </li>
  <li data-position='right'>
    <a href="/administration/parts_aliases">
      <i class="fa fa-list-alt"></i>
      <span>Aliases</span>
      </a>
  </li>
  <li data-position='right'>
    <a href="/administration/cuts_links">
      <i class="fa fa-link"></i>
      <span>Cuts Links</span>
      </a>
  </li>
  <li class="treeview" data-step="3" data-intro="For builder settings." data-position='right'>
    <a href="#" >
      <i class="fa fa-file-text-o"></i>
      <span>Styles</span>
      <i class="fa fa-angle-left pull-right"></i>
    </a>
    <ul class="treeview-menu">
      <li  data-step="17" data-intro="Request a style to be made.">
        <a href="/administration/style_requests">
          <i class="fa fa-file-text-o"></i> <span>Style Requests</span>
        </a>
      </li>
       <li  data-step="17" data-intro="View Approved Style Requests.">
        <a href="/administration/approved_style_requests">
          <i class="fa fa-thumbs-up"></i> <span>Approved Style Requests</span>
        </a>
      </li>
      <li  data-step="17" data-intro="View Approved Style Requests.">
        <a href="/administration/styles_on_customizer">
          <i class="fa fa-check-square-o"></i> <span>Styles on Customizer</span>
        </a>
      </li>
      <li  data-step="17" data-intro="View individual styles info">
        <a href="/administration/style_viewer">
          <i class="fa fa-search"></i> <span>Style Viewer</span>
        </a>
      </li>
      <li  data-step="17" data-intro="View individual styles info">
        <a href="/administration/styles_stats">
          <i class="fa fa-pie-chart"></i> <span>Style Statistics</span>
        </a>
      </li>
       <li  data-step="17" data-intro="View individual styles info">
        <a href="/administration/styles_indexes">
          <i class="fa fa-list-ul"></i> <span>Styles Indexes</span>
        </a>
      </li>
    </ul>
  </li>
   <li data-position='right'>
    <a href="/administration/inksoft_designs">
      <i class="fa fa-file-image-o"></i>
      <span>Inksoft Designs</span>
      </a>
  </li>
  <li data-position='right'>
    <a href="/administration/single_view_applications">
      <i class="fa fa-eye"></i>
      <span>Single View Applications</span>
      </a>
  </li>
  <li class="treeview" data-step="3" data-intro="For Tagged Styles settings." data-position='right'>
      <a href="#">
      <i class="fa fa-tags"></i>
      <span>Tagged Styles</span>
        <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li  data-step="17" data-intro="For Tagged Styles Items settings.">
            <a href="/administration/tagged_styles">
            <i class="fa fa-tag"></i> <span>Tagged Styles</span>
            </a>
          </li>
          <li  data-step="17" data-intro="For Total Tagged Styles settings.">
            <a href="/administration/tagged_styles/totals">
          <i class="fa fa-tag"></i> <span>Total Tagged Styles</span>
          </a>
          </li>

        </ul>
  </li>
  <li class="treeview" data-step="3" data-intro="For Clients settings." data-position='right'>
      <a href="#">
      <i class="fa fa-handshake-o"></i>
      <span>Clients</span>
        <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
          <li  data-step="17" data-intro="For Brands settings.">
            <a href="/administration/brandings">
            <i class="fa fa-industry"></i> <span>Brands</span>
            </a>
          </li>
          <li  data-step="17" data-intro="For Dealders settings.">
            <a href="/administration/dealers">
          <i class="fa fa-handshake-o"></i> <span>Dealers</span>
          </a>
          </li>
        </ul>
  </li>
  <li data-position='right'>
    <a href="/administration/user_pairings">
      <i class="fa fa-link"></i>
      <span>User Pairings</span>
      </a>
  </li>

    <li class="treeview" data-position="right">
        <a href="#">
            <i class="fa fa-exclamation-triangle"></i>
            <span>User Restriction</span>
        </a>

        <ul class="treeview-menu">
            <li>
                <a href="{{ route('page_rules') }}">
                    <i class="fa fa-exclamation-triangle"></i>
                    <span>Page Rules</span>
                </a>
            </li>

            <li>
                <a href="{{ route('pages') }}">
                    <i class="fa fa-file-text"></i>
                    <span>Pages</span>
                </a>
            </li>
        </ul>
    </li>

    <li data-position='right'>
        <a href="{{ route('menus') }}">
            <i class="fa fa-link"></i>
            <span>Menus</span>
        </a>
    </li>
</ul>
