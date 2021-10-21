<?php


namespace api\model;
use core;
use helper;

class File extends core\Model
{
    private $base_url = '';
    private $base_dir = '';
    private $file_types = '';

    function __construct($registry) {
        parent::__construct($registry);
        $this->base_dir = DIR_ASSETS . 'images';
        $this->base_url = ASSETS_URL.'/images';
        $this->file_types = "jpg,jpeg,png,gif,zip,JPG,JPEG,PNG,GIF,ZIP";
    }

    public function listAll($directory, $page, $per_page){
        $directory = $this->getDirectory($directory);

        if($this->isZip($directory)) {
            return $this->getZipContent($directory);
        }

        $directories = array();
        $files = array();
        if (substr(str_replace('\\', '/', realpath($directory) . '/'), 0, strlen($this->base_dir)) == str_replace('\\', '/', $this->base_dir)) {
            // Get directories
            $directories = glob($directory . '/*', GLOB_ONLYDIR);

            if (!$directories) {
                $directories = array();
            }

            // Get files
            $files = $this->getFiles($directory);

            if (!$files) {
                $files = array();
            }
        }

        // Merge directories and files
        $lists = array_merge($directories, $files);
        $data = array();
        $data['result'] = array();
        foreach ($lists as $image) {
            $name = str_split(basename($image), 14);

            if (is_dir($image)) {
                $directory_name = $this->utf8_substr($image, mb_strlen($this->base_dir));
                $data['result'][] = array(
                    'thumb' => $this->base_url . '/icon/folder.png',
                    'name'  => implode(' ', $name),
                    'type'  => 'directory',
                    'path'  => $directory_name,
                    'href'  => ''
                );
            }
            elseif (is_file($image)){
                $file_name = $this->utf8_substr($image, mb_strlen($this->base_dir));
                if($this->isZip($image)){
                    $type = 'zip';
                    $data['result'][] = array(
                        'thumb' => $this->base_url . '/icon/zip.png',
                        'name'  => implode(' ', $name),
                        'type'  => 'zip',
                        'path'  => $file_name,
                        'href'  => ''
                    );
                }
                else {
                    $data['result'][] = array(
                        'thumb' => $this->base_url.$file_name,
                        'name'  => implode(' ', $name),
                        'type'  => 'image',
                        'path'  => $file_name,
                        'href'  => $this->base_url.$file_name
                    );
                }
            }
        }
        return $data;
    }

    private function getZipContent($path){

        $data = array();
        $data['result'] = array();

        $za = new \ZipArchive();
        $za->open($path);

        for( $i = 0; $i < $za->numFiles; $i++ ){
            $stat = $za->statIndex( $i );
            $data['result'][] = array(
                'thumb' => $this->base_url . '/icon/folder.png',
                'name'  => $stat['name'],
                'type'  => 'directory',
                'path'  => $stat['name'],
                'href'  => $stat
            );
        }

        return $data;
    }

    private function utf8_substr($string, $offset, $length = null) {
        if ($length === null) {
            return mb_substr($string, $offset, mb_strlen($string));
        } else {
            return mb_substr($string, $offset, $length);
        }
    }

    private function isZip($name){
        return strpos($name, 'zip') || strpos($name, 'ZIP');
    }

    private function subDirInZip($path){
        $index = strpos($path, 'zip') + strlen('zip');
        $length = strlen($path) - $index;
        if($length > 0){
            substr($path, $index, $length);
        }
        return '';
    }

    private function getFiles($directory){
        return glob($directory . '/*.{'.$this->file_types.'}', GLOB_BRACE);
    }

    private function getDirectory($directory){
        if($directory){
            $directory = rtrim($this->base_dir . '/' . str_replace('*', '', $directory), '/');
        }
        else {
            $directory = $this->base_dir;
        }
        return $directory;
    }
}