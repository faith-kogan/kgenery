<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

get_header();
?>

<div class="u-bg-grey-xlight">
  <section class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item">
        <?php get_template_part('shared/breadcrumbs') ?>
        <div class="u-7/12@desktop">
          <?php
          $page_for_posts = get_option( 'page_for_posts' ); // page ID
          $id = $page_for_posts; // add the ID of the page where the zero is
          $p = get_page($id);
          $t = $p->post_title;
          echo '<h3>'.apply_filters('post_title', $t).'</h3>'; // the title is here wrapped with h3
          //echo apply_filters('the_content', $p->post_content); // removed as it displayed latest blog post content

          // function to add the blog page content - if there is any.
          function get_the_content_by_id($post_id) {
            $page_data = get_page($post_id);
            if ($page_data) {
              echo wpautop( $page_data->post_content );
            } else
            return false;
          }

          get_the_content_by_id($id);
          ?>
        </div>
        <?php get_template_part('shared/blog-category-select') ?>
      </div>
    </div>
  </section>
  <div class="o-wrapper">
    <section class="o-layout" data-module="MatchHeights">
      <!-- WP_Query with counter to split first post from the rest -->
      <?php
      $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
      $args = [
        'post_type' => 'post',
        'posts_per_page' => 9,
        'paged' => $paged
      ];

      $blog_query = new WP_Query( $args );

      if ( $blog_query->have_posts() ) : $count = 0; ?>
        <?php while ( $blog_query->have_posts() ) : $blog_query->the_post() ?>
          <?php if ($count === 0) : ?>
            <div class="o-layout__item  u-1/1">
              <article class="c-card  c-card--split  is-hero">
                <?php get_template_part('shared/blog-card') ?>
              </article>
            </div>
          <?php else : ?>
            <div class="o-layout__item u-1/1 u-1/2@tablet">
              <article class="c-card c-card--split">
                <?php get_template_part('shared/blog-card') ?>
              </article>
            </div>
          <?php endif; $count++; ?>
        <?php endwhile ?>
      <?php else : ?>
        <div class="c-user-message">
          <div class="c-user-message__icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri("images/icons.svg") ?>#warning"></use></svg></div>
          <div class="c-user-message__content">
            <h3 class="c-user-message__title">No results</h3>
            <p><?php esc_html_e( 'Sorry, but we could not find any posts. ', 'powershop' ); ?></p>
          </div>
        </div>
        <?php wp_reset_postdata(); ?>
      <?php endif ?>

        <div class="o-layout__item">
          <?php get_template_part('shared/pagination'); ?>
        </div>

		</section>
	</div>
</div>

<?php
get_footer();
