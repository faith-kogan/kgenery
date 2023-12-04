/**
 * Search
 *
 * Handle search submit by appending post or page filter if currently applied
 *
 * Usage:
  <form class="c-search-form" action="<?php echo home_url(); ?>" method="get" data-module="Search">
    ...
      <input
        type="text"
        data-search-input
      />
    ...
  </form>
 */

// Regex tests for URL
// const post = /post_type=post/;
// const page = /post_type=page/;

// export default class Search {
//   constructor(el) {
//     this.el = el;
//     this.searchInput = el.querySelector("[data-search-input]");
//     this.location = window.location.href;

//     this.el.addEventListener("submit", e => this.handleSubmit(e));
//   }

//   handleSubmit(e) {
//     e.preventDefault();

//     if (this.location) {
//       if (post.test(this.location)) {
//         this.searchInput.value = `${this.searchInput.value}&post_type=post`;
//       } else if (page.test(this.location)) {
//         this.searchInput.value = `${this.searchInput.value}&post_type=page`;
//       }
//     }

//     this.el.submit();
//   }
// }
