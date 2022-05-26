<?php
require_once ("DbController.php");
$db_handle = new DbController();
$query = "select * from country";
$result = $db_handle->getRecords($query)
?>
    <option value disabled selected>select country</option>
<?php
foreach ($result as $country) {
    ?>
    <option value="<?php echo $country['country_id']; ?>">
        <?php echo $country['country_name'];?>
    </option>
    <?php
}
?>