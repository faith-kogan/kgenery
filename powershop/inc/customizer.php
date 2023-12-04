<?php
/**
* Powershop theme customizer
* A lot of these functions are from the Bones Theme boilerplate.
*
* @author  Dillon Bailey
* @version 1
*/

if (! defined('ABSPATH') ) {
    exit;
}

if (! class_exists('PowershopCustomizer') ) {

    class PowershopCustomizer
    {
      function __construct()
      {
        add_action( 'customize_register', [$this, 'powershop_customize_register']);
        // add_action( 'customize_preview_init', [$this, 'powershop_customize_preview_js']);
      }

      /**
       * Add postMessage support for site title and description for the Theme Customizer.
       *
       * @param WP_Customize_Manager $wp_customize Theme Customizer object.
       */
      function powershop_customize_register( $wp_customize ) {
        // $wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
        // $wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
        // $wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

        // if ( isset( $wp_customize->selective_refresh ) ) {
        //   $wp_customize->selective_refresh->add_partial( 'blogname', array(
        //     'selector'        => '.site-title a',
        //     'render_callback' => 'powershop_customize_partial_blogname',
        //   ) );
        //   $wp_customize->selective_refresh->add_partial( 'blogdescription', array(
        //     'selector'        => '.site-description',
        //     'render_callback' => 'powershop_customize_partial_blogdescription',
        //   ) );
        // }

        //  =============================
        //  = Remove Default Sections   =
        //  =============================
        $wp_customize->remove_section('custom_css');
        $wp_customize->remove_section('title_tagline');

        //  =============================
        //  = Social Settings           =
        //  =============================
        $wp_customize->add_section('powershop_social', [
          'title'    => __('Social', 'powershop'),
          'description' => '',
          'priority' => 120,
        ]);

        $powershop_social = [
          'facebook',
          'twitter',
          'youtube',
          'linkedin',
          'instagram'
        ];

        foreach($powershop_social as $social) {
          $wp_customize->add_setting('powershop_'. $social. '_url', [
            'default'        => '',
            'capability'     => 'edit_theme_options',
          ]);

          $wp_customize->add_control('powershop_'. $social, [
            'label'      => __($social. ' URL', 'powershop'),
            'section'    => 'powershop_social',
            'settings'   => 'powershop_'. $social. '_url',
            'type'       => 'url'
          ]);
        }

        //  =============================
        //  = Company Settings          =
        //  =============================
        $wp_customize->add_section('powershop_company', [
          'title'    => __('Company', 'powershop'),
          'description' => '',
          'priority' => 110,
        ]);

        $wp_customize->add_setting('powershop_phone', [
          'default'        => '',
          'capability'     => 'edit_theme_options',
        ]);

        $wp_customize->add_control('powershop_phone', [
          'label'      => __('Phone', 'powershop'),
          'section'    => 'powershop_company',
          'settings'   => 'powershop_phone',
          'type'       => 'text'
        ]);
      }

      // /**
      //  * Render the site title for the selective refresh partial.
      //  *
      //  * @return void
      //  */
      // function powershop_customize_partial_blogname() {
      //   bloginfo( 'name' );
      // }

      // /**
      //  * Render the site tagline for the selective refresh partial.
      //  *
      //  * @return void
      //  */
      // function powershop_customize_partial_blogdescription() {
      //   bloginfo( 'description' );
      // }

      // /**
      //  * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
      //  */
      // function powershop_customize_preview_js() {
      //   wp_enqueue_script( 'powershop-customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
      // }

    }

    new PowershopCustomizer();
  }
?>