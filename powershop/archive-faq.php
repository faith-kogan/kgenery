<?php
/**
 * The template for displaying FAQ help center landing page
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package powershop
 */

get_header();
?>

<?php get_template_part( 'shared/help-centre-intro' ); ?>
<?php get_template_part( 'shared/help-categories' ); ?>
<?php get_template_part( 'shared/help-centre-common-questions' ); ?>
<?php get_template_part('shared/help-footer'); ?>


<?php
get_footer();
