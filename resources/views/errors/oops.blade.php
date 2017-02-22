<h1>Request Info</h1>
Request Method: <strong>{{ $_SERVER['REQUEST_METHOD'] }}</strong><br>
URL: <strong>{{ $_SERVER['REQUEST_URI'] }}</strong><br>
APP_ENV: <strong>{{ $env }}</strong><br>
Visitor IP: <strong>{{ $visitor_ip_address }}</strong><br>

<h1>Error Content</h1>
{!! $content !!}