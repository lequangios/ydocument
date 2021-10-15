<?php

namespace api;
use core\Controller;

class Filemanger extends \core\Controller
{
    function index(){
        $name = '';
        if(isset($this->request->request['name'])){
            $name = $this->request->request['name'];
        }
        $this->loader->model('file');
        $data = $this->model_file->listAll($name,0,0);
        $this->responseJson($data);
    }
}