<?php
/**
 * The template for displaying the footer on the content-campign.php template
 *
 * Contains the closing of the </main> and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */

?>
    
    <?php if( get_field('campaign_footer', 'option') ): ?>
    <section class="o-wrapper">
      <div class="o-layout">
        <div class="o-layout__item u-spacing-bottom-large">
            <section>
              <?php the_field('campaign_footer', 'option'); ?>
            </section>
        </div>
      </div>
    </section>
    <?php endif; ?>

    <?php
      //  Global CTA Block - uses ACF info for the page/post
      get_template_part('shared/cta');
    ?>
  </main><!-- /main -->

  <footer class="c-footer  c-footer--flush">
    <?php get_template_part('shared/footer-site-info') ?>
  </footer>

<?php wp_footer(); ?>

</body>
</html>
