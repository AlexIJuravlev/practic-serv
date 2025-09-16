import styled from "styled-components";
import PropTypes from "prop-types";


const H2Constainer = ({children, className}) => (
	<h2 className={className}>{children}</h2>
);

export const H2 = styled(H2Constainer)`
	margin: 40px 0;
`;

H2.propTypes = {
	children: PropTypes.node.isRequired
};
