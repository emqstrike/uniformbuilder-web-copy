<div id="font-size-table" class="row" v-show="activeMenu == 'font-size-table'">
    <div class="col-md-12">
        <h4>Font Size Table</h4>

        <hr>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>2.5</th>
                    <th>3</th>
                    <th>4</th>
                    <th>5</th>
                    <th>6</th>
                    <th>7</th>
                    <th>8</th>
                    <th>9</th>
                    <th>10</th>
                    <th>11</th>
                    <th>12</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td v-for="data in font.font_size_table">
                        <input v-model="data.outputSize" type="number"  class="form-control"> <br><br>

                        <label class="control-label">Offset</label>

                        <div class="form-inline">
                            <label>x</label>
                            <input v-model="data.xOffset" type="number"  class="form-control">
                        </div>

                        <div class="form-inline">
                            <label>y</label>
                            <input v-model="data.yOffset" type="number"  class="form-control">
                        </div>

                        <label class="control-label">Scale</label>

                        <div class="form-inline">
                            <label>x</label>
                            <input v-model="data.xScale" type="number"  class="form-control">
                        </div>

                        <div class="form-inline">
                            <label>y</label>
                            <input v-model="data.yScale" type="number"  class="form-control">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>