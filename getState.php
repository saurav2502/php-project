<?php
require_once ("DbController.php");
$db_handle = new DbController();
if (!empty($_POST["country_id"])){
    $query = "select * from state where country_id = '" . $_POST["country_id"]. "' order by state_name asc";
    $result = $db_handle->getRecords($query);
?>
<option value disabled selected>select state</option>
<?php
foreach ($result as $state) {
?>
<option value="<?php echo $state['state_id']; ?>">
    <?php echo $state['state_name'];?>
</option>
<?php
    }
}
?>
