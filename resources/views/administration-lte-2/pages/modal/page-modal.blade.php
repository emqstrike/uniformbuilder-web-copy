<v-dialog v-model="pageDialog" persistent max-width="600px">
    <v-card>
        <v-card-title>
            <span class="headline" v-if="action =='edit'">Edit Page</span>
            <span class="headline" v-else>Add Page</span>
        </v-card-title>

        <v-card-text>
            <v-alert :value="true" color="error" v-if="errors.length">
                <ul>
                    <li v-for="error in errors">@{{ error }}</li>
                </ul>
            </v-alert>

            <div class="form-group">
                <label class="control-label">Code</label>
                <input type="text" class="form-control" v-model="page.code" :disabled="(dialog === true)">
            </div>

            <div class="form-group">
                <label class="control-label">Name</label>
                <input type="text" class="form-control" v-model="page.page_name" :disabled="(dialog === true)">
            </div>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="cancel(page)">Close</v-btn>

            <v-btn color="blue darken-1" flat @click="updatePage(page)" v-if="action == 'edit'">Update</v-btn>
            <v-btn color="blue darken-1" flat @click="savePage(page)" v-else>Save</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>