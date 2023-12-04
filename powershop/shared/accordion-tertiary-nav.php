<?php
/**
 * The tertiary nav component for pages
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */
?>

<?php
if ($post) :
  // Variables for knowing if we are on level 1 or 2 throughout
  $post_ancestors = get_post_ancestors($post->ID);
  $post_parent_id = ($post_ancestors ? $post_ancestors[0] : $post->ID);
  $current_page_id = $post->ID;

  // Using WP_Query to construct our third level nav on standard page content
  // Get child or sibling pages pending if we are on level 1 or 2, respsectively
  $pages = new WP_Query( [
    'post_type'      => 'page',
    'posts_per_page' => -1,
    'post_parent'    => $post_parent_id,
    'order'          => 'ASC',
    'orderby'        => 'menu_order'
  ] );

  if ( $pages->have_posts() ) : ?>
    <div class="c-accordion" data-module="Accordion">
      <h2 data-accordion-toggle><?php echo get_the_title($post_parent_id); ?> <div class="c-accordion__icon"><svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#chevron-down"></use></svg></div></h2>
        <ul>
          <li>
            <?php $classes = (get_the_ID() === $post_parent_id ? 'is-active' : ''); ?>
            <a href="<?php echo get_the_permalink($post_parent_id) ?>" title="<?php echo get_the_title($post_parent_id) ?>" class="<?php echo $classes; ?>"><?php echo get_the_title($post_parent_id) ?></a>
          </li>
          <?php
            // Print out our nav items
            while ( $pages->have_posts() ) : $pages->the_post();
          ?>
            <li>
              <?php $classes = (get_the_ID() === $current_page_id ? 'is-active' : ''); ?>
              <a href="<?php the_permalink(); ?>" title="<?php the_title() ?>" class="<?php echo $classes; ?>">
                <?php the_title() ?>
              </a>
            </li>
          <?php endwhile; ?>
        </ul>
    </div>
  <?php endif; wp_reset_postdata(); ?>
<?php endif; ?>