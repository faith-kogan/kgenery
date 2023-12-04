<?php
/**
 * The blog category select UI component
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */
?>

<?php 
// the args
$args = array(
  'show_option_all' => 'Select category',
  'orderby' => 'name',
  'order' => 'ASC',
  'class' => 'c-select'
);

wp_dropdown_categories( $args );
?>
<script type="text/javascript">
  var dropdown = document.getElementById("cat");
  function onCatChange() {
    if ( dropdown.options[dropdown.selectedIndex].value > 0 ) {
      location.href = "<?php echo esc_url( home_url( '/' ) ); ?>?cat="+dropdown.options[dropdown.selectedIndex].value;
    } else if ( dropdown.options[dropdown.selectedIndex].value == '0' ) {
      location.href = "<?php echo esc_url( home_url( '/' ) ); ?>blog";
    }
  }
  dropdown.onchange = onCatChange;
</script>