// holiday API
function selectCity() {
  $("#weather-list").html("");
  $("#weather-info").attr("style", "display:none;");
  $("#holiday-list").html("");
  $("#holiday-info").attr("style", "display:none;");
  $("#ac-list").html("");
  $("#ac-info").attr("style", "display:none;");

  selectedCity = $("#city-list").val();
  console.log(selectedCity);

  //after selecting the city, render the holiday information to the page
  if (selectedCity != "c-placeholder") {
    showMsg(true);
    let year = 2021;

    const cholidaysURL = "https://calendarific.com/api/v2/holidays";
    const colidayData =
      "https://calendarific.com/api/v2/holidays?&api_key=f92699ea84a0a64aa0b3d7f605f8a36d081c00a6" +
      "&country=" +
      selectedCountry +
      "&year=" +
      year;
    $.ajax({
      type: "GET",
      url: cholidaysURL,
      data: colidayData,
      dataType: "JSON",
      crossDomain: true,
      error: function () {
        alert("Network Error: Failed getting holiday info, please try again");
        showMsg(false);
      },
      success: function (res) {
        showMsg(false);

        $("#holiday-list").html(
          '<option value="h-placeholder" hidden>Select a holiday</option>'
        ); // remove the previous content

        $("#holiday-info").attr("style", "display:block;");

        $.each(res.response.holidays, function (index, item) {
          // filter the data so that only public holidays will be displayed
          // season like June Solstice does not count
          var holidayType = item["type"][0];
          if (holidayType === "National holiday") {
            $("#holiday-list").append(
              '<option value="' +
                item.date.iso +
                '">' +
                item.name +
                " | " +
                item.date.iso +
                "</option>"
            );
          } else {
            console.log(item.name + " does not count as public holiday");
          }
        });
      },
    });
  } else {
    alert("Invalid selection of city");
  }
}
