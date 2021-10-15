<?php

namespace core;

class Router
{
    private $id;
    private $route = 'document';
    private $method = 'index';
    private $namespace = '';

    public function __construct($request, $namespace) {
        $route = $request->getRouter();
        $this->id = $route;
        $this->namespace = $namespace;

        $parts = explode('/', preg_replace('/[^a-zA-Z0-9_\/]/', '', (string)$route));

        // Break apart the route
        while ($parts) {
            $file = DIR_APPLICATION . '/controller/' . implode('/', $parts) . '.php';
            if (is_file($file)) {
                $this->route = implode('/', $parts);

                break;
            } else {
                $this->method = array_pop($parts);
            }
        }
    }

    public function getId() {
        return $this->id;
    }

    public function execute($request, array $args = array()) {
        // Stop any magical methods being called
        if (substr($this->method, 0, 2) == '__') {
            return new \Exception('Error: Calls to magic methods are not allowed!');
        }

        $file  = DIR_APPLICATION . '/controller/' . $this->route . '.php';
        $class =  $this->namespace.ucfirst(preg_replace('/[^a-zA-Z0-9]/', '', $this->route));
        // Initialize the class
        if (is_file($file)) {
            include_once($file);
            $controller = new $class($request, $this->namespace);
        } else {
            return new \Exception('Error: Could not call ' . $this->route . '/' . $this->method . '!');
        }

        $reflection = new \ReflectionClass($class);

        if ($reflection->hasMethod($this->method) && $reflection->getMethod($this->method)->getNumberOfRequiredParameters() <= count($args)) {
            return call_user_func_array(array($controller, $this->method), $args);
        } else {
            return new \Exception('Error: Could not call ' . $this->route . '/' . $this->method . '!');
        }
    }
}