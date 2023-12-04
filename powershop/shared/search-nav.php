<?php
/**
  * The sidebnav used on the blog page
  *
  *
  * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
  *
  * @package powershop
  */

  $search_query = get_search_query();
?>

<div class="c-accordion  is-active" data-module="Accordion">
  <h2 data-accordion-toggle>Categories <div class="c-accordion__icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#chevron-down"></use></svg></div></h2>
  <ul data-module="SearchActive">
    <li><a data-search-all href="<?php echo home_url(); ?>/?s=<?php echo $search_query; ?>">All</a></li>
    <li><a data-search-pages href="<?php echo home_url(); ?>/?s=<?php echo $search_query; ?>&amp;ps_post_type=page">Pages</a></li>
    <li><a data-search-posts href="<?php echo home_url(); ?>/?s=<?php echo $search_query; ?>&amp;ps_post_type=post">Blog posts</a></li>
  </ul>
</div>