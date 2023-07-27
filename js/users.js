const DAY_ONE = "2023-07-20";
const PROFILE_SIZE = "50%";

// load json data
var USERS, SERVICES;

(async () => {
  await fetch("https://starman-x64.github.io/kessoku-place-2023/data/users.json")
  .then((response) => response.json())
  .then((json) => USERS = json); 
  await fetch("https://starman-x64.github.io/kessoku-place-2023/data/services.json")
  .then((response) => response.json())
  .then((json) => SERVICES = json);
  renderUsers();
})();

// hex to rgb
function hexToRgb(hex, result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)) {
  return result ? result.map(i => parseInt(i, 16)).slice(1) : null;
}
// determines if text on a given background should be black or white
function getTextColor(backgroundColor) {
  let rgb = hexToRgb(backgroundColor);
  return (rgb[0]*0.299 + rgb[1]*0.587 + rgb[2]*0.114) > 186 ? "#000000" : "#ffffff" ;
}

// draws user info to the screen
function renderUsers() {
  let usersDiv = document.getElementById("users");
  console.log(USERS);

  USERS.forEach(user => {
    let userDiv = document.createElement("div"); // holds user info to display
    userDiv.classList.add("user-div");
    // username
    let username = document.createElement("div");
    username.classList.add("user-username");
    username.innerHTML = user.name;
    userDiv.appendChild(username);
    
    // profile picture
    let profileDiv = document.createElement("div"); // flex item to position within userDiv
    profileDiv.classList.add("user-profile");
    let profileMask = document.createElement("div"); // circular mask to clip the image
    profileMask.classList.add("user-profile-mask");
    let profileImg = document.createElement("img"); // actual image
    profileImg.src = `https://starman-x64.github.io/kessoku-place-2023/data/media/profiles/${user.name}.png`;
    profileImg.alt = `${user.name}'s Profile Picture`;
    profileMask.appendChild(profileImg);
    profileDiv.appendChild(profileMask);
    userDiv.appendChild(profileDiv);
    
    // accounts
    let accountsDiv = document.createElement("div");
    accountsDiv.classList.add("user-accounts");
    user.accounts.forEach(account => {
      let service = document.createElement("div");
      let backgroundColor = SERVICES.filter(s => s.name == account.service)[0].color;
      service.classList.add("user-account");
      service.style.backgroundColor = backgroundColor;
      service.style.color = getTextColor(backgroundColor); 
      service.innerHTML = `<a href="${account.link}" ${account.brokenLink ? "class=\"broken-link\"" : ""}>${account.username}`;
      accountsDiv.appendChild(service);
    });
    userDiv.appendChild(accountsDiv);

    usersDiv.appendChild(userDiv);
  });
}