<v-dialog v-model="fontDialog" fullscreen hide-overlay transition="dialog-bottom-transition" @keydown.esc="cancel(font)">
    <v-card>
        <v-toolbar dark color="primary" fixed flat>
            <v-menu bottom left style="z-index: 999999999;">
                <template v-slot:activator="{ on }">
                    <v-btn dark icon v-on="on">
                        <v-icon>more_vert</v-icon>
                    </v-btn>
                </template>

                <v-list>
                    <v-list-tile @click="toggleMenu('general-details')">
                        <v-list-tile-title>General Details</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile @click="toggleMenu('font-size-table')">
                        <v-list-tile-title>Font Size Table</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile @click="toggleMenu('twill')">
                        <v-list-tile-title>Twill</v-list-tile-title>
                    </v-list-tile>

                    <v-list-tile @click="toggleMenu('sublimated')">
                        <v-list-tile-title>Sublimated</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

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
                    @include('administration-lte-2.fonts.components.font-size-table')
                </v-flex>
            </v-layout>
        </v-content>
    </v-card>
</v-dialog>