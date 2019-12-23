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
  var firstHeader = document.createElement("div");
  firstHeader.setAttribute("id", "firstHeader");
  firstHeader.innerHTML = "Chose one user";
  page.appendChild(firstHeader);
  wrap.appendChild(page);
  users.forEach(displayingUsers);
}

function displayingUsers(user) {
  var page = document.getElementById("page");
  var usWrap = document.createElement("div");
  usWrap.setAttribute("class", "userDiv");
  page.appendChild(usWrap);
  var userPic = addingPic(user, "smallProfilPic");
  usWrap.appendChild(userPic);
  var fullName = addingName(user, "smallFont"); //1.2
  usWrap.appendChild(fullName);

  usWrap.addEventListener("click", function() {
    displayingOne(user);
  });
}

function addHamMenu() {
  var hamMenu = document.createElement("img");
  hamMenu.setAttribute("src", "menu.png");
  hamMenu.setAttribute("id", "hamMenu");
  hamMenu.addEventListener("click", function() {
    location.reload();
  });
  return hamMenu;
}

function displayingOne(user) {
  var page = document.getElementById("page");
  page.innerHTML = null;
  var hamMenu = addHamMenu();
  var userProfil = document.createElement("div");
  userProfil.setAttribute("id", "userProfil");
  var userPic = addingPic(user, "profilPic");
  var usWrap = document.createElement("div");
  usWrap.setAttribute("class", "userBigDiv");
  var userData = document.createElement("div");
  userData.setAttribute("id", "userData");
  var fullName = addingName(user, "bigFont");
  var usAge = addingAge(user);
  var usGen = document.createElement("div");
  usGen.innerHTML = "Gender: " + user.gender;
  var usNumOFr = document.createElement("div");
  usNumOFr.innerHTML = "Number of friends: " + user.friends.length;
  page.appendChild(hamMenu);
  page.appendChild(userProfil);
  userData.appendChild(fullName);
  userData.appendChild(usAge);
  userData.appendChild(usGen);
  userData.appendChild(usNumOFr);
  usWrap.appendChild(userData);
  userProfil.appendChild(userPic);
  userProfil.appendChild(usWrap);
  passingData(dispFriends, user);
  passingData(dispFriendsOfFriends, user);
}

function dispFriends(users, user) {
  var usWrap = document.getElementsByClassName("userBigDiv");
  var retDiv = addingRetDiv("Your friends");
  var smallWrap = document.createElement("div");
  smallWrap.setAttribute("class", "smallWrap");
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < user.friends.length; j++) {
      if (user.friends[j] == users[i].id) {
        var friendProfilDiv = addingFriendsProfile(users, i);
        smallWrap.appendChild(friendProfilDiv);
      }
    }
  }
  retDiv.appendChild(smallWrap);
  usWrap[0].appendChild(retDiv);
}

function dispFriendsOfFriends(users, user) {
  var usWrap = document.getElementsByClassName("userBigDiv");
  var retDiv = addingRetDiv("Friends of friends");
  var sugDiv = addingRetDiv("Sugested friends");

  var smallWrap = document.createElement("div");
  smallWrap.setAttribute("class", "smallWrap");

  var smallWrap2 = document.createElement("div");
  smallWrap2.setAttribute("class", "smallWrap");
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
                var friendProfilDiv = addingFriendsProfile(users, ixj);
                smallWrap.appendChild(friendProfilDiv);
                tempArray.push(users[ixj].id);
              } else if (checkArr3 == false) {
                var friendProfilDiv = addingFriendsProfile(users, ixj);
                smallWrap2.appendChild(friendProfilDiv);
                tempArray2.push(users[ixj].id);
              }
            }
          }
        }
      }
    }
  }
  sugDiv.appendChild(smallWrap2);
  retDiv.appendChild(smallWrap);
  usWrap[0].appendChild(retDiv);
  usWrap[0].appendChild(sugDiv);
}

function addingPic(user, picClass) {
  var userPic = document.createElement("img");
  if (user.gender == "male") {
    userPic.setAttribute("src", "malePic.jpeg");
    userPic.setAttribute("alt", "male picture");
  } else {
    userPic.setAttribute("src", "femalePic.jpg");
    userPic.setAttribute("alt", "female picture");
  }
  userPic.setAttribute("class", picClass);
  return userPic;
}
function addingName(user, fontClass) {
  var fullName = document.createElement("div");
  fullName.innerHTML = user.firstName + " " + user.surname;
  fullName.setAttribute("id", "fullName");
  fullName.setAttribute("class", fontClass);
  return fullName;
}
function addingAge(user) {
  var usAge = document.createElement("div");
  if (user.age != null) {
    usAge.innerHTML = "Age: " + user.age;
  } else {
    usAge.innerHTML = "Age: " + "unknown";
  }
  return usAge;
}

function addingRetDiv(divText) {
  var retDiv = document.createElement("div");
  retDiv.setAttribute("class", "friendsDiv");
  var headerDiv = document.createElement("div");
  headerDiv.setAttribute("class", "friendsHeader");
  headerDiv.innerHTML = divText;
  retDiv.appendChild(headerDiv);
  return retDiv;
}

function addingFriendsProfile(users, x) {
  var friendProfilDiv = document.createElement("div");
  friendProfilDiv.setAttribute("class", "smallProfilDiv");
  friendProfilDiv.setAttribute("id", users[x].id);
  var userPic = addingPic(users[x], "smallProfilPic");
  friendProfilDiv.appendChild(userPic);
  var fullName = addingName(users[x], "smallFont");
  friendProfilDiv.appendChild(fullName);
  friendProfilDiv.addEventListener("click", function() {
    displayingOne(users[Number(users[x].id) - 1]);
  });
  return friendProfilDiv;
}

