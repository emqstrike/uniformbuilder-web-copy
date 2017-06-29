<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Utilities\FileUtility;

class ProductController extends Controller
{
    public function savePerspectives(Request $request)
    {
        // Convert SVG (front) to PNG
        $front = FileUtility::saveSvgToS3($request->front, 'front');
        $back = FileUtility::saveSvgToS3($request->back, 'back');
        $right = FileUtility::saveSvgToS3($request->right, 'right');
        $left = FileUtility::saveSvgToS3($request->left, 'left');

        return response()->json([
            'success' => true,
            'front' => $front,
            'back' => $back,
            'right' => $right,
            'left' => $left,
            'product_id' => $request->product_id,
            'store_code' => $request->store_code,
            'team_colors' => $request->team_colors
        ]);
    }
}
