<?php


namespace core;


class Loader
{
    protected $proxy;
    protected $namespace;
    private $registry;

    function __construct($namespace)
    {
        $this->registry = new Registry();
        $this->namespace = $namespace;
    }

    function setProxy($value){
        $this->proxy = $value;
    }

    function setRegistry($key, $value){
        $this->registry->set($key, $value);
    }

    public function model($route) {
        // Sanitize the call
        $route = preg_replace('/[^a-zA-Z0-9_\/]/', '', (string)$route);
        $registry = 'model_' . str_replace('/', '_', $route);

        if (!$this->proxy->has($registry)) {
            $file  = DIR_APPLICATION . '/model/' . $route . '.php';
            $class = $this->namespace.'model\\' . ucfirst(preg_replace('/[^a-zA-Z0-9]/', '', $route));
            if (is_file($file)) {
                include_once($file);

                $model = new $class($this->registry);
                $this->proxy->{$registry} = $model;
            } else {
                throw new \Exception('Error: Could not load model ' . $route . '!');
            }
        }
    }
}