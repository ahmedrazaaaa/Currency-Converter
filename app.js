const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const msg = document.querySelector(".msg");

for (select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (el) => {
  let currCode = el.value;
  let countryCode = countryList[currCode];
  let img = el.parentElement.querySelector("img");
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  img.src = newSrc;
};

const updateOnLoad = async () => {
  let amt = document.querySelector("form input");
  amtValue = amt.value;
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amt.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  finalAmt = amtValue * rate;
  msg.innerText = `${amtValue}${fromCurr.value} = ${finalAmt}${toCurr.value}`;
};

window.addEventListener("load", () => {
  updateOnLoad();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateOnLoad();
});
