<?php
/**
 *  The template for displaying full width templates.
 *
 *  Template Name: Full Width with breadcrumbs
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

<?php the_content(); ?>

<?php get_footer(); ?>