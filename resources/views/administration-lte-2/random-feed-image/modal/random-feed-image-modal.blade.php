<v-dialog v-model="randomFeedImageDialog" persistent max-width="750px">
    <v-card>
        <v-card-title>
            <span class="headline" v-if="action == 'edit'">Edit Random Feed Image</span>
            <span class="headline" v-else>Add Random Feed Image</span>
        </v-card-title>

        <v-card-text>
            <div class="form-group">
                <label class="control-label">Sport</label>
                <select v-model="randomFeedImage.sport_id" class="form-control">
                    <option v-for="sport in sports" v-if="sport.name != ''" :value="sport.id">@{{ sport.name }}</option>
                </select>
            </div>

            <div class="form-group">
                <label class="control-label">Block Pattern</label>
                <select v-model="randomFeedImage.block_pattern_id" class="form-control">
                    <option v-for="blockPattern in blockPatternOptions" :value="blockPattern.id">
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
                    <option value="Center Piping">Center Piping</option>
                    <option value="End of Sleeve Piping">End of Sleeve Piping</option>
                    <option value="Neck Piping">Neck Piping</option>
                    <option value="Raglan Piping">Raglan Piping</option>
                    <option value="Set-in Piping">Set-in Piping</option>
                    <option value="Sleeve Piping 1 inch up">Sleeve Piping 1 inch up</option>
                    <option value="Yoke Piping">Yoke Piping</option>
                    <option value="Back Insert Piping">Back Insert Piping</option>
                    <option value="Pant Piping">Pant Piping</option>
                    <option value="Tunnel Piping">Tunnel Piping</option>
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