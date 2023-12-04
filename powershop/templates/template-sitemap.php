<?php
/**
 *  The template for displaying the sitemap.
 *
 *  Template Name: Sitemap
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

<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item  u-1/1">
      <?php get_template_part('shared/accordion-tertiary-nav') ?>
    </div>
    <article>
      <header class="c-article-intro o-layout__item  u-1/1">
        <h1 class="u-font-h2  c-article-intro__title"><?php the_title(); ?></h1>
      </header>
      <div class="u-spacing-bottom-large s-cms-content ">
      	<div class="o-layout__item  u-1/1">
      		<?php the_content(); ?>
      	</div>
      	<!-- Pages and posts heading and links -->
      	<div class="o-layout__item  u-1/1 u-1/2@tablet">
          <h4>Pages</h4>
          <ul>
            <!-- pages half of page WP query -->
            <?php
               $posts = get_posts(array(
                'numberposts' => -1,
                'post_type' => 'page',
                'meta_key' => 'exclude_page',
                //'meta_value' => 1, // if saved with Yes
                'meta_value' => 0, // if saved with No
                'orderby' => 'title',
                'order' => 'ASC'
               ));

              wp_list_pages(
                array(
                  'title_li' => '',
                  'numberposts' => -1,
                  'post_type' => 'page',
                  'meta_key' => 'exclude_page',
                  //'meta_value' => 1, // if saved with Yes
                  'meta_value' => 0, // if saved with No
                  'orderby' => 'title',
                  'order' => 'ASC'
                ));
            ?>
            </ul>
      		</div>
      		<div class="o-layout__item  u-1/1 u-1/2@tablet">
      			<h4>Blog posts</h4>
  				<?php
  				// Add categories you'd like to exclude in the exclude here
  				$cats = get_categories('exclude=10');
  				foreach ($cats as $cat) {
  					echo "<h3 class='u-font-h6'>".$cat->cat_name."</h3>";
  					echo "<ul>";
  					query_posts('posts_per_page=-1&amp;cat='.$cat->cat_ID);
  					while(have_posts()) {
  						the_post();
  						$category = get_the_category();
  						// Only display a post link once, even if it's in multiple categories
  						if ($category[0]->cat_ID == $cat->cat_ID) {
  							echo '<li><a href="'.get_permalink().'">'.get_the_title().'</a></li>';
  						}
  					}
  					echo "</ul></li>";
  				}
  				?>
      		</div>
      	</div>
    </article>
  </div>
</section><!-- o-wrapper -->

<?php get_footer(); ?>