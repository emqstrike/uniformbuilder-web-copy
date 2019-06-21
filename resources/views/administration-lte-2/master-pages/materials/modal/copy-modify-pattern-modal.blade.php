<v-dialog v-model="copyModifyPatternDialog" persistent max-width="600px">
    <v-card>
        <v-card-title class="headline">Copy</v-card-title>

        <v-card-text>
            <textarea disabled="disabled" :value="JSON.stringify(patternDetails)" class="form-control" style="height: 300px; resize: none;"></textarea>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="copyModifyPatternDialog = false">Close</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>