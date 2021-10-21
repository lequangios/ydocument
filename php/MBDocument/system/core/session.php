<?php


namespace core;
use library;

final class Session
{
    private $maxlifetime;
    private $db;
    protected $session_id;
    public $data = array();

    function __construct(){
        $this->maxlifetime = ini_get('session.gc_maxlifetime') !== null ? (int)ini_get('session.gc_maxlifetime') : 1440;
        $this->db = new library\Database(DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE);
        $this->gc();

        register_shutdown_function(array($this, 'close'));
    }

    public function auto_start($session_name){
        if (isset($_COOKIE[$session_name])) {
            $session_id = $_COOKIE[$session_name];
        } else {
            $session_id = '';

        }
        $this->start($session_id);

        setcookie($session_name, $this->getId(), ini_get('session.cookie_lifetime'), ini_get('session.cookie_path'), ini_get('session.cookie_domain'));
    }

    public function start($session_id = '') {
        if (!$session_id) {
            if (function_exists('random_bytes')) {
                $session_id = substr(bin2hex(random_bytes(26)), 0, 26);
            } else {
                $session_id = substr(bin2hex(openssl_random_pseudo_bytes(26)), 0, 26);
            }
        }

        if (preg_match('/^[a-zA-Z0-9,\-]{22,52}$/', $session_id)) {
            $this->session_id = $session_id;
        } else {
            exit('Error: Invalid session ID!');
        }

        $this->data = $this->read($session_id);

        return $session_id;
    }

    public function close() {
        $this->write($this->session_id, $this->data);
    }

    public function destroy() {
        $this->destroySession($this->session_id);
    }

    private function read($session_id){
        $query = "SELECT `data` FROM `" . DB_PREFIX . "session` WHERE `session_id` = '" . $this->db->escape($session_id) . "' AND `expire` > '" . $this->db->escape(date('Y-m-d H:i:s', time())) . "'";
        $result = $this->db->query($query);
        if ($result->num_rows) {
            return json_decode($result->row['data'], true);
        } else {
            return false;
        }
    }

    private function write($session_id, $data) {
        if ($session_id) {
            $this->db->query("REPLACE INTO `" . DB_PREFIX . "session` SET `session_id` = '" . $this->db->escape($session_id) . "', `data` = '" . $this->db->escape(json_encode($data)) . "', `expire` = '" . $this->db->escape(date('Y-m-d H:i:s', time() + (int)$this->maxlifetime)) . "'");
        }

        return true;
    }

    private function destroySession($session_id) {
        $this->db->query("DELETE FROM `" . DB_PREFIX . "session` WHERE `session_id` = '" . $this->db->escape($session_id) . "'");

        return true;
    }

    private function gc() {
        if (ini_get('session.gc_divisor') && $gc_divisor = (int)ini_get('session.gc_divisor')) {
            $gc_divisor = $gc_divisor === 0 ? 100 : $gc_divisor;
        } else {
            $gc_divisor = 100;
        }

        if (ini_get('session.gc_probability')) {
            $gc_probability = (int)ini_get('session.gc_probability');
        } else {
            $gc_probability = 1;
        }

        if (mt_rand() / mt_getrandmax() > $gc_probability / $gc_divisor) {
            $this->db->query("DELETE FROM `" . DB_PREFIX . "session` WHERE `expire` < '" . $this->db->escape(date('Y-m-d H:i:s', time())) . "'");

            return true;
        }
    }

}