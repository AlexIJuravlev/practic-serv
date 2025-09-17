import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { PostCard, Pagination, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debouce } from './utils';
import { request } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');

	useEffect(() => {
		request(
			`/api/posts?search=${searchPhrase}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLastPage(lastPage)

		});
	}, [ page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debouce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	console.log(posts);

	return (
		<div className={className}>
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			{posts.length ? (
				<div className='post-list'>
					{posts.map(({ id, title, publishedAt, comments, imageUrl }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							publishedAt={publishedAt}
							commentsCount={comments.length}
							imageUrl={imageUrl}
						/>
					))}
				</div>
			) : (
				<div className='no-posts-found'>Статьи не найдены</div>
			)}
			{lastPage > 1 && posts.length > 0 && (
				<Pagination setPage={setPage} lastPage={lastPage} page={page} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`

	.post-list {
		display: flex;
		flex-wrap: wrap;
		padding: 20px;
		height: 100%;
	}

	.no-posts-found {
		text-align: center;
		font-size: 18px;
		margin: 40px 0;
	}
`;
