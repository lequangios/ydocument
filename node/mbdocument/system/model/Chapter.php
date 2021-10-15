<?php


namespace model;


class Chapter
{
    public $data_source;

    public function __construct($data_source)
    {
        $this->data_source = $data_source;
    }

    public function getAllChaptersByDocumentID($document_id){

    }

    public function getAllChapterByID($chapter_id, $language_id){
        $data = false;
        $query = "SELECT * FROM chapter WHERE id=''".(int) $chapter_id."''";
        $query_data = $this->data_source->query($query);

        foreach ($query_data->rows as $result) {
            $data = array(
                id => $result['id'],
                document_id => $result['document_id'],
                chapter_order => $result['chapter_order'],
                title => $result['title'],
                thumbnail => $result['thumbnail'],
                content => $result['content'],
                isBookMark => $result['isBookMark'],
                level => $result['level'],
                length => $result['length'],
                child => $result['child'],
                html_content => $result['html_content']
            );
            break;
        }
        return $data;
    }

    public function addNewChapter($document_id, $language_id, $data){
        $data = false;
        $chapter_order = 0;
        if(array_key_exists($data, 'chapter_order')) { $chapter_order = $data['chapter_order'];}
        $title = '';
        if(array_key_exists($data, 'title')) { $title = $data['title'];}
        $thumbnail = '';
        if(array_key_exists($data, 'thumbnail')) { $thumbnail = $data['thumbnail'];}
        $content = '';
        if(array_key_exists($data, 'content')) { $content = $data['content'];}
        $isBookMark= 0;
        if(array_key_exists($data, 'isBookMark')) { $isBookMark = $data['isBookMark'];}
        $level= 0;
        if(array_key_exists($data, 'level')) { $level = $data['level'];}
        $length= 0;
        if(array_key_exists($data, 'length')) { $length = $data['level'];}
        $child= 0;
        if(array_key_exists($data, 'child')) { $child = $data['level'];}
        $html_content= '';
        if(array_key_exists($data, 'html_content')) { $child = $data['html_content'];}

        $query = "INSERT INTO chapter('document_id', 'chapter_order', 'title', 'thumbnail', 'content', 'isBookMark', 'level', 'length', 'child', 'language_id', 'html_content') VALUES ('".(int)$document_id."', '".(int) $chapter_order."', '".$title ."', '".$thumbnail."', '".$content."', '".(int)$isBookMark."', '".(int)$level."', '".$length."', '".(int)$child."', '".$$language_id."', 'html_content')";
    }

    public function update($chapter_id, $data)
    {

    }

    public function removeChapterByID($author_id){

    }

    public function removeAllChaptersByDocumentID($document_id){

    }
}