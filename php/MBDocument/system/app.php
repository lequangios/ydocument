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
use core\Session;
use core\Registry;
use library\Database;

include_once('config.php');
function loadRegistry($namespace){
    $registry = new Registry();
    $request = new Request();
    $session = new Session();
    $db = new Database(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
    $loader = new Loader($namespace);
    $loader->setRegistry('db', $db);

    $registry->set('namespace', $namespace);
    $registry->set('request', $request);
    $registry->set('session', $session);
    $registry->set('loader', $loader);
    $registry->set('db', $db);

    return $registry;
}

function startApp($namespace){
    $registry = loadRegistry($namespace);
    $router = new Router($registry);
    $router->execute(array());
}


