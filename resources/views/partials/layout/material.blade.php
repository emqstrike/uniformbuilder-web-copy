<!-- <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>

<br>
<div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          <img src="images/icons/size.png" height="50"/>
        </a>
      </h4>
    </div>

<div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
         <img src="images/icons/size.png" height="50"/>
        </a>
      </h4>
    </div>

<div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          <img src="images/icons/size.png" height="50"/>
        </a>
      </h4>
    </div> -->

<div class="row">

  <div class="col-md-4">


    <!-- <div class="tab_button">
      <button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#shirt_panel')">
        Jersey
      </button>
    </div>

    <br />


    <div class="tab_button">
      <button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#pattern_panel')">Pattern</button>
    </div>

    <br />

    <div class="tab_button">
      <button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#pipings_panel')">Pipings</button>
    </div>

    <br />

    <div class="tab_button">
      <button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#logo_panel')">Logo</button>
    </div>

    <br />

    <div class="tab_button">
      <button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#numbers_panel')">#</button>
    </div>

    <br />

    <div class="tab_button">
      <button id="btn_free_form" class="btn-white btn btn-default btn-sm btn-tab" onclick="switch_panel('#name_panel')">Name</button>
    </div> -->

    <br />


    <hr />  

    <div class="tab_button">
      <a href="#myModal" data-backdrop="false" data-toggle="modal">!!!</a>
    </div>

    <hr />

    </div>

    <div class="col-md-9">

      <div class="panels">

        <hr />

        



        <div class="option_panel" id="sleeve_panel">

          <h2>Sleeves</h2>
          <h4>Base Color</h4><br />
          @include('partials.colors',['data_target' =>'sleeves', 'event_class' => 'change-color',])

        <div class="option_panel" id="pants_panel">
    
          <h2>Pants</h2>
          <h4>Base Color</h4><br />
          @include('partials.colors',['data_target' =>'pants', 'event_class' => 'change-color',])

          <br /><br /><h4>Piping Color</h4><br />
          @include('partials.colors',['data_target' =>'pants_piping', 'event_class' => 'change-color'])

          <br /><br /><h4>Belt Color</h4><br />
          @include('partials.colors',['data_target' =>'belt', 'event_class' => 'change-color'])
        <div class="option_panel" id="pattern_panel">

          <h2>Pattern</h2>
          <h4>Layer 1</h4><br />
          @include('partials.colors', ['data_target' =>'c_1', 'event_class' => 'path-change-color','layer' => 'c_1'])
          <br />

          <h4>Layer 2</h4><br />
          @include('partials.colors', ['data_target' =>'c_2', 'event_class' => 'path-change-color','layer' => 'c_2'])
          <br />

          <h4>Layer 3</h4><br />
          @include('partials.colors', ['data_target' =>'c_3', 'event_class' => 'path-change-color', 'layer' => 'c_3'])
          <br />

          <h4>Layer 4</h4><br />
          @include('partials.colors', ['data_target' =>'c_4', 'event_class' => 'path-change-color','layer' => 'c_4'])
          <br />

          <hr />

        </div>

        <div class="option_panel" id="pipings_panel">

          <h2>Pipings</h2>
          
          @include('partials.colors', ['data_target' =>'pipings', 'event_class' => 'path-change-color','layer' => 'pipings'])
          
          <br /><br />

          <em>
            
            This also updates the colors of Numbers and Names for now just for testing purposes.

          </em>


          <hr />

        </div>

        <div class="option_panel" id="logo_panel">

          <h2>Logo</h2>

          <div class="panel panel-default">
           
            <div id="miaDropzone" class="panel-body text-center">
           
              Drop logo here ...
           
            </div>

          </div>

          
          <br />
          <em>Please upload a transparent PNG
          <br /> (300px x 300px)</em>
  
          <br />
          <hr />

        </div>

        <div class="option_panel" id="numbers_panel">

          <h2>Numbers</h2>

          <input type="text" name="txtNumber" id="txtNumber" class="txtNumber" maxlength="2" /> <button onclick="texture_canvas.load_number()">Apply</button>
          
          <br />
        
        </div>

        <div class="option_panel" id="name_panel">

          <h2>Name</h2>

          Team Name:<br />
          <input type="text" name="txtTeamName" id="txtTeamName" class="txtTeamName" maxlength="9" />
          <br /><br />

          Last Name:<br />
          <input type="text" name="txtName" id="txtName" class="txtName" maxlength="10" />

          <br /><br />
          <button onclick="texture_canvas.load_name()">Apply</button>
          
          <br />
        
        </div>


        
</div>