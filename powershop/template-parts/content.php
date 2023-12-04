<?php
/**
 * Template part for displaying blog content in single.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

?>

<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item  u-7/12@desktop">
      <?php get_template_part('shared/breadcrumbs') ?>
      <div class="c-article-intro">
        <h1 class="u-font-h2  c-article-intro__title"><?php the_title(); ?></h1>
        <p class="u-font-p2">
          <b class="c-article-intro__author">by <?php the_author(); ?></b> on <?php echo '<time class="updated entry-time" datetime="' . get_the_time('m-d-Y') . '" itemprop="datePublished">' . get_the_time(get_option('date_format')) . '</time>'; ?>
        </p>
      </div>
    </div>
  </div>
</section><!-- o-wrapper -->

<img src="<?php the_post_thumbnail_url('large'); ?>" alt="<?php the_title_attribute(); ?>" class="c-offset-image">

<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item  u-7/12@desktop">
      <div class="s-cms-content  u-spacing-bottom-large">
          <?php the_content(); ?>

          <!-- next/prev article links -->
          <?php if(get_next_post()) : ?>
            <p><strong>Read next:</strong> <?php next_post_link(' %link'); ?></p>
          <?php endif; ?>

          <?php if(get_previous_post()) : ?>
            <p><strong>Read previous:</strong><?php previous_post_link(' %link'); ?></p>
          <?php endif; ?>

          <!-- comments -->
          <div class="c-form">
            <?php // If comments are open or we have at least one comment, load up the comment template.
            if ( comments_open() || get_comments_number() ) :
              comments_template( '/shared/comments-form.php' );
            endif;
            ?>
          </div>

      </div>

    </div>
  </div>
</section><!-- o-wrapper -->