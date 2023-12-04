<?php
/**
 * The global CTA component - enabled / disabled via ACF selection on a page/post basis
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */
?>

<?php if (get_field('cta_enable')) : ?>
  <article class="c-cta  u-bg-pink-to-purple">
    <div class="o-wrapper">
      <a href="<?php echo get_field('cta_url'); ?>">
          <header class="c-cta__title">
          <h2><?php _e(get_field('cta_heading'), 'powershop'); ?></h2>
        </header>
      </a>

      <?php
        $cta_content = get_field('cta_content');
        $cta_terms = get_field('campaign_terms_and_conditions');
      ?>
      <?php if ($cta_content || $cta_terms) : ?>
        <div class="c-cta__content">
          <?php if ($cta_content) : ?>
            <div class="c-cta__content-main">
              <p><?php _e($cta_content, 'powershop') ?></p>
            </div>
          <?php endif; ?>
          <?php if ($cta_terms) : ?>
            <p class="u-font-p4">* This promotion has some <a href="<?php echo $cta_terms ?>" title="Campaign terms and conditions" target="_blank">terms and conditions</a></p>
          <?php endif; ?>
        </div>
      <?php endif; ?>

      <footer class="c-cta__actions">
        <a href="<?php echo get_field('cta_url'); ?>" class="c-btn  c-btn--chunky  c-btn--icon-right  c-btn--full@mobile"><?php _e(get_field('cta_text'), 'powershop') ?> <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg'); ?>#arrow-right"></use></svg></a>
      </footer>
    </div>
  </article>
<?php endif; ?>