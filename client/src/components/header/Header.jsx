import styled from 'styled-components';
import { Logo, ControlPanel } from './components';

const Discription = styled.div`
	font-style: italic;
	font-size: 18px;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Discription>
			Веб-технологии
			<br />
			Разбор ошибок
			<br />
			Проекты новичка
		</Discription>
		<ControlPanel/>
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	background-color: white;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px -2px 16px #000;
	z-index: 1000;
`;
