<?php
/**
 *  The template for displaying the Distributor postcode lookup app with content before/after.
 *
 *  Template Name: Faults
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
  <!-- Container for rates React app -->
  <div class="u-min-height" data-module="DistributorApp" data-rates-customer="residential">
    <?php get_template_part('shared/loading') ?>
  </div>
</section>

<!-- hide content underneath if not used -->
<?php if( get_field('content_under_the_app') ): ?>
<section class="o-wrapper">
  <div class="o-layout">
    <article class="o-layout__item">
      <div class="u-spacing-bottom-large  s-cms-content">
        <?php echo get_field('content_under_the_app') ?>
      </div>
    </article>
  </div>
</section><!-- o-wrapper -->
<?php endif; ?>
<!-- hide content underneath if not used -->

<?php
get_footer();