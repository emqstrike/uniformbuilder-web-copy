<?php

namespace App\Traits;

use Session;

trait OwnsUniformDesign
{
    /**
     * Checks if user owns the saved uniform design
     */
    public function isUniformOwner($uniform)
    {
        if (Session::get('isLoggedIn'))
        {
            if (!empty($uniform))
            {
                $ownerId = $uniform->user_id;
                $loggedInUserId = Session::get('userId');
                if ($loggedInUserId == $ownerId)
                {
                    return true;
                }
            }
        }

        return false;
    }
}