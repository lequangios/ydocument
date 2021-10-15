<?php

namespace api\controller;
use utils\MBMySQL;
use core\MBRequest;

class DocumentController
{
    private $data_source = false;
    public function __construct()
    {
        $this->data_source = new  MBMySQL(MB_HOST,MB_USER,MB_PASSWORD,MB_DATABASE);
    }

    public function getChappterDetail($request){

    }
}