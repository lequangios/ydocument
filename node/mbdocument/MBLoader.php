<?php


namespace system;


class MBLoader
{
    public static function loadCore(){
        spl_autoload_register(function($className) {
            $prefix = 'core\\'; // Namespace
            $class = preg_replace('/^' . preg_quote($prefix) . '/', '', $className);
            $filename = dirname(__FILE__).'/system/core/'. $class . '.php';
            if (file_exists($filename)) {
                include_once $filename;
            }
        });
    }

    public static function loadUtils(){
        spl_autoload_register(function($className) {
            $prefix = 'utils\\'; // Namespace
            $class = preg_replace('/^' . preg_quote($prefix) . '/', '', $className);
            $filename = dirname(__FILE__).'/system/utils/'. $class . '.php';
            if (file_exists($filename)) {
                include_once $filename;
            }
        })
        ;
    }


    public static function loadModel(){
        spl_autoload_register(function($className) {
            $prefix = 'model\\'; // Namespace
            $class = preg_replace('/^' . preg_quote($prefix) . '/', '', $className);
            $filename = dirname(__FILE__).'/system/model/'. $class . '.php';
            if (file_exists($filename)) {
                include_once $filename;
            }
        })
        ;
    }
}