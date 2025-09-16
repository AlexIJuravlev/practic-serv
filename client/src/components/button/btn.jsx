import PropTypes from "prop-types";
import styled from "styled-components"

const BtnContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props} width={width}>
			{children}
		</button>
	);
};

export const Btn = styled(BtnContainer)`
	width: ${({ width = '100%' }) => width};
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	height: 32px;
	background-color: #eee;
	border: 1px solid black;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

Btn.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
