<?php
/**
 * The split blog card used on the blog listing
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */
?>

<a href="<?php the_permalink(); ?>">
  <?php
    $featured_img_url = (has_post_thumbnail()
      ? get_the_post_thumbnail_url( get_the_ID(), 'full')
      : PowershopUtilities::get_rev_asset_uri('images/featured-default.jpg')
    );
  ?>
  <figure class="c-card__fig" style="background-image: url('<?php echo $featured_img_url ?>')"></figure>
  <div class="c-card__body" data-match-height>
    <p class="c-card__heading"><?php the_title(); ?></p>
    <footer class="c-card-footer">
      <span class="c-card-footer__cat">
        <?php
        $categories = get_the_category();
        if ( ! empty( $categories ) ) {
          echo esc_html( $categories[0]->name );
        } ?>
      </span>
      <?php echo '<time datetime="' . get_the_time('Y-m-d') . '" itemprop="datePublished" class="c-card-footer__date">'  . get_the_time(get_option('date_format')) . '</time>'; ?>
      <span class="c-card-footer__icon">
        <svg viewBox="0 0 1 1">
          <use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use>
        </svg>
      </span>
    </footer>
  </div>
</a>