<div v-show="activeMenu == 'sublimated'">
    <div class="row">
        <div class="col-md-12">
            <h3>Sublimated Font Size Table</h3>
            <hr>

            <v-tabs fixed-tabs dark slider-color="#ffffff" style="margin-bottom: 30px;">
                <v-tab v-for="perspective in perspectives" :key="perspective">@{{ perspective }}</v-tab>

                <v-tabs-items>
                    <v-tab-item key="front">
                        @include('administration-lte-2.fonts.sublimated.front')
                    </v-tab-item>

                    <v-tab-item key="back">
                        @include('administration-lte-2.fonts.sublimated.back')
                    </v-tab-item>

                    <v-tab-item key="left">
                        @include('administration-lte-2.fonts.sublimated.left')
                    </v-tab-item>

                    <v-tab-item key="right">
                       @include('administration-lte-2.fonts.sublimated.right')
                    </v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </div>
    </div>
</div>