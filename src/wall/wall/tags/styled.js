import styled from 'styled-components'

export const container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-left: auto;
  align-items: center;
  z-index: 1;
  padding-left: 5px;
`
export const searchInput = styled.div`
  display: flex;
  z-index: 2;
  margin: 0;
  border-radius: 25px;
  padding: 0;
  transition: 0.2s ease;
  border: 2px solid lightgray;
  background-color: white;
  padding: 3px 10px;
  ${input}:focus & {
    border: 2px solid black;
  }
`

export const input = styled.input.attrs({
  type: 'text',
})`
  border: none;
  padding: 5px 4px;
  outline: none;
  font-size: 13px;
  font-weight: 500;
`

export const searchResult = styled.div`
  display: ${props => props.display};
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
  padding-top: 30px;
  left: 0;
  width: 90%;
  left: 12px;
  top: 15px;
  overflow: hidden;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`

export const searchItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  font-weight: 600;
  font-size: 14px;
  padding: 0px 20px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.09);
  }
`
