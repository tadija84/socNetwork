window.addEventListener("load", function() {
  passingData(firstPage);
});

function passingData(myFunctionName) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var usersData = xhttp.responseText;
      var users = JSON.parse(usersData);
      myFunctionName(users);
    }
  };
  xhttp.open("GET", "data.json", true);
  xhttp.send();
}

function firstPage(users) {
  var wrap = document.getElementById("wraper");
  var page = document.createElement("div");
  page.setAttribute("id", "page");
  wrap.appendChild(page);
  users.forEach(displayingUser);
}
function displayingUser(user) {
    var page=document.getElementById("page");
    var usWrap=document.createElement("div");
    usWrap.setAttribute("class","userDiv");
    page.appendChild(usWrap);
    var fullName=document.createElement("div");
    fullName.innerHTML="User name: "+user.firstName+" "+user.surname;
    usWrap.appendChild(fullName);
    usAge=document.createElement("div");
    if(user.age!=null){
        usAge.innerHTML="Age: "+user.age;
    }else{
        usAge.innerHTML="Age: "+"unknown";
    }
    usWrap.appendChild(usAge);
    usGen=document.createElement("div");
    usGen.innerHTML="Gender: "+user.gender;
    usWrap.appendChild(usGen);
    usNumOFr=document.createElement("div");
    usNumOFr.innerHTML="Number of friends: "+user.friends.length;
    usWrap.appendChild(usNumOFr);
}
