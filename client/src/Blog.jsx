import { Route, Routes } from 'react-router';
import styled from 'styled-components';
import { Error, Header, Footer, Modal } from './components';
import { Authorization, Registration, Users, Post, Main } from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './action';
import { ERROR } from './constants';

const AppColimn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: white;
`;

const Page = styled.div`
	padding: 120px 0 20px;
	position: relative;
	min-height: 100%;
`;


export const Blog = () => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser({
			...currentUserData,
			roleId: Number(currentUserData.roleId)
		}));
	}, [dispatch]);



	return (
		<AppColimn>
			<Header />
			<Page>
				<Routes>
					<Route path='/' element={<Main/>} />
					<Route path='/login' element={<Authorization />} />
					<Route path='/register' element={<Registration />} />
					<Route path='/users' element={<Users />} />
					<Route path='/post' element={<Post />} />
					<Route path='/post/:id' element={<Post />} />
					<Route path='/post/:id/edit' element={<Post />} />
					<Route path='/post/:id/*' element={<div> Ошибка </div>} />
					<Route path='*' element={<Error error={ERROR.PAGE_NOT_EXIST}/>} />
				</Routes>
			</Page>
			<Footer />
			<Modal />
		</AppColimn>
	);
};
