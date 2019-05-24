<v-dialog v-model="userDialog" fullscreen hide-overlay transition="dialog-bottom-transition" @keydown.esc="cancel(user)">
    <v-card>
        <v-toolbar dark color="primary" fixed flat>
            <v-btn icon dark @click="cancel(user)">
                <v-icon>close</v-icon>
            </v-btn>

            <v-toolbar-title v-if="action == 'edit'">Edit User</v-toolbar-title>
            <v-toolbar-title v-else>Add User</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn dark flat @click="updateUser()" v-if="action == 'edit'">Update user</v-btn>
                <v-btn dark flat @click="createUser()" v-else>Save user</v-btn>
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

                        <v-subheader>User Information</v-subheader>

                        <div class="form-group">
                            <label class="control-label">First Name</label>
                            <input type="text" class="form-control" v-model="user.first_name">
                        </div>

                        <div class="form-group">
                            <label class="control-label">Last Name</label>
                            <input type="text" class="form-control" v-model="user.last_name">
                        </div>

                        <div class="form-group">
                            <label class="control-label">Email Address</label>
                            <input type="text" class="form-control" v-model="user.email" disabled="disabled" v-if="action == 'edit'">
                            <input type="text" class="form-control" v-model="user.email" v-else="action == 'edit'">
                        </div>

                        <div class="form-group">
                            <label class="control-label">Password</label>
                            <input type="password" class="form-control" v-model="user.password">
                        </div>

                        <div class="form-group">
                            <label class="control-label">Confirm Password</label>
                            <input type="password" class="form-control" v-model="user.confirm_password">
                        </div>

                        <div class="form-group">
                            <label class="control-label">Brand</label>
                            <select class="form-control" v-model="user.brand_id">
                                <option v-for="branding in brands" :value="branding.id" :selected="user.brand_id == branding.id">@{{ branding.site_name }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="control-label">Zip Code</label>
                            <input type="text" class="form-control" v-model="user.zip">
                        </div>

                        <div class="form-group">
                            <label class="control-label">Assigned Sales Rep</label>
                            <select class="form-control" v-model="user.default_rep_id">
                                <option v-for="salesRep in salesReps" :value="salesRep.id" :selected="salesRep.id == user.default_rep_id">
                                    @{{ salesRep.last_name }}, @{{ salesRep.first_name }}
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="control-label">Type</label>
                            <select class="form-control" v-model="user.type">
                                <option v-for="type in types" :value="type" :selected="user.type == type">@{{ type }}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label class="control-label">Role</label>
                            <select class="form-control" v-model="user.role">
                                <option v-for="role in roles" :value="role.id" :selected="user.role == role.id">@{{ role.name }}</option>
                            </select>
                        </div>
                    </v-list>

                    <div v-if="(user.role != null) && (user.active)">
                        <v-divider></v-divider>

                        <v-list three-line subheader>
                            <v-subheader>Restrictions</v-subheader>

                            <div class="form-group">
                                <label class="control-label">Default Allowed Pages</label>
                                <multiselect :value="getDefaultAllowedPages" :multiple="true" :disabled="true" :options="getDefaultAllowedPages" :searchable="false" :close-on-select="false" :show-labels="false"></multiselect>
                            </div>

                            <div class="form-group">
                                <label class="control-label">Allowed Pages</label>
                                <multiselect v-model="user.allowed_pages" :multiple="true" :options="getAllowedPages" :searchable="false" :close-on-select="false" :show-labels="false"></multiselect>
                            </div>

                            <div class="form-group">
                                <label class="control-label">Limited Access</label>
                                <multiselect v-model="user.limited_access" :multiple="true" :options="v1Pages" :searchable="false" :close-on-select="false" :show-labels="false"></multiselect>
                            </div>
                        </v-list>
                    </div>
                </v-flex>
            </v-layout>
        </v-content>
    </v-card>
</v-dialog>