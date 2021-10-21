<?php


namespace core;

use library;

class Model
{
    protected $db = null;
    protected $keys = array();

    function __construct($registry)
    {
        //$this->db = new library\Database(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
        $this->db = $registry->get('db');
    }

    function queryDB($query) {
        $data = array();
        try {
            $query_data = $this->db->query($query);
            if($query_data === true) {
                $id = $this->db->getLastId();
                $data['db'] = array(
                    "id" => $id
                );
            }
            else {
                $data['db'] = $query_data->rows;
            }
        }
        catch (\Exception $exception) {
            $data['db'] = false;
            $data['error_code'] = $exception->getCode();
            $data['error_message'] = $exception->getMessage();
            $data['query'] = $query;
        }
        return $data;
    }

    function verify($data) {
        $result = array();
        $result['is_error'] = false;
        if(is_array($data)){
            $missing_key = array();
            foreach ($this->keys as $key) {
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
            $result['key'] = join(",",$this->keys);
        }

        return $result;
    }
}