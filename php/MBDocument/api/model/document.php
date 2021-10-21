<?php


namespace api\model;

use core;

class Document extends core\Model
{
    function __construct($registry)
    {
        parent::__construct($registry);
        $this->keys = array('name', 'description', 'thumbnail');
    }

    function listDoc(){
        $query = "SELECT * FROM document";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result'][] = array(
                    "document_id" => $result['id'],
                    "name" => $result['name'],
                    "description" => $result['description'],
                    "thumbnail" => $result['thumbnail'],
                    "viewed" => $result['viewed'],
                    "status" => $result['status'],
                    "date_create" => $this->db->formatDatetime($result['date_create'])
                );
            }
            unset($data['db']);
        }
        return $data;
    }

    function add($doc) {
        $check = $this->verify($doc);
        $data = array();
        if($check['is_error'] == false) {
            $query = "INSERT INTO `document` (`id`, `name`, `description`, `thumbnail`, `date_create`, `date_update`) VALUES (NULL, '".$this->db->escape($doc['name'])."', '".$this->db->escape($doc['description'])."', '".$this->db->escape($doc['thumbnail'])."', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)";
            $data = $this->queryDB($query);
            $data['result'] = array(
                "document_id" => $data['db']['id']
            );
            unset($data['db']);
        }
        else {
            $data['error_code'] = 999;
            $data['error_message'] = "Missing keys: {$check['key']}";
        }
        return $data;
    }

    function addMeta($doc){
        $query = "INSERT INTO `document_meta` (`id`, `document_id`, `author_id`, `category_id`, `description`) VALUES (NULL, '".(int)$doc['document_id']."', '".(int)$doc['author_id']."', '".(int)$doc['category_id']."', '".$this->db->escape($doc['description'])."');";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            $data['result'] = array(
                "document_id" => $data['db']['id']
            );
            unset($data['db']);
        }
        return $data;
    }

    function edit($doc){
        $document_id = $doc['document_id'];
        $query = "UPDATE document SET name='".$this->db->escape($doc['name'])."', description='".$this->db->escape($doc['description'])."', thumbnail='".$this->db->escape($doc['thumbnail'])."', status='".(int) $doc['status']."',table_content='".$this->db->escape($doc['table_content'])."' , date_update=CURRENT_TIMESTAMP WHERE document.id='".(int)$document_id."'";
        $data = $this->queryDB($query);

        if($data['db'] != false) {
            $data['result'] = array(
                "document_id" => $data['db']['id']
            );
            unset($data['db']);
        }
        return $data;
    }

    function editMeta($meta){
        $query = "UPDATE `document_meta` SET `document_id` = '".(int)$meta['document_id']."', `author_id` = '".(int)$meta['author_id']."', `category_id` = '".(int) $meta['category_id']."', `description` = '".$this->db->escape($meta['description'])."' WHERE `document_meta`.`id` = '".(int)$meta['meta_id']."'";
        $data = $this->queryDB($query);

        if($data['db'] != false) {
            $data['result'] = array(
                "document_id" => $data['db']['id']
            );
            unset($data['db']);
        }
        return $data;
    }

    function details($document_id){
        $query = "SELECT * FROM document WHERE id='".(int)$document_id."'";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result']['document'] = array(
                    "document_id" => $result['id'],
                    "name" => $result['name'],
                    "description" => $result['description'],
                    "thumbnail" => $result['thumbnail'],
                    "viewed" => $result['viewed'],
                    "status" => $result['status'],
                    "table_content" => $result['table_content'],
                    "date_create" => $this->db->formatDatetime($result['date_create'])
                );
                break;
            }
            unset($data['db']);
            $data['result']['document']['chapter'] = $this->getDocumentChapters($document_id);
        }

        return $data;
    }

    function view($document_id){
        $query = "SELECT * FROM document WHERE id='".(int)$document_id."'";
        $data = $this->queryDB($query);

        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result']['document'] = array(
                    "table_content" => $result['table_content'],
                );
                break;
            }
            unset($data['db']);
            $chapter = $this->getDocumentChapterContents($document_id);
            $data['result']['document']["table_content"] = str_replace("xxx", $chapter['table_content'], $data['result']['document']["table_content"]);
            $data['result']['document']['html_content'] = $chapter['html_content'];
        }

        return $data;
    }

    private function getDocumentChapters($document_id){
        $query = "SELECT * FROM chapter WHERE document_id='".(int) $document_id."'";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['chap'][] = array(
                    "id" => $result['id'],
                    "document_id" => $result['document_id'],
                    "chapter_order" => $result['chapter_order'],
                    "title" => $result['title'],
                    "thumbnail" => $result['thumbnail'],
                    "content" => $result['content'],
                    "isBookMark" => $result['isBookMark'],
                    "level" => $result['level'],
                    "length" => $result['length'],
                    "child" => $result['child'],
                    "html_content" => $result['html_content'],
                    "table_content" => $result['table_content'],
                    "date_create" => $this->db->formatDatetime($result['date_create']),
                    "status" => $result['status'],
                    "viewed" => $result['viewed']
                );
            }
        }
        else {
            return $data['chap'] = [];
        }
        unset($data['db']);
        return $data['chap'];
    }

    private function getDocumentChapterContents($document_id){
        $query = "SELECT * FROM chapter WHERE document_id='".(int) $document_id."'";
        $data = $this->queryDB($query);
        $data['chap'] = array(
            'html_content' => '',
            'table_content' => ''
        );

        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['chap']['html_content'] .= $result['html_content'];
                $data['chap']['table_content'] .= $result['table_content'];
            }
        }

        unset($data['db']);
        return $data['chap'];
    }

}