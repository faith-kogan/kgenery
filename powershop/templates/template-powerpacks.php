<?php
/**
 *  The template for displaying custom post type - Powerpacks.
 *
 *  Template Name: Powerpacks
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
    <section class="o-panel o-panel--no-bottom-spacing o-panel--no-top-spacing">
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
      <div class="o-grid-layout o-grid-layout--powerpacks-detailed o-grid-layout--centered">

      <?php
      $loop = new WP_Query( 
        array(
          'post_type'       => 'powerpack',
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
        $terms_tag = get_the_terms( $post->ID , 'powerpack_tag' );
        $terms_category = get_the_terms( $post->ID , 'powerpack_category' );
        foreach ( $terms_tag as $term_tag ) {
          $tagname = $term_tag->name;
        }
        foreach ( $terms_category as $term_category ) {
          $categoryname = $term_category->name;
        } 
      ?>

        <article class="c-card c-card--small c-card--powerpack" data-tag="<?php echo $tagname; ?>" data-category="<?php echo $categoryname; ?>" data-module="Powerpacks">

          <div class="c-card__details-hidden c-card__details-hidden-green-rating-info">
            <?php if ( 'yes' == get_field('green_rating') ): ?>
            <svg version="1.1" id="leaves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 500 100" style="enable-background:new 0 0 500 100;" xml:space="preserve">
              <path class="leaf" d="M14.9,87.6c-7.2-9.7-8.6-39.7,10.8-54S71.9,21.3,84.5,7.4c2.7,21.6,3.8,44.9-12,62.4 C59.8,83.7,40,85.9,23.3,92.6c0-10,2.3-27.3,31.3-48.7C18.7,62.3,14.9,87.6,14.9,87.6z"/>
              <path class="leaf" d="M115.9,87.6c-7.2-9.7-8.6-39.7,10.8-54s46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C119.7,62.3,115.9,87.6,115.9,87.6z"/>
              <path class="leaf" d="M216.8,87.6c-7.2-9.7-8.6-39.7,10.8-54s46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C220.6,62.3,216.8,87.6,216.8,87.6z"/>
              <path class="leaf" d="M317.8,87.6c-7.2-9.7-8.6-39.7,10.8-54c19.4-14.3,46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C321.6,62.3,317.8,87.6,317.8,87.6z"/>
              <path class="leaf" d="M418.8,87.6c-7.2-9.7-8.6-39.7,10.8-54c19.4-14.3,46.2-12.3,58.8-26.2 c2.7,21.6,3.8,44.9-12,62.4c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C422.6,62.3,418.8,87.6,418.8,87.6z"/>
            </svg>
            <?php else: ?>
            <svg version="1.1" id="leaves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 500 100" style="enable-background:new 0 0 500 100;" xml:space="preserve">
              <path class="leaf" d="M14.9,87.6c-7.2-9.7-8.6-39.7,10.8-54S71.9,21.3,84.5,7.4c2.7,21.6,3.8,44.9-12,62.4 C59.8,83.7,40,85.9,23.3,92.6c0-10,2.3-27.3,31.3-48.7C18.7,62.3,14.9,87.6,14.9,87.6z"/>
              <path class="leaf" d="M115.9,87.6c-7.2-9.7-8.6-39.7,10.8-54s46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C119.7,62.3,115.9,87.6,115.9,87.6z"/>
              <path class="leaf" d="M216.8,87.6c-7.2-9.7-8.6-39.7,10.8-54s46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C220.6,62.3,216.8,87.6,216.8,87.6z"/>
              <path class="leaf" d="M317.8,87.6c-7.2-9.7-8.6-39.7,10.8-54c19.4-14.3,46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C321.6,62.3,317.8,87.6,317.8,87.6z"/>
              <path class="leaf-last" d="M418.8,87.6c-7.2-9.7-8.6-39.7,10.8-54c19.4-14.3,46.2-12.3,58.8-26.2 c2.7,21.6,3.8,44.9-12,62.4c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C422.6,62.3,418.8,87.6,418.8,87.6z"/>
            </svg>
            <?php endif; ?>
            <?php the_field('green_rating_info'); ?>
            <button class="powerpack-back">Back</button>
          </div>
          <div class="c-card__details-hidden c-card__details-hidden-how-to-use-info" style="background-color: <?php the_field('how_to_use_background_color'); ?>">
            <?php the_field('how_to_use_info'); ?>
            <button class="powerpack-back">Back</button>
          </div>
        
          <div 
            class="c-card__background-image"
            style="background-image: url('<?php echo esc_url($featured_img_url); ?>');"
            >
          </div>
          <div class="c-card__details">
            <div class="c-card__details-inner c-card__details-green">
              <div class="c-card__details-inner-left">
                <p>Green rating</p>
                <?php if ( 'yes' == get_field('green_rating') ): ?>
                <svg version="1.1" id="leaves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 500 100" style="enable-background:new 0 0 500 100;" xml:space="preserve">
                  <path class="leaf" d="M14.9,87.6c-7.2-9.7-8.6-39.7,10.8-54S71.9,21.3,84.5,7.4c2.7,21.6,3.8,44.9-12,62.4 C59.8,83.7,40,85.9,23.3,92.6c0-10,2.3-27.3,31.3-48.7C18.7,62.3,14.9,87.6,14.9,87.6z"/>
                  <path class="leaf" d="M115.9,87.6c-7.2-9.7-8.6-39.7,10.8-54s46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C119.7,62.3,115.9,87.6,115.9,87.6z"/>
                  <path class="leaf" d="M216.8,87.6c-7.2-9.7-8.6-39.7,10.8-54s46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C220.6,62.3,216.8,87.6,216.8,87.6z"/>
                  <path class="leaf" d="M317.8,87.6c-7.2-9.7-8.6-39.7,10.8-54c19.4-14.3,46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C321.6,62.3,317.8,87.6,317.8,87.6z"/>
                  <path class="leaf" d="M418.8,87.6c-7.2-9.7-8.6-39.7,10.8-54c19.4-14.3,46.2-12.3,58.8-26.2 c2.7,21.6,3.8,44.9-12,62.4c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C422.6,62.3,418.8,87.6,418.8,87.6z"/>
                </svg>
                <?php else: ?>
                <svg version="1.1" id="leaves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                     viewBox="0 0 500 100" style="enable-background:new 0 0 500 100;" xml:space="preserve">
                  <path class="leaf" d="M14.9,87.6c-7.2-9.7-8.6-39.7,10.8-54S71.9,21.3,84.5,7.4c2.7,21.6,3.8,44.9-12,62.4 C59.8,83.7,40,85.9,23.3,92.6c0-10,2.3-27.3,31.3-48.7C18.7,62.3,14.9,87.6,14.9,87.6z"/>
                  <path class="leaf" d="M115.9,87.6c-7.2-9.7-8.6-39.7,10.8-54s46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C119.7,62.3,115.9,87.6,115.9,87.6z"/>
                  <path class="leaf" d="M216.8,87.6c-7.2-9.7-8.6-39.7,10.8-54s46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C220.6,62.3,216.8,87.6,216.8,87.6z"/>
                  <path class="leaf" d="M317.8,87.6c-7.2-9.7-8.6-39.7,10.8-54c19.4-14.3,46.2-12.3,58.8-26.2c2.7,21.6,3.8,44.9-12,62.4 c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C321.6,62.3,317.8,87.6,317.8,87.6z"/>
                  <path class="leaf-last" d="M418.8,87.6c-7.2-9.7-8.6-39.7,10.8-54c19.4-14.3,46.2-12.3,58.8-26.2 c2.7,21.6,3.8,44.9-12,62.4c-12.7,13.9-32.5,16.1-49.2,22.8c0-10,2.3-27.3,31.3-48.7C422.6,62.3,418.8,87.6,418.8,87.6z"/>
                </svg>
                <?php endif; ?>
              </div>
              <div class="c-card__details-inner-right">
                <span class="arrow-click arrow-left" data-powerpack-toggle="left">
                  <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
                </span>
              </div>
            </div>
            <div class="c-card__details-inner c-card__details-how-to">
              <div class="c-card__details-inner-left">
                <p>How to use</p>
              </div>
              <div class="c-card__details-inner-right">
                <span class="arrow-click arrow-right" data-powerpack-toggle="right">
                  <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
                </span>
              </div>
            </div>
          </div>
          <div class="c-card__body">
            <h3 class="c-card__heading"><?php the_title(); ?></h3>
            <footer class="c-card-footer">
              <?php the_excerpt(); ?>
            </footer>
          </div>
        </article>
        <?php endwhile; wp_reset_query(); ?>
      </div>
    </section>
<?php get_footer(); ?>