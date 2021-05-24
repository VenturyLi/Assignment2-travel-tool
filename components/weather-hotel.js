// weather and hotel API
function selectHoliday() {
  $("#ac-list").html("");
  $("#ac-info").attr("style", "display:none;");

  selectedHoliday = $("#holiday-list").val();
  console.log(selectedHoliday);

  // the maximum range for available weather forecast
  // Unfortunately, free account for weatherapi can only ask for current weather
  // and 3 days of forecast
  const range = 3;

  if (selectedHoliday != "h-placeholder") {
    let time = getCurrentDate();
    let diff = dateDiff(selectedHoliday, time);

    // Case 1: The holiday is too far away
    if (diff > range) {
      alert(
        "The selected holiday is too far way to get weather condition, only current weather of that place and available hotels will be displayed"
      );
      $("#weather-list").html("");
      $("#weather-info").attr("style", "display:none;");

      // Get current weather of that place to get longitude and latitude
      showMsg(true);

      const api_key = "51563523b41b41b3bd981420212804";
      $.ajax({
        type: "GET",
        crossDomain: true,
        url:
          "http://api.weatherapi.com/v1/current.json?key=" +
          api_key +
          "&q=" +
          selectedCity,
        dataType: "JSON",
        error: function () {
          alert("Network error: Failed getting weather info, please try again");
          showMsg(false);
        },
        success: function (res) {
          lat = res.location.lat;
          lon = res.location.lon;
          console.log("latitude: " + lat + " longtitude: " + lon);
          showMsg(false);
          $("#weather-list").html("");
          $("#weather-info").attr("style", "display:block;"); // pass the params to the weather card template

          $("#weather-list").append(
            '<li><weather-card date="' +
              res.location.localtime +
              '" condition="' +
              res.current.condition.text +
              '"iconURL="' +
              res.current.condition.icon +
              '" avgtemp="' +
              res.current.temp_c +
              '" maxtemp="' +
              "not available yet" +
              '" mintemp="' +
              "not available yet" +
              '" rain="' +
              res.current.cloud +
              '" wind="' +
              res.current.wind_kph +
              '"></weather-card></li>'
          );

          // Get the information of available hotels
          showMsg(true);
          $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/x-www-form-urlencoded",
            url: "https://test.api.amadeus.com/v1/security/oauth2/token",

            data: {
              grant_type: "client_credentials",
              client_id: "zxJ9K59fVIoWH2KPvSl2PXq6yTQ8qOgN",
              client_secret: "sGL8iLgjn8C7yXME",
            },
            dataType: "JSON",
            error: function () {
              alert(
                "Network Error: Failed getting token for hotel info, please try again"
              );
              showMsg(false);
            },
            success: function (res) {
              const access_token = res.access_token;

              $.ajax({
                type: "GET",
                crossDomain: true,
                url:
                  "https://test.api.amadeus.com/v2/shopping/hotel-offers?latitude=" +
                  lat +
                  "&longitude=" +
                  lon +
                  "&checkInDate=" +
                  selectedHoliday +
                  "&roomQuantity=1&adults=2&radius=25&radiusUnit=KM&paymentPolicy=NONE&includeClosed=true&bestRateOnly=false&view=FULL&sort=DISTANCE",
                headers: {
                  Authorization: "Bearer " + access_token,
                },
                dataType: "JSON",
                error: function () {
                  alert(
                    "Network Error: Failed getting hotel info, please try again"
                  );
                  showMsg(false);
                },
                success: function (res) {
                  showMsg(false);
                  $("#ac-list").html("");
                  $("#ac-info").attr("style", "display:block;");
                  let counter = 0; // count available hotel

                  $.each(res.data, function (index, item) {
                    // for now it will only display hotels that are available
                    if (res.data.length == 0) {
                      $("#ac-list").append(
                        '<li style="padding: 10px;"><h2>Sorry, there is no available room on the selected date.</h2></li>'
                      );
                    } else {
                      if (item.available == true) {
                        counter++;
                        $("#ac-list").append(
                          '<li><hotel-card name="' +
                            item.hotel.name +
                            '" rating="' +
                            item.hotel.rating +
                            '" addr="' +
                            item.hotel.address.lines.join(", ") +
                            '" postalCode="' +
                            item.hotel.address.postalCode +
                            '" phone="' +
                            item.hotel.contact.phone +
                            '" pic="' +
                            // in case the image of the hotel is not available
                            (item.hotel.media != undefined || null
                              ? item.hotel.media[0].uri
                              : "../NoMediaAvailable.png") +
                            '"></hotel-card></li>'
                        );
                      }
                    }
                  });

                  if (counter == 0) {
                    $("#ac-list").append(
                      '<li style="padding: 10px;"><h2>Sorry, there is no available room on the selected date.</h2></li>'
                    );
                  }
                },
              });
            },
          });
        },
      });

      // Case 2: The holiday passed already
    } else if (diff < 0) {
      alert(
        "The holiday you choosed is overdue, cannot get weather info and available hotel"
      );
      $("#weather-list").html("");
      $("#weather-info").attr("style", "display:none;");

      // Case 3: The holiday is the day selected
    } else if (diff == 0) {
      console.log("display today's weather");

      showMsg(true);
      const api_key = "51563523b41b41b3bd981420212804";
      $.ajax({
        type: "GET",
        crossDomain: true,
        url:
          "http://api.weatherapi.com/v1/current.json?key=" +
          api_key +
          "&q=" +
          selectedCity,
        dataType: "JSON",
        error: function () {
          alert("Network error: Failed getting weather info, please try again");
          showMsg(false);
        },
        success: function (res) {
          lat = res.location.lat;
          lon = res.location.lon;
          console.log("latitude: " + lat + " longtitude: " + lon);
          showMsg(false);
          $("#weather-list").html("");
          $("#weather-info").attr("style", "display:block;"); // pass the params to the weather card template

          $("#weather-list").append(
            '<li><weather-card date="' +
              res.location.localtime +
              '" condition="' +
              res.current.condition.text +
              '"iconURL="' +
              res.current.condition.icon +
              '" avgtemp="' +
              res.current.temp_c +
              '" maxtemp="' +
              "not available yet" +
              '" mintemp="' +
              "not available yet" +
              '" rain="' +
              res.current.cloud +
              '" wind="' +
              res.current.wind_kph +
              '"></weather-card></li>'
          );

          // Get the information of available hotels
          showMsg(true);
          $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/x-www-form-urlencoded",
            url: "https://test.api.amadeus.com/v1/security/oauth2/token",

            data: {
              grant_type: "client_credentials",
              client_id: "zxJ9K59fVIoWH2KPvSl2PXq6yTQ8qOgN",
              client_secret: "sGL8iLgjn8C7yXME",
            },
            dataType: "JSON",
            error: function () {
              alert(
                "Network Error: Failed getting token for hotel info, please try again"
              );
              showMsg(false);
            },
            success: function (res) {
              const access_token = res.access_token;

              $.ajax({
                type: "GET",
                crossDomain: true,
                url:
                  "https://test.api.amadeus.com/v2/shopping/hotel-offers?latitude=" +
                  lat +
                  "&longitude=" +
                  lon +
                  "&checkInDate=" +
                  selectedHoliday +
                  "&roomQuantity=1&adults=2&radius=25&radiusUnit=KM&paymentPolicy=NONE&includeClosed=true&bestRateOnly=false&view=FULL&sort=DISTANCE",
                headers: {
                  Authorization: "Bearer " + access_token,
                },
                dataType: "JSON",
                error: function () {
                  alert(
                    "Network Error: Failed getting hotel info, please try again"
                  );
                  showMsg(false);
                },
                success: function (res) {
                  showMsg(false);
                  $("#ac-list").html("");
                  $("#ac-info").attr("style", "display:block;");
                  let counter = 0; // count available hotel

                  $.each(res.data, function (index, item) {
                    // for now it will only display hotels that are available
                    if (res.data.length == 0) {
                      $("#ac-list").append(
                        '<li style="padding: 10px;"><h2>Sorry, there is no available room on the selected date.</h2></li>'
                      );
                    } else {
                      if (item.available == true) {
                        counter++;
                        $("#ac-list").append(
                          '<li><hotel-card name="' +
                            item.hotel.name +
                            '" rating="' +
                            item.hotel.rating +
                            '" addr="' +
                            item.hotel.address.lines.join(", ") +
                            '" postalCode="' +
                            item.hotel.address.postalCode +
                            '" phone="' +
                            item.hotel.contact.phone +
                            '" pic="' +
                            item.hotel.media[0].uri +
                            '"></hotel-card></li>'
                        );
                      }
                    }
                  });

                  if (counter == 0) {
                    $("#ac-list").append(
                      '<li style="padding: 10px;"><h2>Sorry, there is no available room on the selected date.</h2></li>'
                    );
                  }
                },
              });
            },
          });
        },
      });

      // Case 4: The holiday is less than 4 days away
    } else {
      console.log("display forecast");

      // fetch for weather info
      showMsg(true);
      const api_key = "51563523b41b41b3bd981420212804";
      const days = 7; // this does not have effect due to account limitation
      $.ajax({
        type: "GET",
        crossDomain: true,
        url:
          "http://api.weatherapi.com/v1/forecast.json?key=" +
          api_key +
          "&q=" +
          selectedCity +
          "&days=" +
          days,
        dataType: "JSON",
        error: function () {
          alert("Network Error: Failed getting weather info, please try again");
          showMsg(false);
        },
        success: function (res) {
          lat = res.location.lat;
          lon = res.location.lon;
          console.log("latitude: " + lat + " longtitude: " + lon);

          showMsg(false);
          $("#weather-list").html("");
          $("#weather-info").attr("style", "display:block;");
          // pass the params to the weather card template
          $.each(res.forecast.forecastday, function (index, item) {
            $("#weather-list").append(
              '<li><weather-card date="' +
                item.date +
                '" condition="' +
                item.day.condition.text +
                '"iconURL="' +
                item.day.condition.icon +
                '" avgtemp="' +
                item.day.avgtemp_c +
                '" maxtemp="' +
                item.day.maxtemp_c +
                '" mintemp="' +
                item.day.mintemp_c +
                '" rain="' +
                item.day.daily_chance_of_rain +
                '" wind="' +
                item.day.maxwind_kph +
                '"></weather-card></li>'
            );
          });

          // Get the information of available hotels
          showMsg(true);
          $.ajax({
            type: "POST",
            crossDomain: true,
            contentType: "application/x-www-form-urlencoded",
            url: "https://test.api.amadeus.com/v1/security/oauth2/token",

            data: {
              grant_type: "client_credentials",
              client_id: "zxJ9K59fVIoWH2KPvSl2PXq6yTQ8qOgN",
              client_secret: "sGL8iLgjn8C7yXME",
            },
            dataType: "JSON",
            error: function () {
              alert(
                "Network Error: Failed getting token for hotel info, please try again"
              );
              showMsg(false);
            },
            success: function (res) {
              const access_token = res.access_token;

              $.ajax({
                type: "GET",
                crossDomain: true,
                url:
                  "https://test.api.amadeus.com/v2/shopping/hotel-offers?latitude=" +
                  lat +
                  "&longitude=" +
                  lon +
                  "&checkInDate=" +
                  selectedHoliday +
                  "&roomQuantity=1&adults=2&radius=25&radiusUnit=KM&paymentPolicy=NONE&includeClosed=true&bestRateOnly=false&view=FULL&sort=DISTANCE",
                headers: {
                  Authorization: "Bearer " + access_token,
                },
                dataType: "JSON",
                error: function () {
                  alert(
                    "Network Error: Failed getting hotel info, please try again"
                  );
                  showMsg(false);
                },
                success: function (res) {
                  showMsg(false);
                  $("#ac-list").html("");
                  $("#ac-info").attr("style", "display:block;");

                  let counter = 0; // count available hotel

                  $.each(res.data, function (index, item) {
                    // for now it will only display hotels that are available
                    if (res.data.length == 0) {
                      $("#ac-list").append(
                        '<li style="padding: 10px;"><h2>Sorry, there is no available room on the selected date.</h2></li>'
                      );
                    } else {
                      if (item.available == true) {
                        counter++;
                        $("#ac-list").append(
                          '<li><hotel-card name="' +
                            item.hotel.name +
                            '" rating="' +
                            item.hotel.rating +
                            '" addr="' +
                            item.hotel.address.lines.join(", ") +
                            '" postalCode="' +
                            item.hotel.address.postalCode +
                            '" phone="' +
                            item.hotel.contact.phone +
                            '" pic="' +
                            item.hotel.media[0].uri +
                            '"></hotel-card></li>'
                        );
                      }
                    }
                  });

                  if (counter == 0) {
                    $("#ac-list").append(
                      '<li style="padding: 10px;"><h2>Sorry, there is no available room on the selected date.</h2></li>'
                    );
                  }
                },
              });
            },
          });
        },
      });
    }
  } else {
    alert("invalid selection of holiday");
  }
}

// get the current date
function getCurrentDate() {
  let now = new Date();
  let year = 2021;
  let month = now.getMonth() + 1;
  let date = now.getDate();
  const result = year + "-" + month + "-" + date;
  return result;
}

// calculate the distance between current date and selected holiday
function dateDiff(sDate1, sDate2) {
  // format: yyyy-mm-dd
  var aDate, oDate1, oDate2, iDays;
  aDate = sDate1.split("-");
  oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); // convert to format: xx-xx-xxxx
  aDate = sDate2.split("-");
  oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
  //iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
  iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24);
  return iDays;
}
