<?php
/**
 * Template part for displaying Solar hub content in single.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

?>
<?php get_template_part('shared/solar-hub-intro'); ?>

<div class="o-panel o-panel--top-spacing-xxlarge o-panel--no-bottom-spacing-custom">
  <div class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item  u-6/12@desktop">
        <h1 class="u-font-h4"><?php the_title(); ?></h1>
        <div class="s-cms-content">
          <p class="u-margin-bottom-base"><small><?php the_terms( $post->ID, 'solar_tag', 'Solar topic: ', ', ', ' ' ); ?></small></p>
          <p class="u-font-p1"><?php echo get_the_excerpt(); ?></p>
          <hr />
          <?php the_content(); ?>
        </div>
      </div>

      <div class="o-layout__item  u-push-1/12@desktop  u-5/12@desktop">
        <?php if (has_post_thumbnail() ): ?>
          <div class="s-cms-content">
            <?php $image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'medium_large' ); ?>
            <img src="<?php echo $image[0]; ?>" alt="<?php echo get_post_meta( get_post_thumbnail_id(), '_wp_attachment_image_alt', true); ?>" />
          </div>
        <?php endif; ?>
      </div><!-- u-5/12@desktop -->

    </div><!-- o-layout -->
  </div><!-- o-wrapper -->
</div><!-- o-panel -->

<?php get_template_part('shared/solar-categories'); ?>
