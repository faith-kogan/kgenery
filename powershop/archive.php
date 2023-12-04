<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

get_header();
?>
<div class="u-bg-grey-xlight">
  <section class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item">
        <?php get_template_part('shared/breadcrumbs') ?>
        <div class="u-7/12@desktop">
          <?php echo '<h3>Powershop blog: ' . single_cat_title( '', false ) . '</h3>'; ?>
          <?php the_archive_description( '<p>', '</p>' ); ?>
        </div>
        <?php get_template_part('shared/blog-category-select') ?>
      </div>
    </div>
  </section>
	<div class="o-wrapper">
		<section class="o-layout" data-module="MatchHeights">
      <?php if ( have_posts() ) : ?>
        <?php
        $count = 0;
        /* Start the Loop */
        while ( have_posts() ) : the_post();
          /*
          * Include the Post-Type-specific template for the content.
          * If you want to override this in a child theme, then include a file
          * called content-___.php (where ___ is the Post Type name) and that will be used instead.
          */

          if ($count === 0) : ?>
              <div class="o-layout__item  u-1/1">
                <article class="c-card  c-card--split  is-hero">
                  <?php get_template_part('shared/blog-card') ?>
                </article>
              </div>
            <?php else : ?>
              <div class="o-layout__item u-1/1 u-1/2@tablet">
                <article class="c-card c-card--split">
                  <?php get_template_part('shared/blog-card') ?>
                </article>
              </div>
            <?php endif; $count++;
        endwhile;
        ?>
        <div class="o-layout__item">
          <?php get_template_part('shared/pagination'); ?>
        </div>

      <?php else :

        get_template_part( 'template-parts/content', 'none' );

      endif;
      ?>
    </section>
  </div>
</div>


<?php
get_footer();
