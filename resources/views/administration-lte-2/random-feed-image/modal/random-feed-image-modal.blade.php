<v-dialog v-model="randomFeedImageDialog" persistent max-width="750px">
    <v-card>
        <v-card-title>
            <span class="headline" v-if="action == 'edit'">Edit Random Feed Image</span>
            <span class="headline" v-else>Add Random Feed Image</span>
        </v-card-title>

        <v-card-text>
            <v-alert :value="true" color="error" v-if="errors.length">
                <ul>
                    <li v-for="error in errors">@{{ error }}</li>
                </ul>
            </v-alert>

            <div class="form-group">
                <label class="control-label">Sport</label>
                <select v-model="randomFeedImage.sport" class="form-control">
                    <option v-for="sport in sports" v-if="sport.name != ''" :value="sport.name">@{{ sport.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label class="control-label">Block Pattern</label>
                <select v-model="randomFeedImage.block_pattern" class="form-control">
                    <option v-for="blockPattern in blockPatternOptions" :value="blockPattern.name">
                        @{{ blockPattern.name }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label class="control-label">Block Pattern Option</label>
                <select v-model="randomFeedImage.block_pattern_option" class="form-control">
                    <option v-for="blockPatternOption in blockPatternOptionOptions" :value="blockPatternOption">
                        @{{ blockPatternOption }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label>Upload thumbnail</label>

                <div class="row">
                    <div class="col-md-1">
                        <div v-if="randomFeedImage.thumbnail == null" style="border: 1px solid #ccc; height: 50px; width: 50px;"></div>

                        <div v-else-if="randomFeedImage.thumbnail" style="border: 1px solid #ccc; height: 50px; width: 50px;" class="thumbnail-container">
                            <div class="remove-thumbnail-container">
                                <div class="remove-thumbnail">
                                    <button class="btn btn-xs btn-flat btn-danger" style="margin: 0px;" @click.prevent="randomFeedImage.thumbnail = null">
                                        <span class="glyphicon glyphicon-trash"></span>
                                    </button>
                                </div>
                            </div>

                            <img :src="randomFeedImage.thumbnail" style="height: 50px; width: 50px;">
                        </div>
                    </div>

                    <div class="col-md-11">
                        <input type="file" class="form-control" @change="onFileChange($event)" @click="clear($event)">
                    </div>
                </div>
            </div>

            <div class="form-group">
                <label class="control-label">Piping Set</label>
                <select v-model="randomFeedImage.set" class="form-control">
                    <option value="Top Welt">Top Welt</option>
                    <option value="Arch">Arch</option>
                    <option value="Padding">Padding</option>
                    <option value="Body">Body</option>
                    <option value="Toe">Toe</option>
                    <option value="Heel">Heel</option>
                    <option value="Ankle Padding">Ankle Padding</option>
                    <option value="Main Foot">Main Foot</option>
                </select>
            </div>

            <div class="form-group">
                <label class="control-label">Alias</label>
                <input v-model="randomFeedImage.alias" type="text" class="form-control">
            </div>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="cancel(randomFeedImage)">Close</v-btn>

            <v-btn color="blue darken-1" flat @click="update()" v-if="action == 'edit'">Update</v-btn>
            <v-btn color="blue darken-1" flat @click="save()" v-else>Save</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>