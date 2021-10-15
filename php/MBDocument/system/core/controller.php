<?php


namespace core;


class Controller
{
    protected $request = null;
    protected $namespace = '\\';
    protected $loader = false;

    function __construct($request, $namespace)
    {
        $this->request = $request;
        $this->namespace = $namespace;
        $this->loader = new Loader($this, $this->namespace);
    }

    public function has($key) {
        return isset($this->data[$key]);
    }

    function verify($data, $keys) {
        $result = array();
        $result['is_error'] = false;
        if(is_array($data)) {
            $missing_key = array();
            foreach ($keys as $key) {
                if(array_key_exists($key, $data) == false){
                    array_push($missing_key, $key);
                }
            }
            if(count($missing_key) > 0) {
                $result['is_error'] = true;
                $result['key'] = join(",",$missing_key);
            }
        }
        else {
            $result['is_error'] = true;
            $result['key'] = join(", ",$keys);
        }

        return $result;
    }

    public function isDataError($data){
        return key_exists('error_code', $data);
    }

    public function responseJson($data) {
        $response = new Response($data);
        $response->apiOutput();
    }
}