// city API
function selectArea() {
  $("#weather-list").html("");
  $("#weather-info").attr("style", "display:none;");
  $("#city-list").html("");
  $("#city-info").attr("style", "display:none;");

  $("#holiday-list").html("");
  $("#holiday-info").attr("style", "display:none;");
  $("#ac-list").html("");
  $("#ac-info").attr("style", "display:none;");
  let selectedArea = $("#area-list").val();

  // after selecting the area, render the city list to the page
  if (selectedArea != "a-placeholder") {
    showMsg(true);

    $.ajax({
      type: "GET",
      url: "https://www.universal-tutorial.com/api/getaccesstoken",
      headers: {
        Accept: "application/json",
        "api-token": api_token,
        "user-email": "ratch3t@foxmail.com",
      },
      dataType: "JSON",
      error: function () {
        alert(
          "Network Error: Failed getting the access token for areas, please try again"
        );
        showMsg(false);
      },
      success: function (res) {
        var token = res.auth_token;

        $.ajax({
          type: "GET",
          url: "https://www.universal-tutorial.com/api/cities/" + selectedArea,
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
          dataType: "JSON",
          error: function () {
            alert("Network Error: Failed getting cities, please try again");
            showMsg(false);
          },
          success: function (res) {
            showMsg(false);

            // if there is a city list, render to the select city box
            if (res.length > 1) {
              $("#city-list").html(
                '<option value="c-placeholder" hidden>Select a city or district</option>'
              );
              $("#city-info").attr("style", "display:block;");
              $.each(res, function (index, item) {
                $("#city-list").append(
                  '<option value="' +
                    item.city_name +
                    '">' +
                    item.city_name +
                    "</option>"
                );
              });
            }

            // if there is no city list, skip the select city box
            else {
              selectedCity = selectedArea;
              alert(
                "This area does not have subordinate city or district. Please continue."
              );

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
                  alert(
                    "Network Error: Failed getting holiday info, please try again"
                  );
                  showMsg(false);
                },
                success: function (res) {
                  showMsg(false);
                  $("#holiday-list").html(
                    '<option value="h-placeholder" hidden>Select a holiday</option>'
                  );

                  $("#holiday-info").attr("style", "display:block;");

                  $.each(res.response.holidays, function (index, item) {
                    $("#holiday-list").append(
                      '<option value="' +
                        item.date.iso +
                        '">' +
                        item.name +
                        " | " +
                        item.date.iso +
                        "</option>"
                    );
                  });
                },
              });
            }
          },
        });
      },
    });
  } else {
    alert("invalid selection");
  }
}
