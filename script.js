// Rough emission factors (kg CO2)
var CAR_PER_KM = 0.17;        // per km driven
var PER_FLIGHT = 250;         // per return flight (short/medium)
var PER_KWH = 0.55;           // per kWh of electricity
var PER_MEAT_MEAL = 3;        // per meat meal
var PER_SAR_SHOPPING = 0.25;  // per SAR spent on goods
var WORLD_AVERAGE = 4.7;      // tonnes per person per year (approx.)

function num(id) {
  var v = parseFloat(document.getElementById(id).value);
  return isNaN(v) ? NaN : v;
}

function calculate() {
  var error = document.getElementById("error-msg");
  var ids = ["km", "flights", "kwh", "meat", "shop"];
  var values = {};
  for (var i = 0; i < ids.length; i++) {
    var v = num(ids[i]);
    if (isNaN(v) || v < 0) {
      error.textContent = "Please enter zero or a positive number in every field.";
      return;
    }
    values[ids[i]] = v;
  }
  error.textContent = "";

  var parts = [
    { label: "Car travel", kg: values.km * 52 * CAR_PER_KM },
    { label: "Flights", kg: values.flights * PER_FLIGHT },
    { label: "Electricity", kg: values.kwh * 12 * PER_KWH },
    { label: "Food (meat)", kg: values.meat * 52 * PER_MEAT_MEAL },
    { label: "Shopping", kg: values.shop * 12 * PER_SAR_SHOPPING }
  ];

  var totalKg = 0;
  for (var j = 0; j < parts.length; j++) totalKg += parts[j].kg;
  var tonnes = totalKg / 1000;

  var name = document.getElementById("name").value.trim();
  document.getElementById("result-title").textContent =
    name ? name + ", your estimated carbon footprint" : "Your estimated carbon footprint";
  document.getElementById("result-total").textContent = tonnes.toFixed(2);

  var compare = document.getElementById("result-compare");
  if (tonnes <= WORLD_AVERAGE) {
    compare.textContent = "Great! This is at or below the world average of about " + WORLD_AVERAGE + " tonnes.";
  } else {
    compare.textContent = "This is above the world average of about " + WORLD_AVERAGE +
      " tonnes. Try driving less, flying less and saving electricity.";
  }

  var list = document.getElementById("result-breakdown");
  list.innerHTML = "";
  for (var k = 0; k < parts.length; k++) {
    var li = document.createElement("li");
    li.textContent = parts[k].label + ": " + (parts[k].kg / 1000).toFixed(2) + " tonnes";
    list.appendChild(li);
  }

  var card = document.getElementById("result-card");
  card.classList.remove("d-none");
  card.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetForm() {
  document.getElementById("calc-form").reset();
  document.getElementById("error-msg").textContent = "";
  document.getElementById("result-card").classList.add("d-none");
}

document.getElementById("calc-btn").addEventListener("click", calculate);
document.getElementById("reset-btn").addEventListener("click", resetForm);
