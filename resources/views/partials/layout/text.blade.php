	  <h3>Text</h3>
	  <hr>
	  <center>
	  <h3 id="liveh1"><input type="text" placeholder="Type some text"></h3>
	  <h3><select id="selecth1FontFamily" name="selectFontFamily" onchange="updateh1family();"></h3>
	    <option> Serif </option>
	    <option> Arial </option>
	    <option> Sans-Serif </option>                                  
	    <option> Tahoma </option>
	    <option> Verdana </option>
	    <option> Lucida Sans Unicode </option>  
	    <option> Comic Sans </option>                             
	  </select>
   	  </center>	
  
<h2>Name</h2>

		Team Name:<br />
	 	<input type="text" name="txtTeamName" id="txtTeamName" class="txtTeamName" maxlength="9" />
	 	<br /><br />

		Last Name:<br />
	 	<input type="text" name="txtName" id="txtName" class="txtName" maxlength="10" />

	 	<br /><br />
	 	<button onclick="texture_canvas.load_name()">Apply</button>
		
		<br />