import React from 'react'
import FormattedThemeButtonText from './FormattedThemeButtonText'

const ButtonLabel = ({ text, className, useFormatter }) => {
    if (!useFormatter) {
      return <span className={`buttonText ${className}`}>{text}</span>
    }
    return (
      <span className={`buttonText ${className}`}>
        <FormattedThemeButtonText text={text} />
      </span>
    )
}

export default ButtonLabel
