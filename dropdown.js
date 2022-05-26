$(document).ready(readCountry)

function readCountry() {
    console.log("Entered into readCountry")
    $.ajax({
        type: "POST",
        url: "getCountry.php",
        success: function (data) {
            console.log("Entered into getStatesByCountryId:: success ", data)
            $("#country-list").html(data);
        }
    })
}

function getStatesByCountryId(countryId) {
    console.log("Entered into getStatesByCountryId")
    $.ajax({
        type: "POST",
        url: "getState.php",
        data: "country_id=" + countryId,
        success: function (data) {
            console.log("Entered into getStatesByCountryId:: success ", data)
            $("#state-list").html(data);
            getCitiesByStateId(this.value)
        }
    })
}

function getCitiesByStateId(stateId) {
    $.ajax({
        type: "POST",
        url: "getCity.php",
        data: "stateId=" + stateId,
        success: function (data) {
            console.log("Entered into getCitiesByStateId:: success with cities ", data)
            $("#city-list").html(data)
        }
    })
}

function getCountry() {
    $.ajax({
        type: "POST",
        url: "getCountry.php",
        success: function (data) {
            console.log("Entering inside success:: "+ data)
            if (data == "") {
                data = [
                        {
                            "country_id": 1,
                            "country_name": "India"
                        },
                        {
                            "country_id": 2,
                            "country_name": "Bangladesh"
                        }
                       ]
            }
            $("#country-list").html(data)
        }
    })
}