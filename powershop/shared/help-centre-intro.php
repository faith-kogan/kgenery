<?php
/**
 * The page intro for all help centre related pages
 *
 * Values are set in Appearance > Customise
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */

?>

<div class="u-bg-grey-xlight">
  <section class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item">
        <?php get_template_part('shared/breadcrumbs') ?>
        <header class="c-article-intro">
          <?php if (is_post_type_archive('faq')) : ?>
            <h2 class="u-font-h2  c-article-intro__title e-colour--grey-dark">Help centre</h2>
          <?php else : ?>
            <h1 class="u-font-h2  c-article-intro__title e-colour--grey-dark">Help centre</h1>
          <?php endif; ?>
          <p class="u-font-p1">Our aim is to help make things simpler not harder.</p>

          <form class="c-search-form" action="<?php echo home_url(); ?>" method="get">
            <div class="c-input">
              <label
                class="u-hidden-visually"
                for="page-search"
              >
                Search this site
              </label>
              <div class="c-input__button-inside">
                <div>
                  <input
                    type="text"
                    class="c-input-text"
                    placeholder="What can we help you with?"
                    name="s"
                    id="s"
                    value="<?php echo get_search_query(); ?>"
                  />
                  <input type="hidden" name="ps_post_type" id="ps_post_type" value="faq" />
                  <button type="submit">
                    <span class="u-hidden-visually">Go</span> <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#search"></use></svg>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </header>
      </div>
    </div>
  </section>
</div>