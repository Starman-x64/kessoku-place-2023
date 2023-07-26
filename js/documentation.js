// load events json
fetch("https://starman-x64.github.io/kessoku-place-2023/data/events.json")
  .then((response) => response.json())
  .then((json) => renderEvents(json)); 

// loop through each chapter and add it and its events to the screen
function renderEvents(eventsObject) {
  let documentation = document.getElementById("documentation");
  eventsObject.forEach(chapter => {
    // create div to contain contents
    let chapterDiv = document.createElement("div");
    chapterDiv.innerHTML = `<h2>${chapter.name}</h2>`

    // make sure events are sorted by time
    let sortedEvents = chapter.events.sort((a, b) => (a.timeStamp > b.timeStamp ? 1 : -1));
    // loop through each event and write it to the chapterDiv
    sortedEvents.forEach(event => {
      // let eventDiv = document.createElement("div");
      console.log(event.name);
    });

    documentation.appendChild(chapterDiv);
    console.log(chapter);
  });
}