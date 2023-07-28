const DAY_ONE = "2023-07-20";
const PROFILE_SIZE = "50%";

var userCards = [];
// load json data
var USERS, SERVICES, USER_MENTIONS;

(async () => {
  await fetch("https://starman-x64.github.io/kessoku-place-2023/data/users.json")
  .then((response) => response.json())
  .then((json) => USERS = json); 
  await fetch("https://starman-x64.github.io/kessoku-place-2023/data/services.json")
  .then((response) => response.json())
  .then((json) => SERVICES = json);
  renderUsers();
  USER_MENTIONS = document.getElementsByClassName("user-mention");
  document.getElementById("prologue").onmouseover = () => {showUserCard(userCards.filter(c => c.name == "Starman_x64")[0])};
  document.getElementById("prologue").onmouseleave = () => {hideUserPopup(userCards.filter(c => c.name == "Starman_x64")[0])};
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
    let card = createUserDiv(user);
    userCards.push({ name: user.name, card: card });
    usersDiv.appendChild(card);
  });
}

// creates a div with all the user information
function createUserDiv(userInfo) {
  let userDiv = document.createElement("div"); // holds user info to display
  userDiv.classList.add("user-div");
  // username
  let username = document.createElement("div");
  username.classList.add("user-username");
  username.innerHTML = userInfo.name;
  userDiv.appendChild(username);
  
  // profile picture
  let profileDiv = document.createElement("div"); // flex item to position within userDiv
  profileDiv.classList.add("user-profile");
  let profileMask = document.createElement("div"); // circular mask to clip the image
  profileMask.classList.add("user-profile-mask");
  let profileImg = document.createElement("img"); // actual image
  profileImg.src = `https://starman-x64.github.io/kessoku-place-2023/data/media/profiles/${userInfo.name}.png`;
  profileImg.alt = `${userInfo.name}'s Profile Picture`;
  profileMask.appendChild(profileImg);
  profileDiv.appendChild(profileMask);
  userDiv.appendChild(profileDiv);
  
  // accounts
  let accountsDiv = document.createElement("div");
  accountsDiv.classList.add("user-accounts");
  userInfo.accounts.forEach(account => {
    let link = document.createElement("a");
    link.href = account.link;
    if (account.brokenLink) link.classList.add("broken-link")
    //let service = document.createElement("div");
    let backgroundColor = SERVICES.filter(s => s.name == account.service)[0].color;
    link.classList.add("user-account");
    link.style.backgroundColor = backgroundColor;
    link.style.color = getTextColor(backgroundColor); 
    link.innerHTML = account.username;
    accountsDiv.appendChild(link);
  });

  userDiv.style.display = "none";

  userDiv.appendChild(accountsDiv);

  return userDiv;
}

// displays user card 
function showUserCard(card) {
  card.card.style.display = "flex";
}hideUserPopup
// hides user card
function hideUserPopup(card) {
  card.card.style.display = "none";
}

document.addEventListener('mousemove', (e) => {
  userCards.forEach(card => {
    card.card.style.top = `${e.clientY}px`;
    card.card.style.left = `${e.clientX}px`;
  });
});