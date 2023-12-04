<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
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

<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item  u-1/4@desktop">
      <?php get_template_part('shared/accordion-tertiary-nav') ?>
    </div>
    <article class="o-layout__item  u-7/12@desktop  u-push-1/12@desktop">
      <header class="c-article-intro">
        <h1 class="u-font-h2  c-article-intro__title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'powershop' ); ?></h1>
      </header>
      <div class="u-spacing-bottom-large  s-cms-content">
        <p><?php esc_html_e( 'It looks like nothing was found at this location. Maybe try a search?', 'powershop' ); ?></p>

        <?php get_template_part('shared/search-in-page') ?>
      </div>
    </article>
  </div>
</section><!-- o-wrapper -->

<?php
get_footer();
