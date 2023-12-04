<?php
/**
 * Template part for displaying results in search pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

?>

<li>
	<article id="post-<?php the_ID(); ?>" class="c-text-and-image">
	  <figure>
      <?php
        $thumbnail_url = (has_post_thumbnail()
          ? get_the_post_thumbnail_url(get_the_ID(), 'sq_160x160')
          : PowershopUtilities::get_rev_asset_uri('images/search-fallback.png')
        );
      ?>
			<img src="<?php echo $thumbnail_url ?>" alt="<?php the_title_attribute(); ?>" title="<?php the_title_attribute(); ?>" />
	  </figure>
	  <div class="c-text-and-image__content">
		    <p class="c-text-and-image__meta">
					<?php if ( 'post' === get_post_type() ) : ?>
						Posted in <?php the_category(', ') ?> on <time datetime="<?php the_time('y-m-d') ?>"><?php echo get_the_date(); ?></time>
					<?php elseif ( 'page' === get_post_type() ) : ?>
						Posted on <time datetime="<?php the_time('y-m-d') ?>"><?php echo get_the_date(); ?></time>
					<?php endif; ?>
				</p>

			<?php the_title( sprintf( '<h3 class="c-text-and-image__title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h3>' ); ?>

	    <?php the_excerpt(); ?>
	  </div>
	</article>
</li>
