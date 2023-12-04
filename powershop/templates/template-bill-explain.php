<?php
/**
 *
 *  Template Name: Bill explainer
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header(); ?>
    <section class="o-wrapper">
      <div class="o-layout">
        <div class="o-layout__item">
          <?php get_template_part('shared/breadcrumbs') ?>
        </div>
      </div>
    </section>
    <section class="o-panel o-panel--no-bottom-spacing-custom o-panel--no-top-spacing">
      <article class="o-wrapper">
        <div class="o-layout">
          <div class="o-layout__item u-7/12@desktop s-cms-content u-spacing-bottom-zero">
            <?php if( get_field('page_title') ): ?>
            <h1 class="u-spacing-bottom-base u-font-h4"><?php the_field('page_title'); ?></h1>
            <p class="u-font-p1"><?php the_field('page_intro_text'); ?></p>
            <?php endif; ?>
          </div>
        </div>
      </article>
    </section>
    <section class="o-panel o-panel--no-top-spacing s-cms-content u-margin-bottom-zero">
      <article class="o-wrapper">
        <div class="o-layout">
          <div class="o-layout__item" data-module="Tabs">

            <div id="tabs-container" class="c-tabs u-spacing-bottom-large s-cms-content">
            <?php 
            if( have_rows('tabs') ): 
            // counter
            $count=0;
            while( have_rows('tabs') ): the_row();
            // vars
            $title = get_sub_field('section_title');
            $tab_title_one = get_sub_field('tab_title_one');
            $tab_title_two = get_sub_field('tab_title_two');
            ?>
              <div class="tab-container">
                <h4><?php echo $title; ?></h4>
                <ul class="c-tabs__navigation o-grid-layout o-grid-layout--columns-2-half-half-mobile">
                  <li><a class="c-tabs__navigation-link" href="#tab-1-<?php echo $count; ?>"><?php echo $tab_title_one; ?></a></li>
                  <li><a class="c-tabs__navigation-link" href="#tab-2-<?php echo $count; ?>"><?php echo $tab_title_two; ?></a></li>
                </ul>

                <div class="c-tabs__content">
                  <div id="tab-1-<?php echo $count; ?>" class="c-tabs__content-pane">
                    <?php
                    if( have_rows('tab_content_one') ):
                      while( have_rows('tab_content_one') ): the_row();
                      //vars
                      $image = get_sub_field('image');
                      $popup = get_sub_field('explainer_text');
                    ?>
                    <section>
                      <?php if( get_sub_field('explainer_text') ): ?>
                      <span class="c-tooltip">
                        <span class="c-tooltip__icon c-tooltip__popup" title="<?php echo $popup; ?>">?</span>
                      </span>
                      <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" title="<?php echo $popup; ?>" class="c-tooltip__popup" />
                      <?php else: ?>
                      <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" title="<?php echo $popup; ?>" />
                      <?php endif; ?>
                    </section>
                    <?php endwhile; ?>
                  </div>
                  <?php endif; ?>

                  <div id="tab-2-<?php echo $count; ?>" class="c-tabs__content-pane">
                    <?php
                    if( have_rows('tab_content_two') ):
                      while( have_rows('tab_content_two') ): the_row();
                      //vars
                      $image = get_sub_field('image');
                      $popup = get_sub_field('explainer_text');
                    ?>
                    <section>
                      <?php if( get_sub_field('explainer_text') ): ?>
                      <span class="c-tooltip">
                        <span class="c-tooltip__icon c-tooltip__popup" title="<?php echo $popup; ?>">?</span>
                      </span>
                      <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" title="<?php echo $popup; ?>" class="c-tooltip__popup" />
                      <?php else: ?>
                      <img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>" title="<?php echo $popup; ?>" />
                      <?php endif; ?>
                    </section>
                  
                  <?php endwhile; ?>

                  </div>
                  <?php endif; ?>
                </div>
              </div>
            
              <?php $count++; ?>
              <?php endwhile; ?>          
            <?php endif; ?>
            </div>
          </div>
        </div>
      </article>
    </section>
<?php get_footer(); ?>