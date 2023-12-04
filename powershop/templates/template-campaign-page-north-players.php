<?php
/**
 *  The template for displaying campaign pages that appear as standard content pages.
 *
 *  Template Name: Campaign page - North AFLW
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header('campaign');
?>

<section class="o-wrapper">
    <div class="o-layout">
      <div class="o-layout__item">
        <div class="c-breadcrumbs"></div>
      </div>
    </div>
</section>
<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item u-7/12@desktop s-cms-content u-spacing-bottom-zero">
        <section>
          <h1 class="u-spacing-bottom-large"><?php the_title(); ?></h1>
        </section>
    </div>
  </div>
</section>
<section class="o-wrapper">
  <div class="o-layout">
    <div class="o-layout__item s-cms-content u-spacing-bottom-zero c-custom-north-players">
        <section>
          <?php the_content(); ?>
        </section>
    </div>
  </div>
</section>

<?php
get_footer('campaign');