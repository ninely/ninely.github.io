<?php
/**
 * @Author: Ly
 * @Date:   2016-11-16 09:42:34
 * @Last Modified by:   Ly
 * @Last Modified time: 2016-11-16 09:43:23
 */
$urls = array(
    'http://www.ninely.top/post/other/2016-11-13-hello-world.html',
);
$api = 'http://data.zz.baidu.com/urls?site=www.ninely.top&token=z5BCHuT8MV23bwPp';
$ch = curl_init();
$options =  array(
    CURLOPT_URL => $api,
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => implode("\n", $urls),
    CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
);
curl_setopt_array($ch, $options);
$result = curl_exec($ch);
echo $result;