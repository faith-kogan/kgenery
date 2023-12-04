<?php
/**
* Class for all the action hooks.
* A lot of these functions are from the Bones Theme boilerplate.
*
* @author  Dillon Bailey
* @version 1
*/

if (! defined('ABSPATH') ) {
    exit;
}

if (! class_exists('PowershopInit') ) {

    class PowershopInit
    {
      function __construct()
      {
        // Theme setup
        add_action('after_setup_theme', [ $this, 'powershop_setup' ], 1);
        // Remove pesky injected css for recent comments widget
        add_filter('wp_head', [ $this, 'remove_wp_widget_recent_comments_style' ], 1);
        // Clean up comment styles in the head
        add_action('wp_head', [ $this, 'cleanup_head' ], 1);
        // Disable WP Emoji support
        add_action('wp_head', [$this, 'disable_wp_emojicons'], 1);
        // adding it to the admin area
        add_filter('admin_footer_text', [$this, 'bones_custom_admin_footer'] );
        // adding to the login area
        add_action('login_enqueue_scripts', [$this, 'bones_login_css'], 10 );
        add_filter('login_headerurl', [$this, 'bones_login_url'] );
        add_filter('login_headertitle', [$this, 'bones_login_title'] );
        // Allow SVG uploads
        add_filter('upload_mimes', [$this, 'cc_mime_types']);
        // Remove WP Version From Styles
        add_filter( 'style_loader_src', [$this, 'remove_wp_ver_css_js'], 9998);
        // Remove WP Version From Scripts
        add_filter( 'script_loader_src', [$this, 'remove_wp_ver_css_js'], 9998);
        // Register our sidebars
        add_action( 'widgets_init', [$this, 'powershop_register_sidebars'] );
        // Custom post types
        add_action( 'init', [$this, 'powershop_powerpack_post_type'], 0 );
        add_action( 'init', [$this, 'powershop_campaign_post_type'], 0 );
        add_action( 'init', [$this, 'powershop_renewable_asset_post_type'], 0 );
        add_action( 'init', [$this, 'powershop_faq_post_type'], 0 );
        add_action( 'init', [$this, 'powershop_business_story_post_type'], 0 );
        add_action( 'init', [$this, 'powershop_solar_info_post_type'], 0 );
        // Custom query vars
        add_filter( 'query_vars', [$this, 'ps_query_vars'] );
      }

      /**
       * Sets up theme defaults and registers support for various WordPress features.
       *
       * Note that this function is hooked into the after_setup_theme hook, which
       * runs before the init hook. The init hook is too late for some features, such
       * as indicating support for post thumbnails.
       */
      function powershop_setup() {
        /*
        * Make theme available for translation.
        * Translations can be filed in the /languages/ directory.
        * If you're building a theme based on powershop, use a find and replace
        * to change 'powershop' to the name of your theme in all the template files.
        */
        load_theme_textdomain( 'powershop', get_template_directory() . '/languages' );

        // Add default posts and comments RSS feed links to head.
        // add_theme_support( 'automatic-feed-links' );

        /*
        * Let WordPress manage the document title.
        * By adding theme support, we declare that this theme does not use a
        * hard-coded <title> tag in the document head, and expect WordPress to
        * provide it for us.
        */
        add_theme_support( 'title-tag' );

        /*
        * Enable support for Post Thumbnails on posts and pages.
        *
        * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
        */
        add_theme_support( 'post-thumbnails' );

        // Custom thumbnail sizes
        add_image_size('sq_160x160', 160, 160, ['center', 'center']);
        add_image_size('large_1200x600', 1200, 600, ['center', 'top']);

        // This theme uses wp_nav_menu() in a few locations
        register_nav_menus( [
          'menu-1' => esc_html__( 'Primary', 'powershop' ),
          // 'menu-2' => esc_html__( 'Secondary', 'powershop' ),
          'menu-3' => esc_html__( 'Footer (Powershop)', 'powershop' ),
          'menu-4' => esc_html__( 'Footer (Help)', 'powershop' ),
          'menu-5' => esc_html__( 'Footer (Important Stuff)', 'powershop' ),
         ] );


        /*
        * Switch default core markup for search form, comment form, and comments
        * to output valid HTML5.
        */
        add_theme_support( 'html5', [
          'search-form',
          // 'comment-form',
          // 'comment-list',
          'gallery',
          'caption',
         ] );

        // Add theme support for selective refresh for widgets.
        add_theme_support( 'customize-selective-refresh-widgets' );
      }

      /**
      * Remove injected CSS from recent comments widget.
      */
      function cleanup_head()
      {
          global $wp_widget_factory;
          if (isset($wp_widget_factory->widgets['WP_Widget_Recent_Comments'])) {
              remove_action('wp_head', array($wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
          }
          // post and comment feeds
          remove_action('wp_head', 'feed_links', 2);
          // EditURI link
          remove_action('wp_head', 'rsd_link');
          // windows live writer
          remove_action('wp_head', 'wlwmanifest_link');
          // previous link
          remove_action('wp_head', 'parent_post_rel_link', 10, 0);
          // start link
          remove_action('wp_head', 'start_post_rel_link', 10, 0);
          // links for adjacent posts
          remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
          // WP version
          remove_action('wp_head', 'wp_generator');
          // Remove feed links
          remove_action('wp_head', 'feed_links', 2);
      }

      /**
      * Remove injected CSS from recent comments widget.
      */
      function disable_wp_emojicons()
      {
          // all actions related to emojis
          remove_action('admin_print_styles', 'print_emoji_styles');
          remove_action('wp_head', 'print_emoji_detection_script', 7);
          remove_action('admin_print_scripts', 'print_emoji_detection_script');
          remove_action('wp_print_styles', 'print_emoji_styles');
          remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
          remove_filter('the_content_feed', 'wp_staticize_emoji');
          remove_filter('comment_text_rss', 'wp_staticize_emoji');

          // filter to remove TinyMCE emojis
          add_filter('tiny_mce_plugins', 'disable_emojicons_tinymce');
      }

      function ps_query_vars( $query_vars ){
        $query_vars[] = 'ps_post_type';
        return $query_vars;
      }

      /**
        * Remove injected CSS for recent comments widget
        */
      function remove_wp_widget_recent_comments_style()
      {
          if (has_filter('wp_head', 'wp_widget_recent_comments_style') ) {
              remove_filter('wp_head', 'wp_widget_recent_comments_style');
          }
      }

      /************* CUSTOM LOGIN PAGE *****************/
      // calling your own login css so you can style it

      //Updated to proper 'enqueue' method
      //http://codex.wordpress.org/Plugin_API/Action_Reference/login_enqueue_scripts
      function bones_login_css() {
        wp_enqueue_style( 'bones_login_css', get_template_directory_uri() . '/library/css/login.css', false );
      }

      // changing the logo link from wordpress.org to your site
      function bones_login_url() {  return home_url(); }

      // changing the alt text on the logo to show your site name
      function bones_login_title() { return get_option( 'blogname' ); }

      /************* CUSTOMIZE ADMIN *******************/

      /*
      I don't really recommend editing the admin too much
      as things may get funky if WordPress updates. Here
      are a few funtions which you can choose to use if
      you like.
      */

      // Custom Backend Footer
      function bones_custom_admin_footer() {
        _e( '<span id="footer-thankyou">Designed by <a href="http://isobar.com" target="_blank">Isobar</a>. Developed by <a href="http://honestfox.com.au/" target="_blank">Honest Fox</a></span>.' , 'bonestheme' );
      }

      /**
      * Allow SVG uploads via media uploader
      *
      * https://css-tricks.com/snippets/wordpress/allow-svg-through-wordpress-media-uploader/
      *
      * @param array $mimes of currently accepted types
      */
      function cc_mime_types($mimes) {
        $mimes['svg'] = 'image/svg+xml';
        return $mimes;
      }

      /**
      * Remove WP version from scripts
      *
      * @param string $src Url of the js or css file
      */
      public function remove_wp_ver_css_js( $src )
      {
        if ( strpos( $src, 'ver=' ) )
        $src = remove_query_arg( 'ver', $src );
        return $src;
      }

      /**
      * Register sidebars
      *
      */
      public function powershop_register_sidebars( )
      {
        /************* Footer sidebar *****************/


      /**
       * Usage
       *   if ( is_active_sidebar( 'sidebar-1' ) ) :
       *     dynamic_sidebar( 'sidebar-1' );
       *   endif;
       *   https://codex.wordpress.org/Function_Reference/register_sidebar
       */
        register_sidebar( [
          'name' => __( 'Footer Sidebar', 'powershop' ),
          'id' => 'sidebar-1',
          'description' => __( 'Widgets in this area will be shown on the right hand of the footer.', 'powershop' ),
          'before_widget' => '<div class="c-footer__info-item">',
          'after_widget'  => '</div>',
          'before_title'  => '<h2>',
          'after_title'   => '</h2>',
        ] );
      }

      // Register Powerpack Custom Post Type
      function powershop_powerpack_post_type() {

        $labels = [
          'name'                  => _x( 'Powerpacks', 'Post Type General Name', 'powershop' ),
          'singular_name'         => _x( 'Powerpack', 'Post Type Singular Name', 'powershop' ),
          'menu_name'             => __( 'Powerpacks', 'powershop' ),
          'name_admin_bar'        => __( 'Powerpack', 'powershop' ),
          'archives'              => __( 'Powerpack Archives', 'powershop' ),
          'attributes'            => __( 'Powerpack Attributes', 'powershop' ),
          'parent_item_colon'     => __( 'Parent Powerpack:', 'powershop' ),
          'all_items'             => __( 'All Powerpacks', 'powershop' ),
          'add_new_item'          => __( 'Add New Powerpack', 'powershop' ),
          'add_new'               => __( 'Add New', 'powershop' ),
          'new_item'              => __( 'New Powerpack', 'powershop' ),
          'edit_item'             => __( 'Edit Powerpack', 'powershop' ),
          'update_item'           => __( 'Update Powerpack', 'powershop' ),
          'view_item'             => __( 'View Powerpack', 'powershop' ),
          'view_items'            => __( 'View Powerpacks', 'powershop' ),
          'search_items'          => __( 'Search Powerpack', 'powershop' ),
          'not_found'             => __( 'Not found', 'powershop' ),
          'not_found_in_trash'    => __( 'Not found in Trash', 'powershop' ),
          'featured_image'        => __( 'Featured Image', 'powershop' ),
          'set_featured_image'    => __( 'Set featured image', 'powershop' ),
          'remove_featured_image' => __( 'Remove featured image', 'powershop' ),
          'use_featured_image'    => __( 'Use as featured image', 'powershop' ),
          'insert_into_item'      => __( 'Insert into Powerpack', 'powershop' ),
          'uploaded_to_this_item' => __( 'Uploaded to this Powerpack', 'powershop' ),
          'items_list'            => __( 'Powerpacks list', 'powershop' ),
          'items_list_navigation' => __( 'Powerpacks list navigation', 'powershop' ),
          'filter_items_list'     => __( 'Filter Powerpacks list', 'powershop' ),
        ];

        $args = [
          'label'                 => __( 'Powerpack', 'powershop' ),
          'labels'                => $labels,
          'supports'              => [ 'title', 'editor', 'thumbnail', 'excerpt' ],
          'hierarchical'          => false,
          'public'                => true,
          'show_ui'               => true,
          'show_in_menu'          => true,
          'menu_position'         => 5,
          'menu_icon'             => 'dashicons-lightbulb',
          'show_in_admin_bar'     => true,
          'show_in_nav_menus'     => true,
          'can_export'            => true,
          'has_archive'           => false,
          'exclude_from_search'   => false,
          'publicly_queryable'    => true,
          'capability_type'       => 'page',
          'rewrite'               => [
            'with_front' => false,
            'slug' => __('powerpacks', 'powershop')
          ],
        ];
        register_post_type( 'powerpack', $args );
      }

      // Register Campaign Custom Post Type
      function powershop_campaign_post_type() {

        $labels = [
          'name'                  => _x( 'Campaigns', 'Post Type General Name', 'powershop' ),
          'singular_name'         => _x( 'Campaign', 'Post Type Singular Name', 'powershop' ),
          'menu_name'             => __( 'Campaigns', 'powershop' ),
          'name_admin_bar'        => __( 'Campaign', 'powershop' ),
          'archives'              => __( 'Campaign Archives', 'powershop' ),
          'attributes'            => __( 'Campaign Attributes', 'powershop' ),
          'parent_item_colon'     => __( 'Parent Campaign:', 'powershop' ),
          'all_items'             => __( 'All Campaigns', 'powershop' ),
          'add_new_item'          => __( 'Add New Campaign', 'powershop' ),
          'add_new'               => __( 'Add New', 'powershop' ),
          'new_item'              => __( 'New Campaign', 'powershop' ),
          'edit_item'             => __( 'Edit Campaign', 'powershop' ),
          'update_item'           => __( 'Update Campaign', 'powershop' ),
          'view_item'             => __( 'View Campaign', 'powershop' ),
          'view_items'            => __( 'View Campaigns', 'powershop' ),
          'search_items'          => __( 'Search Campaign', 'powershop' ),
          'not_found'             => __( 'Not found', 'powershop' ),
          'not_found_in_trash'    => __( 'Not found in Trash', 'powershop' ),
          'featured_image'        => __( 'Featured Image', 'powershop' ),
          'set_featured_image'    => __( 'Set featured image', 'powershop' ),
          'remove_featured_image' => __( 'Remove featured image', 'powershop' ),
          'use_featured_image'    => __( 'Use as featured image', 'powershop' ),
          'insert_into_item'      => __( 'Insert into Campaign', 'powershop' ),
          'uploaded_to_this_item' => __( 'Uploaded to this Campaign', 'powershop' ),
          'items_list'            => __( 'Campaigns list', 'powershop' ),
          'items_list_navigation' => __( 'Campaigns list navigation', 'powershop' ),
          'filter_items_list'     => __( 'Filter Campaigns list', 'powershop' ),
        ];

        $args = [
          'label'                 => __( 'Campaign', 'powershop' ),
          'labels'                => $labels,
          'supports'              => [ 'title', 'editor', 'thumbnail', 'excerpt' ],
          'hierarchical'          => false,
          'public'                => true,
          'show_ui'               => true,
          'show_in_menu'          => true,
          'menu_position'         => 5,
          'menu_icon'             => 'dashicons-megaphone',
          'show_in_admin_bar'     => true,
          'show_in_nav_menus'     => true,
          'can_export'            => true,
          'has_archive'           => false,
          'exclude_from_search'   => true,
          'publicly_queryable'    => true,
          'capability_type'       => 'page',
          'rewrite'               => [
            'with_front' => false,
            'slug' => __('p', 'powershop')
          ],
        ];
        register_post_type( 'campaign', $args );
      }

      // Register FAQ Custom Post Type
       function powershop_faq_post_type() {

        // create a new taxonomy
        register_taxonomy(
           // QA - $taxonomy (string) (required) The name of the taxonomy.
           // Name should only contain lowercase letters and the underscore character, and not be more than 32 characters long (database structure restriction).
          'help_tag',
          'faq',
          [
            'label' => __( 'Help Centre Tags' ),
            'rewrite' => ['slug' => 'help-centre', 'with_front' => false ],
          ]
        );

        $labels = [
          'name'                  => _x( 'Help centre', 'Post Type General Name', 'powershop' ),
          'singular_name'         => _x( 'FAQ', 'Post Type Singular Name', 'powershop' ),
          'menu_name'             => __( 'FAQs', 'powershop' ),
          'name_admin_bar'        => __( 'FAQ', 'powershop' ),
          'archives'              => __( 'FAQ Archives', 'powershop' ),
          'attributes'            => __( 'FAQ Attributes', 'powershop' ),
          'parent_item_colon'     => __( 'Parent FAQ:', 'powershop' ),
          'all_items'             => __( 'All FAQs', 'powershop' ),
          'add_new_item'          => __( 'Add New FAQ', 'powershop' ),
          'add_new'               => __( 'Add New', 'powershop' ),
          'new_item'              => __( 'New FAQ', 'powershop' ),
          'edit_item'             => __( 'Edit FAQ', 'powershop' ),
          'update_item'           => __( 'Update FAQ', 'powershop' ),
          'view_item'             => __( 'View FAQ', 'powershop' ),
          'view_items'            => __( 'View FAQs', 'powershop' ),
          'search_items'          => __( 'Search FAQ', 'powershop' ),
          'not_found'             => __( 'Not found', 'powershop' ),
          'not_found_in_trash'    => __( 'Not found in Trash', 'powershop' ),
          'featured_image'        => __( 'Featured Image', 'powershop' ),
          'set_featured_image'    => __( 'Set featured image', 'powershop' ),
          'remove_featured_image' => __( 'Remove featured image', 'powershop' ),
          'use_featured_image'    => __( 'Use as featured image', 'powershop' ),
          'insert_into_item'      => __( 'Insert into FAQ', 'powershop' ),
          'uploaded_to_this_item' => __( 'Uploaded to this FAQ', 'powershop' ),
          'items_list'            => __( 'FAQs list', 'powershop' ),
          'items_list_navigation' => __( 'FAQs list navigation', 'powershop' ),
          'filter_items_list'     => __( 'Filter FAQs list', 'powershop' ),
        ];

        $args = [
          'label'                 => __( 'FAQ', 'powershop' ),
          'labels'                => $labels,
          'supports'              => [ 'title', 'editor', 'thumbnail', 'excerpt' ],
          'hierarchical'          => false,
          'taxonomies'            => ['help_tag'],
          'public'                => true,
          'show_ui'               => true,
          'show_in_menu'          => true,
          'menu_position'         => 5,
          'menu_icon'             => 'dashicons-info',
          'show_in_admin_bar'     => true,
          'show_in_nav_menus'     => true,
          'can_export'            => true,
          'has_archive'           => false,
          'exclude_from_search'   => false,
          'publicly_queryable'    => true,
          'capability_type'       => 'post',
          'has_archive'           => 'help-centre',
          'rewrite'               => [
            'with_front' => false,
            'slug' => __('help-centre/%help_tag%', 'powershop')
          ],
        ];
        register_post_type( 'faq', $args );

        // Assist with URL rewrite to use the first tag
        function faq_permalinks( $post_link, $post ){
          if ( is_object( $post ) && $post->post_type == 'faq' ){
              $terms = wp_get_object_terms( $post->ID, 'help_tag' );
              if( $terms ){
                  return str_replace( '%help_tag%' , $terms[0]->slug , $post_link );
              }
          }
          return $post_link;
        }

        add_filter( 'post_type_link', 'faq_permalinks', 1, 2 );


      }

      // Register Solar Hub Custom Post Type
      function powershop_solar_info_post_type() {

        // create a new taxonomy
        register_taxonomy(
           // QA - $taxonomy (string) (required) The name of the taxonomy.
           // Name should only contain lowercase letters and the underscore character, and not be more than 32 characters long (database structure restriction).
          'solar_tag',
          'solar',
          [
            'label' => __( 'Solar Hub Tags' ),
            'rewrite' => ['slug' => 'solar-hub', 'with_front' => false ],
          ]
        );

        $labels = [
          'name'                  => _x( 'Solar hub', 'Post Type General Name', 'powershop' ),
          'singular_name'         => _x( 'Solar hub post', 'Post Type Singular Name', 'powershop' ),
          'menu_name'             => __( 'Solar hub posts', 'powershop' ),
          'name_admin_bar'        => __( 'Solar hub post', 'powershop' ),
          'archives'              => __( 'Solar hub post Archives', 'powershop' ),
          'attributes'            => __( 'Solar hub post Attributes', 'powershop' ),
          'parent_item_colon'     => __( 'Parent Solar hub post:', 'powershop' ),
          'all_items'             => __( 'All Solar hub posts', 'powershop' ),
          'add_new_item'          => __( 'Add New Solar hub post', 'powershop' ),
          'add_new'               => __( 'Add New', 'powershop' ),
          'new_item'              => __( 'New Solar hub post', 'powershop' ),
          'edit_item'             => __( 'Edit Solar hub post', 'powershop' ),
          'update_item'           => __( 'Update Solar hub post', 'powershop' ),
          'view_item'             => __( 'View Solar hub post', 'powershop' ),
          'view_items'            => __( 'View Solar hub posts', 'powershop' ),
          'search_items'          => __( 'Search Solar hub post', 'powershop' ),
          'not_found'             => __( 'Not found', 'powershop' ),
          'not_found_in_trash'    => __( 'Not found in Trash', 'powershop' ),
          'featured_image'        => __( 'Featured Image', 'powershop' ),
          'set_featured_image'    => __( 'Set featured image', 'powershop' ),
          'remove_featured_image' => __( 'Remove featured image', 'powershop' ),
          'use_featured_image'    => __( 'Use as featured image', 'powershop' ),
          'insert_into_item'      => __( 'Insert into Solar hub post', 'powershop' ),
          'uploaded_to_this_item' => __( 'Uploaded to this Solar hub post', 'powershop' ),
          'items_list'            => __( 'Solar hub posts list', 'powershop' ),
          'items_list_navigation' => __( 'Solar hub posts list navigation', 'powershop' ),
          'filter_items_list'     => __( 'Filter Solar hub posts list', 'powershop' ),
        ];

        $args = [
          'label'                 => __( 'Solar hub post', 'powershop' ),
          'labels'                => $labels,
          'supports'              => [ 'title', 'editor', 'thumbnail', 'excerpt' ],
          'hierarchical'          => false,
          'taxonomies'            => ['solar_tag'],
          'public'                => true,
          'show_ui'               => true,
          'show_in_menu'          => true,
          'menu_position'         => 5,
          'menu_icon'             => 'dashicons-palmtree',
          'show_in_admin_bar'     => true,
          'show_in_nav_menus'     => true,
          'can_export'            => true,
          'has_archive'           => false,
          'exclude_from_search'   => false,
          'publicly_queryable'    => true,
          'capability_type'       => 'post',
          'has_archive'           => 'solar-hub',
          'rewrite'               => [
            'with_front' => false,
            'slug' => __('solar-hub/%solar_tag%', 'powershop')
          ],
        ];
        register_post_type( 'solar', $args );

        // Assist with URL rewrite to use the first tag
        function solar_hub_permalinks( $post_link, $post ){
          if ( is_object( $post ) && $post->post_type == 'solar' ){
              $terms = wp_get_object_terms( $post->ID, 'solar_tag' );
              if( $terms ){
                  return str_replace( '%solar_tag%' , $terms[0]->slug , $post_link );
              }
          }
          return $post_link;
        }

        add_filter( 'post_type_link', 'solar_hub_permalinks', 1, 2 );
      }


       // Register Renewable asset Custom Post Type
       function powershop_renewable_asset_post_type() {

        $labels = [
          'name'                  => _x( 'Renewable assets', 'Post Type General Name', 'powershop' ),
          'singular_name'         => _x( 'Renewable asset', 'Post Type Singular Name', 'powershop' ),
          'menu_name'             => __( 'Renewable assets', 'powershop' ),
          'name_admin_bar'        => __( 'Renewable asset', 'powershop' ),
          'archives'              => __( 'Renewable asset Archives', 'powershop' ),
          'attributes'            => __( 'Renewable asset Attributes', 'powershop' ),
          'parent_item_colon'     => __( 'Parent Renewable asset:', 'powershop' ),
          'all_items'             => __( 'All Renewable assets', 'powershop' ),
          'add_new_item'          => __( 'Add New Renewable asset', 'powershop' ),
          'add_new'               => __( 'Add New', 'powershop' ),
          'new_item'              => __( 'New Renewable asset', 'powershop' ),
          'edit_item'             => __( 'Edit Renewable asset', 'powershop' ),
          'update_item'           => __( 'Update Renewable asset', 'powershop' ),
          'view_item'             => __( 'View Renewable asset', 'powershop' ),
          'view_items'            => __( 'View Renewable assets', 'powershop' ),
          'search_items'          => __( 'Search Renewable asset', 'powershop' ),
          'not_found'             => __( 'Not found', 'powershop' ),
          'not_found_in_trash'    => __( 'Not found in Trash', 'powershop' ),
          'featured_image'        => __( 'Featured Image', 'powershop' ),
          'set_featured_image'    => __( 'Set featured image', 'powershop' ),
          'remove_featured_image' => __( 'Remove featured image', 'powershop' ),
          'use_featured_image'    => __( 'Use as featured image', 'powershop' ),
          'insert_into_item'      => __( 'Insert into Renewable asset', 'powershop' ),
          'uploaded_to_this_item' => __( 'Uploaded to this Renewable asset', 'powershop' ),
          'items_list'            => __( 'Renewable assets list', 'powershop' ),
          'items_list_navigation' => __( 'Renewable assets list navigation', 'powershop' ),
          'filter_items_list'     => __( 'Filter Renewable assets list', 'powershop' ),
        ];

        $args = [
          'label'                 => __( 'Renewable asset', 'powershop' ),
          'labels'                => $labels,
          'supports'              => [ 'title', 'editor', 'thumbnail', 'excerpt' ],
          'hierarchical'          => false,
          'public'                => true,
          'show_ui'               => true,
          'show_in_menu'          => true,
          'menu_position'         => 5,
          'menu_icon'             => 'dashicons-admin-site',
          'show_in_admin_bar'     => true,
          'show_in_nav_menus'     => true,
          'can_export'            => true,
          'has_archive'           => false,
          'exclude_from_search'   => false,
          'publicly_queryable'    => true,
          'capability_type'       => 'page',
          'rewrite'               => [
            'with_front' => false,
            'slug' => __('renewable-assets', 'powershop')
          ],
        ];
        register_post_type( 'renewable-asset', $args );
      }

      // Register Business Story post type
      function powershop_business_story_post_type() {

        $labels = [
          'name'                  => _x( 'Business stories', 'Post Type General Name', 'powershop' ),
          'singular_name'         => _x( 'Business story', 'Post Type Singular Name', 'powershop' ),
          'menu_name'             => __( 'Business stories', 'powershop' ),
          'name_admin_bar'        => __( 'Business story', 'powershop' ),
          'archives'              => __( 'Business story Archives', 'powershop' ),
          'attributes'            => __( 'Business story Attributes', 'powershop' ),
          'all_items'             => __( 'All Business stories', 'powershop' ),
          'add_new_item'          => __( 'Add New Business story', 'powershop' ),
          'add_new'               => __( 'Add New', 'powershop' ),
          'new_item'              => __( 'New Business story', 'powershop' ),
          'edit_item'             => __( 'Edit Business story', 'powershop' ),
          'update_item'           => __( 'Update Business story', 'powershop' ),
          'view_item'             => __( 'View Business story', 'powershop' ),
          'view_items'            => __( 'View Business stories', 'powershop' ),
          'search_items'          => __( 'Search Business story', 'powershop' ),
          'not_found'             => __( 'Not found', 'powershop' ),
          'not_found_in_trash'    => __( 'Not found in Trash', 'powershop' ),
          'featured_image'        => __( 'Featured Image', 'powershop' ),
          'set_featured_image'    => __( 'Set featured image', 'powershop' ),
          'remove_featured_image' => __( 'Remove featured image', 'powershop' ),
          'use_featured_image'    => __( 'Use as featured image', 'powershop' ),
          'insert_into_item'      => __( 'Insert into Business story', 'powershop' ),
          'uploaded_to_this_item' => __( 'Uploaded to this Business story', 'powershop' ),
          'items_list'            => __( 'Business stories list', 'powershop' ),
          'items_list_navigation' => __( 'Business stories list navigation', 'powershop' ),
          'filter_items_list'     => __( 'Filter Business stories list', 'powershop' ),
        ];

        $args = [
          'label'                 => __( 'Business story', 'powershop' ),
          'labels'                => $labels,
          'supports'              => [ 'title', 'editor', 'thumbnail' ],
          'hierarchical'          => false,
          'public'                => true,
          'show_ui'               => true,
          'show_in_menu'          => true,
          'menu_position'         => 5,
          'menu_icon'             => 'dashicons-businessman',
          'show_in_admin_bar'     => true,
          'show_in_nav_menus'     => true,
          'can_export'            => true,
          'has_archive'           => false,
          'exclude_from_search'   => false,
          'publicly_queryable'    => true,
          'capability_type'       => 'page',
          'rewrite'               => [
            'with_front' => false,
            'slug' => __('businesses', 'powershop')
          ],
        ];
        register_post_type( 'business-story', $args );
      }
    }

    new PowershopInit();
  }



?>