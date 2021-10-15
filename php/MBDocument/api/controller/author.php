<?php


namespace api;


class Author extends \core\Controller
{
    function index(){
        $this->loader->model('author');
        $data = $this->model_author->listAuthor();
        $this->responseJson($data);
    }

    function addAuthor(){
        $data = $this->verifyData();
        if($data === true){
            $author  = json_decode($this->request->body,true);
            $this->loader->model('author');
            $data = $this->model_author->addAuthor($author);
        }
        $this->responseJson($data);
    }

    function editAuthor(){
        $data = false;
        if(isset($this->request->request['author_id'])){
            $data = $this->verifyData();
            if($data === true){
                $author  = json_decode($this->request->body,true);
                $author['id'] = $this->request->request['author_id'];
                $this->loader->model('author');
                $data = $this->model_author->editAuthor($author);
            }
        }
        else {
            $data = array("error_code" => 400,
                "error_message" => "Missing author_id");
        }
        $this->responseJson($data);
    }

    private function verifyData(){
        $keys = array('name', 'avatar', 'bio', 'address', 'phone', 'email', 'website', 'type', 'rating');
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