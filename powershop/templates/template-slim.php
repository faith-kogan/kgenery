<?php
/**
 *  The template for displaying pages without a Header, Footer or Breadcrumbs.
 *
 *  Template Name: No Header/Footer - Full Width
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header('slim'); ?>

    <article>
      <section class="o-wrapper">
        <div class="o-layout">
          <div class="o-layout__item">
            <header class="c-article-intro">
              <h1 class="u-font-h2  c-article-intro__title"><?php the_title(); ?></h1>
            </header>
            <?php if (get_field('intro_content')) : ?>
              <section class="s-cms-content">
                <?php echo get_field('intro_content'); ?>
              </section>
            <?php endif; ?>
          </div>
        </div>
      </section><!-- o-wrapper -->

      <?php if (has_post_thumbnail()) : ?>
        <img src="<?php the_post_thumbnail_url('large'); ?>" alt="<?php the_title_attribute(); ?>" class="c-offset-image   c-offset-image--inline">
      <?php endif; ?>

      <section class="o-wrapper">
        <div class="o-layout">
          <div class="o-layout__item">
            <section class="u-spacing-bottom-large  s-cms-content">
              <?php the_content(); ?>
            </section>
          </div>
        </div>
      </section><!-- o-wrapper -->
    </article>



    <?php
      //  Global CTA Block - uses ACF info for the page/post
      get_template_part('shared/cta');
    ?>
  </main><!-- /main -->

  <?php wp_footer(); ?>

</body>
</html>