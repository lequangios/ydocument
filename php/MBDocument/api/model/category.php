<?php


namespace api\model;
use core;

class Category extends core\Model
{
    function __construct()
    {
        parent::__construct();
        $this->keys = array('parent_id', 'name', 'description', 'thumbnail', 'path', 'level', 'views');
    }

    function listCate(){
        $query = "SELECT * FROM category";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result'][] = array(
                    "id" => $result['id'],
                    "parent_id" => $result['parent_id'],
                    "name" => $result['name'],
                    "description" => $result['description'],
                    "thumbnail" => $result['thumbnail'],
                    "path" => $result['path'],
                    "level" => $result['level'],
                    "views" => $result['views']
                );
            }
        }
        unset($data['db']);
        return $data;
    }

    function addNew($cate){
        $query = "INSERT INTO `category` (`id`, `parent_id`, `name`, `description`, `thumbnail`, `path`, `level`, `views`) VALUES (NULL, '".$cate['parent_id']."', '".$this->db->escape($cate['name'])."', '".$this->db->escape($cate['description'])."', '".$this->db->escape($cate['thumbnail'])."', '".$this->db->escape($cate['path'])."', '".(int)$cate['level']."', '".(int)$cate['views']."');";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            $data['result'] = array(
                "cate_id" => $data['db']['id']

            );
            unset($data['db']);
        }
        return $data;
    }

    function editCate($cate){
        $query = "UPDATE `category` SET `parent_id` = '".(int)$cate['parent_id']."', `name` = '".$this->db->escape($cate['name'])."', `description` = '".$this->db->escape($cate['description'])."', `thumbnail` = '".$this->db->escape($cate['thumbnail'])."', `path` = '".$this->db->escape($cate['path'])."', `level` = '".(int)$cate['level']."', `views` = '".(int)$cate['views']."' WHERE `category`.`id` = ".(int)$cate['id'].";";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            $data['result'] = array(
                "cate_id" => (int)$cate['id']
            );
            unset($data['db']);
        }
        return $data;
    }

    function deleteCate($cate_id){
        $query = "DELETE FROM `category` WHERE `category`.`id` = ".(int)$cate_id;
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            $data['result'] = array(
                "cate_id" => (int)$cate_id
            );
            unset($data['db']);
        }
        return $data;
    }
}