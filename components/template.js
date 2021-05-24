// loading window controller
function showMsg(isLoading) {
  if (isLoading) {
    $("#app").attr("style", "-webkit-filter: blur(3px)");
    $("#app").attr("style", "filter: blur(3px)");
    $("#main-title").attr("style", "-webkit-filter: blur(3px)");
    $("#main-title").attr("style", "filter: blur(3px)");
    $("#loading-screen").attr("style", "display: flex");
  } else {
    $("#app").attr("style", "-webkit-filter: blur(0px)");
    $("#app").attr("style", "filter: blur(0px)");
    $("#main-title").attr("style", "-webkit-filter: blur(0px)");
    $("#main-title").attr("style", "filter: blur(0px)");
    $("#loading-screen").attr("style", "display: none");
  }
}

// Wheather card template declaration
class WeatherCard extends HTMLElement {
  constructor() {
    super();

    const templateContent = document.querySelector(
      "#weather-card-template"
    ).content;

    const shadowRoot = this.attachShadow({
      mode: "open",
    });

    shadowRoot.appendChild(templateContent.cloneNode(true));

    const date = this.getAttribute("date");
    const condition = this.getAttribute("condition");
    const iconURL = this.getAttribute("iconURL");
    const avgtemp = this.getAttribute("avgtemp");
    const maxtemp = this.getAttribute("maxtemp");
    const mintemp = this.getAttribute("mintemp");
    const rain = this.getAttribute("rain");
    const wind = this.getAttribute("wind");

    shadowRoot.querySelector("h2 span").innerHTML = date;
    shadowRoot.querySelector("h3").innerHTML =
      '<img class="icon" src="' + iconURL + '">' + condition;
    shadowRoot.querySelector("#avgtemp").innerHTML = avgtemp + " &#8451;";
    shadowRoot.querySelector("#maxtemp").innerHTML = maxtemp + " &#8451;";
    shadowRoot.querySelector("#mintemp").innerHTML = mintemp + " &#8451;";
    shadowRoot.querySelector("#rain").innerHTML = rain + " &#37";
    shadowRoot.querySelector("#wind").innerHTML = wind + " km/h";
  }
}
customElements.define("weather-card", WeatherCard);

//Hotel Card Declaration
class HotelCard extends HTMLElement {
  constructor() {
    super();

    const templateContent = document.querySelector(
      "#hotel-card-template"
    ).content;

    const shadowRoot = this.attachShadow({
      mode: "open",
    });

    shadowRoot.appendChild(templateContent.cloneNode(true));

    const name = this.getAttribute("name");
    const rating = parseFloat(this.getAttribute("rating"));
    const addr = this.getAttribute("addr");
    const postalCode = this.getAttribute("postalCode");
    const phone = this.getAttribute("phone");
    const pic = this.getAttribute("pic");

    shadowRoot.querySelector("h2").innerHTML = name;
    shadowRoot.querySelector("h3").innerHTML = "Rating: ";
    for (let i = 0; i < rating; i++) {
      shadowRoot.querySelector("h3").innerHTML +=
        '<span style="font-size: 16px; color: gold">&#9733;</span>';
    }
    shadowRoot.querySelector("#addr").innerHTML = addr;
    shadowRoot.querySelector("#postalCode").innerHTML = postalCode;
    shadowRoot.querySelector("#phone").innerHTML = phone;
    shadowRoot.querySelector("#pic").innerHTML =
      '<img class="icon" src="' + pic + '">';
  }
}
customElements.define("hotel-card", HotelCard);
