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
			<input type="text" name="" value="@{{ text }}" class="application-text" data-application-type="@{{ application_type }}" data-font-id="@{{ font_obj.id }}" data-application-layer="@{{ application.layer }}">
			<select class="font-style" data-application-type="@{{ application_type }}" data-application-layer="@{{ application.layer }}">
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