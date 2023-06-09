<?php
// Use the PHP-JWT library https://github.com/firebase/php-jwt
// Installed first with "composer require firebase/php-jwt"
require __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;

// Read the JWT access token from the cookies
$tenantId = 'pn4qwpby';
$jwt = $_COOKIE['access_' . $tenantId];

// If the JWT access token is not set, redirect to login page
if (!isset($jwt)) {
    header("Location: /login.php");
    die();
}

$publicKey = "-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAs5fuiDLiZICIMnN3OAIP
Dv/IQIJSJ/IIPG8Q/uYxIx10Sm1SiykggrQIKYCAZoyqxxq8/mJhdXsMm1vWK+e3
kN0KJNylB4+/kNVQOgxoT3+qlas4ieZb1/p3eIlFMrNjHRqgFmDd75z+L0k4bVJ/
2Bh2kCxx7d9cS0A7cyEJ7ZFq6FeiNRUxhhpdwzMm5+A8WK8urYLIO6yfe4Cast1r
ToBrleIyXbs32fTezmTXA3IsoA1Cj/XADqsloV2FR/xA5DEaqgo3I6OmqFX8xiG6
f6IMneObVsDphEnDTda6IxPqxnfsetcu8gL0sNzsxxKe2+/FlNNRKdp7Jq8PGy2q
dAJxFXfcpM+TqcOtF4UIfPcZ6rDm/9McJ9uUj4nNKPilgZhsxeRGwaXJVFgaHB+h
+BYGWRQm8WBXBj4aMyyf2/T4mV/PeSqXY+2N28rEUjhw2E3rMCF4gHiauVv8qn19
hWEnKwk8IF1hJLkbtXLhF41KPCVC++x7EtQ27t1RE5+KAlH4bm3+CRdHqkjAyzCt
90m+3iTB5ThUk9mBZk3Ozr1+w7vvjUlyUSe0/hC5MLc1B7ee/bu2JBBRCcgXziBt
YHqFCRKQz3nc1vQXiYDhUgjZRq74mkzFN6H+X+Y9Sk3VUHJazvsGmmwEy1Cdw6kf
dgmH+hE/hlRBdk6licZic0kCAwEAAQ==
-----END PUBLIC KEY-----";

// Verify the JWT access token using the public key. 
// If it is not valid, remove all cookies and redirect to /login.php
try {
    $decoded = JWT::decode($jwt, $publicKey, array('RS256'));
    $roles = $decoded->authorization->$tenantId->roles;
    $isAdmin = in_array('admin', $roles);
} catch (Exception $e) {
    setcookie("access_" . $tenantId, "", time() - 3600);
    setcookie("id_" . $tenantId, "", time() - 3600);
    setcookie("refresh_" . $tenantId, "", time() - 3600);
    header("Location: /login.php");
    die();
}
?>

<html>
<head>
    <meta charset="utf-8">
    <title>Dashboard</title>

    <script id="Userfront-script">
        (function(m,o,d,u,l,a,r,i,z,e) {
            u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
            e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
        })("Userfront", "pn4qwpby", "https://mod.userfront.com/v3",window,document,"script");
    </script>
</head>
<body>

<a href="/">Home</a> / Dashboard
<br>
<br>

<?php if ($isAdmin) { echo '<a href="/admin.php">Admin page</a><br><br>'; } ?>

This page is only for users who are logged in. The current user has the following JWT access token payload:

<br>
<pre><?php echo print_r((array) $decoded, true); ?></pre>
<br>

<button onclick="Userfront.logout()">Logout</button>

</body>
</html>