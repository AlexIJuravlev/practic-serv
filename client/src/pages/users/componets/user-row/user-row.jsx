import styled from 'styled-components';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../../constants';
import { request } from '../../../../utils';

const UserRowContainer = ({
	className,
	login,
	id,
	registeredAt,
	roleId: userRoleId,
	roles,
	onUserRemove,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChenge = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const isSaveBtnDis = selectedRoleId === initialRoleId;

	const onRoleSave = (userId, newUserRoleId) => {
		request(`/api/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};


	return (
		<div className={className}>
			<TableRow border={true}>
				<div className='login-columm'>{login}</div>
				<div className='reg-columm'>{registeredAt}</div>
				<div className='role-column'>
					<select value={selectedRoleId} onChange={onRoleChenge}>
						{roles.map(({ id: roleId, name: roleName }) => {
							return (
								<option key={roleId} value={roleId}>
									{roleName}
								</option>
							);
						})}
					</select>
					<Icon
						id='fa-floppy-o'
						margin='0 0 0 10px'
						disabled={isSaveBtnDis}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon id='fa-trash' margin='0 0 0 10px' onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	select {
		font-size: 18px;
		padding: 5px;
		border-top: 0;
		border-bottom: 0;
	}
`;

UserRow.propTypes = {
	login: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
