<?php


namespace helper;

class Utils
{
    public static function log($data) {
        echo '<br/>';
        if(is_array($data) || is_object($data)) {
            var_dump($data);
        }
        else {
            echo $data;
        }
        echo '<br/>';
    }
}