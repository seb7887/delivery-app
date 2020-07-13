import React from 'react'
import styled from 'styled-components/native'

interface Props {
  color?: string
  title?: boolean
  large?: boolean
  medium?: boolean
  small?: boolean
  light?: boolean
  bold?: boolean
  heavy?: boolean
  center?: boolean
  right?: boolean
  selected?: boolean
  uppercase?: boolean
}

const TextStyle: React.FunctionComponent<Props> = (props) => (
  <Text {...props}>{props.children}</Text>
)

const Text = styled.Text<Props>`
  color: ${(props) => props.color ?? '#343434'}
    ${(props) => props.uppercase && 'text-transform: uppercase'}
    ${({ title, large, medium, small }) => {
      switch (true) {
        case title:
          return `font-size: 32px`
        case large:
          return `font-size: 24px`
        case medium:
          return `font-size: 18px`
        case small:
          return `font-size: 14px`
        default:
          return `font-size: 16px`
      }
    }}
    ${({ light, bold, heavy }) => {
      switch (true) {
        case light:
          return `font-weight: 200`
        case bold:
          return `font-weight: 600`
        case heavy:
          return `font-weight: 700`
        default:
          return `font-weight: 400`
      }
    }}
    ${({ center, right }) => {
      switch (true) {
        case center:
          return `text-align: center`
        case right:
          return `text-align: right`
        default:
          return `text-align: left`
      }
    }};
`

export default TextStyle
