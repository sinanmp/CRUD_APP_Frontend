import React from 'react';
import { css } from '@emotion/react';
import { HashLoader } from 'react-spinners'; // Using MoonLoader for a different style

const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LoadingSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
      <HashLoader color="#ffffff" css={override} size={60} /> {/* Using MoonLoader */}
    </div>
  );
};

export default LoadingSpinner;
