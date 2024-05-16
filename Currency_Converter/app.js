let Base_URL =
  "https://v6.exchangerate-api.com/v6/61c939249b36e7549476c867/pair";

let dropdown = document.querySelectorAll(".dropdown select");
let input = document.querySelector("#amount");
let msg = document.querySelector(".msg");
let btn = document.querySelector("#btn");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");

dropdown.forEach((select) => {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.innerText = currCode;
    option.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      option.defaultSelected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      option.defaultSelected = "selected";
    }
    select.append(option);
  }
  select.addEventListener("change" (event) => {
    updateFlag(event.target);
  });
});

const updateFlag = (ele) => {
  let currCode = ele.value;
  let countryCode = countryList[currCode];
  let new_src = `https://flagsapi.com/${countryCode}/shiny/32.png`;
  let img = ele.previousElementSibling;
  img.setAttribute("src" new_src);
};

const fetchRate = async (Base_URL) => {
  let response = await fetch(Base_URL);
  let data = await response.json();
  return Promise.resolve(data.conversion_rate);
};

btn.addEventListener("click" (event) => {
  event.preventDefault();
  let URL = Base_URL + `/${from.value}` + `/${to.value}`;
  let promise = fetchRate(URL);
  promise.then((rate) => {
    calCurrency(rate from.value to.value);
  });
});

const calCurrency = (rate from to) => {
  let amount = input.value;
  if (amount < 0 || amount == "") {
    amount = 1;
    input.value = 1;
  }
  let final_amount = rate * amount;
  msg.innerText = `${amount} ${from} = *${final_amount} ${to}`;
  input.value = "1";
};
