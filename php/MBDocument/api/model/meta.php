<?php


namespace api\model;

use core;

class Meta extends core\Model
{
    function __construct($registry)
    {
        parent::__construct($registry);
        $this->keys = array('name', 'type', 'value');
    }

    function getNodeType(){
        $query = "SELECT * FROM meta WHERE type='NodeType'";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result']['node'][] = array(
                    "id" => $result['id'],
                    "name" => $result['name'],
                    "type" => $result['type'],
                    "value" => $result['value']
                );
            }
        }
        unset($data['db']);
        return $data;
    }

    function getConfiguration($name){
        $query = "SELECT * FROM meta WHERE type='Configuration' AND name='".$this->db->escape($name)."'";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result']['node'][] = array(
                    "id" => $result['id'],
                    "name" => $result['name'],
                    "type" => $result['type'],
                    "value" => $result['value']
                );
            }
        }
        unset($data['db']);
        return $data;
    }
}