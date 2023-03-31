const switchThemeBtn = document.querySelector(".switch-mode");
const form = document.querySelector("#form");
const formInput = document.querySelector("#search-country");
const dropDownBtn = document.querySelector(".dropdown-btn");
const dropDownContent = document.querySelector(".dropdown-content");
const dropDownItem = document.querySelectorAll(".dropdown-item");
const countriesList = document.querySelector(".countries");
const cards = document.querySelectorAll(".card");

const url = "https://restcountries.com/v3.1/all";

// SHOW COUNTRIES FUNCTION
const showCountries = async () => {
  try {
    const response = await fetch(url);
    const countries = await response.json();

    countries.forEach((country) => {
      const card = document.createElement("li");
      const cardId = `${country.region}`;
      card.setAttribute("class", "card");
      card.setAttribute("id", cardId);
      card.dataset.countryName = country.name.common;

      const cardMarkup = `
      <div class="card-header">
          <img src="${country.flags.png}" class="card-image" alt="${country.flags.alt}">
      </div>
  
      <section class="card-content">
          <h3 class="card-heading">${country.name.common}</h3>
          <div>
              <h4 class="card-info population">Population:</h4>
              <p class="card-info population">${country.population}</p>
          </div>
          <div>
              <h4 class="card-info region">Region:</h4>
              <p class="card-info region">${country.region}</p>
          </div>
          <div>
              <h4 class="card-info capital">Capital:</h4>
              <p class="card-info capital">${country.capital}</p>
          </div>
      </section>`;

      card.innerHTML = cardMarkup;
      countriesList.appendChild(card);

      card.addEventListener("click", () => {
        const countryName = card.querySelector(".card-heading").textContent;

        window.location.href = `details.html?country=${countryName}`;
      });
    });
  } catch (error) {
    console.error("Failed to fetch countries", error);
  }
};

showCountries();

// SEARCH COUNTRY - FUNCTION
const searchCountry = () => {
  const inputValue = formInput.value;
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const countryName = card.querySelector(".card-heading").textContent;

    if (countryName.toLowerCase().includes(inputValue.toLowerCase())) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

// FILTER BY REGION - FUNCTION
dropDownBtn.addEventListener("click", () => {
  dropDownContent.classList.toggle("active");
});

dropDownItem.forEach((item) => {
  item.addEventListener("click", () => {
    const region = item.textContent;
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      if (card.id === region) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// FORM SUBMIT
form.addEventListener("submit", (e) => {
  e.preventDefault();

  searchCountry();

  form.reset();
  formInput.focus();
});

// SWITCH THEME FUNCTION
const switchTheme = () => {
  const rootElement = document.documentElement;
  let dataTheme = rootElement.getAttribute("data-theme");
  let newTheme;

  newTheme = dataTheme === "light" ? "dark" : "light";

  rootElement.setAttribute("data-theme", newTheme);

  if (newTheme === "dark") {
    const themeSwitcherIcon = switchThemeBtn.querySelector(".fa-moon");
    const themeSwitchParagraph = document.querySelector(".themeSwitch-paragraph");

    themeSwitcherIcon.classList.remove("fa-moon");
    themeSwitcherIcon.classList.add("fa-sun");
    switchThemeBtn.setAttribute("aria-label", "Switch to light mode");
    themeSwitchParagraph.textContent = "Light Mode";

  } else {
    const themeSwitcherIcon = switchThemeBtn.querySelector(".fa-sun");
    const themeSwitchParagraph = document.querySelector(".themeSwitch-paragraph");

    themeSwitcherIcon.classList.remove("fa-sun");
    themeSwitcherIcon.classList.add("fa-moon");
    switchThemeBtn.setAttribute("aria-label", "Switch to dark mode");
    themeSwitchParagraph.textContent = "Dark Mode";
  }

  localStorage.setItem("theme", newTheme);
};

switchThemeBtn.addEventListener("click", switchTheme);
