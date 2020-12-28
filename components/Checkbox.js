
import styled from 'styled-components'
// import * as colors from '../../styles/colors'

//https://medium.com/@colebemis/building-a-checkbox-component-with-react-and-styled-components-8d3aa1d826dd

const CheckboxContainer = styled.div`
  display: flex;
  color: ${props => props.checked ? 'white' : 'black'};
  background: ${props => props.checked ? 'indigo' : 'white'};
  border: solid 1px grey;
  padding: 2px 5px;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 10px;
  font-weight:600;
  line-height: 1.7;
  margin: 5px 5px;

`

// Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const Checkbox = ({ checked, tag, ...props }) => (
   <CheckboxContainer checked={checked}>
      <HiddenCheckbox checked={checked} {...props} />
      <span onClick={props.onChange} id={tag}>{tag}</span>
   </CheckboxContainer>
)


