<!DOCTYPE html>
<html>
    <head>
        <title>QuickStrike Uniform Builder</title>

        <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

        <style>
            html, body {
                height: 100%;
            }

            body {
                margin: 0;
                padding: 0;
                width: 100%;
                display: table;
                font-weight: 100;
                font-family: 'Lato';
            }

            .container {
                text-align: center;
                display: table-cell;
                vertical-align: middle;
            }

            .content {
                text-align: center;
                display: inline-block;
            }

            .title {
                font-size: 96px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="content">
                <div class="title">Image Uploader</div>
                <div>
                    <form method="POST" action="{{ $api_upload_image_endpoint }}" enctype="multipart/form-data">
                        Image:
                        <input type="file" name="image">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <input type="submit">
                    </form>
                </div>
                <div style='border: 1px dotted #eee; padding: 10px; margin-top: 15px'>
                </div>
            </div>
        </div>
    </body>
</html>
