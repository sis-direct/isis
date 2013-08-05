<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Mehdi
 * Date: 28/07/13
 * Time: 10:32
 * To change this template use File | Settings | File Templates.
 */

namespace Admin\Controller;

use Zend\Authentication\AuthenticationService;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\Http\Response;
use Zend\Authentication\Result;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;

use Admin\Auth\Adapter\Dummy as IsisAuthAdapter;

class ConnectionController extends AbstractActionController
{

    private $authService;

    protected function getAuthenticationService()
    {
        if (null == $this->authService) {
            $this->authService = new AuthenticationService();
        }
        return $this->authService;
    }

    public function indexAction()
    {
        $this->layout('layout/authent');
        return new ViewModel();
    }

    public function loginAction()
    {
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');

        $service = $this->getAuthenticationService();
        $adapter = new IsisAuthAdapter($username, $password);
        $result = $service->authenticate($adapter);

        $success = false;
        $message = '';
        $status = 0;

        switch ($result->getCode()) {
            case Result::FAILURE_CREDENTIAL_INVALID :
                $status = Response::STATUS_CODE_401;
                $message = 'Unauthorized ';
                break;
            case Result::FAILURE_IDENTITY_NOT_FOUND :
                $status = Response::STATUS_CODE_403;
                $message = 'Forbidden';
                break;
            case Result::SUCCESS:
                $status = Response::STATUS_CODE_200;
                $message = 'Success';
                $success = true;
                break;
            default :
                $status = Response::STATUS_CODE_400;
                $message = 'Bad request';
        }

        if ($this->request->isXmlHttpRequest()) {
            $mdl = new JsonModel(array(
                'username' => $username,
                'success' => $success,
                'message' => $message,
                'redirect_to' => ($success) ? '/administration/' : '/administration/connection'
            ));
            $this->getResponse()->setStatusCode($status);
            return $mdl;
        } else {
            if(!$success) {
                $this->flashMessenger()->addErrorMessage('Authentication Failure');
                $this->redirect()->toUrl('/application/connection/index');
            } else {
                $this->flashMessenger()->addSuccessMessage("Welcome back $username");
                $this->redirect()->toUrl('/home');
            }
        }
    }
}