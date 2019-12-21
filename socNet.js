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
  var fullName = document.createElement("div");
  fullName.innerHTML = "User name: " + user.firstName + " " + user.surname;
  usWrap.appendChild(fullName);
  usAge = document.createElement("div");
  if (user.age != null) {
    usAge.innerHTML = "Age: " + user.age;
  } else {
    usAge.innerHTML = "Age: " + "unknown";
  }
  usWrap.appendChild(usAge);
  usGen = document.createElement("div");
  usGen.innerHTML = "Gender: " + user.gender;
  usWrap.appendChild(usGen);
  usNumOFr = document.createElement("div");
  usNumOFr.innerHTML = "Number of friends: " + user.friends.length;
  usWrap.appendChild(usNumOFr);
  usWrap.addEventListener("click", function() {
    displayingOne(user);
  });
}
function displayingOne(user) {
  console.log(user.firstName);
  var page = document.getElementById("page");

  page.innerHTML = null;
  var usWrap = document.createElement("div");
  usWrap.setAttribute("class", "userBigDiv");
  page.appendChild(usWrap);
  var fullName = document.createElement("div");
  fullName.innerHTML = "User name: " + user.firstName + " " + user.surname;
  usWrap.appendChild(fullName);
  usAge = document.createElement("div");
  if (user.age != null) {
    usAge.innerHTML = "Age: " + user.age;
  } else {
    usAge.innerHTML = "Age: " + "unknown";
  }
  usWrap.appendChild(usAge);
  usGen = document.createElement("div");
  usGen.innerHTML = "Gender: " + user.gender;
  usWrap.appendChild(usGen);
  usNumOFr = document.createElement("div");
  usNumOFr.innerHTML = "Number of friends: " + user.friends.length;
  usWrap.appendChild(usNumOFr);
  passingData(dispFriends, user);
  passingData(disFrOfFr, user);
}

function dispFriends(users, user) {
  var usWrap = document.getElementsByClassName("userBigDiv");
  var retDiv = document.createElement("div");
  retDiv.setAttribute("class", "friendsDiv");
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < user.friends.length; j++) {
      if (user.friends[j] == users[i].id) {
        var friendProfilDiv = document.createElement("div");
        friendProfilDiv.setAttribute("class", "smallProfilDiv");
        var fullName = document.createElement("div");
        fullName.innerHTML =
          "User name: " + users[i].firstName + " " + users[i].surname;
        friendProfilDiv.appendChild(fullName);
        usAge = document.createElement("div");
        if (users[i].age != null) {
          usAge.innerHTML = "Age: " + users[i].age;
        } else {
          usAge.innerHTML = "Age: " + "unknown";
        }
        friendProfilDiv.appendChild(usAge);
        usGen = document.createElement("div");
        usGen.innerHTML = "Gender: " + users[i].gender;
        friendProfilDiv.appendChild(usGen);
        retDiv.appendChild(friendProfilDiv);
      }
    }
  }
  usWrap[0].appendChild(retDiv);
}

function disFrOfFr(users, user) {
  var usWrap = document.getElementsByClassName("userBigDiv");
  var retDiv = document.createElement("div");
  retDiv.setAttribute("class", "frOfFrDiv");
  var tempArray = [];
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < user.friends.length; j++) {
      if (user.friends[j] == users[i].id) {
        //users[i]
        for (var ixj = 0; ixj < users.length; ixj++) {
          for (var jxi = 0; jxi < users[i].friends.length; jxi++) {
            var checkArr = tempArray.includes(users[ixj].id);
            var checkArr2 = user.friends.includes(users[ixj].id);
            if (
              users[i].friends[jxi] == users[ixj].id &&
              users[ixj].id != user.id &&
              checkArr == false &&
              checkArr2 == false
            ) {
              var friendProfilDiv = document.createElement("div");
              friendProfilDiv.setAttribute("class", "smallProfilDiv");
              var fullName = document.createElement("div");
              fullName.innerHTML =
                "User name: " + users[ixj].firstName + " " + users[ixj].surname;
              friendProfilDiv.appendChild(fullName);
              usAge = document.createElement("div");
              if (users[ixj].age != null) {
                usAge.innerHTML = "Age: " + users[ixj].age;
              } else {
                usAge.innerHTML = "Age: " + "unknown";
              }
              friendProfilDiv.appendChild(usAge);
              usGen = document.createElement("div");
              usGen.innerHTML = "Gender: " + users[ixj].gender;
              friendProfilDiv.appendChild(usGen);
              retDiv.appendChild(friendProfilDiv);
              tempArray.push(users[ixj].id);
            }
          }
        }
      }
    }
  }
  usWrap[0].appendChild(retDiv);
}
