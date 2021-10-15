<?php
namespace api;
require_once('MBApi.php');

use api\MBApi;

$api = new MBApi();
$api->router->get('/api/doc/', function ($request) {
    return "Hello world";
});

