import { useCallback, useEffect, useRef, useState } from 'react';
import L, { featureGroup } from 'leaflet';
import { map } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, LayerGroup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import classNames from 'classnames/bind';
import styles from './Map.module.scss';
import image from '~/assets/images';
import hash from 'object-hash';
import DrawTools from '~/components/DrawTools';

const cx = classNames.bind(styles);

const customIcon = new Icon({
    iconUrl: image.point,
    iconSize: [38, 38],
});

const geojsonData = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            properties: {
                id: 1,
                name: 'quan ta tua bap ghi',
            },
            geometry: {
                coordinates: [105.77093946962441, 10.028267966536191],
                type: 'Point',
            },
            id: 0,
        },
        {
            type: 'Feature',
            properties: {
                id: 2,
                name: 'Tra sua UI/UX',
            },
            geometry: {
                coordinates: [105.77222150282142, 10.029812314570094],
                type: 'Point',
            },
            id: 1,
        },
        {
            type: 'Feature',
            properties: {
                id: 3,
                name: 'Tra sua vị cồn',
            },
            geometry: {
                coordinates: [105.77453981094789, 10.03321477069015],
                type: 'Point',
            },
            id: 2,
        },
    ],
};

function Map() {
    const featureGroupRef = useRef(null);
    const pointToLayer = (feature, latlng) => {
        return L.marker(latlng, { icon: customIcon });
    };

    const _onFeatureGroupReady = useCallback((reactFGref) => {
        // populate the leaflet FeatureGroup with the geoJson layers

        let leafletGeoJSON = new L.GeoJSON(geojsonData, { pointToLayer: pointToLayer });
        leafletGeoJSON.eachLayer((layer) => {
            reactFGref?.addLayer(layer);
        });
    }, []);

    return (
        <MapContainer
            center={[10.030414, 105.769574]}
            zoom={13}
            scrollWheelZoom={true}
            className={cx('map-wrapper')}
            key={hash(geojsonData)}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup
            // ref={(reactFGref) => {
            //     _onFeatureGroupReady(reactFGref);
            // }}
            >
                <DrawTools />
                <Marker position={[10.030414, 105.769574]} icon={customIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </FeatureGroup>
        </MapContainer>
    );
}

export default Map;
