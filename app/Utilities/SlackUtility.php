<?php
namespace App\Utilities;

use Exception;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;
use Symfony\Component\Debug\Exception\FatalErrorException;
use ErrorException;

class SlackUtility
{
    public static function exceptionHook(Exception $e)
    {
        $url = env('SLACK_HOOK_OOPS_CHANNEL_URL');
        $icon = env('LOGO_URL');
        $username = env('APP_TITLE');
error_log($url);
error_log($icon);
error_log($username);
error_log('ERROR: '.$e->getMessage());
        try {
            $client = new Client();
            $result = $client->request('POST', $url, [
                'json' => json_encode([
                    'username' => $username,
                    'icon_url' => $icon,
                    'text' => $e->getMessage()
                ])
            ]);

            error_log('Result: ' . $result);
        } catch (ClientException $e) {
            error_log('Response (ClientException): ' . $e->getMessage());
        } catch (ServerException $e) {
            error_log('Response (ServerException): ' . $e->getMessage());
        } catch (FatalErrorException $e) {
            error_log('Response (FatalErrorException): ' . $e->getMessage());
        } catch (Exception $e) {
            error_log('Response (Exception): ' . $e->getMessage());
        }
    }
}
