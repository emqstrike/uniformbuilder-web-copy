<div v-show="activeMenu == 'twill'">
    <div class="row">
        <div class="col-md-12">
            <h3>Twill Font Size Table</h3>
            <hr>

            <v-tabs fixed-tabs dark slider-color="#ffffff" style="margin-bottom: 30px;">
                <v-tab v-for="perspective in perspectives" :key="perspective">@{{ perspective }}</v-tab>

                <v-tabs-items>
                    <v-tab-item key="front">
                        
                    </v-tab-item>

                    <v-tab-item key="back">back</v-tab-item>
                    <v-tab-item key="left">left</v-tab-item>
                    <v-tab-item key="right">right</v-tab-item>
                </v-tabs-items>
            </v-tabs>
        </div>
    </div>
</div>