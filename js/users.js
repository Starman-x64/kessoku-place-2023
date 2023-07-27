const DAY_ONE = "2023-07-20";
const PROFILE_SIZE = "50%";

// load events json
fetch("https://starman-x64.github.io/kessoku-place-2023/data/users.json")
  .then((response) => response.json())
  .then((json) => renderUsers(json)); 

// draws user info to the screen
function renderUsers(users) {
  let usersDiv = document.getElementById("users");
  console.log(users);

  users.forEach(user => {
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
      service.innerHTML = `<img class="user-account" src="https://starman-x64.github.io/kessoku-place-2023/data/media/services/${account.service.toLowerCase()}.png"/>`;
      accountsDiv.appendChild(service);
    });

    usersDiv.appendChild(userDiv);
  });
}