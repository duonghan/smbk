import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export default styled.p`
  font-size: 2em;
  text-align: center;
  color: white;
  position: absolute;
  animation: 2s ${fadeIn} ease-out;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
