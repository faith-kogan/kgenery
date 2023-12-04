<?php
/**
 * The categories for all help centre related pages
 *
 * Values are set in Appearance > Customise
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */

?>
<div class="o-wrapper">
  <section class="o-layout" data-module="MatchHeights">
    <div class="o-layout__item">
      <h2 class="u-font-h4 c-article-header c-article-header--margin-large">Browse help topics</h2>
    </div>

    <?php
    $terms = get_terms( [
      'taxonomy' => 'help_tag', 
      'hide_empty' => true,
      'orderby' => 'menu_order',
      'order' => 'DESC'
    ] );
    if ( $terms ) :

      foreach( $terms as $term ) : ?>
        <div class="o-layout__item u-1/1 u-1/2@tablet u-1/3@large">
          <article class="c-card c-card--split u-bg-grey-xlight">
            <a href="<?php echo get_term_link($term->term_id); ?>">
              <?php
                $tag_featured_img_url = (get_field('featured_image', $term))
                  ? wp_get_attachment_image_src(get_field('featured_image', $term), 'medium_large')[0]
                  : PowershopUtilities::get_rev_asset_uri('images/featured-default.jpg');
              ?>
              <figure class="c-card__fig" style="background-image: url('<?php echo $tag_featured_img_url ?>')"></figure>
              <div class="c-card__body c-card__body-top-align" data-match-height>
                <h1 class="c-card__heading c-card__heading--short"><?php echo $term->name ?></h1>
                <p class="c-card__heading--text"><?php echo term_description( $term->term_id ) ?></p>
                <footer class="c-card-footer">
                  <span class="c-card-footer__icon">
                    <svg viewBox="0 0 1 1">
                      <use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use>
                    </svg>
                  </span>
                </footer>
              </div>
            </a>
          </article>
        </div>
      <?php endforeach;

    else :

      get_template_part( 'template-parts/content', 'none' );

    endif;
    ?>
  </section>
</div>