<!-- Trigger the modal with a button -->
<!-- <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>
 -->
<!-- Modal -->
<div id="myModal" class="modal fade" role="dialog">
  <div class="modal-dialog">

    <!-- Modal content-->
    <div class="modal-content">
      <div class="modal-header">
<!--         <button type="button" class="close" data-dismiss="modal">&times;</button> -->
        <h4 class="modal-title">Prolook Uniform Customizer is currently only available for Desktop and Laptop Computers.</h4>
      </div>
      <div class="modal-body">
<form data-toggle="validator" role="form" method="POST" action="/mobile_notification";>
       <input type="hidden" name="_token" value="{{ csrf_token() }}">
 	<h6>We are currently developing an iPad mobile app. Please enter your personal details so that we can notify you once it becomes available on the Apple App Store.</h6>
  <div class="form-group">
    <label for="inputName" class="control-label">Name</label>
    <input name="name" type="text" class="form-control" id="inputName" placeholder="Name" required>
  </div>

  <div class="form-group">
    <label for="inputEmail" class="control-label">Email</label>
    <input name="email" type="email" class="form-control" id="inputEmail" placeholder="Email" data-error="that email address is invalid" required>
    <div class="help-block with-errors"></div>
  </div>
    <div class="form-group">
    <label for="inputName" class="control-label">Contact</label>
    <input name="contact" type="number" class="form-control" id="inputName" placeholder="Number" >
  </div>
   <div class="form-group">
    <label for="inputName" class="control-label">Zip</label>
    <input name="zip" type="number" class="form-control" id="inputName" placeholder="zip" >
  </div>



  <div class="form-group">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
      </div>
      <div class="modal-footer">
       
      </div>
    </div>

  </div>
</div>




<script>

var ua = navigator.userAgent.toLowerCase();

console.log("agent:"+ua);
if((ua.indexOf("android") >= 0) || (ua.indexOf("iphone") >= 0) || (ua.indexOf("ipad") >= 0) ){
	// Do something!
	// Redirect to Android-site?
	console.log("true");
	var modal = $("#myModal").html();

	$( "body" ).detach();
	$("html").append(modal);
	$('#myModal').modal({
	backdrop: 'static',
	keyboard: false
	})
}
 // if( $(window).width() <= "650"){
	// console.log("true");
	// var modal = $("#myModal").html();

	// $( "body" ).detach();
	// $("html").append(modal);
	// $('#myModal').modal({
	// backdrop: 'static',
	// keyboard: false
	// })

 //  }

 // else {
 
 //     console.log("false");
 //  }
// if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
//  console.log("Mobile responsive");
//  var modal = $("#myModal").html();

//  $( "body" ).detach();
// $("html").append(modal);
// $('#myModal').modal({
//   backdrop: 'static',
//   keyboard: false
// })

// }else{
// 	 console.log("desktop");
// }




</script>


