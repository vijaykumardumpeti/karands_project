import React from "react";
import Modal from "react-modal";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const spinnerStyle = css`
  display: block;
  margin: 0 auto;
  border-color: red; // Customize the color if needed
`;

const LoaderModal = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      style={{
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "none",
          borderRadius: "4px",
          padding: "20px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    >
      <RingLoader color="#83a4d4" css={spinnerStyle} size={80} />
    </Modal>
  );
};

export default LoaderModal;
