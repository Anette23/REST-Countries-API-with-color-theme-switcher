// Get the country name from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const countryName = urlParams.get("country");

// Fetch the country details from the API using async/await
const fetchCountryDetails = async () => {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );
    if (!response.ok) {
      throw new Error("Country not found");
    }

    const data = await response.json();
    const country = data[0];
    console.log(country);
    return country;
  } catch (error) {
    console.log(error);
  }
};

// Dynamically create the page content using async/await
const createCountryDetails = async () => {
  const country = await fetchCountryDetails();
  if (!country) {
    return;
  }
  const countryDetailsWrapper = document.querySelector(".wrapper");

  const countryDetailMarkup = `
    <div class="country-details-header">
      <a href="index.html" class="back-btn">
        <i class="fa-solid fa-arrow-left"></i>Back
      </a>
      <img src="${country.flags.png}" class="card-details-image" alt="${
    country.flags.alt
  }">
    </div>
    <main>
      <section class="country-details-main">
        <h3 class="card-heading">${country.name.common}</h3>
        <article class="card-details-content">
          <div class="details">
            <div>
              <h4 class="card-info native-name">Native Name:</h4>
              <p class="card-info native-name">${country.name.official}</p>
            </div>
            <div>
              <h4 class="card-info population">Population:</h4>
              <p class="card-info population">${country.population}</p>
            </div>
            <div>
              <h4 class="card-info region">Region:</h4>
              <p class="card-info region">${country.region}</p>
            </div>
            <div>
              <h4 class="card-info sub-region">Sub Region:</h4>
              <p class="card-info sub-region">${country.subregion}</p>
            </div>
            <div>
              <h4 class="card-info capital">Capital:</h4>
              <p class="card-info capital">${country.capital}</p>
            </div>
          </div>
          <div class="details">
            <div>
              <h4 class="card-info domain">Top Level Domain:</h4>
              <p class="card-info domain">${country.tld}</p>
            </div>
            <div>
              <h4 class="card-info currency">Currencies:</h4>
              <p class="card-info currency">${Object.values(country.currencies)
                .map((currency) => currency.name)
                .join(", ")}</p>
            </div>
            <div>
              <h4 class="card-info languages">Languages:</h4>
              <p class="card-info languages">${Object.values(country.languages)
                .map((language) => language.name)
                .join(", ")}</p>
            </div>
          </div>
        </article>
      </section>

      <div class="country-details-footer">
            <h4 class="card-info borders">Border Countries:</h4>
            <div class="borders">
            ${country.borders ? country.borders.map(
              (border) =>
                `<div class="border-card">
                   <a href="?country=${border}" class="border-link">${border}</a>
                 </div>`
            ).join("") : "No border countries"}
          </div>
    </div>
    </main>`;

  const countryDetailsElement = document.createElement("div");

  countryDetailsElement.innerHTML = countryDetailMarkup;

  countryDetailsElement.setAttribute("class", "country-details");

  countryDetailsWrapper.appendChild(countryDetailsElement);
};

createCountryDetails();

// SWITCH THEME FUNCTION
const switchThemeBtn = document.querySelector(".themeSwitcher");

const switchTheme = () => {
  const rootElement = document.documentElement;
  let dataTheme = rootElement.getAttribute("data-theme");
  let newTheme;

  newTheme = dataTheme === "light" ? "dark" : "light";

  rootElement.setAttribute("data-theme", newTheme);

  if (newTheme === "dark") {
    const themeSwitcherIcon = switchThemeBtn.querySelector(".fa-moon");
    const themeSwitchParagraph = document.querySelector(
      ".themeSwitch-paragraph"
    );

    themeSwitcherIcon.classList.remove("fa-moon");
    themeSwitcherIcon.classList.add("fa-sun");
    switchThemeBtn.setAttribute("aria-label", "Switch to light mode");
    themeSwitchParagraph.textContent = "Light Mode";
  } else {
    const themeSwitcherIcon = switchThemeBtn.querySelector(".fa-sun");
    const themeSwitchParagraph = document.querySelector(
      ".themeSwitch-paragraph"
    );

    themeSwitcherIcon.classList.remove("fa-sun");
    themeSwitcherIcon.classList.add("fa-moon");
    switchThemeBtn.setAttribute("aria-label", "Switch to dark mode");
    themeSwitchParagraph.textContent = "Dark Mode";
  }

  localStorage.setItem("theme", newTheme);
};

switchThemeBtn.addEventListener("click", switchTheme);
