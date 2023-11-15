import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import classNames from 'classnames/bind';
import styles from './Map.module.scss';

const cx = classNames.bind(styles);

function Map() {
    return (
        <MapContainer center={[10.030414, 105.769574]} zoom={13} scrollWheelZoom={true} className={cx('map-wrapper')}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[10.030414, 105.769574]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map;
