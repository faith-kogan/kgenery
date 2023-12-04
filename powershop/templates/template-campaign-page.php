<?php
/**
 *  The template for displaying campaign pages that appear as standard content pages.
 *
 *  Template Name: Campaign page
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header();
?>

<section
  class="o-wrapper"
  data-module="PromoCookies"
  data-promoName="<?php echo get_field('campaign_name') ?>"
  data-promoId="<?php echo get_field('campaign_id') ?>"
  data-promoIdLite="<?php echo get_field('campaign_id_lite') ?>"
  data-promoTermsUrl="<?php echo get_field('campaign_terms_and_conditions') ?>"
  data-promoExpires="<?php echo get_field('campaign_expiry') ?>"
  data-promoRedirect="<?php echo get_field('campaign_redirect') ?>"
>
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
        <h1 class="u-font-h2  c-article-intro__title"><?php the_title(); ?></h1>
      </header>
      <div class="u-spacing-bottom-large  s-cms-content">
        <?php the_content(); ?>
      </div>
    </article>
  </div>
</section><!-- o-wrapper -->

<?php
get_footer();