<?php

require_once ROOT_PATH . 'lib/utils/json_encode_safe.php';

/**
 * wrapper around our new v3 api
 */
function call_v3_api($method, $route, $payload = null) {
    $apiDomain = $GLOBALS['dw_config']['api_domain'] ?? 'api.datawrapper.de';
    $protocol = get_current_protocol();
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "$protocol://$apiDomain/v3$route",
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Cookie: DW-SESSION='.$_COOKIE['DW-SESSION']
        ],
        CURLOPT_PROTOCOLS => CURLPROTO_HTTP | CURLPROTO_HTTPS
    ]);
    if (!empty($payload)) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode_safe($payload));
    }
    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $attempt = 1;
    // bad gateway, let's retry this request a few times
    while ($status == 502 && $attempt < 11) {
        sleep(1);
        $attempt++;
        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    }
    $data = null;
    if (!empty($response)) {
        try {
            $data = json_decode($response, true, 512, JSON_THROW_ON_ERROR);
        } catch (Exception $error) {
            $data = $response;
        }
    }
    curl_close($ch);
    return [$status, $data];
}