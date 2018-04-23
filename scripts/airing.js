const maxShowsPerRow = 5;
const airingShowsByDay = getAiringShowsData(200);

// Attach events to the document prior to the DOM being ready.
Util.events(document, {
	// This runs when the DOM is ready.
    "DOMContentLoaded": function() {

      initAiringPageDOM();

    },
});

function initAiringPageDOM() {
  let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let showSectionElm = Util.one('#show-section');
  for(let day of daysOfWeek) {
    let showsOnDay = airingShowsByDay[day];
    if (showsOnDay.length == 0) {
      continue;
    }

    let daySectionElm = Util.create('div', {id: day.toLowerCase() + '-section', class: 'day-section'});
    let headerElm = Util.create('h2', {});
    headerElm.innerHTML = day;

    let showDisplayID = day.toLowerCase() + '-show-display';
    let showDisplayElm = Util.create('div', {id: showDisplayID, class: 'airing-show-display carousel slide'});
    showDisplayElm.setAttribute("data-interval", "false");
    
    let carouselInnerElm = Util.create('div', {class: 'carousel-inner', role: 'listbox', id: day.toLowerCase() + '-carousel-inner'});

    let showNumber = 0;
    let carouselItemElm = Util.create('div', {class: "carousel-item row no-gutters active"})
    for(let show of showsOnDay) {
      if (showNumber == 5) {
        showNumber = 0;
        carouselInnerElm.appendChild(carouselItemElm);
        carouselItemElm = Util.create('div', {class: "carousel-item row no-gutters"})
      }
      carouselItemElm.appendChild(getShowElmFromShowData(show));
      showNumber++;
    }
    carouselInnerElm.appendChild(carouselItemElm);


    let leftButtonElm = Util.create('a', {class: 'carousel-control-prev', role: "button", 'data-slide': "prev"});
    leftButtonElm.appendChild(Util.create('span', {class: 'carousel-control-prev-icon', 'aria-hidden': "true"}));
    leftButtonElm.setAttribute("data-target", "#"+showDisplayID);

    let rightButtonElm = Util.create('a', {class: 'carousel-control-next', role: "button", 'data-slide': "next"});
    rightButtonElm.appendChild(Util.create('span', {class: 'carousel-control-next-icon', 'aria-hidden': "true"}));
    rightButtonElm.setAttribute("data-target", "#"+showDisplayID);

    showSectionElm.appendChild(daySectionElm);
    daySectionElm.appendChild(headerElm);
    daySectionElm.appendChild(showDisplayElm);
    showDisplayElm.appendChild(carouselInnerElm);
    showDisplayElm.appendChild(leftButtonElm);
    showDisplayElm.appendChild(rightButtonElm);
  }
}

function updateAiringPage(shows) {
  let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  for(let day of daysOfWeek) {
    let showsOnDay = shows[day];
    
    let carouselInnerElm = Util.one('#'+day.toLowerCase()+'-carousel-inner');

    let showNumber = 0;

    while(carouselInnerElm.firstChild) {
      carouselInnerElm.removeChild(carouselInnerElm.firstChild);
    }

    let carouselItemElm = Util.create('div', {class: "carousel-item row no-gutters active"})

    for (let show of showsOnDay) {
      if (showNumber == 5) {
        showNumber = 0;
        carouselInnerElm.appendChild(carouselItemElm);
        carouselItemElm = Util.create('div', {class: "carousel-item row no-gutters"})
      }
      carouselItemElm.appendChild(getShowElmFromShowData(show));
      showNumber++;
    }

    let currentSection = document.getElementById(day.toLowerCase()+'-section');
    if (!carouselItemElm.hasChildNodes()) {
      currentSection.style.display = "none";
      continue;
    } else {
      currentSection.style.display = "initial";
    }

    carouselInnerElm.appendChild(carouselItemElm);
  }
}

//function getShowElmFromShowData(show) {
//  let showElm = Util.create('div', {class: 'airing-show-container col-3 float-left'});
//  let imgElm = Util.create('img', {src: show.img, class: 'show-img img-fluid'});
//  let listButtonElm = Util.create('button', {class: 'add-btn'});
//  listButtonElm.innerHTML = " Add ";
//  let listButtonCaret = Util.create('i', {id: 'add-btn-caret', class: 'fa fa-caret-down'});
//
//
//  listButtonElm.appendChild(listButtonCaret);
//  listButtonElm.style.marginTop = "10px";
//
//  let listDropdown = Util.create('div', {class: 'list-container gone'});
//
//  for(let item of ["Airing", "Completed", "To Watch", "Watching"]) {
//    let newSectionDiv = document.createElement("div");
//
//    let newInput = document.createElement("input");
//    newInput.type = "checkbox";
//    newInput.value = item;
//    newInput.classList.add("filter-checkbox");
//
//    // Append the new elements to the genre div.
//    newSectionDiv.appendChild(newInput);
//    newSectionDiv.innerHTML += item;
//    listDropdown.appendChild(newSectionDiv);
//  }
//  /*<div id='rating-container' class="dropdown-container gone">
//    <div>Min: <input id="min-rating" type="number" placeholder="1" min="1" max="10"></div>
//    <div>Max: <input id="max-rating" type="number" placeholder="10" min="1" max="10"></div>
//  </div>*/
//  listButtonElm.addEventListener("click", function(e) {
//    e.preventDefault();
//    this.classList.toggle("active");
//    this.nextElementSibling.classList.toggle("gone");
//  });
//
//  showElm.appendChild(imgElm);
//  showElm.appendChild(listButtonElm);
//  showElm.appendChild(listDropdown);
//  return showElm;
//}

function getShowElmFromShowData(show) {
  let showElm = Util.create('div', {class: 'airing-show-container col-3 float-left'});
  let imgElm = Util.create('img', {src: show.img, class: 'show-img img-fluid'});
  let dropdownElm = Util.create('div', {class: 'dropdown'});
  
  let dropdownButtonElm = Util.create('button', {class: 'btn btn-default dropdown-toggle add-btn', 'data-toggle': 'dropdown'});
  dropdownButtonElm.innerHTML = "Add <span class='caret'></span>"
  
  let dropdownMenuElm = Util.create('ul', {class: 'dropdown-menu'})
  let formElm = Util.create('form');
  let listSelectionElm = Util.create('div', {class: 'input-group mb-3'})
  listSelectionElm.innerHTML = "<div class='input-group-prepend'><label class='input-group-text' for='userLists'>List</label></div><select class='custom-select' id='userLists'><option selected>To Watch</option><option>Watching</option><option>Completed</option><option>Airing</option></select>";
  let submitButtonElm = Util.create('button', {class: 'btn btn-primary'});
  
  
  formElm.onsubmit = function(e) {
    dropdownMenuElm.classList.remove("show");
    e.preventDefault();
    alert("Successfully added show to list(s).");
  };
  submitButtonElm.innerHTML = 'Add';
  
  dropdownMenuElm.appendChild(formElm);
  formElm.appendChild(listSelectionElm);
  formElm.appendChild(submitButtonElm);
  
  showElm.appendChild(imgElm);
  showElm.appendChild(dropdownElm);
  dropdownElm.appendChild(dropdownButtonElm);
  dropdownElm.appendChild(dropdownMenuElm);
  
  return showElm;
}
