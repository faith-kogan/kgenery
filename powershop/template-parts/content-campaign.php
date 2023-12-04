<?php
/**
 * Template part for displaying campaign content in single.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

?>

<div
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

    <div class="o-layout__item  u-7/12@desktop  s-cms-content">
        <h1><?php the_title(); ?></h1>

        <div class="c-intro">
          <p><?php the_excerpt(); ?></p>
        </div>

        <?php the_content(); ?>
    </div>

    <div class="o-layout__item  u-5/12@desktop">
      <?php
        $roundel = get_field('campaign_roundel');
        if ($roundel) :
      ?>
        <div class="c-roundel">
          <img src="<?php echo wp_get_attachment_url($roundel); ?>" alt="<?php echo get_post_meta( $roundel, '_wp_attachment_image_alt', true); ?>" />
        </div>
      <?php endif; ?>
    </div><!-- u-5/12@desktop -->

  </div><!-- o-layout -->
</div><!-- o-wrapper -->