<?php
/**
 *  The template for displaying ta split compare layout.
 *
 *  Template Name: Split compare
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

    

    <section class="o-panel o-panel--no-bottom-spacing o-panel--no-top-spacing c-custom--split-compare">
      <div class="o-wrapper o-wrapper--vertical-spacing">
        <section class="o-layout o-layout--center">
          <div class="o-layout__item  u-10/12@tablet">
            <header class="c-section-heading">
              <h1><?php the_title(); ?></h1>
              <?php
              $intro_text = get_field('text_under_page_title');
              ?>

              <p class="u-font-p1"><?php echo $intro_text; ?></p> 
            </header>
            <article class="c-split-callout">
              <header>
                <!-- left side content -->
                <?php 
                // vars
                $image_left = get_field('left_image');
                $heading_left = get_field('left_heading');
                $content_left = get_field('left_content');
                $size = 'full'; // (thumbnail, medium, large, full or custom size)
                if( $image_left ) {
                  echo wp_get_attachment_image( $image_left, $size );
                }
                ?>
                <?php echo $content_left; ?>
                <!-- left side content -->
                <p class="c-rounded-title">
                  <span>or</span>
                </p>
              </header>
              <footer>
                <!-- right side content -->
                <?php 
                // vars
                $image_right = get_field('right_image');
                $heading_right = get_field('right_heading');
                $content_right = get_field('right_content');
                $size = 'full'; // (thumbnail, medium, large, full or custom size)
                if( $image_right ) {
                  echo wp_get_attachment_image( $image_right, $size );
                }
                ?>
                <?php echo $content_right; ?>
                <!-- right side content -->
              </footer>
            </article>
            <?php the_content(); ?>
          </div>
        </section>
      </div><!-- o-wrapper -->
    </section>

<?php get_footer(); ?>