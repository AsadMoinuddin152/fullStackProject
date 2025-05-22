import React from "react";
import { Button } from "@mui/material";
import { styled } from "styled-components";

const StyledButton = styled(Button)`
  position: relative;
  overflow: hidden;
  color: #fff;
  z-index: 1;
  min-width: 120px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => `${progress}%`};
    background: linear-gradient(90deg, #2196f3, #21cbf3);
    z-index: 0;
    transition: width 0.3s ease-in-out;
    border-radius: 4px;
  }

  span {
    position: relative;
    z-index: 1;
    font-weight: 600;
    color: #fff !important;
  }
`;

const ProgressButton = ({
  progress = 0,
  children,
  onClick,
  type = "button",
  disabled = false,
  ...props
}) => {
  return (
    <StyledButton
      progress={progress}
      onClick={onClick}
      type={type}
      disabled={disabled}
      variant="contained"
      {...props}
    >
      {progress > 0 ? <span>{progress}%</span> : children}
    </StyledButton>
  );
};

export default ProgressButton;
