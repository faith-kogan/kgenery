import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ButtonIcon from './ButtonIcon'
import FormattedThemeButtonText from './FormattedThemeButtonText'

/**
 * A class to render the branded button element
 */
export default class BrandedButton extends Component {
  static propTypes = {
    /** The icon to render within the button */
    icon: PropTypes.string,
    /** The string label used in the button */
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /** The text alignment for the elements within the button */
    textAlign: PropTypes.string,
    /** Whether the button should be rendered as full width or not */
    fullWidth: PropTypes.bool,
    /** Whether the button should be rendered small or not */
    small: PropTypes.bool,
    /** Whether the button should be rendered medium (12px) or not */
    medium: PropTypes.bool,
    /** Optimise button size for icons only */
    iconOnly: PropTypes.bool,
    /** Any extra class names to be added to the button element */
    className: PropTypes.string,
    /** Whether the button should be disabled or not */
    disabled: PropTypes.bool,
    /** The callback function to be executed on the click event */
    onClick: PropTypes.func,
    /** The type attribute of the button element */
    type: PropTypes.string,
    /** The children elements to be rendered within the button element */
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    /** Whether the button should be rendered as an anchor element or a button element */
    isAnchor: PropTypes.bool,
    /** Whether this is a primary UI style button or not */
    primary: PropTypes.bool,
    /** Whether this is a non-primary, non-accent button */
    black: PropTypes.bool,
    /** Add shadows or nahhh ? */
    noShadow: PropTypes.bool,
    url: PropTypes.string,
    getButtonRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isSecondary: PropTypes.bool,
  }

  static contextTypes = {
    storeCode: PropTypes.string,
    theme: PropTypes.string,
  }

  static defaultProps = {
    type: 'button',
    primary: true,
    isAnchor: false,
    black: false,
    noShadow: false,
    /** The icon to render within the button */
    icon: '',
    /** The string label used in the button */
    label: '',
    textAlign: 'left',
    fullWidth: true,
    small: false,
    medium: false,
    iconOnly: false,
    className: '',
    disabled: false,
    onClick: (f) => f,
    children: undefined,
    url: '',
    isSecondary: false,
    getButtonRef: (f) => f,
  }

  constructor(props) {
    super(props)
    this.renderButtonCore = this.renderButtonCore.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.state = {
      notouch: true,
    }
  }

  handleTouchStart() {
    this.setState({ notouch: false })
  }

  renderButtonCore(label, icon) {
    if (this.props.children) {
      return this.props.children
    }

    const buttonIcon = <ButtonIcon key="icon2" icon={icon} isSecondary={this.props.isSecondary} />
    const buttonLabel = (
      <span key="label" className="buttonText">
        <FormattedThemeButtonText text={label} />
      </span>
    )

    if (this.context.theme === 'dse') {
      return [buttonIcon, buttonLabel]
    }
    return [buttonLabel, buttonIcon]
  }

  render() {
    const {
      icon,
      label,
      onClick,
      className,
      disabled,
      small,
      medium,
      iconOnly,
      fullWidth,
      textAlign,
      type,
      isAnchor,
      url,
      primary,
      black,
      noShadow,
      isSecondary,
      getButtonRef,
      ...otherProps
    } = this.props

    let customClassName
    if (isSecondary) {
      customClassName = 'secondary'
    } else if (primary) {
      customClassName = 'brand'
    } else {
      customClassName = black ? 'black' : 'accent'
    }
    const shadowClassName = noShadow ? styles.noShadow : null

    const finalClassNames = `button ${customClassName} ${textAlign} ${shadowClassName} ${fullWidth} ${small} ${medium} ${iconOnly} ${(this.state.notouch) ? "notouch": ""} ${className}`

    const baseProps = {
      className: finalClassNames,
      onClick,
      onTouchStart: this.handleTouchStart,
    }
    if (disabled) baseProps.disabled = disabled

    if (isAnchor) {
      return (
        <a ref={getButtonRef} {...baseProps} href={url} {...otherProps}>
          {this.renderButtonCore(label, icon)}
        </a>
      )
    }

    return (
        <div className='c-branded-btn'>
            <button ref={getButtonRef} {...baseProps} type={type} {...otherProps}>
            {this.renderButtonCore(label, icon)}
            </button>
        </div>
    )
  }
}
