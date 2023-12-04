import PropTypes from 'prop-types'
import React from 'react'
import BrowserDetection from 'react-browser-detection'

/* Internet Explorer 6-11 */
const isIE = false || !!document.documentMode
/* Edge 20+ */
const isEdge = !isIE && !!window.StyleMedia
const TABLET_BREAKPOINT = 640

const BrandedButton = ({
  iconName,
  labelText,
  onSubmit,
  onClick,
  loading,
  disabled,
  fitContent,
}) => {
  // Explicitly add icons classNames from scss/icons.scss
  const iconTypes = {
    arrowUp: 'kgn-icon-pencil',
    arrowDown: 'kgn-icon-pencil',
    creditCard: 'kgn-icon-credit-card',
    retry: 'kgn-icon-spinner',
    kgnArrowRight: 'kgn-icon-arrow-right',
  }

  const iconElement = iconName
    ? <i className={`kgnIcon ${iconTypes[iconName]}`} />
    : ''
  /* Loading Icon Removed */
  const activeIcon = loading
    ? <div className="kogan-loading-icon"></div>
    : iconElement

  /* This stuff is only used in IE and EDGE as clip path doesnt work,
   * Didn't want to render this for other browsers so just remove this when/if it is finally suported
   */
  const ieEdgeClass = isEdge ? 'edgeFix' : ''
  const ieFixClass = isIE || isEdge ? `${ieEdgeClass} ieFix` : ''

  const isLoadingClass = loading ? 'kogan-button-loading' : ''

  const svgAngleElement = (
    <svg className={"svgStyleBlock"}>
      <rect className="svgClipped" width="100%" height="80" />
      <defs>
        <clipPath id="anglePath" clipPathUnits="objectBoundingBox">
          <polygon points="0 1, 0 0, 1 0, 0.8 1" />
        </clipPath>
      </defs>
    </svg>
  )

  const ieEdgeClipPathPolyfill = {
    ie: () => svgAngleElement,
    edge: () => svgAngleElement,
    default: () => null,
  }

  // Approx. width required for each character + width for arrow element
  const charWidth = 13
  const arrowWidth = 60
  const styleOverrides = fitContent && window.innerWidth > TABLET_BREAKPOINT ? {
    width: `${(charWidth * labelText.length) + arrowWidth}px`,
  } : {}

  return (
    <button
      className={`kogan-button ${ieFixClass} ${isLoadingClass}`}
      style={styleOverrides}
      data-text-before={labelText}
      onSubmit={onSubmit}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {labelText}
      {activeIcon}
      <BrowserDetection>
        { ieEdgeClipPathPolyfill }
      </BrowserDetection>
    </button>
  )
}

BrandedButton.defaultProps = {
  iconName: 'kgnArrowRight',
  labelText: 'Branded Button',
  onSubmit: f => f,
  onClick: undefined,
  loading: false,
  disabled: false,
  fitContent: false,
}

BrandedButton.propTypes = {
  iconName: PropTypes.string,
  labelText: PropTypes.string,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  fitContent: PropTypes.bool,
}

export default BrandedButton
