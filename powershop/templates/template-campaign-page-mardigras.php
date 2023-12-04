<?php
/**
 *  The template for displaying campaign pages that appear as standard content pages.
 *
 *  Template Name: Campaign page Mardi Gras
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header('campaign');
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
    <div class="o-layout__item  u-1/1">
      <figure class="c-article-header">
        <?php the_post_thumbnail('full'); ?>
      </figure>
    </div>
  </div>
</section>

<section class="o-wrapper" data-module="Confetti">
  <div class="o-layout">
    <div class="o-layout__item  u-1/4@desktop">
      <?php get_template_part('shared/accordion-tertiary-nav') ?>
    </div>
    <article class="o-layout__item">
      <header class="c-article-intro">
        <h1 class="u-font-h2 c-article-intro__title"><?php the_title(); ?></h1>
      </header>
      <div class="u-spacing-bottom-large  s-cms-content">
        <?php the_content(); ?>
      </div>
    </article>
  </div>
  <div class="fun-bag">
    <div class="fun fun-shape-1 fun-color-purple fun-anim-1"></div>
    <div class="fun fun-shape-4 fun-color-blue fun-anim-1"></div>
    <div class="fun fun-shape-2 fun-color-blue fun-anim-2"></div>
    <div class="fun fun-shape-1 fun-color-yellow fun-anim-2"></div>
    <div class="fun fun-shape-2 fun-color-orange fun-anim-3"></div>
    <div class="fun fun-shape-2 fun-color-green fun-anim-3"></div>
    <div class="fun fun-shape-4 fun-color-pink fun-anim-3"></div>
    <div class="fun fun-shape-3 fun-color-pink fun-anim-4"></div>
    <div class="fun fun-shape-3 fun-color-white fun-anim-4"></div>
    <div class="fun fun-shape-1 fun-color-yellow fun-anim-2"></div>
    <div class="fun fun-shape-2 fun-color-green fun-anim-3"></div>
    <div class="fun fun-shape-4 fun-color-blue fun-anim-1"></div>
    <div class="fun fun-shape-2 fun-color-blue fun-anim-2"></div>
    <div class="fun fun-shape-3 fun-color-white fun-anim-4"></div>
    <div class="fun fun-shape-2 fun-color-orange fun-anim-3"></div>
    <div class="fun fun-shape-3 fun-color-pink fun-anim-4"></div>
    <div class="fun fun-shape-1 fun-color-purple fun-anim-1"></div>
    <div class="fun fun-shape-4 fun-color-pink fun-anim-3"></div>
    <div class="fun fun-shape-1 fun-color-yellow fun-anim-6"></div>
    <div class="fun fun-shape-2 fun-color-green fun-anim-7"></div>
    <div class="fun fun-shape-4 fun-color-blue fun-anim-5"></div>
    <div class="fun fun-shape-2 fun-color-blue fun-anim-6"></div>
    <div class="fun fun-shape-3 fun-color-white fun-anim-8"></div>
    <div class="fun fun-shape-2 fun-color-orange fun-anim-7"></div>
    <div class="fun fun-shape-3 fun-color-pink fun-anim-8"></div>
    <div class="fun fun-shape-1 fun-color-purple fun-anim-5"></div>
    <div class="fun fun-shape-4 fun-color-pink fun-anim-7"></div>
  </div>
</section><!-- o-wrapper -->

<?php
get_footer();