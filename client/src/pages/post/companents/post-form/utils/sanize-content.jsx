export const sanizeContent = (content) =>
	content
		.replaceAll('<div><br></div>', '\n\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '')
		.replaceAll('<br>', '\n')
		.replaceAll('&nbsp;', ' ')
		.replaceAll('/ +/', ' ');
