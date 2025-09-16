import styled from 'styled-components';
import { useLayoutEffect, useRef, useState } from 'react';
import { Input, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/specail-panel';
import { sanizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { editPostAsync } from '../../../../action';
import { useNavigate } from 'react-router';
import { PROP_TYPE } from '../../../../constants';


const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);

	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title)
	}, [title, imageUrl]);

	const onSave = () => {
		const newContentRef = sanizeContent(contentRef.current.innerHTML);

		dispatch(
			editPostAsync(id ,{
				title: titleValue,
				content: newContentRef,
				imageUrl: imageUrlValue,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({target}) => setImageUrlValue(target.value)
	const onTitleChange = ({target}) => setTitleValue(target.value)

	return (
		<>
			<div className={className}>
				<Input
					value={imageUrlValue}
					placeholder='Изображение...'
					onChange={onImageChange}
				/>
				<Input
					value={titleValue}
					placeholder='Заголовок...'
					onChange={onTitleChange}
				/>
				<SpecialPanel
					id={id}
					publishedAt={publishedAt}
					margin='20px 0 20px'
					editButton={
						<Icon
							id='fa-floppy-o'
							margin='0 10px 0 10px'
							size='25px'
							onClick={onSave}
						/>
					}
				/>

				<div
					ref={contentRef}
					contentEditable={true}
					suppressContentEditableWarning={true}
					placeholder='Статья...'
					className='post-text'
				>
					{content}
				</div>
			</div>
		</>
	);
};

export const PostForm = styled(PostFormContainer)`
	h2 {
		font-size: 28px;
		display: flex;
	}
	img {
		float: left;
		margin: 0 20px 20px 0;
	}

	.post-text {
		font-size: 22px;
		min-height: 80px;
		white-space: pre-line;
		border: 1px solid black;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
