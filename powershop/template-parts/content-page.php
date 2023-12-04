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

<article>
  <section class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item  u-1/4@desktop">
        <?php get_template_part('shared/accordion-tertiary-nav') ?>
      </div>
      <div class="o-layout__item  u-7/12@desktop  u-push-1/12@desktop">
        <header class="c-article-intro">
          <h1 class="u-font-h2  c-article-intro__title"><?php the_title(); ?></h1>
        </header>

        <section class="u-spacing-bottom-large  s-cms-content">
          <?php the_content(); ?>
        </section>
      </div>
    </div>
  </section><!-- o-wrapper -->
</article>
