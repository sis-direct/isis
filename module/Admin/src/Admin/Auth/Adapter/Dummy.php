<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Mehdi
 * Date: 28/07/13
 * Time: 22:05
 * To change this template use File | Settings | File Templates.
 */

namespace Admin\Auth\Adapter;

use Zend\Authentication\Adapter\AdapterInterface;
use Zend\Authentication\Result as AuthResult;

class Dummy implements AdapterInterface
{

    protected $username;
    protected $password;

    public function __construct($username, $password) {
        $this->username = $username;
        $this->password = $password;
    }

    /**
     * Performs an authentication attempt
     *
     * @return \Zend\Authentication\Result
     * @throws \Zend\Authentication\Adapter\Exception\ExceptionInterface If authentication cannot be performed
     */
    public function authenticate()
    {
        $code = AuthResult::FAILURE;
        $username = $this->username;
        $pass = $this->password;
        if($username != 'mlefebvre') {
            $code = AuthResult::FAILURE_IDENTITY_NOT_FOUND;
        } elseif($username == 'mlefebvre' && $pass != 'testtest') {
            $code = AuthResult::FAILURE_CREDENTIAL_INVALID;
        } else {
            $code = AuthResult::SUCCESS;
        }
        $result = new AuthResult($code, $username);
        return $result;
    }
}