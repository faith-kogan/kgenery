<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package powershop
 */

  // Get post type for use in get_template_part
  $post_type = get_post_type();
  // Allows include of special header or footer template
  $header_footer = ($post_type === 'campaign' ? 'campaign' : null);

  // Get header-campaign.php if post_type is 'campaign'
  // null results in default header.php
  get_header($header_footer);
?>

		<?php
      while ( have_posts() ) : the_post();

        get_template_part( 'template-parts/content', $post_type );

      endwhile; // End of the loop.
		?>

<?php
  get_footer($header_footer);
