<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dropdown</title>
    <link rel="stylesheet" href="styles.css">
</head>
<script src="jquery.min.js" type="text/javascript"></script>
<script src="dropdown.js" type="text/javascript"></script>
<script src="angular.min.js" type="text/javascript"></script>
<body>
<?php
/*    require_once ("DbController.php");
    $db_handle = new DbController();
    $query = "select country_id, country_name from country";
    $result = $db_handle->getRecords($query);

*/?>
    <div class="container">
        <h2>Custom DropDowns</h2><br>
        <div class="row">
            <label>Country: </label><br>
            <select name="country" id="country-list" class="list-container" onchange="getStatesByCountryId(this.value)">
                <option value="">Select Country</option>
            </select>
        </div>
        <div class="row">
            <label>States: </label><br>
            <select name="state" id="state-list" class="list-container" onchange="getCitiesByStateId(this.value)">
                <option value="">Select State</option>
            </select>
        </div>
        <div class="row">
            <label>Cities: </label><br>
            <select name="city" id="city-list" class="list-container">
                <option value="">Select City</option>
            </select>
        </div>
    </div>
</body>
</html>