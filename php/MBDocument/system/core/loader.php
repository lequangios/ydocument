<?php


namespace core;


class Loader
{
    protected $proxy;
    protected $namespace;

    function __construct($proxy, $namespace)
    {
        $this->proxy = $proxy;
        $this->namespace = $namespace;
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

                $model = new $class();
                $this->proxy->{$registry} = $model;
            } else {
                throw new \Exception('Error: Could not load model ' . $route . '!');
            }
        }
    }
}