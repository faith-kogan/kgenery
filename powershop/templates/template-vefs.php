<?php
/**
 *  The template for displaying the VEFs App (form).
 *
 *  Template Name: VEFs
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

  <!-- Container for calculator React app -->
  <div class="u-min-height" data-module="VEFSApp">
    <?php get_template_part('shared/loading') ?>
  </div>

</div><!-- o-wrapper -->

<?php get_footer(); ?>