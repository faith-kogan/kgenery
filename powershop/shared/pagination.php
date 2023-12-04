<?php
/**
 * The pagination component for our theme in index.php and search.php
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */

  $prev_icon = '<svg viewBox="0 0 1 1"><use xlink:href="' . PowershopUtilities::get_rev_asset_uri('images/icons.svg') . '#chevron-left-double"></use></svg>';
  $next_icon = '<svg viewBox="0 0 1 1"><use xlink:href="' . PowershopUtilities::get_rev_asset_uri('images/icons.svg') . '#chevron-right-double"></use></svg>';

  $current = max( 1, absint( get_query_var( 'paged' ) ) );
  $pagination = paginate_links( [
    'base' => str_replace( PHP_INT_MAX, '%#%', esc_url( get_pagenum_link( PHP_INT_MAX ) ) ),
    'format' => '?paged=%#%',
    'current' => $current,
    'total' => $wp_query->max_num_pages,
    'end_size'           => 0,
    'mid_size'           => 1,
    'type' => 'array',
    'prev_text' => $prev_icon,
    'next_text' => $next_icon,
  ] );

  if ( ! empty( $pagination ) ) :
?>
  <ul class="c-pagination-list">
    <?php foreach ( $pagination as $key => $page_link ) : ?>
      <li class="<?php echo (strpos( $page_link, 'current' ) !== false ? 'is-active' : ''); ?>"><?php echo $page_link ?></li>
    <?php endforeach ?>
  </ul>
<?php endif; ?>