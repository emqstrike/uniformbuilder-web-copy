<v-dialog v-model="loadModifyPatternDialog" persistent max-width="600px">
    <v-card>
        <v-card-title class="headline">Load</v-card-title>

        <v-card-text>
            <textarea v-model="loadModifyPattern" class="form-control" style="height: 300px; resize: none;"></textarea>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat @click="loadModifyPatternDialog = false">Close</v-btn>
            <v-btn color="green darken-1" flat @click="applyData">Apply</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>