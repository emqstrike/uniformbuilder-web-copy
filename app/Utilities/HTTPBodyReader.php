<?php
namespace App\Utilities;

use Illuminate\Http\Request;
use Webmozart\Json\JsonDecoder;
use Webmozart\Json\ValidationFailedException;
use Webmozart\Json\DecodingFailedException;
use Webmozart\Json\UnexpectedValueException;
use App\Exceptions\RequiredFieldException;
use \Exception;

class HTTPBodyReader
{
    /**
     * Utility method for parsing JSON String
     * @param Request $request
     * @param Array $requiredFields
     * @return Object
     */
    public static function parseJSON(
        Request $request,
        $requiredFields = array()
    ){
        $result = null;
        $error = null;
        $isSuccess = false;
        $decoder = new JsonDecoder();
        try
        {
            $requestBody = $request->getContent();
            $result = $decoder->decode($requestBody);

            if (is_array($requiredFields))
            {
                if (count($requiredFields) > 0)
                {
                    $tmp = (array) $result;
                    foreach ($requiredFields as $requiredField)
                    {
                        if (empty($tmp[$requiredField]))
                        {
                            $error = '[Builder] "' . $requiredField . '" cannot be null';
                            throw new RequiredFieldException($error);
                        }
                    }
                }
            }
            $isSuccess = true;
        }
        catch (DecodingFailedException $e)
        {
            $error = $e->getMessage();
        }
        catch (ValidationFailedException $e)
        {
            $error = $e->getMessage();
        }
        catch (UnexpectedValueException $e)
        {
            $error = $e->getMessage();
        }
        catch (Exception $e)
        {
            $error = $e->getMessage();
        }
        return [
            'success' => $isSuccess,
            'result' => $result,
            'error' => $error
        ];
    }
}