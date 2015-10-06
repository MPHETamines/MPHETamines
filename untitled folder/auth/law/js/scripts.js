
    function getUser(str) {
        if (str == "") {
            document.getElementById("foundData").innerHTML = "";
            return;
        } else {
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    document.getElementById("foundData").innerHTML = xmlhttp.responseText;
                }
            }
            xmlhttp.open("GET","getuser.php?q="+str,true);
            xmlhttp.send();
        }
    }