/* eslint-disable react-hooks/rules-of-hooks */
import styled from 'styled-components';
import { Btn } from '../button/btn';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnConfirn,
	selectModalOnCancel,
	selectModalText,
} from '../../selectors';

const modalContainer = ({ className }) => {
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirn);
	const onCancel = useSelector(selectModalOnCancel);
	const isOpen = useSelector(selectModalIsOpen);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className={className}>
				<div className='overlay'></div>
				<div className='box'>
					<h3>{text}</h3>
					<div className='buttons'>
						<Btn width='120px' onClick={onConfirm}>
							Да
						</Btn>
						<Btn width='120px' onClick={onCancel}>
							Отмена
						</Btn>
					</div>
				</div>
			</div>
		</>
	);
};

export const Modal = styled(modalContainer)`
	position: fixed;
	z-index: 50;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;

	.overlay {
		position: absolute;
		background-color: black;
		opacity: 0.5;
		width: 100%;
		height: 100%;
	}

	.box {
		position: relative;
		width: 400px;
		margin: 0 auto;
		z-index: 60;
		top: 50%;
		transform: translate(0, -50%);
		text-align: center;
		background-color: white;
		border: 3px solid black;
		border-radius: 5px;
		padding: 0 20px 20px;
	}

	.buttons {
		display: flex;
		justify-content: center;
	}

	.buttons button {
		margin: 0 10px;
	}
`;
