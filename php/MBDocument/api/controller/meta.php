<?php


namespace api;


class Meta extends \core\Controller
{
    function nodetype(){
        $this->loader->model('meta');
        $data = $this->model_meta->getNodeType();
        $this->responseJson($data);
    }

    function authortype(){
        $this->loader->model('meta');
        $data = $this->model_meta->getConfiguration('AuthorType');
        $this->responseJson($data);
    }

    function configuration(){
        $data = false;
        if(isset($this->request->request['name'])){
            $this->loader->model('meta');
            $data = $this->model_meta->getConfiguration($this->request->request['name']);
        }
        else {
            $data = array("error_code" => 400,
                "error_message" => "Missing name");
        }

        $this->responseJson($data);
    }
}