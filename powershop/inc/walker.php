<?php
/**
* Class for all the action hooks.
* A lot of these functions are from the Bones Theme boilerplate.
*
* @author Xavian Ang
* @version 1
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'PowershopWalker' ) ) {

class PowershopWalker extends Walker_Nav_Menu {
  // LEVELS are only used on sub-nav
  function start_lvl( &$output, $depth = 0, $args = [] ) {
    $output .= '<ul>';
	}

	function end_lvl( &$output, $depth = 0, $args = [] ) {
    $output .= "</ul>";
	}

	function start_el( &$output, $item, $depth = 0, $args = [], $id = 0 ) {
    $class_names = ''; $value = '';

    $attributes  = ! empty( $item->attr_title ) ? ' title="'  . esc_attr( $item->attr_title ) .'"' : '';
    $attributes .= ! empty( $item->target )     ? ' target="' . esc_attr( $item->target     ) .'"' : '';
    $attributes .= ! empty( $item->xfn )        ? ' rel="'    . esc_attr( $item->xfn        ) .'"' : '';
    $attributes .= ! empty( $item->url )        ? ' href="'   . esc_attr( $item->url        ) .'"' : '';


    if ($depth === 0) {
      $item_output = $args->before;

      $classes = empty( $item->classes ) ? [] : (array) $item->classes;
      $classes[] = 'menu-item-' . $item->ID;
      $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );

      $class_names = $class_names.' c-nav__item';

      // check if has sub-menu
      if( in_array('menu-item-has-children', $item->classes) ){
        $class_names = $class_names.'  c-nav__item--has-children';
        $accordion = 'data-nav-accordion';
      }

      $class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

      $item_output .= '<li'.$class_names . $accordion.'>';
      $item_output .= '<a'. $attributes . 'data-nav-accordion-toggle>';
      $item_output .= apply_filters( 'the_title', $item->title, $item->ID );
      $item_output .= '<span class="c-nav__icon"><svg viewBox="0 0 1 1"><use xlink:href="'. PowershopUtilities::get_rev_asset_uri('images/icons.svg') .'#chevron-down"></use></svg></span>';
      $item_output .= '</a>';
      $item_output .= $args->after;

      $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );

    } elseif ($depth === 1) {
      // RUN ON SUBNAV ITEM

      // add class names to subnav
      $classes = empty( $item->classes ) ? [] : (array) $item->classes;
      $classes[] = 'menu-item-' . $item->ID;
      $class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args ) );

      $class_names = $class_names.' c-nav__item';

      // check if is current page item
      if( in_array('current-menu-item', $item->classes) ){
        $class_names = $class_names.' c-nav__item--current-menu-item';
      }

      $item_output = $args->before;

      $item_output .= '<li class="'.$class_names . '">';
      $item_output .= '<a' . $attributes . '>';
      $item_output .= apply_filters( 'the_title', $item->title, $item->ID );
      $item_output .= '</a>';

      $item_output .= $args->after;

      $output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );

    }
	}

	function end_el( &$output, $item, $depth = 0, $args = [] ) {
		$output .= "</li>";
	}

}

}

?>
