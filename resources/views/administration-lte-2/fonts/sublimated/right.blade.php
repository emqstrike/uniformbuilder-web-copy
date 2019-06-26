<h4>
    Right
    
    <button class="btn btn-flat btn-xs btn-primary add-font-size" @click.prevent="addSublimatedLayer('right')">
        <span class="glyphicon glyphicon-plus"></span>
    </button>
</h4>

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>
                Application #

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span class="glyphicon glyphicon-info-sign" v-on="on"></span>
                    </template>
                    <span>Optional. Used to match input size to an application point.</span>
                </v-tooltip>
            </th>

            <th>
                Input Size

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span class="glyphicon glyphicon-info-sign" v-on="on"></span>
                    </template>
                    <span>Actual size (inches)</span>
                </v-tooltip>
            </th>

            <th>
                Output Size

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span class="glyphicon glyphicon-info-sign" v-on="on"></span>
                    </template>
                    <span>Override - Size that will appear in customizer (used to correct display ratio)</span>
                </v-tooltip>
            </th>

            <th>
                X Offset

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span class="glyphicon glyphicon-info-sign" v-on="on"></span>
                    </template>
                    <span>Horizontal Offset</span>
                </v-tooltip>
            </th>

            <th>
                Y Offset

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span class="glyphicon glyphicon-info-sign" v-on="on"></span>
                    </template>
                    <span>Vertical Offset</span>
                </v-tooltip>
            </th>

            <th>
                X Scale

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span class="glyphicon glyphicon-info-sign" v-on="on"></span>
                    </template>
                    <span>Horizontal Scale</span>
                </v-tooltip>
            </th>

            <th>
                Y Scale

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span class="glyphicon glyphicon-info-sign" v-on="on"></span>
                    </template>
                    <span>Vertical Scale</span>
                </v-tooltip>
            </th>

            <th>
                Inner Stroke

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span class="glyphicon glyphicon-info-sign" v-on="on"></span>
                    </template>
                    <span>Inner Stroke</span>
                </v-tooltip>
            </th>

            <th>
                Outer Stroke

                <v-tooltip right>
                    <template v-slot:activator="{ on }">
                        <span class="glyphicon glyphicon-info-sign" v-on="on"></span>
                    </template>
                    <span>Outer Stroke</span>
                </v-tooltip>
            </th>
        </tr>
    </thead>

    <tbody v-for="data in font.sublimated_font_size_tables.filter(obj => { return obj.perspective === 'right' })">
        <tr v-for="(fontData, index) in data.sizes">
            <td>
                <input type="number" v-model="fontData.application_number" class="form-control">
            </td>

            <td>
                <input type="number" v-model="fontData.inputSize" class="form-control">
            </td>

            <td>
                <input type="number" v-model="fontData.outputSize" class="form-control">
            </td>

            <td>
                <input type="number" v-model="fontData.x_offset" class="form-control">
            </td>

            <td>
                <input type="number" v-model="fontData.y_offset" class="form-control">
            </td>

            <td>
                <input type="number" v-model="fontData.x_scale" class="form-control" >
            </td>

            <td>
                <input type="number" v-model="fontData.y_scale" class="form-control">
            </td>

            <td>
                <input type="number" v-model="fontData.inner_stroke" class="form-control" value="0">
            </td>

            <td>
                <input type="number" v-model="fontData.outer_stroke" class="form-control" value="0">
            </td>

            <td>
                <button class="btn btn-sm btn-flat btn-danger" @click.prevent="removeSublimatedLayer(index, 'right')">Remove</button>
            </td>
        </tr>
    </tbody>
</table>