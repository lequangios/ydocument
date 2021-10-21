<?php


namespace api\model;
use core;

class Author extends core\Model
{
    function __construct($registry)
    {
        parent::__construct($registry);
        $this->keys = array('name', 'avatar', 'bio', 'address', 'phone', 'email', 'website', 'type', 'rating');
    }

    function listAuthor(){
        $query = "SELECT * FROM author";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result'][] = array(
                    "id" => $result['id'],
                    "name" => $result['name'],
                    "avatar" => $result['avatar'],
                    "bio" => $result['bio'],
                    "address" => $result['address'],
                    "phone" => $result['phone'],
                    "email" => $result['email'],
                    "website" => $result['website'],
                    "type" => $result['type'],
                    "rating" => $result['rating']
                );
            }
        }
        unset($data['db']);
        return $data;
    }

    function addAuthor($author){
        $query = "INSERT INTO `author` (`id`, `name`, `avatar`, `bio`, `address`, `phone`, `email`, `website`, `type`, `rating`) VALUES (NULL, '".$this->db->escape($author['name'])."', '".$this->db->escape($author['avatar'])."', '".$this->db->escape($author['bio'])."', '".$this->db->escape($author['address'])."', '".$this->db->escape($author['phone'])."', '".$this->db->escape($author['email'])."', '".$this->db->escape($author['website'])."', '".$this->db->escape($author['type'])."', '".(float)$author['rating']."');";

        $data = $this->queryDB($query);
        if($data['db'] != false) {
            $data['result'] = array(
                "author_id" => $data['db']['id']

            );
            unset($data['db']);
        }
        return $data;
    }

    function editAuthor($author){
        $query = "UPDATE `author` SET `name` = '".$this->db->escape($author['name'])."', `avatar` = '".$this->db->escape($author['avatar'])."', `bio` = '".$this->db->escape($author['bio'])."', `address` = '".$this->db->escape($author['address'])."', `phone` = '".$this->db->escape($author['phone'])."', `email` = '".$this->db->escape($author['email'])."', `website` = '".$this->db->escape($author['website'])."', `type` = '".$this->db->escape($author['type'])."', `rating` = '".(float)$author['rating']."' WHERE `author`.`id` = ".(int)$author['id'].";";

        $data = $this->queryDB($query);
        if($data['db'] != false) {
            $data['result'] = array(
                "author_id" => (int)$author['id']
            );
            unset($data['db']);
        }
        return $data;
    }
}