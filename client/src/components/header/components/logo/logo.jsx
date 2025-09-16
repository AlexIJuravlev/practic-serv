import styled from "styled-components";
import { Icon } from "../../../icon/icon";
import { Link } from "react-router";

const LargeText = styled.div`
	font-size: 40px;
	font-weight: 600;
	line-height: 1;
	margin-top: 17px;
`
const SmallText = styled.div`
	font-size: 20px;
	font-weight: bold;
`

const LogoContainer = ({ className }) => (
	<Link className={className} to='/'>
		<Icon size='70px' margin='0 10px 0 0' id='fa-space-shuttle' />

		<div>
			<LargeText>Блог</LargeText>
			<SmallText>Путь ученика IT</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -16px;
`
