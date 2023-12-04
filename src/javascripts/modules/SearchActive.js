/**
 * Search Active Class
 *
 * Toggles an 'is-active' class on the a element based on URL.
 *
 * Usage:
 * <ul data-module="SearchActive">
 *   <li><a data-search-all href="<?php echo home_url(); ?>/?s=<?php echo $search_query; ?>">All</a></li>
 *   <li><a data-search-pages href="<?php echo home_url(); ?>/?s=<?php echo $search_query; ?>&amp;post_type=page">Pages</a></li>
 *   <li><a data-search-posts href="<?php echo home_url(); ?>/?s=<?php echo $search_query; ?>&amp;post_type=post">Blog posts</a></li>
 * </ul>
 */

// Regex tests for URL
const post = /ps_post_type=post/;
const page = /ps_post_type=page/;
const activeClass = "is-active";

export default class SearchActive {
  constructor(el) {
    this.el = el;
    this.location = window.location.href;
    this.all = el.querySelector("[data-search-all]");
    this.pages = el.querySelector("[data-search-pages]");
    this.posts = el.querySelector("[data-search-posts]");

    this.init();
  }

  init() {
    if (this.location) {
      if (post.test(this.location)) {
        this.posts.classList.add(activeClass);
      } else if (page.test(this.location)) {
        this.pages.classList.add(activeClass);
      } else {
        this.all.classList.add(activeClass);
      }
    }
  }
}
