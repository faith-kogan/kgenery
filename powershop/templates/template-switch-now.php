<?php
/**
 *  The template for displaying the switch now app.
 *
 *  Template Name: Switch Now
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header(); ?>

<style>
  body > main {
    background-color: #f5f5f5;
  }
</style>

  <div class="o-wrapper  o-wrapper--vertical-spacing u-text-center">
      <h1 class="u-font-h2 u-margin-bottom-zero c-article-intro__title"><?php the_title(); ?></h1>
     <section class="s-cms-content">
      <?php the_content(); ?>
     </section>
  </div><!-- o-wrapper -->

  <div class="o-wrapper u-bg-grey-xlight">
    <!-- Container for switch now React app -->
    <div 
      class="c-switch-app" 
      data-module="SwitchApp"
      data-promoIdLiteDefault="<?php echo get_field('campaign_id_lite_default', 'option'); ?>"
      data-shopperContentLeft="<?php echo get_field('shopper_account_content_left', 'option'); ?>"
      data-shopperContentRight="<?php echo get_field('shopper_account_content_right', 'option'); ?>"
    >
      <?php get_template_part('shared/loading') ?>
    </div>
  </div><!-- o-wrapper -->

<?php get_footer(); ?>