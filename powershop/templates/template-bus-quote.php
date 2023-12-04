<?php
/**
 *  The template for displaying the business quote template.
 *
 *  Template Name: Business Quote
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header(); ?>

  <div class="o-wrapper  o-wrapper--vertical-spacing">

    <section class="o-layout  o-layout--center">

      <div class="o-layout__item  u-1/1">

        <header class="c-section-heading">
          <h1 class="c-section-heading__title  u-font-h2  u-pink"><?php the_title(); ?></h1>
        </header>

        <article class="c-split-callout">
          <header class="u-bg-pink-to-purple">
            <svg viewBox="0 0 1 1"><use xlink:href="<?php echo PowershopUtilities::get_rev_asset_uri('images/icons.svg') ?>#phone-thin"></use></svg>
            <h2 class="u-font-h4"><a class="u-white" href="javascript:void(0);"><?php _e(get_field('bus_quote_phone'), 'poweshop') ?></a></h2>
          </header>
          <footer>
            <h3 class="u-font-h5">We’ve got you covered</h3>
            <h4 class="u-font-p1-semibold  u-margin-bottom-zero">Call us and we will</h4>
            <ul class="c-list  c-list--unordered">
              <li>Contact your existing supplier</li>
              <li>Switch you to Powershop with no interruption to your power</li>
              <li>Keep you fully updated via email about your switch.</li>
            </ul>
          </footer>
        </article>

        <p class="c-rounded-title"><span>or</span></p>

      </div><!-- o-layout__item -->

      <div class="o-layout__item  u-8/12@tablet  u-6/12@wide">
        <?php if (get_field('bus_quote_form_id')) : ?>
          <div class="c-form  c-form--bordered">
            <!--[if lte IE 8]>
            <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
            <![endif]-->
            <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
            <script>
              hbspt.forms.create({
                portalId: "2203217",
                formId: "<?php echo get_field('bus_quote_form_id') ?>",
                css: ""
              });
            </script>
          </div>
        <?php endif; ?>
      </div><!-- o-layout__item -->

    </section><!-- o-layout -->

</div><!-- o-wrapper -->


<?php get_footer(); ?>