import data from "./datafile.js";
import {
  getUniqueCategories,
  getFilteredData,
  capitalizeName,
} from "./utils.js";

const menuLabels = document.querySelector(".menu-labels");
const menuContainer = document.querySelector(".container");
const search = document.querySelector("#search-input");

// const categories = ["all", "breakfast", ...]
const categories = ["all"].concat(getUniqueCategories(data));
// categories.unshift("all");

// window.filterCategoryData = filterCategoryData;

function filterCategoryData(event) {
  const btnName = event.target.innerHTML.toLowerCase(); // All, Breakfast

  let filteredData = [];

  const menuButtons = document.querySelectorAll(".menu-label");

  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].classList.remove("active-menu-btn");
  }

  event.target.classList.add("active-menu-btn");

  if (btnName === "all") {
    filteredData = data;
  } else {
    filteredData = getFilteredData(data, btnName);
  }

  createMenuData(filteredData);
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

    const btn = `<button class="${customClass}">${capitalizeName(
      // const btn = `<button onclick="filterCategoryData(event)" class="${customClass}">${capitalizeName(
      categoryName
    )}</button>`; // All, Breakfast

    menuLabels.innerHTML += btn;
  }

  const menuButtons = document.querySelectorAll(".menu-label");

  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].addEventListener("click", filterCategoryData);
  }
}

createMenuBtns();

function createMenuData(menuData) {
  // [1,2,3]
  menuContainer.innerHTML = "";

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

createMenuData(data); // [10 menu data]

search.addEventListener("keyup", function (event) {
  // "       mlk      key      " ==> "mlk     key"
  const value = event.target.value.trim().toLowerCase();
  let filteredSearchData = [];

  if (value !== "") {
    for (let item of data) {
      if (item.title.includes(value) || item.desc.includes(value)) {
        filteredSearchData.push(item);
      }
    }
    createMenuData(filteredSearchData);
  } else {
    createMenuData(data);
  }
});
