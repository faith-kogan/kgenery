import React, { useContext } from 'react'

const properNames = [
    "PayPal",
    "Kogan",
    "Google",
    "CSV",
    "Citi",
    "OpyPro",
    "FIRST",
]

export function ucfirst(content, except = []) {
    if (!isString(content)) {
      return content
    }
    let cased = content.charAt(0).toUpperCase() + content.slice(1).toLowerCase()
    except.forEach((v) => {
      cased = cased.replace(new RegExp(v.toLowerCase(), 'g'), v)
    })
    return cased
}
  
const FormattedThemeButtonText = ({ text }) => {

  let formattedText =
    text && text.indexOf(' / ') >= 0
      ? text
          .split(' / ')
          .map((token) => ucfirst(token, properNames))
          .join(' / ') // Handle texts with split phrases (i.e. Sign Up / Sign In)
      : ucfirst(text, properNames)
  return <div>{formattedText}</div>
}

export default FormattedThemeButtonText
