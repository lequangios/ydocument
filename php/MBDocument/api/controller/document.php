<?php
namespace api;

use core\Controller;

class Document extends Controller
{
    function index(){
        $this->loader->model('document');
        $data = $this->model_document->listDoc();
        $this->responseJson($data);
    }

    function add(){
        $doc = json_decode($this->request->body,true);
        $this->loader->model('document');
        $data =  $this->model_document->add($doc);
        if($this->isDataError($data) == false){
            $document_id = $data['result']['document_id'];
            $data = $data = $this->model_document->details($document_id);
        }
        $this->responseJson($data);
    }

    function verifyEdit(){
        $keys = array('document_id', 'name', 'description', 'thumbnail', 'status', "table_content");
        $doc = json_decode($this->request->body,true);
        $result = $this->verify($doc, $keys);
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

    function edit(){
        $data = $this->verifyEdit();
        if($data === true) {
            $doc = json_decode($this->request->body,true);
            $this->loader->model('document');
            $data = $this->model_document->edit($doc);
        }
        $this->responseJson($data);
    }

    function detail(){
        if(isset($this->request->request['document_id'])){
            $this->loader->model('document');
            $data = $this->model_document->details($this->request->request['document_id']);
        }
        else {
            $data = array(
                "error_code" => 400,
                "error_message" => "Missing document_id"
            );
        }

        $this->responseJson($data);
    }

    function view(){
        if(isset($this->request->request['document_id'])){
            $this->loader->model('document');
            $data = $this->model_document->view($this->request->request['document_id']);
        }
        else {
            $data = array(
                "error_code" => 400,
                "error_message" => "Missing document_id"
            );
        }

        $this->responseJson($data);
    }
}