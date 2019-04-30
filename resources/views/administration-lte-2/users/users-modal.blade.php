<div id="user-slideout-container" ref="user-slideout-container">
    <div class="container">
        <div class="col-md-12">
            <h3 v-if="action == 'edit'">Edit User</h3>
            <h3 v-else>Add User</h3>

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
                <input type="text" class="form-control" v-model="user.email" disabled="disabled">
            </div>

            <div class="form-group">
                <label class="control-label">Password</label>
                <input type="password" class="form-control" v-model="user.password" v-on:input="confirmPassword">
            </div>

            <div class="form-group">
                <label class="control-label">Confirm Password</label>
                <input type="password" class="form-control" v-model="user.confirm_password" v-on:input="confirmPassword" ref="confirmPassword">
                <div class="invalid-feedback" v-show="error">Password do not match</div>
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
                    <option v-for="role in roles" :value="role" :selected="user.role == role.id">@{{ role.name }}</option>
                </select>
            </div>

            <div class="form-inline">
                <button class="btn btn-sm btn-flat btn-success" @click="updateUser(user)" :disabled="error">Update</button>
                <button class="btn btn-sm btn-flat btn-danger" @click="cancel(user)">Cancel</button>
            </div>
        </div>
    </div>
</div>