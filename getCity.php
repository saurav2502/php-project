<?php
require_once ("DbController.php");
$db_handle = new DbController();
if (!empty($_POST["stateId"])){
    $query = "select city_id, city_name from city where state_id = '" . $_POST["stateId"]. "' order by city_name asc";
    $result = $db_handle->getRecords($query);
    ?>
    <option value disabled selected>Select City</option>
    <?php
    foreach ($result as $city) {
        ?>
        <option value="<?php echo $city['city_id']; ?>">
            <?php echo $city['city_name'];?>
        </option>
        <?php
    }
}
?>
