<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Mehdi
 * Date: 28/07/13
 * Time: 10:32
 * To change this template use File | Settings | File Templates.
 */

namespace Admin\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;

class ConnectionController extends AbstractActionController
{
    public function indexAction()
    {
        $this->layout('layout/authent');
        return new ViewModel();
    }

    public function loginAction() {
        $username = $this->request->getPost('username');
        $password = $this->request->getPost('password');

        if($this->request->isXmlHttpRequest()) {
            $result = new JsonModel(array(
                'username' => $username,
                'success'=>true,
            ));

            return $result;
        } else {
            $vm = new ViewModel();
            $vm->username = $username;
            return $vm;
        }
    }
}