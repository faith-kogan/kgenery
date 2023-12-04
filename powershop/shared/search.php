<?php
/**
 * The search component for our theme header
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */

?>
<div class="c-search" data-search>
  <form action="<?php echo home_url(); ?>" method="get">
    <fieldset>
      <legend class="u-hidden-visually">Search this site</legend>

      <a href="#" class="c-search__close-icon-mobile" data-search-toggle>
        <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-left"></use></svg>
      </a>

      <div class="c-search__input">
        <svg class="c-search__input-icon" viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#search"></use></svg>

        <input type="text" name="s" id="s" placeholder="Find info on gas, your rates, the Powershop app and more…" value="<?php echo get_search_query(); ?>">

        <input type="hidden" name="ps_post_type" id="ps_post_type" value="<?php echo get_query_var('ps_post_type') ?>" />

        <a href="#" class="c-search__close-icon" data-search-toggle>
          <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#cross"></use></svg>
        </a>
      </div>
    </fieldset>
  </form>
  <div class="c-search__bg" data-search-toggle></div>
</div><!-- c-search -->