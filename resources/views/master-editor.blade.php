@extends('app')
 
@section('content')


<nav class="col-md-1 menu">
    <img src="https://s3-us-west-2.amazonaws.com/qstrike/images/Qx.png">
    <ul class="list-group">
        <li class="list-group-item">
            Open Design
        </li>
        <li class="list-group-item">
            Save Design
        </li>
        <li class="list-group-item">
            Submit Design
        </li>
    </ul>
</nav>


<section class="col-md-8 main-canvas">

</section>


<section class="col-md-3 properties">

    <!-- Uniform Categories -->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Uniform Categories</h3>
        </div>
        <div class="panel-body">
            <div>
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
            </div>
        </div>
    </div>

    <!-- Colors -->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Colors</h3>
        </div>
        <div class="panel-body">
            <div>
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
            </div>
        </div>
    </div>

    <!-- Texture -->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Texture</h3>
        </div>
        <div class="panel-body">
            <div>
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
                <img src="https://placehold.it/100x100" alt="..." class="img-thumbnail">
            </div>
        </div>
    </div>

    <!-- Team Name -->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Team</h3>
        </div>
        <div class="panel-body">
            <form class="form-inline">
                <div class="form-group">
                    <label class="sr-only" for="exampleInputAmount">Amount (in dollars)</label>
                    <div class="input-group">
                        <div class="input-group-addon">Team</div>
                        <input type="text" class="form-control" id="exampleInputAmount" placeholder="Team Name">
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>

    <!-- Team Roster -->
        <div class="panel-body">
            <div>
                <label>Team Roster</label>
            </div>
            <div>
                <textarea class="form-control" rows="3"></textarea>
            </div>
        </div>
    </div>
</section>

@endsection
