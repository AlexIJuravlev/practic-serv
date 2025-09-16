import styled from 'styled-components';
import { openModal, CLOSE_MODAL, removePostAsync } from '../../../../action';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import PropTypes from 'prop-types';




const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole)

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync( id));
					dispatch(CLOSE_MODAL);
					navigate('/');
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className='published-at'>
				{publishedAt && <Icon id='fa-calendar-o' margin='0 10px 0 10px' />}
				{publishedAt}
			</div>
{			isAdmin && <div className='btn-panel'>
				{editButton}
				{publishedAt && (
					<Icon
						id='fa-trash'
						margin='0 10px 0 10px'
						size='24px'
						onClick={() => onPostRemove(id)}
					/>
				)}
			</div>}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	.published-at {
		display: flex;
		font-size: 21px;
	}

	.btn-panel {
		display: flex;
		margin-bottom: 10px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
