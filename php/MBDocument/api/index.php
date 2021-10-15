<?php
// Version
define('VERSION', '1.0.0');

// Configuration
if (is_file('config.php')) {
    require_once('config.php');
}

require_once(DIR_SYSTEM . 'app.php');
startApp('api\\');