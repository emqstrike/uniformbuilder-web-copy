@extends('administration.lte-main')

@section('styles')
<link rel="stylesheet" type="text/css" href="/css/libs/select2/select2.min.css">
<style>
.td-label{
    font-weight: bold;
}
</style>
@endsection

@section('content')

<div class="row">
    <div class="col-md-8 order-md-1 col-md-offset-2">
        <h4 class="mb-3">Style Information</h4>
        <form class="needs-validation" novalidate="">
            <div class="row">
                <div class="col-md-2 mb-3 col-md-offset-5">
                    <label>Style ID</label>
                    <input type="number" class="form-control style-id-input" value="3346" placeholder="" required>
                </div>
            </div>
            <hr class="mb-4">
            <div class="col-md-2 mb-3 col-md-offset-5">
                <button class="btn btn-primary btn-block configure-style-btn" type="submit">Configure</button>
            </div>
        </form>
    </div>
</div>
<div class="container col-md-12">
    <div>
        <table class="table table-bordered">
            <tr>
                <thead>
                    <th>Style Information</th>
                    <th>Matching Qstrike Information</th>
                    <th>Price Item</th>
                    <th>Sizes, Price Item & MSRP</th>
                    <th>Customizer Price Item</th>
                </thead>
            </tr>
            <tbody>
                <tr>
                    <td class="style-information-row"></td>
                    <td class="qstrike-style-information-row"><pre class="qstrike-item-json"></pre></td>
                    <td class="qstrike-style-info-pi"><pre class="qstrike-item-pi"></pre></td>
                    <td><table class="table"><tbody class="style-sizes"></tbody></table></td>
                    <td class="style-info-pi"><pre class="item-pi"></pre></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

@endsection

@section('scripts')
<script type="text/javascript" src="/js/libs/select2/select2.min.js"></script>
<script type="text/javascript" src="/underscore/underscore.js"></script>
@endsection

@section('custom-scripts')
<script src="/js/administration-lte-2/styles/style-configurator.js"></script>
@endsection
