<?php
/**
 * Template part for displaying Business story content in single.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

?>

<div data-module="Lightbox">

  <section class="o-split-hero c-custom--business-full">
    
    <!-- grid layout two column large tiles -->
    <div class="o-grid-layout o-grid-layout--columns-2-half-half o-grid-layout--gap-large o-grid-layout--powerpacks-detailed o-grid-layout--margin-large">
      
      <!-- left half -->
      <div class="o-split-hero__item o-split-hero__item-left">
        <?php 
        $image = get_field('background_image');
        $size = 'full'; // (thumbnail, medium, large, full or custom size)
        
        if ( get_field( 'background_image' ) ): ?>
          <article class="c-card c-card--feature c-card--dark" style="background-image: url('<?php echo $image['url']; ?>');">
          <?php else: // field_name returned false ?>
          <article class="c-card c-card--feature c-card--dark u-bg-pink-to-purple">
          <?php endif; // end of if field_name logic ?>
          <a href="#" class="c-lightbox--trigger">
            <!-- title -->
            <h1 class="c-card__heading"><div class="c-card__heading--huge"><?php the_title(); ?></div></h1>

            <!-- if has video link -->
            <?php if( get_field('video_id') ): ?>
            <div class="c-card__extras">
              <div class="c-card__actions">
                <span class="c-btn  c-btn--white  c-btn--chunky  c-btn--icon-right">
                  Watch the video <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
                </span>
              </div>
            </div>
            <?php endif; ?>
          </a>
        </article>
      </div><!-- o-split-hero__item -->

      <!-- right half -->
      <div class="o-split-hero__item o-split-hero__item-right">
        <div class="o-split-hero__row">
          <article class="c-card c-card--feature">
            <span class="no-link">
              <h2 class="c-card__heading"><?php the_field('intro_text'); ?></h2>
            </span>
          </article>
        </div>
      </div>
    </div><!-- end grid layout two column large tiles -->

    <!-- grid layout three column images -->
    <?php if (has_post_thumbnail() ): ?>
    <?php 
    $image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large_1200x600' ); 
    $altText = get_post_meta(get_post_thumbnail_id(), '_wp_attachment_image_alt', true);
    ?>
    <div class="o-grid-layout o-grid-layout--columns-3 o-grid-layout--gap-large c-business-images">
      <div>
        <img src="<?php echo $image[0]; ?>" alt="<?php echo $altText; ?>" />
      </div>
      <div>
        <?php 
        $image_1 = get_field('image_1');
        $image_2 = get_field('image_2');
        $size = 'large_1200x600';

        echo wp_get_attachment_image( $image_1, $size );
        ?>
      </div>
      <div>
        <?php
        echo wp_get_attachment_image( $image_2, $size );
        ?>
      </div>
    </div>
    <?php endif; ?>
    <!-- grid layout three column images -->

  </section><!-- o-split-hero -->

<div class="o-panel o-panel--top-spacing-xxlarge o-panel--no-bottom-spacing-custom">
  <div class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item  u-6/12@desktop">
        <div class="s-cms-content">
          <!-- business breadcrumbs -->
          <div class="c-breadcrumbs c-business-full__breadcrumbs">
            <span>
              <span>
                <?php
                if( get_field('breadcrumb_html') ) {
                  the_field('breadcrumb_html');
                } else {
                  echo '<a href="/business">Business</a>';
                }
                ?>
                 / <span><span class="breadcrumb_last"><?php the_title(); ?></span></span>
              </span>
            </span>
          </div>
          <?php the_content(); ?>
          <hr />
          <h4>Want more?</h4>
          <!-- next/prev article links -->
          <?php if(get_next_post()) : ?>
            <p><strong>Read next:</strong> <?php next_post_link(' %link'); ?></p>
          <?php endif; ?>

          <?php if(get_previous_post()) : ?>
            <p><strong>Read previous:</strong><?php previous_post_link(' %link'); ?></p>
          <?php endif; ?>
        </div>
      </div>
    </div><!-- o-layout -->
  </div><!-- o-wrapper -->
</div><!-- o-panel -->

<!-- lightbox if video id added -->
<?php if( get_field('video_id') ): ?>
<div class="c-lightbox">
  <div class="c-lightbox--background">
    <div class="c-lightbox--background-close">
      <svg 
      xmlns="http://www.w3.org/2000/svg" 
      x="0px" y="0px"
      viewBox="0 0 50 50"
      >
        <path d="M42.7,13.3L16.5,39.5c-1.6,1.6-4.1,1.6-5.7,0l0,0c-1.6-1.6-1.6-4.1,0-5.7L37,7.6c1.6-1.6,4.1-1.6,5.7,0l0,0 C44.3,9.1,44.3,11.7,42.7,13.3z"/>
        <path d="M16.5,7.6l26.2,26.2c1.6,1.6,1.6,4.1,0,5.7l0,0c-1.6,1.6-4.1,1.6-5.7,0L10.8,13.3c-1.6-1.6-1.6-4.1,0-5.7l0,0 C12.4,6,15,6,16.5,7.6z"/>
      </svg>
    </div>
  </div>
  <div class="c-lightbox--content">
    <figure class="c-video">
      <div class="c-video__inner" data-video>
        <iframe src="<?php echo the_field('video_id'); ?>" frameborder="0" allowfullscreen></iframe>
      </div>
      <figcaption class="c-video__caption">
        <p><?php the_field('video_caption'); ?></p>
      </figcaption>
    </figure>
  </div>
</div>
<?php endif; ?>
<!-- end lightbox -->

</div>