<?php
/**
* The template for displaying search results pages
*
* @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
*
* @package powershop
*/

get_header();

$post_type = get_query_var( 'ps_post_type' );

?>
<?php if ($post_type === 'faq') : ?>
  <?php get_template_part('shared/help-centre-intro'); ?>
  <div class="o-panel">
    <div class="o-wrapper">
      <div class="o-layout">
      <div class="o-layout__item  u-7/12@desktop">

        <h2 class="u-font-h4">Search results</h2>

        <?php if ( have_posts() ) : ?>
          <?php
            if ($wp_query) :
              $page = $wp_query->query_vars['paged'];

              if ($page < 1) {
                $startpost = 1;
                $endpost = (10 * ($page + 1) < $wp_query->found_posts
                  ? 10 * ($page + 1)
                  : $wp_query->found_posts
                );
              } else {
                $startpost = 10 * ($page - 1) + 1;
                $endpost = (10 * $page < $wp_query->found_posts
                  ? 10 * $page
                  : $wp_query->found_posts
                );
              }
          ?>

            <h2 class="u-font-p2-medium">Showing <?php echo $startpost; ?>-<?php echo $endpost; ?> of <?php echo $wp_query->found_posts; ?></h2>

          <?php endif; ?>

          <ul class="o-simple-list">
            <?php
            /* Start the Loop */
            while ( have_posts() ) :
              the_post();

              /**
              * Run the loop for the search to output the results.
              * If you want to overload this in a child theme then include a file
              * called content-search.php and that will be used instead.
              */
              get_template_part( 'template-parts/content', 'search' );

            endwhile;

            else :

              get_template_part( 'template-parts/content', 'none' );

            endif;
            ?>

          </ul>

        </div><!-- o-layout__item -->

        <div class="o-layout__item">
          <?php get_template_part('shared/pagination'); ?>
          <?php wp_reset_query(); ?>
        </div>
      </div>
    </div>
  </div>
  <?php get_template_part('shared/help-categories'); ?>
  <?php get_template_part('shared/help-footer'); ?>


<?php elseif ($post_type === 'solar') : ?>
  <?php get_template_part('shared/solar-hub-intro'); ?>
  <div class="o-panel">
    <div class="o-wrapper">
      <div class="o-layout">
      <div class="o-layout__item  u-7/12@desktop">

        <h2 class="u-font-h4">Search results</h2>

        <?php if ( have_posts() ) : ?>
          <?php
            if ($wp_query) :
              $page = $wp_query->query_vars['paged'];

              if ($page < 1) {
                $startpost = 1;
                $endpost = (10 * ($page + 1) < $wp_query->found_posts
                  ? 10 * ($page + 1)
                  : $wp_query->found_posts
                );
              } else {
                $startpost = 10 * ($page - 1) + 1;
                $endpost = (10 * $page < $wp_query->found_posts
                  ? 10 * $page
                  : $wp_query->found_posts
                );
              }
          ?>

            <h2 class="u-font-p2-medium">Showing <?php echo $startpost; ?>-<?php echo $endpost; ?> of <?php echo $wp_query->found_posts; ?></h2>

          <?php endif; ?>

          <ul class="o-simple-list">
            <?php
            /* Start the Loop */
            while ( have_posts() ) :
              the_post();

              /**
              * Run the loop for the search to output the results.
              * If you want to overload this in a child theme then include a file
              * called content-search.php and that will be used instead.
              */
              get_template_part( 'template-parts/content', 'search' );

            endwhile;

            else :

              get_template_part( 'template-parts/content', 'none' );

            endif;
            ?>

          </ul>

        </div><!-- o-layout__item -->

        <div class="o-layout__item">
          <?php get_template_part('shared/pagination'); ?>
          <?php wp_reset_query(); ?>
        </div>
      </div>
    </div>
  </div>
  <?php get_template_part('shared/solar-categories'); ?>

<?php else : ?>
  <section class="o-wrapper  o-wrapper--vertical-spacing-xxlarge">
    <div class="o-layout">
      <div class="o-layout__item  u-1/4@desktop  u-hide@mobile-and-tablet-only">
        <?php get_template_part('shared/search-nav'); ?>
      </div>

      <div class="o-layout__item  u-7/12@desktop  u-push-1/12@desktop">
        <div class="c-article-intro">
          <h1 class="u-font-h2  c-article-intro__title">Search results</h1>
        </div>

        <?php get_template_part('shared/search-in-page') ?>

      <?php if ( have_posts() ) : ?>
        <?php
          if ($wp_query) :
            $page = $wp_query->query_vars['paged'];

            if ($page < 1) {
              $startpost = 1;
              $endpost = (10 * ($page + 1) < $wp_query->found_posts
                ? 10 * ($page + 1)
                : $wp_query->found_posts
              );
            } else {
              $startpost = 10 * ($page - 1) + 1;
              $endpost = (10 * $page < $wp_query->found_posts
                ? 10 * $page
                : $wp_query->found_posts
              );
            }
        ?>

          <h2 class="u-font-p2-medium">Showing <?php echo $startpost; ?>-<?php echo $endpost; ?> of <?php echo $wp_query->found_posts; ?></h2>

        <?php endif; ?>

        <div class="u-hide@desktop">
          <?php get_template_part('shared/search-nav'); ?>
        </div>

        <ul class="o-simple-list">
          <?php
          /* Start the Loop */
          while ( have_posts() ) :
            the_post();

            /**
            * Run the loop for the search to output the results.
            * If you want to overload this in a child theme then include a file
            * called content-search.php and that will be used instead.
            */
            get_template_part( 'template-parts/content', 'search' );

          endwhile;

          else :

            get_template_part( 'template-parts/content', 'none' );

          endif;
          ?>

        </ul>

      </div><!-- o-layout__item -->

      <div class="o-layout__item">
        <?php get_template_part('shared/pagination'); ?>
      </div>

    </div>
  </section><!-- o-wrapper -->
<?php endif; ?>


<?php
get_footer();
