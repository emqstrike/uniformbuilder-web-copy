<v-navigation-drawer v-model="navigationDrawer" absolute temporary>
    <v-list class="pa-1">
        <v-list-tile avatar>
            <v-list-tile-content>
                <v-list-tile-title>Edit Font: @{{ font.name }}</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile @click="toggleMenu('general-details')">
            <v-list-tile-content>
                <v-list-tile-title>General Details</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="toggleMenu('twill')">
            <v-list-tile-content>
                <v-list-tile-title>Twill</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="toggleMenu('sublimated')">
            <v-list-tile-content>
                <v-list-tile-title>Sublimated</v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </v-list>
</v-navigation-drawer>