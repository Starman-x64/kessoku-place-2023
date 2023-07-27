const DAY_ONE = "2023-07-20";

// load events json
fetch("https://starman-x64.github.io/kessoku-place-2023/data/events.json")
  .then((response) => response.json())
  .then((json) => renderEvents(json)); 

// loop through each chapter and add it and its events to the screen
function renderEvents(eventsObject) {
  
  let documentation = document.getElementById("documentation");
  eventsObject.forEach(chapter => {
    // create div and table to contain events
    let chapterDiv = document.createElement("div");
    let eventsTable = document.createElement("table");
    chapterDiv.innerHTML = `<h2>${chapter.name}</h2>`
    chapterDiv.classList.add("chapter");
    eventsTable.classList.add("events-table");

    // make sure events are sorted by time
    let sortedEvents = chapter.events.sort((a, b) => (a.timeStamp > b.timeStamp ? 1 : -1));
    // loop through each event and write it to the chapterDiv
    sortedEvents.forEach(event => {
      let eventTR = document.createElement("tr");
      let timeStamp = document.createElement("td");
      let description = document.createElement("td");

      timeStamp.innerHTML = event.timeStamp;
      timeStamp.classList.add("time-stamp");
      description.innerHTML = event.description;
      timeStamp.classList.add("event-description");
      eventTR.classList.add("event");

      eventTR.appendChild(timeStamp);
      eventTR.appendChild(description);
      
      eventsTable.appendChild(eventTR);
    });

    chapterDiv.appendChild(eventsTable);
    documentation.appendChild(chapterDiv);
    console.log(chapter);
  });
}