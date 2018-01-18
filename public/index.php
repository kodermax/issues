<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
require_once($_SERVER["DOCUMENT_ROOT"] . "/local/lib/utils/jwt/autoload.php");
$APPLICATION->SetTitle("Заявки");
$userId = (int)$GLOBALS['USER']->GetID();
$arUser = \Pharm\User::getInfoById($userId);
$token = [
    "iss" => "requests",
    "iat" => time(),
    "exp" => time() + 7 * 24 * 24 * 24,
    "aud" => "portal.xxx.ru",
    "sub" => $arUser['email'],
    "GivenName" => $arUser['titleShort'],
    "Surname" => $arUser['lastName'],
    "Email" => $arUser['email'],
    "Id" => $arUser['guid'],
    "Position" => $arUser['position'],
    "Login" => $arUser['login'],
    'Purchase' => [
        'Admin' => \Pharm\User::isUserInGroupCode('purchase_admin'),
        'Worker' => \Pharm\User::isUserInGroupCode('purchase_workers'),
        'Security' => \Pharm\User::isUserInGroupCode('purchase_security')
    ],
    'Recruitment' => [
        'Admin' => \Pharm\User::isUserInGroupCode('recruitment_admin'),
        'Worker' => \Pharm\User::isUserInGroupCode('recruitment_workers'),
        'Security' => \Pharm\User::isUserInGroupCode('recruitment_security')
    ]
];
$key = "tjqMsP0jo2I7B139vdTMZi324g33tab1";
$jwt = Firebase\JWT\JWT::encode($token, $key, 'HS256');
?>
<% HEAD %>
<input type="hidden" id="user_id" value="<?= $userId ?>">
<input type="hidden" id="user_token" value="<?= $jwt ?>">
<% BODY %>
<? require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>
  
