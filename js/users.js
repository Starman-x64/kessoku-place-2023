const DAY_ONE = "2023-07-20";

// load events json
fetch("https://starman-x64.github.io/kessoku-place-2023/data/users.json")
  .then((response) => response.json())
  .then((json) => renderUsers(json)); 

// loop through each chapter and add it and its events to the screen
function renderEvents(users) {
  let usersDiv = document.getElementById("users");
  
}