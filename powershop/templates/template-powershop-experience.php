<?php
/**
 *  The template for displaying custom page - Powershop experience.
 *
 *  Template Name: Powershop Experience
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
  <section class="o-panel o-panel--no-bottom-spacing o-panel--no-top-spacing">
  	<article class="o-wrapper">
  		<div class="o-layout">
  			<div class="o-layout__item u-7/12@desktop s-cms-content u-spacing-bottom-zero">
  				<h1 class="u-spacing-bottom-large"><?php the_title(); ?></h1>
  				
  				<?php if( get_field('intro_text') ): ?>
  					<p class="u-font-p1 u-margin-bottom-zero"><?php the_field('intro_text'); ?></p>
  				<?php endif; ?>
  			</div>
  		</div>
  	</article>
  </section>
  <section class="o-panel o-panel--no-top-spacing s-cms-content">
  	<article class="o-grid-layout o-grid-layout--powershop-experience">
	    <div></div>
	    <div>
	    	<h2>
	    	<?php if( get_field('your_powershop_journey_heading') ):
	    		the_field('your_powershop_journey_heading');
	    		
	    		else: echo 'Your Powershop journey';
	    		endif; ?>
	    	</h2>
	    </div>
	    <div></div>
	    <div></div>
	    <figure class="o-grid-layout__image-scroll dragscroll" data-module="HorizontalScroll"><!-- column 2 -->
	    	<?php if( have_rows('powershop_journey_slides') ): ?>
	    		<?php $counter = 1; ?>
	    		<?php while( have_rows('powershop_journey_slides') ): the_row(); 
	    		// vars
	    		$image = get_sub_field('slide_image');
	    		$content = get_sub_field('slide_copy');
	    		?>
			<div class="c-card__powershop-experience">
	        	<p class="c-card--powershop-experience-number"><?php echo $counter; ?></p>
	        	<p class="c-card--powershop-experience-text"><?php echo $content; ?></p>
	        	<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" />
	        </div>
				<?php $counter++; // add one per row ?>
				<?php endwhile; ?>
			<?php endif; ?>
	    </figure>
	    <div></div>
	    <dl>
	        <dd><strong>Mouse &mdash;</strong> Click and drag to scroll.</dd>
	        <dd><strong>Keyboard &mdash;</strong> Arrow left/right to scroll.</dd>
	        <dd><strong>Touch &mdash;</strong> Swipe to scroll.</dd>
	    </dl>
	    <div></div>
	    <div></div>
	    <div></div>
	  </article>
	</section>
	<section class="o-panel o-panel--no-top-spacing s-cms-content u-margin-bottom-zero">
	  <div class="o-grid-layout o-grid-layout--powershop-experience">
	    <div></div>
	    <div class="u-7/12@desktop">
	    	<h2>
	      	<?php if( get_field('ways_to_pay_heading') ):
	      		the_field('ways_to_pay_heading');
	    		else: echo 'Ways to pay your bill';
	    		endif; ?>
	    	</h2>
	    	<?php if( get_field('ways_to_pay_text') ): ?>
	      	<p class="u-spacing-bottom-large"><?php the_field('ways_to_pay_text'); ?></p>
  			<?php endif; ?>
	    </div>
	    <div></div>
	  </div>
	  <div class="o-grid-layout o-grid-layout--powershop-experience o-grid-layout--ways-to-pay-your-bill">
	    <div></div>
	    <div class="o-grid-layout__pay-icon"><?php the_field('powerpacks_icon_svg'); ?></div>
	    <div></div>
	    <div class="o-grid-layout__pay-detail">
	      <h4><?php the_field('powerpacks_heading'); ?></h4>
	      <p><?php the_field('powerpacks_copy'); ?></p>
	    </div>
	    <div></div>
	    <div></div>
	    <div class="o-grid-layout__pay-icon"><?php the_field('direct_debit_icon_svg'); ?></div>
	    <div></div>
	    <div class="o-grid-layout__pay-detail">
	      <h4><?php the_field('direct_debit_heading'); ?></h4>
	      <p><?php the_field('direct_debit_copy'); ?></p>
	    </div>
	    <div></div>
	  </div>
	  <div class="o-grid-layout o-grid-layout--powershop-experience o-grid-layout__button-row">
	  	<div></div>
	  	<div></div>
		  <?php 
		  $link = get_field('powershop_options_page_link');
		  $linktext = get_field('powershop_options_page_link_text');
		  if( $link ): ?>
		  <div class="u-text-center">
		   <a href="<?php echo $link; ?>" class="c-btn c-btn--pink c-btn--powerpacks c-btn--chunky c-btn--icon-right c-btn--full@mobile">
		   	<?php echo $linktext; ?> <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
		   </a>
		  <?php endif; ?>
		  </div>
		  <div></div>
		  <div></div>
		</div>
	</section>
	<section class="o-panel o-panel--no-top-spacing s-cms-content u-margin-bottom-zero">
	  <div class="o-grid-layout o-grid-layout--powershop-experience">
	    <div></div>
	    <div class="u-7/12@desktop">
	      <?php if( get_field('powerpacks_section_text') ): ?>
	      	<h2>
	      		<?php else: ?>
	      	<h2 class="u-spacing-bottom-large">
	      <?php	endif; ?>	
	      <?php if( get_field('powerpacks_section_heading') ):
	      	the_field('powerpacks_section_heading');
	      	else: echo 'Powerpacks';
	      	endif; ?>
	      </h2>
	      <p><?php if( get_field('powerpacks_section_text') ):
	      	the_field('powerpacks_section_text');
	      	endif; ?></p>
	    </div>
	    <div></div>
	  </div>
	  <div class="o-grid-layout o-grid-layout--powerpacks o-grid-layout--centered">
	    <?php
	    $tagid = get_field('powerpack_filter_id', 'option');
	    $loop = new WP_Query( 
	    	array(
	    	'post_type' 		=> 'powerpack',
	    	'posts_per_page' 	=> -1,
	    	'tax_query' => 
	    		array( 
        		array( 
            'taxonomy' 		=> 'powerpack_tag', //or tag or custom taxonomy
            'field' 			=> 'id', 
            'terms' 			=> array($tagid),
        		'operator'		=> 'NOT IN',
        		)
        	),
        	'orderby'         => 'menu_order',
          'order'           => 'ASC',
	    	)
	    );
	    while ( $loop->have_posts() ) : $loop->the_post();
	    	$featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full'); ?>

	    <article class="c-card c-card--small c-card--powerpack">
	    	<div 
	    		class="c-card__background-image"
	    		style="background-image: url('<?php echo esc_url($featured_img_url); ?>');"
	    		>
	    	</div>
	    	<div class="c-card__body">
	    		<h3 class="c-card__heading"><?php the_title(); ?></h3>
	    		<footer class="c-card-footer">
	    			<?php the_excerpt(); ?>
	    		</footer>
	    	</div>
	    </article>
	    <?php endwhile; wp_reset_query(); ?>
	    <div></div>
	    <?php 
	    $link = get_field('powerpacks_page_link');
	    if( $link ): ?>
	    <a href="<?php echo $link; ?>" class="c-btn c-btn--pink c-btn--powerpacks c-btn--chunky c-btn--icon-right c-btn--full@mobile">Learn more about Powerpacks <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg></a>
	    <?php endif; ?>
	    </div>
	    <div></div>
	  </div>
	</section>
	<section class="o-panel o-panel--no-top-spacing s-cms-content u-margin-bottom-zero">
	  <div class="o-grid-layout o-grid-layout--powershop-experience">
	    <div></div>
	    <div class="u-7/12@desktop">
	    	<h2>
	      	<?php if( get_field('track_usage_heading') ):
	      		the_field('track_usage_heading');
	    		else: echo 'But how do I track my usage?';
	    		endif; ?>
	    	</h2>
	    	<?php if( get_field('track_usage_text') ): ?>
	      	<p class="u-spacing-bottom-large"><?php the_field('track_usage_text'); ?></p>
  			<?php endif; ?>
	    </div>
	    <div></div>
	  </div>
	  <div class="o-grid-layout o-grid-layout--track-usage o-grid-layout--centered">
	  	<figure class="c-track-usage-phone">
	  		<img src="<?php the_field('track_use_image_1'); ?>" />
	  		<figcaption><?php the_field('track_use_text_1'); ?></figcaption>
	  	</figure>
	  	<div class="c-rounded-title">
	  		<span>
	  			<svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
	  		</span>
	  	</div>
	  	<figure class="c-track-usage-phone">
	  		<img src="<?php the_field('track_use_image_2'); ?>" />
	  		<figcaption><?php the_field('track_use_text_2'); ?></figcaption>
	  	</figure>
	  	<div class="c-rounded-title">
	  		<span>
	  			<svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#arrow-right"></use></svg>
	  		</span>
	  	</div>
	  	<figure class="c-track-usage-phone">
	  		<img src="<?php the_field('track_use_image_3'); ?>" />
	  		<figcaption><?php the_field('track_use_text_3'); ?></figcaption>
	  	</figure>
	  </div>
	</section>
<?php get_footer(); ?>