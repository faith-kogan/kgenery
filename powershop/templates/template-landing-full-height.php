<?php
/**
 *  The template for displaying landing pages with half box / half four quarter boxes
 *
 *  Template Name: Landing full width and height
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header(); ?>


<!--
<?php if( get_field('intro_text') ): ?>
  <p class="u-font-p1 u-margin-bottom-zero">
    <?php the_field('intro_text'); ?>
  </p>
<?php endif; ?>
-->

<section class="o-split-hero o-split-hero c-custom--landing-full">
  <div class="o-split-hero__row">
    <div class="o-split-hero__item">
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

    <div class="o-split-hero__item  o-split-hero__item--stacked">

      <!-- top half -->
      <div class="o-split-hero__row">
        <article class="c-card c-card--quarter">
          <a href="<?php the_field('box_1_link'); ?>" title="<?php the_field('box_1_text'); ?>">
            <h2 class="c-card__heading"><?php the_field('box_1_text'); ?></h2>
            <span class="c-card__icon">
              <svg viewBox="0 0 1 1"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
            </span>
          </a>
        </article>

        <article class="c-card c-card--quarter">
          <a href="<?php the_field('box_2_link'); ?>" title="<?php the_field('box_2_text'); ?>">
            <h2 class="c-card__heading"><?php the_field('box_2_text'); ?></h2>
            <span class="c-card__icon">
              <svg viewBox="0 0 1 1"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
            </span>
          </a>
        </article>
      </div>

      <!-- bottom half -->
      <div class="o-split-hero__row">
        <article class="c-card c-card--quarter">
          <a href="<?php the_field('box_3_link'); ?>" title="<?php the_field('box_3_text'); ?>">
            <h2 class="c-card__heading"><?php the_field('box_3_text'); ?></h2>
            <span class="c-card__icon">
              <svg viewBox="0 0 1 1"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
            </span>
          </a>
        </article>

        <article class="c-card c-card--quarter">
          <a href="<?php the_field('box_4_link'); ?>" title="<?php the_field('box_4_text'); ?>">
            <h2 class="c-card__heading"><?php the_field('box_4_text'); ?></h2>
            <span class="c-card__icon">
              <svg viewBox="0 0 1 1"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
            </span>
          </a>
        </article>
      </div>

    </div><!-- o-split-hero__item -->

  </div><!-- o-split-hero__row -->

</section><!-- o-split-hero -->

<?php the_content(); ?>

<?php get_footer(); ?>