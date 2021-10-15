<?php


namespace core;


class Response
{
    private $responseData;
    function __construct($data)
    {
        $this->responseData = $data;
    }

    public function apiOutput(){
        if(is_array($this->responseData)) {
            if(array_key_exists("error_code", $this->responseData)) {
                $this->responseFailJson($this->responseData);
            }
            else {
                $this->responseSuccessJson($this->responseData);
            }
        }
        else {
            $this->responseSuccessJson(array(
                "error_code" => 400,
                "error_message" => "Empty return data"
            ));
        }
    }

    private function responseSuccessJson($data) {
        http_response_code(200);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data) ;
        die();
    }

    private function responseFailJson($data) {
        http_response_code(400);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data) ;
        die();
    }
}