<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package powershop
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
// function powershop_body_classes( $classes ) {
// 	// Adds a class of hfeed to non-singular pages.
// 	if ( ! is_singular() ) {
// 		$classes[] = 'hfeed';
// 	}

// 	// Adds a class of no-sidebar when there is no sidebar present.
// 	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
// 		$classes[] = 'no-sidebar';
// 	}

// 	return $classes;
// }
// add_filter( 'body_class', 'powershop_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function powershop_pingback_header() {
	if ( is_singular() && pings_open() ) {
		echo '<link rel="pingback" href="', esc_url( get_bloginfo( 'pingback_url' ) ), '">';
	}
}
add_action( 'wp_head', 'powershop_pingback_header' );

/**
 * Remove set width and height on post thumbnail HTML
 */
function remove_thumbnail_dimensions( $html, $post_id, $post_image_id ) {
    $html = preg_replace( '/(width|height)=\"\d*\"\s/', "", $html );
    return $html;
}

add_filter( 'post_thumbnail_html', 'remove_thumbnail_dimensions', 10, 3 );

/**
 * Add a custom query for our search page - for some reason the standard post_type=page is not valid without this
 */
function ps_search( $query ) {
  if( get_query_var('ps_post_type') )
      $query->set('post_type', explode( ',', get_query_var('ps_post_type') ));

  return $query;
}
add_action( 'parse_query', 'ps_search' );


/**
 * Add 'blog' to breadcrumbs if we are on a url including /blog/
 *
 * Conditionally Override Yoast SEO Breadcrumb Trail
 * http://plugins.svn.wordpress.org/wordpress-seo/trunk/frontend/class-breadcrumbs.php
 *
 * @param array
 *
 */

function ps_breadcrumbs( $links ) {
  global $post;

  if ( is_home() || is_singular( 'post' ) || is_post_type_archive('post') ) {
      $breadcrumb[] = [
          'url' => get_permalink( get_option( 'page_for_posts' ) ),
          'text' => 'Blog',
      ];

      array_splice( $links, 1, -2, $breadcrumb );
  }

  /*
  if ( is_singular( 'faq' ) ) {
    $terms = wp_get_object_terms( $post->ID, 'help_tag' );

    if( $terms ){
      $breadcrumb[] = [
        'url' => get_term_link($terms[0]),
        'text' => $terms[0]->name,
      ];
    }

    array_splice( $links, 2, -2, $breadcrumb );
  }
  */

  if ( is_search() ) {
    $post_type = get_query_var( 'ps_post_type' );

    if ($post_type === 'faq') {
      $breadcrumb[] = [
        'url' => get_post_type_archive_link( 'faq' ),
        'text' => 'FAQs',
      ];

      array_splice( $links, 1, -2, $breadcrumb );

    }

    if ($post_type === 'solar') {
      $breadcrumb[] = [
        'url' => get_post_type_archive_link( 'solar' ),
        'text' => 'Solar Hub',
      ];

      array_splice( $links, 1, -2, $breadcrumb );

    }
  }

  return $links;
}
add_filter( 'wpseo_breadcrumb_links', 'ps_breadcrumbs' );

// no auto paragraph on FAQ tag description
remove_filter('term_description','wpautop');

/**
  * Exclude category from blog archive
  */
function exclude_category($query) {
  if ( $query->is_home() ) {
    $query->set('cat', '-10');
  }

  return $query;
}
add_filter('pre_get_posts', 'exclude_category');

/**
 * Add Google Analytics with Optimize modification script to wp_head
 */
function hook_GA() {
  ?>
  <style>.async-hide { opacity: 0 !important}</style>
  <script>
    (function(a,s,y,n,c,h,i,d,e){s.className+=' '+y;h.start=1*new Date;
    h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};
    (a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;
    })(window,document.documentElement,'async-hide','dataLayer',4000,
    {'GTM-KK5KCSP':true});
  </script>
  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-5962965-6', 'auto');
    ga('require', 'GTM-KK5KCSP');
    ga('send', 'pageview');
  </script>
  <?php
}
add_action('wp_head', 'hook_GA');

/**
 * Add typekit script to wp_head
 */
function hook_typekit() {
  ?>
  <script>
    (function(d) {
      var config = {
        kitId: 'xiq5mje',
        scriptTimeout: 3000,
        async: true
      },
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
    })(document);
  </script>
  <?php
}
add_action('wp_head', 'hook_typekit');


// Tags for Powerpacks
register_taxonomy(
  'powerpack_tag',
  'powerpack',
  array(
    'hierarchical'  => false,
    'label'         => __('Powerpack Tags', 'powershop'),
    'singular_name' => __('Tag', 'powershop'),
    'rewrite'       => true,
    'query_var'     => true
  )
);

// Categories for Powerpacks
register_taxonomy(
  'powerpack_category',
  'powerpack',
  array(
    'hierarchical'  => true,
    'label'         => __('Powerpack Categories', 'powershop'),
    'singular_name' => __('Category', 'powershop'),
    'rewrite'       => true,
    'query_var'     => true
  )
);

// Tags for Renewable assets
register_taxonomy(
  'renewable_asset_tag',
  'renewable-asset',
  array(
    'hierarchical'  => false,
    'label'         => __('Renewable asset Tags', 'powershop'),
    'singular_name' => __('Tag', 'powershop'),
    'rewrite'       => true,
    'query_var'     => true
  )
);

// Categories for Renewable assets
register_taxonomy(
  'renewable_asset_category',
  'renewable-asset',
  array(
    'hierarchical'  => true,
    'label'         => __('Renewable asset Categories', 'powershop'),
    'singular_name' => __('Category', 'powershop'),
    'rewrite'       => true,
    'query_var'     => true
  )
);
/**
 * Filter the excerpt "read more" string.
 *
 * @param string $more "Read more" excerpt string.
 * @return string (Maybe) modified "read more" excerpt string.
 */
function filter_excerpt_more( $more ) {
  return sprintf( '...<a href="%1$s">%2$s</a>',
      get_permalink( get_the_ID() ),
      __( 'Read More', 'powershop' )
  );
}
// add_filter( 'excerpt_more', 'filter_excerpt_more' );


// shortcode for asknicely curated testimonials module
function asknicely_testimonials( $atts ) {

  // Attributes
  $atts = shortcode_atts(
    array(
      'data-company' => 'powershopau',
      'data-number' => '10',
      'filter-name' => '',
      'filter-value' => '',
    ),
    $atts,
    'asknicely'
  );

  return '<div id="an_testimonials"></div>
    <script src="https://static.asknice.ly/js/testimonials.js"
            data-company="' . $atts['data-company'] . '"
            data-number="' . $atts['data-number'] . '"
            data-length-limit="200"
            data-animate="false"
            data-height="auto"
            data-invert-colors="false"
            data-color="#fa0e6a"
            filter-name="' . $atts['filter-name'] . '"
            filter-value="' . $atts['filter-value'] . '"
            ></script>';

}
add_shortcode( 'asknicely', 'asknicely_testimonials' );
