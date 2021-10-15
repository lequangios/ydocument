<?php

namespace api;
require_once('../MBLoader.php');
use system\MBLoader;
use core\MBRequest;
use core\MBRouter;

class MBApi
{
    public $router = false;
    function __construct()
    {
        MBLoader::loadCore();
        MBLoader::loadUtils();
        MBLoader::loadModel();

        $this->loadController();

        $this->router = new MBRouter(new MBRequest());
    }

    private function loadController(){
        spl_autoload_register(function($className) {
            $prefix = 'api\\controller\\'; // Namespace
            $class = preg_replace('/^' . preg_quote($prefix) . '/', '', $className);
            $filename = dirname(__FILE__).'/controller/'. $class . '.php';
            if (file_exists($filename)) {
                include_once $filename;
            }
        });
    }

}