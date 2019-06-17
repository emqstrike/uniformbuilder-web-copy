<div id="general-details" class="row" v-show="activeMenu == 'general-details'">
    <div class="col-md-10 offset-md-2">
        <h4>General Details</h4>

        <hr>

        <div class="row">
            <label class="col-md-5 control-label text-right">Font Name</label>
            <div class="col-md-7">
                <input type="text" class="form-control" v-model="font.name">
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Alias</label>
            <div class="col-md-7">
                <input type="text" class="form-control" v-model="font.alias">
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Tail Sweep</label>
            <div class="col-md-7">
                <input type="checkbox" v-model="font.tail_sweep">
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Script</label>
            <div class="col-md-7">
                <input type="checkbox" v-model="font.script">
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Script</label>
            <div class="col-md-7">
                <input type="checkbox" v-model="font.script">
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Block Font</label>
            <div class="col-md-7">
                <input type="checkbox" v-model="font.block_font">
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Font File</label>
            <div class="col-md-7">
                <input type="file" class="form-control">
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Font Type</label>
            <div class="col-md-7">
                <select v-model="font.type" class="form-control">
                    <option v-for="type in fontTypes" :value="type.value">@{{ type.description }}</option>
                </select>
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Parent Font</label>
            <div class="col-md-7">
                <select v-model="font.parent_id" class="form-control">
                    <option value='0'>---</option>
                </select>
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Brand</label>
            <div class="col-md-7">
                <select v-model="font.brand" class="form-control">
                    <option v-for="brand in brands" :value="brand">@{{ brand }}</option>
                </select>
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Sports</label>
            <div class="col-md-7">
                <multiselect v-model="font.sports" :multiple="true" :options="sportsOptions" :searchable="true" :close-on-select="false" :show-labels="false"></multiselect>
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Block Patterns</label>
            <div class="col-md-7">
                <multiselect v-model="font.block_patterns" :multiple="true" :options="blockPatternOptions" :searchable="true" :close-on-select="false" :show-labels="false"></multiselect>
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Target Block Pattern Option</label>
            <div class="col-md-7">
                <multiselect v-model="font.block_pattern_options" :multiple="true" :options="blockPatternOptionOptions" :searchable="true" :close-on-select="false" :show-labels="false"></multiselect>
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Tail Sweep Properties</label>
            <div class="col-md-7">
                <textarea v-model="font.tail_sweep_properties" class="form-control"></textarea>
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Customizer Available</label>
            <div class="col-md-7">
                <input type="checkbox" v-model="font.customizer_available">
            </div>
        </div>

        <div class="row">
            <label class="col-md-5 control-label text-right">Ipad Available</label>
            <div class="col-md-7">
                <input type="checkbox" v-model="font.ipad_available">
            </div>
        </div>
    </div>
</div>