<?php
/**
 *  The template for displaying campaign pages that appear as standard content pages.
 *
 *  Template Name: Campaign page - MV Wind wheels
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

    <div class="o-layout__item s-cms-content u-spacing-bottom-large">
        <section>
          <h1><?php the_title(); ?></h1>
          <?php the_content(); ?>
        </section>
    </div>
  </div>
</section>

<!-- windwheel counter -->
<?php if( get_field('counter_text') ) { ?>
  <section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item">
      <div class="s-cms-content c-counter u-spacing-bottom-huge" data-module="CountUpMV">
        <?php echo get_field('counter_text', false, false); ?>
        <p class="c-counter-box" id="counter-mv"></p>
      </div>
    </div>
  </div>
</section>
<?php } ?>

<!-- find out more CTA -->
<?php if( get_field('call_to_action_box') ) { ?>
<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item">
      <div class="c-cta c-cta__small s-cms-content u-spacing-bottom-huge u-bg-pink-to-purple">
        <?php echo get_field('call_to_action_box', false, false); ?>
      </div>
    </div>
  </div>
</section>
<?php } ?>

<!-- add instagram curated posts carousel -->
<?php
// check if the repeater field has rows of data
if( have_rows('instagram_posts') ): ?>

<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item">
      <article class="c-carousel--container u-spacing-bottom-huge">
        <h4>Get social <span><a href="https://www.instagram.com/explore/tags/windwheel/" target="_blank">#windwheel</a></span></h4>
        <div class="c-instagram-gallery" data-module="CarouselMV">
          <div class="c-carousel">

          <?php
          // loop through the rows of data
          while ( have_rows('instagram_posts') ) : the_row();

            // vars
            $username = get_sub_field('username');
            $username_link = get_sub_field('username_link');
            $image = get_sub_field('image');
            $image_link = get_sub_field('image_link');
            ?>
            <!-- card slide -->
            <div class="c-carousel--card">
              <div class="c-carousel__header">
                <?php if( $username_link ): ?>
                  <a href="<?php echo $username_link; ?>" target="_blank">
                  <?php endif; ?>
                  <p><?php echo $username; ?></p>
                  <?php if( $username_link ): ?>
                  </a>
                <?php endif; ?>
              </div>
              <div class="c-carousel__body">
                <?php if( $image_link ): ?>
                  <a href="<?php echo $image_link; ?>" target="_blank">
                  <?php endif; ?>
                  <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
                  <?php if( $image_link ): ?>
                  </a>
                <?php endif; ?>
              </div>
            </div>
            <!-- card slide -->
            <?php
          endwhile; ?>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>
<?php else : endif; ?>
    
<!-- wind farms section -->
<?php if( get_field('wind_farms') ) { ?>
<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item">
      <article class="s-cms-content u-spacing-bottom-large">
      <?php echo get_field('wind_farms', false, false); ?>
      </article>
    </div>
  </div>
</section>
<?php } ?>

<!-- wind you know -->
<?php if( get_field('wind_you_know') ) { ?>
<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item">
      <article class="s-cms-content u-spacing-bottom-huge">
      <?php echo get_field('wind_you_know'); ?>
      </article>
    </div>
  </div>
</section>
<?php } ?>

<!-- about powershop -->
<?php if( get_field('about_powershop') ) { ?>
<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item">
      <article class="s-cms-content u-spacing-bottom-large">
      <?php echo get_field('about_powershop'); ?>
      </article>
    </div>
  </div>
</section>
<?php } ?>
    

<!-- about powershop wind farms -->
<?php if( get_field('about_wind_farms') ) { ?>
<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item">
      <article class="s-cms-content u-spacing-bottom-large">
      <?php echo get_field('about_wind_farms'); ?>
      </article>
    </div>
  </div>
</section>
<?php } ?>

<?php
get_footer('campaign');