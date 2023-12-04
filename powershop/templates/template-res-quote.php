<?php
/**
 *  The template for displaying the Residential Quote App.
 *
 *  Template Name: Residential Quote
 *
 * @link https://developer.wordpress.org/themes/template-files-section/page-template-files/
 *
 * @package powershop
 */

get_header(); ?>

<div class="o-wrapper o-wrapper--vertical-spacing">

  <!-- Container for calculator React app -->
  <div class="u-min-height" data-module="CalcApp">
    <?php get_template_part('shared/loading') ?>
  </div>

  <section class="o-layout  o-layout--center">

    <div class="o-layout__item  u-10/12@tablet">
      <div class="c-page-note" data-calc-upload-notice>
          <h2 class="c-page-note__title"><?php _e(get_field('uploading_notice_title'), 'powershop'); ?></h2>
          <?php _e(get_field('uploading_notice_content'), 'powershop'); ?>
        </div>
      </div>
    </div>

    <div class="o-layout__item">

      <div class="c-form c-form--bordered c-form--centered resi-form u-hidden-visually">
        <form data-module="FormResidentialQuote" class="jotform-form" action="https://submit.jotform.us/submit/80521171613143/" method="post" name="form_80521171613143" id="80521171613143" accept-charset="utf-8">
          <input type="hidden" name="formID" value="80521171613143" />
          <div class="form-all">
            <ul class="form-section page-section">
              <li class="form-line u-hidden-visually" data-type="control_textbox" id="id_7">
                <input type="text" id="input_7" name="q7_getA" data-type="input-textbox" class="form-textbox" size="20" value="" data-component="textbox">
              </li>
              <li id="cid_1" class="form-input-wide" data-type="control_head">
                <div class="form-header-group ">
                  <h4>Want to know more?</h4>
                  <h5>Leave your details with us.</h5>
                </div>
              </li>
              <li class="form-line" data-type="control_textbox" id="id_3">
                <label class="form-label form-label-top form-label-auto" id="label_3" for="input_3"> Name </label>
                <div id="cid_3" class="form-input-wide">
                  <input type="text" id="input_3" name="q3_name" data-type="input-textbox" class="form-textbox" size="20" value="" data-component="textbox" />
                </div>
              </li>
              <li class="form-line" data-type="control_textbox" id="id_4">
                <label class="form-label form-label-top form-label-auto" id="label_4" for="input_4"> Contact number </label>
                <div id="cid_4" class="form-input-wide">
                  <input type="text" id="input_4" name="q4_contactNumber" data-type="input-textbox" class="form-textbox" size="20" value="" data-component="textbox" />
                </div>
              </li>
              <li class="form-line" data-type="control_email" id="id_5">
                <label class="form-label form-label-top form-label-auto" id="label_5" for="input_5"> Email </label>
                <div id="cid_5" class="form-input-wide">
                  <input type="email" id="input_5" name="q5_email" class="form-textbox validate[Email]" size="30" value="" data-component="email" />
                </div>
              </li>
              <hr />
              <li class="form-line" data-type="control_radio" id="id_8">
                <label class="form-label form-label-top form-label-auto" id="label_8" for="input_8"> Preferred callback time (Monday to Friday) </label>
                <div id="cid_8" class="form-input-wide">
                  <div class="form-single-column" data-component="radio">
                    <span class="form-radio-item">
                      <input type="radio" class="form-radio" id="input_8_0" name="q8_preferredCallback8" value="8am – 10am" />
                      <label id="label_input_8_0" for="input_8_0"> 8am – 10am </label>
                    </span>
                    <span class="form-radio-item">
                      <input type="radio" class="form-radio" id="input_8_1" name="q8_preferredCallback8" value="10am – midday" />
                      <label id="label_input_8_1" for="input_8_1"> 10am – midday </label>
                    </span>
                    <span class="form-radio-item">
                      <input type="radio" class="form-radio" id="input_8_2" name="q8_preferredCallback8" value="Midday – 2pm" />
                      <label id="label_input_8_2" for="input_8_2"> Midday – 2pm </label>
                    </span>
                    <span class="form-radio-item">
                      <input type="radio" class="form-radio" id="input_8_3" name="q8_preferredCallback8" value="2pm – 4pm" />
                      <label id="label_input_8_3" for="input_8_3"> 2pm – 4pm </label>
                    </span>
                    <span class="form-radio-item">
                      <input type="radio" class="form-radio" id="input_8_4" name="q8_preferredCallback8" value="4pm – 6pm" />
                      <label id="label_input_8_4" for="input_8_4"> 4pm – 6pm </label>
                    </span>
                  </div>
                </div>
                </li>
                <hr />
                <li class="form-line jf-required" data-type="control_checkbox" id="id_6">
                  <div id="cid_6" class="form-input-wide jf-required">
                      <div class="form-single-column" data-component="checkbox">
                        <span class="form-checkbox-item">
                          <input type="checkbox" class="form-checkbox validate[required]" id="input_6_0" name="q6_iAgree[]" value="I agree" required="" />
                          <label id="label_input_6_0" for="input_6_0">*I agree to the&nbsp;<a href="/standard-form-terms/">terms and condidtions</a></label>
                        </span>
                      </div>
                  </div>
                </li>
                <li class="form-line" data-type="control_button" id="id_2">
                  <div id="cid_2" class="form-input-wide">
                      <div class="form-buttons-wrapper"> <button id="input_2" type="submit" class="form-submit-button" data-component="button"> Send </button> </div>
                  </div>
                </li>
                <li style="display:none"> Should be Empty: <input type="text" name="website" value="" /> </li>
            </ul>
          </div>
        </form>
      </div> <!-- form container -->
    </div><!-- o-layout__item -->

  </section><!-- o-layout -->

</div><!-- o-wrapper -->

<?php get_footer(); ?>