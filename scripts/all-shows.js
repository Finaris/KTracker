const maxShowsPerPage = 10;
const allShows = getAllShowsData(200);

// Attach events to the document prior to the DOM being ready.
Util.events(document, {
	// This runs when the DOM is ready.
    "DOMContentLoaded": function() {

      initAllShowsPageDOM();

    },
});

function initAllShowsPageDOM() {
  let showSectionElm = Util.one('#results-section');
  for(var i = 0; i < allShows.length; i++) {
    let showDisplayID = i + '-show-display';
    //let showDisplayElm = Util.create('div', {id: showDisplayID, class: 'airing-show-display carousel slide'});
    show = allShows[i];
    let showDisplayElm = Util.create('div', {id: showDisplayID, class: 'all-show-display'});
    let imgElm = Util.create('img', {src: "../"+show.img, class: 'show-img img-fluid'});
    let showInfo = Util.create('div', {class: 'info-div'});
    showInfo.textContent = show.title;
    showDisplayElm.appendChild(imgElm);
    showDisplayElm.appendChild(showInfo);
    showSectionElm.appendChild(showDisplayElm);
  }
}

function updateAllShowsPage(shows) {
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
  let showTitle = Util.create('div', {class: 'title-div'});
  showTitle.textContent = show.title;
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
  showElm.appendChild(showTitle);
  showElm.appendChild(dropdownElm);
  dropdownElm.appendChild(dropdownButtonElm);
  dropdownElm.appendChild(dropdownMenuElm);

  return showElm;
}