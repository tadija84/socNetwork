window.addEventListener("load", function() {
  passingData(firstPage);
});

function passingData(myFunctionName, secondParam) {
  if (secondParam === undefined) {
    secondParam = 0;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var usersData = xhttp.responseText;
      var users = JSON.parse(usersData);
      myFunctionName(users, secondParam);
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
  users.forEach(displayingUsers);
}
function displayingUsers(user) {
  var page = document.getElementById("page");
  var usWrap = document.createElement("div");
  usWrap.setAttribute("class", "userDiv");
  page.appendChild(usWrap);

  var userPic = document.createElement("img");
  if (user.gender == "male") {
    userPic.setAttribute("src", "malePic.jpeg");
    userPic.setAttribute("alt","male picture");
  } else {
    userPic.setAttribute("src", "femalePic.jpg");
    userPic.setAttribute("alt","female picture");
  }
  userPic.setAttribute("class","smallProfilPic");
  usWrap.appendChild(userPic);

  var fullName = document.createElement("div");
  fullName.innerHTML = user.firstName + " " + user.surname;
  usWrap.appendChild(fullName);
  /*
  var usAge = document.createElement("div");
  if (user.age != null) {
    usAge.innerHTML = "Age: " + user.age;
  } else {
    usAge.innerHTML = "Age: " + "unknown";
  }
  usWrap.appendChild(usAge);
  var usGen = document.createElement("div");
  usGen.innerHTML = "Gender: " + user.gender;
  usWrap.appendChild(usGen);
  var usNumOFr = document.createElement("div");
  usNumOFr.innerHTML = "Number of friends: " + user.friends.length;
  usWrap.appendChild(usNumOFr);*/
  usWrap.addEventListener("click", function() {
    displayingOne(user);
  });
}
function displayingOne(user) {
  var page = document.getElementById("page");
  page.innerHTML = null;

  var userProfil = document.createElement("div");
  userProfil.setAttribute("id","userProfil")
  var userPic = document.createElement("img");
  if (user.gender == "male") {
    userPic.setAttribute("src", "malePic.jpeg");
    userPic.setAttribute("alt","male picture");
  } else {
    userPic.setAttribute("src", "femalePic.jpg");
    userPic.setAttribute("alt","female picture");
  }
  userPic.setAttribute("class","profilPic");

  var usWrap = document.createElement("div");
  usWrap.setAttribute("class", "userBigDiv");
  page.appendChild(userProfil);
  var userData=document.createElement("div");
  userData.setAttribute("id","userData");
  usWrap.appendChild(userData);
  var fullName = document.createElement("div");
  fullName.innerHTML =  user.firstName + " " + user.surname;
  fullName.setAttribute("id","fullName");
  userData.appendChild(fullName);
  var usAge = document.createElement("div");
  if (user.age != null) {
    usAge.innerHTML = "Age: " + user.age;
  } else {
    usAge.innerHTML = "Age: " + "unknown";
  }
  userData.appendChild(usAge);
  var usGen = document.createElement("div");
  usGen.innerHTML = "Gender: " + user.gender;
  userData.appendChild(usGen);
  var usNumOFr = document.createElement("div");
  usNumOFr.innerHTML = "Number of friends: " + user.friends.length;
  userData.appendChild(usNumOFr);

  userProfil.appendChild(userPic);
  userProfil.appendChild(usWrap);

  passingData(dispFriends, user);
  passingData(disFrOfFr, user);
}

function dispFriends(users, user) {
  var usWrap = document.getElementsByClassName("userBigDiv");
  var retDiv = document.createElement("div");
  retDiv.setAttribute("class", "friendsDiv");

  var headerDiv=document.createElement("div");
headerDiv.setAttribute("class", "friendsHeader");
headerDiv.innerHTML="Your friends";
retDiv.appendChild(headerDiv);

var smallWrap=document.createElement("div");
smallWrap.setAttribute("class", "smallWrap");
retDiv.appendChild(smallWrap)

  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < user.friends.length; j++) {
      if (user.friends[j] == users[i].id) {
        var friendProfilDiv = document.createElement("div");
        friendProfilDiv.setAttribute("class", "smallProfilDiv");

        friendProfilDiv.setAttribute("id", users[i].id);

        var userPic = document.createElement("img");
        if (users[i].gender == "male") {
          userPic.setAttribute("src", "malePic.jpeg");
          userPic.setAttribute("alt","male picture");
        } else {
          userPic.setAttribute("src", "femalePic.jpg");
          userPic.setAttribute("alt","female picture");
        }
        userPic.setAttribute("class","smallProfilPic");
        friendProfilDiv.appendChild(userPic);

        var fullName = document.createElement("div");
        fullName.innerHTML = users[i].firstName + " " + users[i].surname;
        friendProfilDiv.appendChild(fullName);
       /* var usAge = document.createElement("div");
        if (users[i].age != null) {
          usAge.innerHTML = "Age: " + users[i].age;
        } else {
          usAge.innerHTML = "Age: " + "unknown";
        }
        friendProfilDiv.appendChild(usAge);
        var usGen = document.createElement("div");
        usGen.innerHTML = "Gender: " + users[i].gender;
        friendProfilDiv.appendChild(usGen);*/
        friendProfilDiv.addEventListener("click", function() {
          displayingOne(users[Number(this.id) - 1]);
        });
        smallWrap.appendChild(friendProfilDiv);
      }
    }
  }
  usWrap[0].appendChild(retDiv);
}

function disFrOfFr(users, user) {
  var usWrap = document.getElementsByClassName("userBigDiv");
  var retDiv = document.createElement("div");
  retDiv.setAttribute("class", "frOfFrDiv");

  var headerDiv=document.createElement("div");
  headerDiv.setAttribute("class", "friendsHeader");
  headerDiv.innerHTML="People you might know";
  retDiv.appendChild(headerDiv);
  
  var smallWrap=document.createElement("div");
  smallWrap.setAttribute("class", "smallWrap");
  retDiv.appendChild(smallWrap)
  

  var sugDiv = document.createElement("div");
  sugDiv.setAttribute("class", "sugestedFriends");

  var headerDiv2=document.createElement("div");
  headerDiv2.setAttribute("class", "friendsHeader");
  headerDiv2.innerHTML="Sugested contacts";
  sugDiv.appendChild(headerDiv2);
  
  var smallWrap2=document.createElement("div");
  smallWrap2.setAttribute("class", "smallWrap");
  sugDiv.appendChild(smallWrap2)

  var tempArray = [];
  var tempArray2 = [];
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < user.friends.length; j++) {
      if (user.friends[j] == users[i].id) {
        for (var ixj = 0; ixj < users.length; ixj++) {
          for (var jxi = 0; jxi < users[i].friends.length; jxi++) {
            var checkArr = tempArray.includes(users[ixj].id);
            var checkArr2 = user.friends.includes(users[ixj].id);
            var checkArr3 = tempArray2.includes(users[ixj].id);
            if (
              users[i].friends[jxi] == users[ixj].id &&
              users[ixj].id != user.id &&
              checkArr2 == false
            ) {
              if (checkArr == false) {
                var friendProfilDiv = document.createElement("div");
                friendProfilDiv.setAttribute("class", "smallProfilDiv");
                friendProfilDiv.setAttribute("id", users[ixj].id);

                var userPic = document.createElement("img");
                if (users[ixj].gender == "male") {
                  userPic.setAttribute("src", "malePic.jpeg");
                  userPic.setAttribute("alt","male picture");
                } else {
                  userPic.setAttribute("src", "femalePic.jpg");
                  userPic.setAttribute("alt","female picture");
                }
                userPic.setAttribute("class","smallProfilPic");
                friendProfilDiv.appendChild(userPic);


                var fullName = document.createElement("div");
                fullName.innerHTML = users[ixj].firstName +
                  " " +
                  users[ixj].surname;
                friendProfilDiv.appendChild(fullName);


               /* var usAge = document.createElement("div");
                if (users[ixj].age != null) {
                  usAge.innerHTML = "Age: " + users[ixj].age;
                } else {
                  usAge.innerHTML = "Age: " + "unknown";
                }
                friendProfilDiv.appendChild(usAge);
                var usGen = document.createElement("div");
                usGen.innerHTML = "Gender: " + users[ixj].gender;
                friendProfilDiv.appendChild(usGen);*/


                friendProfilDiv.addEventListener("click", function() {
                  displayingOne(users[Number(this.id) - 1]);
                });
                smallWrap.appendChild(friendProfilDiv);
                tempArray.push(users[ixj].id);
              } else if (checkArr3 == false) {
                var friendProfilDiv = document.createElement("div");
                friendProfilDiv.setAttribute("class", "smallProfilDiv");
                friendProfilDiv.setAttribute("id", users[ixj].id);


                var userPic = document.createElement("img");
                if (users[ixj].gender == "male") {
                  userPic.setAttribute("src", "malePic.jpeg");
                  userPic.setAttribute("alt","male picture");
                } else {
                  userPic.setAttribute("src", "femalePic.jpg");
                  userPic.setAttribute("alt","female picture");
                }
                userPic.setAttribute("class","smallProfilPic");
                friendProfilDiv.appendChild(userPic);

                var fullName = document.createElement("div");
                fullName.innerHTML =  users[ixj].firstName +
                  " " +
                  users[ixj].surname;
                friendProfilDiv.appendChild(fullName);

        
               /* var usAge = document.createElement("div");
                if (users[ixj].age != null) {
                  usAge.innerHTML = "Age: " + users[ixj].age;
                } else {
                  usAge.innerHTML = "Age: " + "unknown";
                }
                friendProfilDiv.appendChild(usAge);
                var usGen = document.createElement("div");
                usGen.innerHTML = "Gender: " + users[ixj].gender;
                friendProfilDiv.appendChild(usGen);*/


                friendProfilDiv.addEventListener("click", function() {
                  displayingOne(users[Number(this.id) - 1]);
                });
                smallWrap2.appendChild(friendProfilDiv);
                tempArray2.push(users[ixj].id);
              }
            }
          }
        }
      }
    }
  }
  usWrap[0].appendChild(retDiv);
  usWrap[0].appendChild(sugDiv);
}
