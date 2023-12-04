<?php
/**
 *  The template for displaying the Distributor postcode lookup app with content before/after.
 *
 *  Template Name: BPID
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header();
?>

<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

?>

<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item">
      <?php get_template_part('shared/breadcrumbs') ?>
    </div>
  </div>
</section>

<section class="o-wrapper">
  <div class="o-layout o-layout--center">
    <div class="o-layout__item u-10/12@tablet">
      <header class="c-section-heading c-section-heading--less-bottom-spacing ">
        <h1 class="c-section-heading__title  u-font-h2  u-pink"><?php the_title(); ?></h1>
        <p class="u-text-center"><?php the_content(); ?></p>
      </header>
    </div>
  </div>
</section>

<section class="o-wrapper">
  <!-- Container for React app -->
  <div class="u-min-height" data-module="BasicPlanApp" data-rates-customer="residential">

    <?php get_template_part('shared/loading') ?>
  </div>
</section>

<?php
get_footer();