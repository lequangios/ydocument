<?php


namespace api\model;

use core;

class Chapter extends core\Model
{
    function __construct()
    {
        parent::__construct();
        $this->keys = array('document_id', 'chapter_order', 'title', 'thumbnail', 'content', 'isBookMark', 'level', 'length', 'child', 'html_content');
    }

    function listChapters(){
        $query = "SELECT ch.id, ch.title, ch.thumbnail, ch.chapter_order, ch.date_create, ch.status, ch.viewed, doc.id AS document_id, doc.name AS document_name FROM chapter AS ch JOIN document AS doc WHERE ch.document_id = doc.id";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result'][] = array(
                    "id" => $result['id'],
                    "document_id" => $result['document_id'],
                    "document_name" => $result['document_name'],
                    "chapter_order" => $result['chapter_order'],
                    "title" => $result['title'],
                    "thumbnail" => $result['thumbnail'],
                    "date_create" => $this->db->formatDatetime($result['date_create']),
                    "status" => $result['status'],
                    "viewed" => $result['viewed']
                );
            }
        }
        unset($data['db']);
        return $data;
    }

    function listChapter($document_id){
        $query = "SELECT * FROM chapter WHERE document_id='".(int) $document_id."'";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result'][] = array(
                    "id" => $result['id'],
                    "document_id" => $result['document_id'],
                    "chapter_order" => $result['chapter_order'],
                    "title" => $result['title'],
                    "thumbnail" => $result['thumbnail'],
                    "date_create" => $this->db->formatDatetime($result['date_create']),
                    "date_update" => $this->db->formatDatetime($result['date_update']),
                    "status" => $result['status'],
                    "viewed" => $result['viewed']
                );
            }
        }
        unset($data['db']);
        return $data;
    }

    function chapterDetail($chapter_id){
        $query = "SELECT * FROM chapter WHERE id='".(int) $chapter_id."'";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            foreach ($data['db'] as $result) {
                $data['result']['chapter'] = array(
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
                    "date_update" => $this->db->formatDatetime($result['date_update']),
                    "status" => $result['status'],
                    "viewed" => $result['viewed']
                );
                break;
            }
        }
        unset($data['db']);
        return $data;
    }

    public function newChapter($chap){
        $query = "INSERT INTO `chapter` (`id`, `document_id`, `chapter_order`, `title`, `thumbnail`, `content`, `isBookMark`, `level`, `length`, `child`, `date_create`, `date_update`, `html_content`, `table_content`, `status`, `viewed`) VALUES (NULL, '".(int)$chap['document_id']."', '".(int)$chap['chapter_order']."', '".$this->db->escape($chap['title'])."', '".$this->db->escape($chap['thumbnail'])."', '".$this->db->escape($chap['content'])."', '".(int)$chap['isBookMark']."', '".(int)$chap['level']."', '".(int)$chap['length']."', '".$this->db->escape($chap['child'])."', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '".$this->db->escape($chap['html_content'])."','".$this->db->escape($chap['table_content'])."', '".(int)$chap['status']."', '".(int)$chap['viewed']."');";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            $data['result'] = array(
                "chapter_id" => $data['db']['id']

            );
            unset($data['db']);
        }
        return $data;
    }

    public function editChapter($chap){
        $query = "UPDATE `chapter` SET `document_id` = '".(int)$chap['document_id']."', `chapter_order` = '".(int)$chap['chapter_order']."', `title` = '".$this->db->escape($chap['title'])."', `thumbnail` = '".$this->db->escape($chap['thumbnail'])."', `content` = '".$this->db->escape($chap['content'])."', `isBookMark` = '".(int)$chap['isBookMark']."', `level` = '".(int)$chap['level']."', `length` = '".(int)$chap['length']."', `child` = '".$this->db->escape($chap['child'])."', `html_content` = '".$this->db->escape($chap['html_content'])."',`table_content`='".$this->db->escape($chap['table_content'])."', `date_update`=CURRENT_TIMESTAMP, `viewed` = '".(int)$chap['viewed']."' WHERE `chapter`.`id` = ".(int)$chap['chapter_id'].";";
        $data = $this->queryDB($query);
        if($data['db'] != false) {
            $data['result'] = array(
                "chapter_id" => (int)$chap['chapter_id']
            );
            unset($data['db']);
        }
        return $data;
    }

}