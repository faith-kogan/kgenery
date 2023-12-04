<?php
/**
 * The footer info (e.g. ABN, Socials) for our theme <footer>
 *
 * Values are set in Appearance > Customise
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */

?>

<div class="c-footer__site-info">
  <div class="o-wrapper">
    <ul class="c-social">
      <?php if (get_theme_mod('powershop_facebook_url')) : ?>
        <li>
          <a href="<?php echo get_theme_mod('powershop_facebook_url'); ?>" title="Facebook" target="_blank">
            <span class="u-hidden-visually">Facebook</span>
            <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#facebook"></use></svg>
          </a>
        </li>
      <?php endif; ?>
      <?php if (get_theme_mod('powershop_twitter_url')) : ?>
        <li>
          <a href="<?php echo get_theme_mod('powershop_twitter_url'); ?>" target="_blank" title="Twitter">
            <span class="u-hidden-visually">Twitter</span>
            <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#twitter"></use></svg>
          </a>
        </li>
      <?php endif; ?>
      <?php if (get_theme_mod('powershop_youtube_url')) : ?>
        <li>
          <a href="<?php echo get_theme_mod('powershop_youtube_url'); ?>" target="_blank" title="YouTube">
            <span class="u-hidden-visually">YouTube</span>
            <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#youtube"></use></svg>
          </a>
        </li>
      <?php endif; ?>
      <?php if (get_theme_mod('powershop_linkedin_url')) : ?>
        <li>
          <a href="<?php echo get_theme_mod('powershop_linkedin_url'); ?>" target="_blank" title="LinkedIn">
            <span class="u-hidden-visually">LinkedIn</span>
            <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#linked-in"></use></svg>
          </a>
        </li>
      <?php endif; ?>
      <?php if (get_theme_mod('powershop_instagram_url')) : ?>
        <li>
          <a href="<?php echo get_theme_mod('powershop_instagram_url'); ?>" target="_blank" title="Instagram">
            <span class="u-hidden-visually">Instagram</span>
            <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#instagram"></use></svg>
          </a>
        </li>
      <?php endif; ?>
    </ul>
    <p class="c-footer__copyright"><img src="<?php echo PowershopUtilities::get_rev_asset_uri('images/winky-rgb.svg') ?>" alt="Powershop" />&copy; <?php echo date("Y"); ?> Powershop Australia Pty Ltd <br>ABN &zwj;41 &zwj;154 &zwj;914 &zwj;075</p>
  </div><!-- c-footer__site-info -->
</div><!-- o-wrapper -->