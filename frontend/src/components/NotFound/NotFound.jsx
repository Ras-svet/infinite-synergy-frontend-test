import './NotFound.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="notfound">
			<div className="notfound__container">
				<h1 className="notfound__title">404</h1>
				<p className="notfound__text">Страница не найдена</p>
			</div>
			<p className="notfound__link" onClick={() => navigate(-1)}>Назад</p>
		</div>
	);
};

export default NotFound;