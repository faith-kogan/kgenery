<?php
/**
 *  The template for displaying the Rates app.
 *
 *  Template Name: Rates
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header(); ?>

  <section class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item">
        <?php get_template_part('shared/breadcrumbs') ?>
      </div>
    </div>
  </section>

  <div class="o-wrapper o-wrapper--vertical-spacing">
    <!-- Container for rates React app -->
    <div class="u-min-height" data-module="RatesApp" data-rates-customer="<?php _e(get_field('rates_app_customer_group'), 'powershop'); ?>">
      <?php get_template_part('shared/loading') ?>
    </div>
  </div><!-- o-wrapper -->


<?php get_footer(); ?>