import React from "react";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

const styleObj = {
  height: "80vh",
};

const Page = ({ children }) => {
  return (
    <Container maxWidth={false} style={styleObj}>
      {children}
    </Container>
  );
};

// Page.propTypes = {
//   children: PropTypes.element.isRequired,
// };

export default Page;
