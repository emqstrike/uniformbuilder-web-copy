<div v-show="activeMenu == 'font-size-table'">
    <div class="row">
        <div class="col-md-12">
            <h3>Font Size Table</h3>
            <hr>

            <table id="font-size-table" class="table table-bordered">
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
                            <input type="number" v-model="data.outputSize" class="form-control"> <br><br>

                            <label>Offset</label>
                            <div class="form-inline">
                                <label>x</label>
                                <input type="number" v-model="data.xOffset" class="form-control">
                            </div>

                            <div class="form-inline">
                                <label>y</label>
                                <input type="number" v-model="data.yOffset" class="form-control">
                            </div>

                            <label>Scale</label>
                            <div class="form-inline">
                                <label>x</label>
                                <input type="number" v-model="data.xScale" class="form-control">
                            </div>

                            <div class="form-inline">
                                <label>x</label>
                                <input type="number" v-model="data.yScale" class="form-control">
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>