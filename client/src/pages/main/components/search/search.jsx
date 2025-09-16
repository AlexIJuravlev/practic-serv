import styled from "styled-components"
import { Input, Icon } from "../../../../components"
import PropTypes from 'prop-types';


const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} placeholder='Поиск...' onChange={onChange} />
			<Icon id='fa-search' margin='7px 10px 0 10px' />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;
	position: relative;

	div {
		position: absolute;
		right: 5px;
	}

	input {
		padding: 10px 40px 10px 10px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
