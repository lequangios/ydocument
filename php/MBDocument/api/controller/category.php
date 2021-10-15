<?php


namespace api;


class Category extends \core\Controller
{
    function index(){
        $this->loader->model('category');
        $data = $this->model_category->listCate();
        $this->responseJson($data);
    }

    function addCate(){
        $data = $this->verifyData();
        if($data === true){
            $cate  = json_decode($this->request->body,true);
            $this->loader->model('category');
            $data = $this->model_category->addNew($cate);
        }
        $this->responseJson($data);
    }

    function editCate(){
        $data = false;
        if(isset($this->request->request['category_id'])){
            $data = $this->verifyData();
            if($data === true){
                $cate  = json_decode($this->request->body,true);
                $cate['id'] = $this->request->request['category_id'];
                $this->loader->model('category');
                $data = $this->model_category->editCate($cate);
            }
        }
        else {
            $data = array("error_code" => 400,
                "error_message" => "Missing category_id");
        }
        $this->responseJson($data);
    }

    function removeCate(){
        $data = false;
        if(isset($this->request->request['category_id'])){
            $category_id= $this->request->request['category_id'];
            $this->loader->model('category');
            $data = $this->model_category->deleteCate($category_id);
        }
        else {
            $data = array("error_code" => 400,
                "error_message" => "Missing category_id");
        }
        $this->responseJson($data);
    }

    private function verifyData(){
        $keys = array('parent_id', 'name', 'description', 'thumbnail', 'path', 'level', 'views');
        $chap = json_decode($this->request->body,true);
        $result = $this->verify($chap , $keys);
        if($result['is_error'] == true) {
            return array(
                "error_code" => 400,
                "error_message" => "Missing ".$result['key']
            );
        }
        else {
            return true;
        }
    }
}