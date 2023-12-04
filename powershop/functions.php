<?php
/**
 * powershop functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package powershop
 */

// override wp-include jquery loading in header
if (!is_admin()) add_action("wp_enqueue_scripts", "my_jquery_enqueue", 11);
function my_jquery_enqueue() {
   wp_deregister_script('jquery');
   wp_register_script('jquery', includes_url() . '/js/jquery/jquery.js', '', '', true);
   wp_enqueue_script('jquery');
}

/**
 * dequeue plugin styles
 */
function my_deregister_styles() {
  wp_deregister_style('google-language-translator'); // Not required. Google translator css not used on website.
  wp_deregister_style('heateor_sss_frontend_css'); // Required. Load this in powershop_scripts function.
  wp_deregister_style('heateor_sss_sharing_default_svg'); // Not required.
  wp_deregister_style('siteorigin-panels-front'); // Not required.
}
add_action('wp_print_styles', 'my_deregister_styles', 100);


/**
 * Enqueue scripts and styles.
 */
function powershop_scripts() {
  $env = $_SERVER['WP_ENV'];

  // load jquery migrate from wp-includes as before but not render-blocking in header
  wp_enqueue_script( 'wp-include-jquery-migrate', includes_url() . '/js/jquery/jquery-migrate.min.js', '', '', true);

  wp_enqueue_script( 'jotform-image', 'https://cdn.jotfor.ms/js/vendor/imageinfo.js?v=3.3.6676', '', '', true);
  wp_enqueue_script( 'jotform-prototype', 'https://cdn.jotfor.ms/static/prototype.forms.js?v=3.3.6676', '', '', true);
  wp_enqueue_script( 'jotform-forms', 'https://cdn.jotfor.ms/static/jotform.forms.js?3.3.6676', '', '', true);

  // If working on development, chances are we want to load the webpack HMR JS
  if ($env === 'development') {
    // by default port should be 3000, change this to your dev environment
    wp_enqueue_script( 'powershop-script', "https://localhost:3000/javascripts/app.js", ['jotform-image', 'jotform-prototype', 'jotform-forms'], '', true );

  } else {
    wp_enqueue_script( 'powershop-script', PowershopUtilities::get_rev_asset_uri("javascripts/app.js"), ['jotform-image', 'jotform-prototype', 'jotform-forms'], '', true );
  }
}
add_action( 'wp_enqueue_scripts', 'powershop_scripts' );


/**
 * Load app.css separately in footer
 */
function prefix_add_footer_styles() {
    wp_enqueue_style( 'powershop-style', PowershopUtilities::get_rev_asset_uri('stylesheets/app.css') );
    wp_enqueue_style( 'sassy-social-share-public-styles', content_url() . '/plugins/sassy-social-share/public/css/sassy-social-share-public.css' );
};
add_action( 'get_footer', 'prefix_add_footer_styles' );

/**
 * Implement the theme init functions.
 */
require get_template_directory() . '/inc/init.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Nav walker
 */
require get_template_directory() . '/inc/walker.php';

/**
 * Limit number of search results per page
 */
function powershop_modify_posts_per_page( $query ) {
  if ( $query->is_search() ) {
    $query->set( 'posts_per_page', '10' );
  }
}

add_action( 'pre_get_posts', 'powershop_modify_posts_per_page' );

/**
 * Add ACF options page
 */

if( function_exists('acf_add_options_page') ) {
  acf_add_options_page();
}
