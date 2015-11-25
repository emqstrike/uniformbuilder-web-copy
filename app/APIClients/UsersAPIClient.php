<?php
namespace App\APIClients;

class UsersAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getUsers()
    {
        $response = $this->get('users');
        $result = $this->decoder->decode($response->getBody());

        $users = [];
        if ($result->success)
        {
            $users = $result->users;
        }
        return $users;
    }

    public function getUser($id)
    {
        $response = $this->get('user/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->user;
        }
        return null;
    }

    public function recoverPassword($email)
    {
        $data = ['email' => $email];
        $response = $this->post('user/recoverPassword', [
            'json' => $data
        ]);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return [
                'success' => true
            ];
        }
        return [
            'success' => false,
            'message' => $result->message
        ];
    }

    public function getUserFromHash($hash)
    {
        $data = ['hash' => $hash];
        $response = $this->post('user/identifyHash', [
            'json' => $data
        ]);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return [
                'success' => true,
                'user' => $result->user
            ];
        }

        return [
            'success' => false,
            'message' => 'Invalid reset password token'
        ];
    }

    public function isEmailTaken($email, $id = null)
    {
        $data = ['email' => $email];
        $response = $this->get('user/emailExist', [
            'json' => $data
        ]);
        $user = null;
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            $user = $result->user;
        }

        if (!is_null($user) && !is_null($id))
        {
            $compare = $this->getUser($id);
            if ($user->id == $compare->id)
            {
                return false;
            }
        }
        return !is_null($user);
    }

    public function createUser($data)
    {
        $response = $this->post('user', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function updateUser($data)
    {
        $response = $this->post('user/update', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function updatePassword($data)
    {
        $response = $this->post('user/change_password', [
            'json' => $data
        ]);
        return $this->decoder->decode($response->getBody());
    }

    public function saveNewPassword($data)
    {
        $response = $this->post('user/saveNewPassword', [
            'json' => $data
        ]);

        $result = $this->decoder->decode($response->getBody());
        if ($result->success) {
            return [
                'success' => true,
                'message' => $result->message
            ];
        }
        return [
            'success' => false,
            'message' => $result->message
        ];
    }
}