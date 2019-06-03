<v-dialog v-model="menuDialog" persistent max-width="600px">
    <v-card>
        <v-card-title>
            <span class="headline">Edit Menu</span>
        </v-card-title>

        <v-card-text>
            <div class="form-group">
                <label class="control-label">Route Name</label>
                <input type="text" class="form-control" v-model="menu.route_name">
            </div>

            <div class="form-group">
                <label class="control-label">Menu Text</label>
                <input type="text" class="form-control" v-model="menu.menu_text">
            </div>

            <div class="form-group">
                <label class="control-label">Type</label>
                <select class="form-control" v-model="menu.type">
                    <option value="header">Header</option>
                    <option value="link">Link</option>
                </select>
            </div>

            <div class="form-group">
                <label class="control-label">Icon Class</label>
                <multiselect v-model="iconValue" placeholder="Choose an icon" label="icon" track-by="icon" :options="icons" :option-height="104"  :show-labels="false" @select="selectIcon">
                    <template slot="singleLabel" slot-scope="props">
                        <span :class="props.option.icon"></span>
                        <span>@{{ props.option.icon }}</span>
                    </template>

                    <template slot="option" slot-scope="props">
                        <span :class="props.option.icon"></span>
                        <span>@{{ props.option.icon }}</span>
                    </template>
                </multiselect>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="update(menu)">Update</v-btn>
            <v-btn color="blue darken-1" flat @click="cancel(menu)">Close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>