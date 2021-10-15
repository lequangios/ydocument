<?php


namespace api;


class Chapter extends \core\Controller
{
    function index(){
        $data = false;
        if(isset($this->request->request['document_id'])){
            $this->loader->model('chapter');
            $data = $this->model_chapter->listChapter(1);
        }
        else {
            $data = array(
                "error_code" => 400,
                "error_message" => "Missing document_id"
            );
        }

        $this->responseJson($data);
    }

    function all(){
        $this->loader->model('chapter');
        $data = $this->model_chapter->listChapters();
        $this->responseJson($data);
    }

    function add(){
        $data = $this->verifyAddData();
        if($data === true) {
            $chap  = json_decode($this->request->body,true);
            $chap['document_id'] = $this->request->request['document_id'];
            $this->loader->model('chapter');
            $data = $this->model_chapter->newChapter($chap);
            if($this->isDataError($data) == false){
                $chapter_id = $data['result']['chapter_id'];
                $data = $this->model_chapter->chapterDetail($chapter_id);
            }
        }
        $this->responseJson($data);
    }

    function edit(){
        $data = $this->verifyEditData();
        if($data === true) {
            $chap  = json_decode($this->request->body,true);
            $chap['chapter_id'] = $this->request->request['chapter_id'];
            $this->loader->model('chapter');
            $data = $this->model_chapter->editChapter($chap);
        }
        $this->responseJson($data);
    }

    function detail(){
        if(isset($this->request->request['chapter_id'])){
            $this->loader->model('chapter');
            $data = $this->model_chapter->chapterDetail($this->request->request['chapter_id']);
        }
        else {
            $data = array(
                "error_code" => 400,
                "error_message" => "Missing document_id"
            );
        }

        $this->responseJson($data);
    }

    private function verifyAddData(){
        if(isset($this->request->request['document_id'])){
            $keys = array('chapter_order','title','thumbnail','content','isBookMark','level','length', 'child', 'html_content', 'table_content', 'status', 'viewed');
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
        else {
            return array(
                "error_code" => 400,
                "error_message" => "Missing document_id"
            );
        }
    }

    private function verifyEditData(){
        if(isset($this->request->request['chapter_id'])){
            $keys = array('document_id', 'chapter_order','title','thumbnail','content','isBookMark','level','length', 'child', 'html_content', 'status', 'viewed');
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
        else {
            return array(
                "error_code" => 400,
                "error_message" => "Missing chapter_id"
            );
        }
    }
}