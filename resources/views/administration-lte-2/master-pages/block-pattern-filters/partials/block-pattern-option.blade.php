<div id="menu" ref="menu" class="block-pattern-option-container">
    <div class="container">
        <div class="col-md-12">
            <h3 v-if="action == 'edit'">Edit Block Pattern Option</h3>
            <h3 v-else>Add Block Pattern Option</h3>

            <div class="form-group">
                <label class="control-label">Name</label>
                <input type="text" id="neck-option-name" class="form-control" v-model="block_pattern_option.name">
            </div>

            <div class="form-group">
                <label class="control-label">Alias</label>
                <input type="text" id="neck-option-alias" class="form-control" v-model="block_pattern_option.alias">
            </div>

            <div class="form-group">
                <label class="control-label">Placeholder Overrides</label>
                <textarea class="form-control" id="neck-option-placeholder-overrides" v-model="block_pattern_option.placeholder_overrides"></textarea>
            </div>

            <div class="form-group">
                <label class="control-label">
                    <h4>Block Pattern Option 2</h4>
                    <button class="btn btn-xs btn-flat btn-success" @click="addBlockPatternOption2()">Add option</button>
                </label>

                <div v-for="option_2_item, index in current_block_pattern_option_2">
                    <div class="block-pattern-option-2">
                        <div class="row">
                            <div class="col-md-5">
                                <label class="control-label">Layer</label>
                                <input type="text" class="form-control" v-model="option_2_item.layer">
                            </div>

                            <div class="col-md-5">
                                <label class="control-label">Name</label>
                                <input type="text" class="form-control" v-model="option_2_item.name">
                            </div>

                            <div class="col-md-2">
                                <label class="control-label">&nbsp;</label>
                                <button class="btn btn-flat btn-xs btn-danger" @click="removeBlockPatternOption2(option_2_item)">Remove</button>
                            </div>
                        </div>

                        <div class="block-pattern-option-3-container">
                            <label class="control-label">
                                Block Pattern Option 3
                                <button class="btn btn-xs btn-flat btn-success" @click="addBlockPatternOption3(option_2_item)">Add option</button>
                            </label>

                            <div v-for="option_3_item, index in option_2_item.block_pattern_option_3">
                                <div class="block-pattern-option-3">
                                    <div class="row">
                                        <div class="col-md-5">
                                            <label class="control-label">Layer</label>
                                            <input type="text" class="form-control" v-model="option_3_item.layer">
                                        </div>

                                        <div class="col-md-5">
                                            <label class="control-label">Name</label>
                                            <input type="text" class="form-control" v-model="option_3_item.name">
                                        </div>

                                        <div class="col-md-2">
                                            <label class="control-label">&nbsp;</label>
                                            <button class="btn btn-flat btn-xs btn-danger" @click="removeBlockPatternOption3(option_2_item, option_3_item )">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="form-inline">
                <button class="btn btn-sm btn-flat btn-primary" @click="updateBlockPatternOption()">
                    <span v-if="action == 'edit'">Update block pattern option</span>
                    <span v-else>Save block pattern option</span>
                </button>

                <button class="btn btn-sm btn-flat btn-danger" @click="closePanel(block_pattern_option, block_pattern_option_2[block_pattern_option.index])" style="display: inline-block">Cancel</button>
            </div>
        </div>
    </div>
</div>