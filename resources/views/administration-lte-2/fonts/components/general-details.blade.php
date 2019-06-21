<div v-show="activeMenu == 'general-details'">
    <div class="form-group">
        <div class="colr-md-6 text-center">
            <span :style="'font-family:' + font.name + '; font-size: 30px;'">
                @{{ font.name }} <br>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
            </span>
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Font Name</label>

        <div class="col-md-4">
            <input type="text" class="form-control" name="name" v-model="font.name">
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Alias</label>
        <div class="col-md-4">
            <input type="text" class="form-control" name="alias" v-model="font.alias">
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Tail Sweep</label>
        <div class="col-md-4">
            <input type="checkbox" name="tail_sweep" v-model="font.tail_sweep">
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Script</label>
        <div class="col-md-4">
            <input type="checkbox" name="script" v-model="font.script">
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Block Font</label>
        <div class="col-md-4">
            <input type="checkbox" name="block_font" v-model="font.block_font">
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Block Font</label>
        <div class="col-md-4">
            <input type="checkbox" name="block_font" v-model="font.block_font">
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Font File</label>
        <div class="col-md-4">
            <input type="file" class="form-control" name="font_path" accept="font/*">
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Font Type</label>
        <div class="col-md-4">
            <select v-model="font.type" class="form-control">
                <option v-for="type in fontTypes" :value="type.value">@{{ type.description }}</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Parent Font</label>
        <div class="col-md-4">
            <select v-model="font.parent_id" class="form-control">
                <option value='0'>---</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label" >Brand</label>
        <div class="col-md-4">
            <select v-model="font.brand" class="form-control">
                <option v-for="brand in brands" :value="brand">@{{ brand }}</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Sports</label>
        <div class="col-md-4">
            <multiselect v-model="font.sports" :multiple="true" :options="sportsOptions" :searchable="true" :close-on-select="true" :show-labels="false"></multiselect>
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Block Pattern</label>
        <div class="col-md-4">
            <multiselect v-model="font.block_patterns" :multiple="true" :options="blockPatternOptions" :searchable="true" :close-on-select="true" :show-labels="false"></multiselect>
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Target Block Pattern Option</label>
        <div class="col-md-4">
            <multiselect v-model="font.block_pattern_options" :multiple="true" :options="blockPatternOptionOptions" :searchable="true" :close-on-select="true" :show-labels="false"></multiselect>
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Tail Sweep Properties</label>
        <div class="col-md-4">
            <textarea class="form-control" name="tail_sweep_properties" v-model="font.tail_sweep_properties"></textarea>
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Customizer Available</label>
        <div class="col-md-4">
            <input type="checkbox" name="customizer_available" v-model="font.customizer_available">
        </div>
    </div>

    <div class="form-group">
        <label class="col-md-5 control-label">Ipad Available</label>
        <div class="col-md-4">
            <input type="checkbox" name="ipad_available" v-model="font.ipad_available">
        </div>
    </div>
</div>