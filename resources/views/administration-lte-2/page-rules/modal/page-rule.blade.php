<v-dialog v-model="pageRuleDialog" fullscreen hide-overlay transition="dialog-bottom-transition" @keydown.esc="cancel(pageRule)">
    <v-card>
        <v-toolbar dark color="primary" fixed flat>
            <v-btn icon dark @click="cancel(pageRule)">
                <v-icon>close</v-icon>
            </v-btn>

            <v-toolbar-title v-if="action == 'edit'">Edit Page Rule</v-toolbar-title>
            <v-toolbar-title v-else>Add Page Rule</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn dark flat @click="update(pageRule)" v-if="action == 'edit'">Update Page Rule</v-btn>
                <v-btn dark flat @click="save(pageRule)" v-else>Save Page Rule</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-content style="padding: 100px 0;">
            <v-layout>
                <v-flex xs10 offset-xs1>
                    <v-list three-line subheader>
                        <v-alert :value="true" color="error" v-if="errors.length">
                            <ul>
                                <li v-for="error in errors">@{{ error }}</li>
                            </ul>
                        </v-alert>

                        <div class="form-group">
                            <label class="control-label">Type</label>
                            <input type="text" class="form-control" v-if="action == 'edit'" disabled="disabled" v-model="pageRule.type">
                            <select class="form-control" v-model="pageRule.type" v-if="action == 'add'">
                                <option v-for="type in types" :value="type">@{{ type }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="control-label">Role</label>
                            <input type="text" class="form-control" v-if="action == 'edit'" disabled="disabled" v-model="pageRule.role">
                            <select class="form-control" v-model="pageRule.role" v-if="action == 'add'">
                                <option v-for="role in availableRoles" :value="role.code">@{{ role.name }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="control-label">Allowed Pages</label>
                            <multiselect v-model="pageRule.allowed_pages" :multiple="true" :options="getAllowedPages" :searchable="false" :close-on-select="false" :show-labels="false"></multiselect>
                        </div>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-content>
    </v-card>
</v-dialog>