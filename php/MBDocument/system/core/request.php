<?php


namespace core;


class Request
{
    public $get = array();
    public $post = array();
    public $cookie = array();
    public $files = array();
    public $server = array();
    public $request = array();
    public $header = array();
    public $body = '';
    public $method = "GET";
    public $queries = null;

    function __construct()
    {
        $this->get = $this->clean($_GET);
        $this->post = $this->clean($_POST);
        $this->request = $this->clean($_REQUEST);
        $this->cookie = $this->clean($_COOKIE);
        $this->files = $this->clean($_FILES);
        $this->server = $this->clean($_SERVER);
        $this->header = getallheaders();
        $this->method = $_SERVER['REQUEST_METHOD'];
        $this->body = file_get_contents('php://input');
        $this->queries = $this->getQueries();
    }

    function isGet(){
        return ($this->method == 'GET');
    }

    function isPost(){
        return ($this->method == 'POST');
    }


    public function getRouter()
    {
        if($this->queries != null && array_key_exists("router", $this->queries)){
            return $this->queries['router'];
        }
        return '';
    }

    private function getQueries(){
        $data = htmlspecialchars_decode($this->server['QUERY_STRING']);
        $output = null;
        parse_str($data, $output);
        return $output;
    }

    private function clean($data) {
        if (is_array($data)) {
            foreach ($data as $key => $value) {
                unset($data[$key]);

                $data[$this->clean($key)] = $this->clean($value);
            }
        } else {
            $data = htmlspecialchars($data, ENT_COMPAT, 'UTF-8');
        }

        return $data;
    }
}