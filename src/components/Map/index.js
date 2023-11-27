import { MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import classNames from 'classnames/bind';
import styles from './Map.module.scss';
import { useEffect, useState } from 'react';
import icon from 'leaflet/dist/images/marker-icon-2x.png';
import { Icon, point } from 'leaflet';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

function Map() {
    const [distances, setDistances] = useState([]);
    const DataRender = useSelector((state) => state.ItemIfor);
    const ItemlInfo = DataRender.itemsInfo;
    // console.log(ItemlInfo);
    const userLocation = useSelector((state) => state.location);
    const customIcon = new Icon({
        iconUrl: icon,
        iconSize: [38, 38],
    });
    useEffect(() => {
        // Calculate distances when ItemlInfo or userLocation changes
        if (ItemlInfo && userLocation) {
            const distancesArray = ItemlInfo.map((feature) => {
                const datafeature = feature.geometry.coordinates;
                const latitude = datafeature[1];
                const longitude = datafeature[0];
                const distance = calculateDistance(userLocation.latitude, userLocation.longitude, latitude, longitude);
                return distance;
            });
            setDistances(distancesArray);
        }
    }, [ItemlInfo, userLocation]);
    return (
        <MapContainer center={[10.030414, 105.769574]} zoom={13} scrollWheelZoom={true} className={cx('map-wrapper')}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {ItemlInfo &&
                ItemlInfo.map((feature, index) => {
                    //  console.log(feature.geometry);
                    const datafeature = feature.geometry.coordinates;
                    const latitude = datafeature[1];
                    const longitude = datafeature[0];
                    //console.log(latitude);
                    //console.log(longitude);
                    const Information = feature.properties;
                    const distance = distances[index];
                    const formattedDistance = distance !== undefined ? distance.toFixed(2) : 'N/A';

                    return (
                        <Marker
                            key={index}
                            //position={[10.030414, 105.769574]}
                            position={[latitude, longitude]}
                            icon={customIcon}
                            // eventHandlers={{
                            //     click: () => {
                            //toggleMarkerSelection(index);
                            //  onMarkerClick(index);
                            // handleMarkerClick({
                            //  lat: popupInfo ? popupInfo.coordinates.lat : latitude,
                            //  lng: popupInfo ? popupInfo.coordinates.lng : longitude,
                            //  });
                            //     },
                            // }}
                            // opacity={selectedMarker === index ? 3 : 0.5}
                        >
                            <Popup>
                                <h3>{Information.name}</h3>
                                <p>Distance: {formattedDistance} km</p>
                            </Popup>
                        </Marker>
                    );
                })}
            {/* 
            <Marker position={[10.030414, 105.769574]} icon={customIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
            {userLocation && (
                <Marker position={[userLocation.latitude, userLocation.longitude]} icon={customIcon}>
                    <Popup>Your current location</Popup>
                </Marker>
            )}
        </MapContainer>
    );
}

export default Map;
