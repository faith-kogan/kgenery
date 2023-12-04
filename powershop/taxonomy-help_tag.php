<?php
/**
 * Help Centre Listing
 *
 * @package powershop
 */
get_header();

$queried_object = get_queried_object();

$faq_args = [
  'post_type' => 'faq',
  'posts_per_page' => -1,
	'tax_query' => [
		[
			'taxonomy' => 'help_tag',
			'field'    => 'term_id',
			'terms'    => $queried_object->term_id,
    ],
  ],
];

$faq_query = new WP_Query( $faq_args );

?>

<?php get_template_part( 'shared/help-centre-intro' ); ?>

<div class="o-panel o-panel--top-spacing-xxlarge o-panel--no-bottom-spacing-custom">
  <div class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item  u-6/12@desktop">
        <h1 class="u-font-h4">Help topic: <span class="e-colour--pink"><?php single_tag_title(); ?></span></h1>
        <div class="s-cms-content u-spacing-bottom-xlarge">
          <p class="u-font-p1"><?php echo term_description( $queried_object->term_id ) ?></p>
        </div>
        <h3 class="u-font-h6">All <span class="e-colour--pink"><?php single_tag_title(); ?></span> questions</h3>
        <?php
          if ( $faq_query->have_posts() ) :
            ?>
            <dl class="c-faqs" data-module="Faqs">

            <?php
            while ( $faq_query->have_posts() ) :
              $faq_query->the_post(); ?>

              <dt data-faqs-toggle aria-expanded="false">
                <?php if( get_field('power_pointer') ): ?>
                  <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg');?>#youtube"></use></svg>
                <?php endif; ?>
                <?php the_title(); ?> <span class="c-faqs__toggle-icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg');?>#chevron-down"></use></svg></span>
              </dt>
              <dd>
                <p class="u-font-p1"><?php echo get_the_excerpt(); ?></p>
                <p>
                  <a href="<?php echo get_permalink(); ?>">
                    <?php if( get_field('power_pointer') ): ?>
                      Watch video
                    <?php else: ?>
                      Read more
                    <?php endif; ?>
                  </a>
                </p>
              </dd>

              <?php endwhile; ?>
            </dl>
          <?php
          else :
            get_template_part( 'template-parts/post/content', 'none' );
          endif;
        ?>
      </div>

      <div class="o-layout__item  u-push-1/12@desktop  u-5/12@desktop">
      <?php
         $featured_img_url = (get_field('featured_image', $queried_object)
          ? wp_get_attachment_image_src(get_field('featured_image', $queried_object), 'medium_large')[0]
          : PowershopUtilities::get_rev_asset_uri('images/featured-default.jpg')
        );
      ?>
        <?php if($featured_img_url) : ?>
          <div class="s-cms-content">
            <img src="<?php echo $featured_img_url; ?>" alt="" />
          </div>
        <?php endif; ?>
      </div><!-- u-5/12@desktop -->

    </div><!-- o-layout -->
  </div><!-- o-wrapper -->
</div><!-- o-panel -->

  <?php wp_reset_query(); ?>
  <?php get_template_part('shared/help-categories'); ?>
  <?php get_template_part('shared/help-footer'); ?>

<?php get_footer(); ?>