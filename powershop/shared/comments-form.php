<?php
/**
 * The comments form for blog posts
 *
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package powershop
 */
?>
<div id="comments" class="comments-area">
 
    <?php if ( have_comments() ) : ?>
        <h5 class="comments-title">
            <?php
                printf( _nx( 'One comment on "%2$s"', '%1$s comments on "%2$s"', get_comments_number(), 'comments title', 'twentythirteen' ),
                    number_format_i18n( get_comments_number() ), '<span>' . get_the_title() . '</span>' );
            ?>
        </h5>

        <?php

            function format_comment($comment, $args, $depth) {
            
               $GLOBALS['comment'] = $comment; ?>
               
                <li <?php comment_class(); ?> id="li-comment-<?php comment_ID() ?>">
                        
                    <div class="comment-intro">
                        <?php printf(__('<strong>%s</strong>, '), get_comment_author_link()) ?>
                        <?php printf(__('%1$s:'), get_comment_date(), get_comment_time()) ?>
                    </div>
                    
                    <?php if ($comment->comment_approved == '0') : ?>
                        <em><php _e('Your comment is awaiting moderation.') ?></em><br />
                    <?php endif; ?>
                    
                    <?php comment_text(); ?>
        <?php } ?>

        <ol class="comment-list">
          <?php wp_list_comments('type=comment&callback=format_comment'); ?>
        </ol>
 
        <?php
            // Are there comments to navigate through?
            if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) :
        ?>
        <nav class="navigation comment-navigation" role="navigation">
            <h1 class="screen-reader-text section-heading"><?php _e( 'Comment navigation', 'twentythirteen' ); ?></h1>
            <div class="nav-previous"><?php previous_comments_link( __( '&larr; Older Comments', 'twentythirteen' ) ); ?></div>
            <div class="nav-next"><?php next_comments_link( __( 'Newer Comments &rarr;', 'twentythirteen' ) ); ?></div>
        </nav><!-- .comment-navigation -->
        <?php endif; // Check for comment navigation ?>
 
        <?php if ( ! comments_open() && get_comments_number() ) : ?>
        <p class="no-comments"><?php _e( 'Comments are closed.' , 'twentythirteen' ); ?></p>
        <?php endif; ?>
 
    <?php endif; // have_comments() ?>
 
</div><!-- #comments -->
<?php

add_filter( 'comment_form_defaults', 'custom_reply_title' );
function custom_reply_title( $defaults ){
  $defaults['title_reply_before'] = '<h4>';
  $defaults['title_reply_after'] = '</h4>';
  $defaults['comment_notes_before'] = '<p>Your email address will not be published.<br /> Required fields are marked with <strong>*</strong></p>';
  return $defaults;
}

$commenter = wp_get_current_commenter();
$req = get_option( 'require_name_email' );
$aria_req = ( $req ? " aria-required='true'" : '' );
$fields =  array(
    'author' => '<p class="comment-form-author">' . '<label for="author">' . __( 'Name' ) . ( $req ? '<span class="required">*</span>' : '' ) . '</label> ' . 
        '<input id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30" required="required"'  . ' /></p>',
    'email'  => '<p class="comment-form-email"><label for="email">' . __( 'Email' ) . ( $req ? '<span class="required">*</span>' : '' ) . '</label> ' .
        '<input id="email" name="email" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) . '" size="30" required="required"' . ' /></p>',
);

$comments_args = array(
    'fields' =>  $fields,
    'title_reply'=>'Join the discussion',
);
 
comment_form($comments_args);
 ?>