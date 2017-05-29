<div id="create-team-store">
    <span class='header'>Create Team Store Account</span>

    <div class="create-team-store-container">
        <form method="POST" action="{{ route('create-team-store-account') }}" enctype="multipart/form-data">
            <div class="modal-body">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">

                <input type="hidden" name="customizer_user_id" value="{{ Session::get('userId') }}">
                <input type="hidden" name="user_access_token" value="{{ Session::get('accessToken') }}">
                <input type="hidden" name="email" value="{{ $user->email }}">
                <input type="hidden" name="first_name" value="{{ $user->first_name }}">
                <input type="hidden" name="last_name" value="{{ $user->last_name }}">

                <div class="col-md-6 col-md-offset-3">
                    @if (count($errors) > 0)
                        <ul>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    @endif

                    <div class="row">
                        <div class="col-md-6">
                            <br>
                            <label for="store_name">Store Name</label>
                            <input name="store_name" class="form-control" type="text" value="{{ old('store_name') }}" required>                                
                        </div>

                        <div class="col-md-6">
                            <br>
                            <label for="team_name">Team Name</label>
                            <input name="team_name" class="form-control" type="text" value="{{ old('team_name') }}" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <br>
                            <label for="sport">Sport</label>
                            <select name="sport" id="sport" class="form-control">
                                <option value="baseball">Baseball</option>
                                <option value="basketball">Basketball</option>
                                <option value="football">Football</option>
                                <option value="hockey">Hockey</option>
                                <option value="lacrosse">Lacrosse</option>
                                <option value="soccer">Soccer</option>
                                <option value="fastpitch">Fastpitch</option>
                                <option value="volleyball">Volleyball</option>
                            </select>                      
                        </div>

                        <div class="col-md-4">
                            <br>
                            <label for="role">Role</label>
                            <select name="role" id="role" class="form-control">
                                <option value="coach">Coach</option>
                                <option value="athletic director">Athletic Director</option>
                                <option value="entrepreneur">Entrepreneur</option>
                            </select>                
                        </div>

                        <div class="col-md-4">
                            <br>
                            <label for="organization">Organization</label>
                            <input name="organization" class="form-control" type="text" value="{{ old('organization') }}" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <br>
                            <label for="team_logo">Team Logo</label>
                            <input name="team_logo" class="form-control" type="file">
                        </div>

                        <div class="col-md-6">
                            <br>
                            <label for="mascot">Mascot</label>
                            <input name="mascot" class="form-control" type="file">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-3">
                            <br>
                            <label>Team Color 1</label><br>
                            <input type="text" class="team-colors form-control team-color-1" name="colors[0]" value="{{ old('colors[0]') }}">
                            <div id="team-color-1-holder" style="width: 100%; border: 1px;"></div>
                        </div>

                        <div class="col-md-3">
                            <br>
                            <label>Team Color 2</label><br>
                            <input type="text" class="team-colors form-control team-color-2" name="colors[1]" value="{{ old('colors[1]') }}" >
                            <div id="team-color-2-holder" style="width: 100%; border: 1px;"></div>
                        </div>

                        <div class="col-md-3">
                            <br>
                            <label>Team Color 3</label>
                            <input type="text" class="team-colors form-control team-color-3" name="colors[2]" value="{{ old('colors[2]') }}">
                            <div id="team-color-3-holder" style="width: 100%; border: 1px;"></div>
                        </div>

                        <div class="col-md-3">
                            <br>
                            <label>Team Color 4</label>
                            <input type="text" class="team-colors form-control team-color-4" name="colors[3]" value="{{ old('colors[3]') }}">
                            <div id="team-color-4-holder" style="width: 100%; border: 1px;"></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <br />
                            <label for="password">Password</label>
                            <input name="password" id="password" class="form-control" type="password" required>
                        </div>

                        <div class="col-md-6">
                            <br />
                            <label for="password">Retype Password</label>
                            <input name="retype_password" id="retype-password" class="form-control" type="password" required>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <br>
                            <input type="submit" class="btn register" value="Register">
                        </div>
                    </div>
                </div>
            </div>
        </form> 
    </div>
</div>