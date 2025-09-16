import { useEffect, useState } from 'react';
import styled from 'styled-components';


const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [tempera, setTempara] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Nizhny Novgorod&units=metric&lang=ru&appid=6bd0abeacf95138d21cea67265e1505f',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTempara(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);
	return (
		<footer className={className}>
			<div>
				<div>Блог ученика IT</div>
				<div>pathdev@padavan.ru</div>
			</div>
			<div>
				<div>{city}, </div>
				<div>
					{' '}
					{new Date().toLocaleString('ru', {
						day: 'numeric',
						month: 'long',
						weekday: 'long',
					})}
				</div>
				<div>
					{tempera} градус(сов), {weather}
				</div>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: white;
	font-weight: bold;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px 4px 16px #000;
`;
