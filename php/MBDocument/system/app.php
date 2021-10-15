<?php
function systemload($class)
{
    $file = dirname(__FILE__).'/'. str_replace('\\', '/', strtolower($class)) . '.php';
    if (is_file($file)) {
        include_once($file);
        return true;
    } else {
        return false;
    }
}

try {
    spl_autoload_register('systemload');
    spl_autoload_extensions('.php');
}
catch (Exception $e){
    print_r($e->getMessage());
}

use core\Router;
use core\Request;
use core\Loader;
function startApp($namespace){
    $request = new Request();
    $router = New Router($request, $namespace);
    $router->execute($request, array());
}


