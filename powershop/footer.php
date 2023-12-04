<?php
/**
 * The template for displaying the standard footer
 *
 * Contains the closing of the </main> and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */

?>

    <?php
      //  Global CTA Block - uses ACF info for the page/post
      get_template_part('shared/cta');
    ?>
  </main><!-- /main -->

  <footer class="c-footer">
    <div class="o-wrapper  o-wrapper--no-padding@tablet">
      <div class="c-footer__main">
        <div class="c-footer__nav-col">
          <nav class="c-footer-nav" data-module="Footer">
            <?php if ( has_nav_menu( 'menu-3' ) ) : ?>
              <div class="c-footer-nav__col" data-footer-accordion>
                <h2 data-footer-accordion-toggle>Powershop <div class="c-footer-nav__icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#chevron-down"></use></svg></div></h2>
                <?php wp_nav_menu( [
                  'theme_location' => 'menu-3',
                  'menu_class' => '',
                  'container' => '',
                  'depth' => 1,
                ] );
                ?>
              </div>
            <?php endif; ?>
            <?php if ( has_nav_menu( 'menu-4' ) ) : ?>
              <div class="c-footer-nav__col" data-footer-accordion>
                <h2 data-footer-accordion-toggle>Help <div class="c-footer-nav__icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#chevron-down"></use></svg></div></h2>
                <?php wp_nav_menu( [
                  'theme_location' => 'menu-4',
                  'menu_class' => '',
                  'container' => '',
                  'depth' => 1,
                ] );
                ?>
              </div>
            <?php endif; ?>
            <?php if ( has_nav_menu( 'menu-5' ) ) : ?>
              <div class="c-footer-nav__col" data-footer-accordion>
                <h2 data-footer-accordion-toggle>Important Stuff <div class="c-footer-nav__icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#chevron-down"></use></svg></div></h2>
                <?php wp_nav_menu( [
                  'theme_location' => 'menu-5',
                  'menu_class' => '',
                  'container' => '',
                  'depth' => 1,
                ] );
                ?>
              </div>
            <?php endif; ?>
          </nav>
        </div><!-- c-footer__nav-col -->

        <div class="c-footer__info">
          <?php
            if ( is_active_sidebar( 'sidebar-1' ) ) :
                dynamic_sidebar( 'sidebar-1' );
            endif;
          ?>
        </div><!-- c-footer__info -->

      </div><!-- c-footer__main -->

    </div><!-- o-wrapper -->

    <?php get_template_part('shared/footer-site-info') ?>

  </footer>

  <?php wp_footer(); ?>

</body>
</html>
