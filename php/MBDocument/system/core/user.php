<?php


namespace core;


class User
{
    private $user_id;
    private $username;
    private $db;
    private $request;
    private $session;
    public function __construct($registry) {
        $this->db = $registry->get('db');
        $this->request = $registry->get('request');
        $this->session = $registry->get('session');
        if (isset($this->session->data['user_id'])) {
            $query = "SELECT * FROM author WHERE `author`.`id` = '".(int)$this->session->data['user_id']."' AND status = 1";
            $user_query = $this->db->query($query);
            if ($user_query->num_rows) {
                $this->user_id = $user_query->row['id'];
                $this->username = $user_query->row['email'];
            }
            else {

            }
        }
    }

    public function login($username, $password) {
        $query = "SELECT * FROM author WHERE `author`.`email` = '".$this->db->escape($username)."' AND password = '".$this->db->escape(md5($password))."' AND status = 1";
        $user_query = $this->db->query($query);
        if ($user_query->num_rows) {
            $this->session->data['user_id'] = $user_query->row['id'];
            $this->username = $user_query->row['email'];
            return true;
        }
        else {
            return false;
        }
    }

    public function logout() {
        unset($this->session->data['user_id']);
        $this->user_id = '';
        $this->username = '';
    }

    public function isLogged() {
        return $this->user_id;
    }

    public function getId() {
        return $this->user_id;
    }

    public function getUserName() {
        return $this->username;
    }
}