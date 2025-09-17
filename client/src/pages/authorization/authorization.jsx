import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {  useState } from 'react';
import { Input, Btn, H2, AuthFormError } from '../../components';
import styled from 'styled-components';
import { Link, Navigate } from 'react-router';
import { setUser } from '../../action';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks';
import { request } from '../../utils';

const authFormScheme = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%!]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # % !',
		)
		.min(8, 'Неверно заполнен пароль.Минимум 8 символа')
		.max(30, 'Неверно заполнен пароль.Максимум 30 символов'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const AuthorizationContainer = ({ className }) => {
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormScheme),
	});

	const [serverError, setServerError] = useState(null);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request(`/api/login`,"POST", {login, password}).then(({ error, user }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(user));
			sessionStorage.setItem('userData', JSON.stringify(user));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to='/' />;
	}

	return (
		<div className={className}>
			<H2>Авторизация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type='text'
					placeholder='Логин...'
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type='password'
					placeholder='Пароль...'
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>

				<Btn type='submit' disabled={!!formError}>
					Авторизоваться
				</Btn>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to='/register'>Регистрация</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > form {
		width: 260px;
		display: flex;
		flex-direction: column;
	}
`;
