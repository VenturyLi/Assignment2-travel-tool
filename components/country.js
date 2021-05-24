// calendarific API url (contain country API and holiday API)
const countryURL = "https://calendarific.com/api/v2/countries";
const countryData =
  "https://calendarific.com/api/v2/countries?&api_key=f92699ea84a0a64aa0b3d7f605f8a36d081c00a6";
// token for REST API for countries
const api_token =
  "i7c8mYeYUSr9OMq0jSIk8MJdFAHqRpZtXZ_ec7FdClkKgWnG_vqueBorQq-9Y5o-kpg";

var selectedCountry = null;
var selectedHoliday = null;
var selectedCity = null;

// longtitude and latitude of the selected city
var lon = null;
var lat = null;

// get countury data to the select countury list
// This api has limitation on request number!
document.addEventListener("DOMContentLoaded", (event) => {
  $.ajax({
    type: "GET",
    url: countryURL,
    data: countryData,
    dataType: "JSON",
    error: function () {
      alert(
        "Network Error: Failed getting available countries, please try again"
      );
      showMsg(false);
    },
    success: function (res) {
      $.each(res.response.countries, function (index, item) {
        $("#select-country").append(
          '<option value="' +
            item["iso-3166"] +
            "&" +
            item.country_name +
            '">' +
            item.country_name +
            "</option>"
        );
      });
    },
  });
});
