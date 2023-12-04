<?php
/**
 *  The template for displaying pages without a side nav.
 *
 *  Template Name: No Side Nav
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

  <article>
    <section class="o-wrapper">
      <div class="o-layout">
        <div class="o-layout__item  u-7/12@desktop  u-push-1/3@desktop">
          <header class="c-article-intro">
            <h1 class="u-font-h2  c-article-intro__title"><?php the_title(); ?></h1>
          </header>
          <?php if (get_field('intro_content')) : ?>
            <section class="s-cms-content">
              <?php echo get_field('intro_content'); ?>
            </section>
          <?php endif; ?>
        </div>
      </div>
    </section><!-- o-wrapper -->

    <?php if (has_post_thumbnail()) : ?>
      <img src="<?php the_post_thumbnail_url('large'); ?>" alt="<?php the_title_attribute(); ?>" class="c-offset-image   c-offset-image--inline">
    <?php endif; ?>

    <section class="o-wrapper">
      <div class="o-layout">
        <div class="o-layout__item  u-7/12@desktop  u-push-1/3@desktop">
          <section class="u-spacing-bottom-large  s-cms-content">
            <?php the_content(); ?>
          </section>
        </div>
      </div>
    </section><!-- o-wrapper -->
  </article>


<?php get_footer(); ?>