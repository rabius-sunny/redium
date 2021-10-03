import Avatar from '@mui/material/Avatar'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { Link } from 'react-router-dom'

export default function Pagination({ path, count, page, perPage }) {

    let totalPages = Math.ceil(count / perPage);
    let startLoop = page;
    let diff = totalPages - page;
    if (diff <= 3) {
        startLoop = totalPages - 3;
    }
    let endLoop = startLoop + 3;
    if (startLoop <= 0) {
        startLoop = 1;
    }
    const links = () => {
        const store = [];

        for (let i = startLoop; i <= endLoop; i++) {
            store.push(
                <li key={i} className="links">
                    <Link to={`/${path}/${i}`}><Avatar className={parseInt(i) === parseInt(page) ? 'active' : 'deactive'}>{i}</Avatar></Link>
                </li>
            );
        }
        return store;
    };
    const next = () => {
        if (page < totalPages) {
            return (
                <li>
                    <Link to={`/${path}/${parseInt(page) + 1}`}>
                        <DoubleArrowIcon color="primary" fontSize="large" />
                    </Link>
                </li>
            );
        }
    };
    const prev = () => {
        if (page > 1) {
            return (
                <li>
                    <Link to={`/${path}/${parseInt(page - 1)}`}>
                        <DoubleArrowIcon className="left__arrow" color="primary" fontSize="large" />
                    </Link>
                </li>
            );
        }
    };

    return totalPages && count > 3 ? (
        <div className='pagination'>
            {prev()}
            {links()}
            {next()}
        </div>
    ) : (
        ''
    );
};
