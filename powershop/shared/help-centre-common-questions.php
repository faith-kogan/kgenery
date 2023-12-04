<?php
/**
 * Help center questions by list order. For display on the Help Center landing page
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */

?>


<?php
// Common questions WP query
$queried_object = get_queried_object();

$faq_args = [
  'post_type' => 'faq',
  'posts_per_page' => 5,
  'orderby' => 'menu_order',
  'order' => 'ASC',
];

$faq_query = new WP_Query( $faq_args );

?>


<div class="o-panel o-panel--top-spacing-xxlarge o-panel--no-bottom-spacing-custom">
  <div class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item  u-6/12@desktop">
        <h2 class="u-font-h4 c-article-header c-article-header--margin-large">Common questions</h2>
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
                <?php the_title(); ?> <span class="c-faqs__toggle-icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg');?>#chevron-down"></use></svg></span><br>
                <small><?php the_terms( $post->ID, 'help_tag', 'Help topic: ', ', ', ' ' ); ?></small>
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

      </div><!-- u-5/12@desktop -->

    </div><!-- o-layout -->
  </div><!-- o-wrapper -->
</div><!-- o-panel -->