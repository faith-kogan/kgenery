<?php
/**
 *  The template for displaying landing pages with half box / half box, archive feed of Business stories and CMS for content under these sections
 *
 *  Template Name: Business landing page
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header(); ?>

<section class="o-split-hero c-custom--business-full">
  
  <!-- grid layout until icon USP -->
  <div class="o-grid-layout o-grid-layout--columns-2-half-half o-grid-layout--gap-large o-grid-layout--powerpacks-detailed">
    
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
        <a href="<?php the_field('left_side_link'); ?>">
          <h1 class="c-card__heading">
            <div class="c-card__heading--huge"><?php the_field('heading_large'); ?></div>
            <?php the_field('heading_small'); ?>
          </h1>

          <div class="c-card__extras">
            <div class="c-card__actions">
              <span class="c-btn  c-btn--white  c-btn--chunky  c-btn--icon-right">
                <?php the_field('left_side_link_text'); ?><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
              </span>
            </div>
          </div>
        </a>
      </article>
    </div><!-- o-split-hero__item -->

    <!-- right half -->
    <div class="o-split-hero__item o-split-hero__item-right">
      <div class="o-split-hero__row">
        <article class="c-card c-card--feature">
          <a href="<?php the_field('box_1_link'); ?>" title="<?php the_field('box_1_text'); ?>">
            <h2 class="c-card__heading"><?php the_field('box_1_text'); ?></h2>
            <span class="c-card__icon">
              <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
            </span>
          </a>
        </article>
      </div>
    </div><!-- o-split-hero__item -->

  <!-- build grid layout for WP loop of business story posts -->

<?php
$loop = new WP_Query( 
array(
'post_type'       => 'business-story',
'posts_per_page'  => -1,
'orderby'         => 'menu_order',
'order'           => 'ASC',
)
);
while ( $loop->have_posts() ) : $loop->the_post();
// get featured image
$featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full'); 
?>

<a class="c-card c-card--feature c-card--powerpack" href="<?php echo get_permalink(); ?>">
  
    <div class="c-card__background-image c-card__background-image--top" style="background-image: url('<?php echo esc_url($featured_img_url); ?>')"></div>
    <div class="c-card__body">
      <p class="c-card__heading"><?php the_title(); ?></p>
      <span class="c-card__icon">
        <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
      </span>
    </div>
  
</a>



<?php endwhile; ?>


</div><!-- end build grid layout for WP loop of business story posts -->

<!-- grid layout until icon USP -->
</div>

<!-- end business story loop -->
<?php wp_reset_query(); ?>


</section><!-- o-split-hero -->

<?php the_content(); ?>

<?php get_footer(); ?>