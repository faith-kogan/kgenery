<?php
/**
 *  The template for displaying the switch now app.
 *
 *  Template Name: Switch Now South Australia
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header(); ?>

  <div class="o-wrapper  o-wrapper--vertical-spacing">
    <!-- Container for switch now React app -->
    <div 
      class="u-min-height" 
      data-module="SwitchAppSA"
      data-promoIdLiteDefault="<?php echo get_field('campaign_id_lite_default', 'option'); ?>"
      data-shopperContentLeft="<?php echo get_field('shopper_account_content_left', 'option'); ?>"
      data-shopperContentRight="<?php echo get_field('shopper_account_content_right', 'option'); ?>"
    >
      <?php get_template_part('shared/loading') ?>
    </div>
  </div><!-- o-wrapper -->

<?php get_footer(); ?>