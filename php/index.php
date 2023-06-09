<?php
// Read the JWT access token from the cookies
$tenantId = 'pn4qwpby';

if (isset($_COOKIE['access_' . $tenantId])) {
    $jwt = $_COOKIE['access_' . $tenantId];
}

$hasAccessToken = isset($jwt);
?>

<html>
<head>
    <meta charset="utf-8">
    <title>Home page</title>

    <script id="Userfront-script">
        (function(m,o,d,u,l,a,r,i,z,e) {
            u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
            e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
        })("Userfront", "pn4qwpby", "https://mod.userfront.com/v3",window,document,"script");
    </script>
</head>
<body>
    <h1>Home</h1>
    <?php
        if ($hasAccessToken) {
            echo '<ul>';
            echo '<li><a href="/protected.php">Dashboard</a></li>';
            echo '<li><a href="/reset.php">Password reset</a></li>';
            echo '</ul>';
            echo '<br><button onclick="Userfront.logout()">Logout</button>';
        } else {
            echo '<a href="/login.php">Login</a>';
            echo '<!-- Signup form -->';
            echo '<div id="userfront-naanob"></div>';
        }
    ?>
</body>
</html>