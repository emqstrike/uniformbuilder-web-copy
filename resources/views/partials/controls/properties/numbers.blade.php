<script type="text/mustache" id="m-decorations-numbers">
<div id="numbers-panel">
	<div class="content">
		<h5>Decoration Numbers</h5>
		<div class="menu-selection">
			<div class="pad-large">
				<span class="button">
					Add Application
				</span>
			</div>
			<div class="pad-large">
				<span class="button">
					View All Applications
				</span>
			</div>
		</div>

		@{{ #applications }}
		<div class="application">
			<li>@{{ application.name }}</li>
			<input type="text" name="" value="@{{ text }}" class="application-text" data-application-type="@{{ type }}" data-font-id="@{{ font_obj.id }}">
			<select class="font-style">
				@{{ #fonts }}
				<option value="@{{ id }}">
					@{{ caption }}
				</option>
				@{{ /fonts }}
			</select>
		</div>
		@{{ /applications }}
	</div>
</div>
</script>

<script type="text/mustache" id="m-decorations-numbers-"></script>