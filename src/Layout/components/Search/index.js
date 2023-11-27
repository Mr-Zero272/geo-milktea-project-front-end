import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { SearchApi } from '~/components/Api/seachApi';
import { useDispatch } from 'react-redux';
import { setUserLocation } from '~/components/Provider/locationSlice';
import axios from 'axios';
import { updateItemDetail } from '~/components/Provider/searchItemDetail';
import { addItems } from '~/components/Provider/searchItem';
const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [clickedInside, setClickedInside] = useState(false);
    const [range, setRange] = useState(5000.0);
    const dispatch = useDispatch();

    const inputRef = useRef();

    useEffect(() => {
        // Thêm event listener cho sự kiện click trên toàn bộ trang
        const handleClickOutside = () => {
            if (!clickedInside) {
                setShowSuggestions(false);
            }
            setClickedInside(false); // Reset state sau mỗi lần click
        };

        // thêm event listener khi component được mount
        document.addEventListener('click', handleClickOutside);

        // xóa event listener khi component bị unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [clickedInside]);

    const handlesearch = () => {
        // get current location user
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userLocation = { latitude, longitude };
                dispatch(setUserLocation({ latitude, longitude }));
                //      console.log(userLocation.latitude);
                const fetchApi = async () => {
                    try {
                        //        console.log(typeof range);
                        const response = await axios.get(
                            `http://localhost:8086/api/v1/milktea/nearby?lng=${userLocation.longitude}&lat=${userLocation.latitude}&range=${range}&keyword=${searchValue}`,
                        );
                        const milkteashop = response.data;
                        console.log('response data searchByDistance', milkteashop);
                        const milkteashopgeoJson = milkteashop.geoJson;
                        console.log('searchByDistance api geoJson', milkteashopgeoJson);
                        const milkteashopfeatures = milkteashopgeoJson.features;

                        console.log('geoJson api feature', milkteashopfeatures);
                        const milkteashopProperties = milkteashopfeatures[0].geometry;

                        console.log('geoJson api feature', milkteashopProperties);
                        console.log('geoJson api feature', milkteashopProperties.type);
                        console.log('geoJson api feature', milkteashopProperties.coordinates);
                        // const dataApi = response.data;
                        setLoading(true);
                        setTimeout(() => {
                            setSuggestions(milkteashopfeatures);
                            setLoading(false);
                            setShowSuggestions(true);
                            dispatch(addItems(milkteashopfeatures));
                        }, 100);
                    } catch (err) {
                        alert('failed', err);
                        throw err;
                    }
                };
                fetchApi();
            },
            (error) => {
                console.error('Error get user location', error);
            },
        );
    };

    const handleClearText = () => {
        setSearchValue('');
    };
    const handleDetailSearch = (index) => {
        alert(index);
        //console.log(suggestions[id]);
        dispatch(updateItemDetail(suggestions[index]));
        setShowSuggestions(false);
    };
    const handleSelectRange = (e) => {
        if (e.target.value === '10km') {
            setRange(10000.0);
        }
        if (e.target.value === '15km') {
            setRange(15000.0);
        }
        if (e.target.value === '20km') {
            setRange(20000.0);
        }
        if (e.target.value === '5km') {
            setRange(5000.0);
        }
    };
    return (
        <div className={cx('search-wrapper')}>
            <select onChange={handleSelectRange} className={cx('search-select')}>
                <option value="5km">5km</option>
                <option value="10km">10km</option>
                <option value="15km">15km</option>
                <option value="20km">20km</option>
            </select>
            <input
                className={cx('search-input')}
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                    console.log(e.target.value);
                }}
                placeholder="Search..."
                spellCheck={false}
            />

            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            {searchValue && !loading && (
                <button className={cx('clear-text')} onClick={handleClearText}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            )}

            <button onClick={handlesearch} className={cx('btn-search')}>
                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
            </button>

            {showSuggestions && (
                <div
                    className={cx('suggestions-list-active')}
                    onMouseDown={() => setClickedInside(true)} // Khi mousedown trong danh sách, set clickedInside thành true
                >
                    {suggestions.length > 0 && (
                        <ul>
                            {suggestions.map((suggestion, index) => (
                                <li key={suggestion.properties.id} onClick={() => handleDetailSearch(index)}>
                                    {suggestion.properties.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
