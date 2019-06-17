<v-dialog v-model="fontDialog" fullscreen hide-overlay transition="dialog-bottom-transition" @keydown.esc="cancel(font)">
    @include('administration-lte-2.fonts.modal.navigation')

    <v-card>
        <v-toolbar dark color="primary" fixed flat>
            <v-toolbar-side-icon @click.stop="navigationDrawer = !navigationDrawer"></v-toolbar-side-icon>
            <v-toolbar-title>Edit Font: @{{ font.name }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn dark flat @click="cancel(font)">Cancel</v-btn>
                <v-btn dark flat>Apply changes</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-content style="padding: 100px 0;">
            <v-layout>
                <v-flex xs10 offset-xs1>
                    @include('administration-lte-2.fonts.components.general-details')
                </v-flex>
            </v-layout>
        </v-content>
    </v-card>
</v-dialog>