import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Icon } from '../../../icon/icon';
import { Btn } from '../../../button/btn';
import { Link, useNavigate } from 'react-router';
import { ROLE } from '../../../../constants';
import {
	selectUserRole,
	selectUserLogin,
} from '../../../../selectors';
import { logout } from '../../../../action';
import { useDispatch } from 'react-redux';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
align-items: center;
	display: flex;
	justify-content: flex-end;
`;



const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
	text-transform: uppercase;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch()

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/')
	}


	const isAdmin = checkAccess([ROLE.ADMIN], roleId)

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Btn>
						<Link to='/login'>Войти</Link>
					</Btn>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon id='fa-sign-out' margin='0px 0 0 10px' onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon onClick={() => navigate(-1)} id='fa-backward' margin='20px 0 0 0' />
				{isAdmin && (
					<>
						<Link to='/post'>
							<Icon
								id='fa-pencil'
								margin='20px 0 0 16px'
								onClick={() => {}}
							/>
						</Link>
						<Link to='/users'>
							<Icon
								id='fa-users'
								margin='20px 0 0 16px'
								onClick={() => {}}
							/>
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`

`;
