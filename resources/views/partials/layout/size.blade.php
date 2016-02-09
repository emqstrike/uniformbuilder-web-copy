<div class="row">

	<div class="col-md-12 uniform-sizes">
		<div class="col-md-12">
			<div class='col-md-1 uniform-size yxs' data-is-selected='0' data-size='YXS'>YXS</div>
			<div class='col-md-1 uniform-size ys' data-is-selected='0' data-size='YS'>YS</div>
			<div class='col-md-1 uniform-size ym' data-is-selected='0' data-size='YM'>YM</div>
			<div class='col-md-1 uniform-size yl' data-is-selected='0' data-size='YL'>YL</div>
			<div class='col-md-1 uniform-size yxl' data-is-selected='0' data-size='YXL'>YXL</div>
			<div class='col-md-1 uniform-size y2xl' data-is-selected='0' data-size='Y2XL'>Y2XL</div>
			<div class='col-md-1 uniform-size y3xl' data-is-selected='0' data-size='Y3XL'>Y3XL</div>
		</div>
		<div class="col-md-12">
			<div class='col-md-1 uniform-size xs' data-is-selected='0' data-size='XS'>XS</div>
			<div class='col-md-1 uniform-size s' data-is-selected='0' data-size='S'>S</div>
			<div class='col-md-1 uniform-size m' data-is-selected='0' data-size='M'>M</div>
			<div class='col-md-1 uniform-size l' data-is-selected='0' data-size='L'>L</div>
			<div class='col-md-1 uniform-size xl' data-is-selected='0' data-size='XL'>XL</div>
			<div class='col-md-1 uniform-size 2xl' data-is-selected='0' data-size='2XL'>2XL</div>
			<div class='col-md-1 uniform-size 3xl' data-is-selected='0' data-size='3XL'>3XL</div>
		</div>			
	</div>

	<div class="col-md-12">
		<hr>
		<label>TEAM INFO</label>
		<button class='open-team-roster-modal'>
			<span class='fa fa-list-ol'></span>
			Edit Roster
		</button>
		<hr>

		<table class="table table-bordered table-striped table-hover">
			<thead>
				<th>Number</th>
				<th>Name</th>
				<th>Size</th>
			</thead>
			<tbody class='roster-list'>
			</tbody>
		</table>
	</div>
</div>

<script id="roster-list" type="text/mustache">
<tr>
	<td>
		@{{ number }}
	</td>
	<td>
		@{{ name }}
	</td>
	<td>
		@{{ size }}
	</td>
</tr>
</script>
