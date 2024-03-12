import data from "./datafile.js";

const menuLabels = document.querySelector(".menu-labels");
const menuContainer = document.querySelector(".container");
const search = document.querySelector("#search-input");

// const categories = ["all", "breakfast", ...]
const categories = ["all"].concat(getUniqueCategories(data));
// categories.unshift("all");

function getUniqueCategories(data) {
  const array = [];

  for (let i = 0; i < data.length; i++) {
    if (!array.includes(data[i].category)) {
      array.push(data[i].category);
    }
  }

  return array;
}

// "apple" => "Apple" ==> charAt(0) + slice(1)

function capitalizeName(btnName) {
  return btnName.charAt(0).toUpperCase() + btnName.slice(1); // Apple
}

window.filterCategoryData = filterCategoryData;

function filterCategoryData(event) {
  console.log(event.target.innerHTML);
}

function createMenuBtns() {
  for (let i = 0; i < categories.length; i++) {
    const categoryName = categories[i];

    let customClass;

    if (i === 0) {
      customClass = "menu-label active-menu-btn";
    } else {
      customClass = "menu-label";
    }

    const btn = `<button onclick="filterCategoryData(event)" class="${customClass}">${capitalizeName(
      categoryName
    )}</button>`;

    menuLabels.innerHTML += btn;
  }
}

createMenuBtns();

function createMenuData(menuData) {
  for (let i = 0; i < menuData.length; i++) {
    const newItem = `<div class="card">
        <div class="card-left">
          <img src="${menuData[i].img}" alt="" width="100" />
        </div>
        <div class="card-right">
          <div class="title">
            <strong>${capitalizeName(menuData[i].title)}</strong>
            <span>${menuData[i].price}</span>
          </div>
          <p>${menuData[i].desc}</p>
        </div>
      </div>`;

    menuContainer.innerHTML += newItem;
  }
}

createMenuData(data);
