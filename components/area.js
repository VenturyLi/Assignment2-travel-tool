// Area API (contains province and state information)
function selectCountry() {
  // iso-3166 code
  $("#holiday-list").html("");
  $("#holiday-info").attr("style", "display:none;");
  var selectedData = $("#select-country").val();

  // this is an array with format: iso3166code&countryname
  selectedCountry = selectedData.split("&")[0]; // iso-3166 code
  var countryName = selectedData.split("&")[1]; // actual name

  console.log("selectedCountry: " + selectedCountry);
  console.log("countryName: " + countryName);

  // after selecting country, render the area information to the page
  if ($("#select-country").val() != "placeholder") {
    showMsg(true);
    $("#area-list").html("");
    $("#area-info").attr("style", "display:none;");
    $("#city-list").html("");
    $("#city-info").attr("style", "display:none;");
    $("#weather-list").html("");
    $("#weather-info").attr("style", "display:none;");
    $("#ac-list").html("");
    $("#ac-info").attr("style", "display:none;");

    // get all the areas of this country
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
          url: "https://www.universal-tutorial.com/api/states/" + countryName,
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
          },
          dataType: "JSON",
          error: function () {
            alert("Network Error: Failed getting areas, please try again");
            showMsg(false);
          },
          success: function (res) {
            // remove the loading prompt
            showMsg(false);

            $("#area-list").html(
              '<option value="a-placeholder" hidden>Select an area</option>'
            );
            $("#area-info").attr("style", "display:block;");
            $.each(res, function (index, item) {
              $("#area-list").append(
                '<option value="' +
                  item.state_name +
                  '">' +
                  item.state_name +
                  "</option>"
              );
            });
          },
        });
      },
    });
  } else {
    alert("invalid selection");
  }
}
