<?php
/**
 *  The template for displaying custom post type - Renewable assets.
 *
 *  Template Name: Renewable assets
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header(); ?>
    <section class="o-wrapper">
      <div class="o-layout">
        <div class="o-layout__item">
          <?php get_template_part('shared/breadcrumbs') ?>
        </div>
      </div>
    </section>
    <section class="o-panel o-panel--no-bottom-spacing-custom o-panel--no-top-spacing">
      <article class="o-wrapper">
        <div class="o-layout">
          <div class="o-layout__item u-7/12@desktop s-cms-content u-spacing-bottom-zero">
            <h1 class="u-spacing-bottom-large"><?php the_title(); ?></h1>
            <p class="u-font-p1 u-margin-bottom-zero"><?php echo get_the_content(); ?></p>
          </div>
        </div>
      </article>
    </section>
    <section class="o-panel o-panel--no-top-spacing s-cms-content u-margin-bottom-zero">
      <div class="o-grid-layout o-grid-layout--powerpacks-detailed o-grid-layout--assets-detailed o-grid-layout--centered">

      <?php
      $loop = new WP_Query( 
        array(
          'post_type'       => 'renewable-asset',
          'posts_per_page'  => -1,
          'orderby'         => 'menu_order',
          'order'           => 'ASC',
        )
      );
      while ( $loop->have_posts() ) : $loop->the_post();
      // get featured image
      $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full'); 
      ?>
      <?php
        $terms_tag = get_the_terms( $post->ID , 'renewable_asset_tag' );
        $terms_category = get_the_terms( $post->ID , 'renewable_asset_category' );
        foreach ( $terms_tag as $term_tag ) {
          $tagname = $term_tag->name;
        }
        foreach ( $terms_category as $term_category ) {
          $categoryname = $term_category->name;
        } 
      ?>

        <article class="c-card c-card--small c-card--powerpack c-card--asset" data-tag="<?php echo $tagname; ?>" data-category="<?php echo $categoryname; ?>" data-module="Powerpacks">

          <div class="c-card__details-hidden c-card__details-hidden-how-to-use-info" style="background-color: <?php the_field('asset_background_color'); ?>">
            <?php the_field('asset_info'); ?>
            <button class="powerpack-back">Back</button>
          </div>
        
          <div class="c-card__background-image" style="background-image: url('<?php echo esc_url($featured_img_url); ?>');"></div>
          <div class="c-card__details">
            <div class="c-card__details-inner c-card__details-green">
              <span class="arrow-click arrow-right" data-powerpack-toggle="right">
                <div class="c-card__details-inner-left">
                  <!-- asset icon to be added by ACF -->
                                    <!-- asset icon to be added by ACF -->
                  <?php 
                  // vars
                  $type = get_field('asset_icon');

                  // wind
                  // hydro
                  // solar
                  // ppa

                  // get current page id
                  global $wp_query;

                  if( $type == 'wind' ): ?>
                    <?php echo the_field('wind', $wp_query->post->ID); ?>
                  <?php endif;

                  if( $type == 'hydro' ): ?>
                    <?php the_field('hydro', $wp_query->post->ID); ?>
                  <?php endif;

                  if( $type == 'solar' ): ?>
                    <?php the_field('solar', $wp_query->post->ID); ?>
                  <?php endif;
                  ?>
                  
                  <!-- more info text -->
                  <div class="c-card__details-more">
                    <p>More info</p>
                    <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div class="c-card__body">
            <h3 class="c-card__heading"><?php the_title(); ?></h3>
            <small><?php the_field('sub_title'); ?></small>
            <footer class="c-card-footer">
              <p><?php the_field('location'); ?></p>
            </footer>
          </div>
        </article>
        <?php endwhile; wp_reset_query(); ?>
      </div>
    </section>
<?php get_footer(); ?>