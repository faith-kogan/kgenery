<?php
/**
 * The search component for our theme in page
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */
?>

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
          placeholder="Type something and hit enter"
          name="s"
          id="s"
          value="<?php echo get_search_query(); ?>"
        />
        <input type="hidden" name="ps_post_type" id="ps_post_type" value="<?php echo get_query_var('ps_post_type') ?>" />
        <button type="submit">
          <span class="u-hidden-visually">Go</span> <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#search"></use></svg>
        </button>
      </div>
    </div>

  </div>
</form>