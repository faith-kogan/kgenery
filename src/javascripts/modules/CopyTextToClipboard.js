export default class CopyOnClickElement {
  constructor(el) {
    this.el = el

    this.init();
  }
  init() {

    const copyText = document.querySelectorAll('.c-copy-on-click');

    copyText.forEach(promo => {
      promo.addEventListener('click', () => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(promo);
        selection.removeAllRanges();
        selection.addRange(range);

        try {
          document.execCommand('copy');
          selection.removeAllRanges();

          const original = promo.textContent;
          promo.textContent = 'Copied!';

          setTimeout(() => {
            promo.textContent = original;
          }, 1200);
        } catch(e) {
          //const errorMsg = document.querySelector('.error-msg');

          setTimeout(() => {
          }, 1200);
        }
      });
    });
  }
}