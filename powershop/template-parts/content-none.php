<?php
/**
 * Template part for displaying a message that posts cannot be found
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

?>

<section class="no-results not-found">
	<div class="page-content">
		<?php if ( is_search() ) : ?>
			<div class="c-user-message  c-user-message--no-center">
		    <div class="c-user-message__icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri("images/icons.svg") ?>#warning"></use></svg></div>

		    <div class="c-user-message__content">
		      <h3 class="c-user-message__title">No results</h3>
		      <p><?php esc_html_e( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'powershop' ); ?></p>
		    </div>
		  </div>
    <?php else : ?>
      <div class="c-user-message  c-user-message--no-center">
		    <div class="c-user-message__icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri("images/icons.svg") ?>#warning"></use></svg></div>

		    <div class="c-user-message__content">
		      <h3 class="c-user-message__title">No results</h3>
		      <p><?php esc_html_e( 'Sorry, but nothing was found.', 'powershop' ); ?></p>
		    </div>
		  </div>
		<?php endif; ?>
	</div><!-- .page-content -->
</section><!-- .no-results -->
