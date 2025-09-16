import styled from 'styled-components';
import { Btn } from '../../../../components';
import PropTypes from 'prop-types';


const PaginationContainer = ({ className, setPage, lastPage, page }) => {
	return (
		<div className={className}>
			<Btn disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Btn>
			<Btn disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Btn>
			<div className='current-page'>Страница: {page}</div>
			<Btn disabled={page === lastPage} onClick={() => setPage(page + 1)}>
				Следующая
			</Btn>
			<Btn disabled={page === lastPage} onClick={() => setPage(lastPage)}>
				Конец
			</Btn>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	margin: 0 0 20px;
	padding: 0 35px;

	button {
		margin: 0 5px;
	}

	.current-page {
		border: 1px solid black;
		width: 100%;
		text-align: center;
		font-size: 18px;
		font-weight: 500;
		line-height: 26px;
	}
`;

Pagination.propTypes = {
	setPage: PropTypes.func.isRequired,
	lastPage: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
};
