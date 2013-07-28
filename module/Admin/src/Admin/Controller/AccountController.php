<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Mehdi
 * Date: 28/07/13
 * Time: 21:31
 * To change this template use File | Settings | File Templates.
 */

namespace Admin\Controller;
use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;


class AccountController extends AbstractActionController {

    public function indexAction()
    {
        return new ViewModel();
    }

    public function registerAction()
    {
        return new ViewModel();
    }

    public function forgotAction()
    {
        return new ViewModel();
    }
}