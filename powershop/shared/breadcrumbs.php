<?php
/**
 * The breadcrumb component for posts and pages
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */
?>

<!-- @TODO - show "blog" in breadcrumbs if on a post -->

<?php if ( function_exists('yoast_breadcrumb') ) :
  yoast_breadcrumb('<div class="c-breadcrumbs">','</div>');
endif; ?>