import { useCallback, useEffect, useRef, useState } from 'react';
import L, { marker } from 'leaflet';
import { useSelector, useDispatch } from 'react-redux';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, LayerGroup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import classNames from 'classnames/bind';
import styles from './Map.module.scss';
import image from '~/assets/images';
import hash from 'object-hash';

import RoutingCustom from '../Routing/RoutingCustom';
import { drawGeoActions } from '~/store/draw-geo-slice';
import DrawTools from '~/components/DrawTools';
import DrawControl from './DrawControl';
import axios from 'axios';
import RoutingControl from './RoutingControl';
const { stringify } = require('wkt');

const cx = classNames.bind(styles);

const customIcon = new Icon({
    iconUrl: image.point,
    iconSize: [38, 38],
});

const geoJsonDataTest = {
    features: [
        {
            geometry: {
                coordinates: [105.77507650593581, 10.034029779256178],
                type: 'Point',
            },
            type: 'Feature',
            properties: {
                address: '133 Đ. Trần Hưng Đạo, An Phú, Ninh Kiều, Cần Thơ, Việt Nam',
                phoneNumber: '0901012067',
                name: 'Chin - Milktea & Macchiato (Trà sữa Chin)',
                closeTime: '10:00 PM',
                description:
                    'Quán cung cấp các loại thức uống ngon lành mát lạnh, đặc biệt là các loại trà sữa và đã được mọi người tin tưởng và đánh giá rất cao rất hân hạnh được phục vụ quý khách.',
                roadId: 1,
                id: 1,
                openTime: '08:00 AM',
                roadName: 'Đường Trần Hưng Đạo',
            },
        },
        {
            geometry: {
                coordinates: [105.77454701541, 10.033546078185426],
                type: 'Point',
            },
            type: 'Feature',
            properties: {
                address: '238 Đ. Trần Hưng Đạo, An Phú, Ninh Kiều, Cần Thơ, Việt Nam',
                phoneNumber: '0913210048',
                name: 'Trà sữa Two-Ti',
                closeTime: '10:00 PM',
                description:
                    'Tự tin là một trong những quán có đồ uống có hương vị đặc biệt, chúng tôi rất mong nhận được sự quan tâm của các bạn.',
                roadId: 1,
                id: 2,
                openTime: '08:00 AM',
                roadName: 'Đường Trần Hưng Đạo',
            },
        },
        {
            geometry: {
                coordinates: [105.77532791854078, 10.034568306811796],
                type: 'Point',
            },
            type: 'Feature',
            properties: {
                address: '228K Đ. Trần Hưng Đạo, An Phú, Ninh Kiều, Cần Thơ, Việt Nam',
                phoneNumber: '0939025343',
                name: 'Trà sữa - Yogurt Bo',
                closeTime: '10:30 PM',
                description: 'Trà sữa - Yogurt Bo thơm ngon mời các bạn nha...',
                roadId: 1,
                id: 3,
                openTime: '08:00 AM',
                roadName: 'Đường Trần Hưng Đạo',
            },
        },
        {
            geometry: {
                coordinates: [105.77570879220731, 10.035682882313386],
                type: 'Point',
            },
            type: 'Feature',
            properties: {
                address: '143B Đ. Trần Hưng Đạo, An Phú, Ninh Kiều, Cần Thơ 94114, Việt Nam',
                phoneNumber: '0945663451',
                name: 'TRÀ SỮA MỊN',
                closeTime: '10:00 PM',
                description:
                    'Tự tin là quán có hương vị đồ uống khác lạ, với vị ngọt thanh dịu cùng màu sắc đẹp mắt, chắc chắn sẽ thu hút bạn từ cái nhìn đầu tiên.',
                roadId: 1,
                id: 4,
                openTime: '08:00 AM',
                roadName: 'Đường Trần Hưng Đạo',
            },
        },
        {
            geometry: {
                coordinates: [105.770952, 10.034149],
                type: 'Point',
            },
            type: 'Feature',
            properties: {
                address: 'KTX A Đại Học Cần Thơ',
                phoneNumber: '0395570930',
                name: 'Quán trà sữa KTX',
                closeTime: '10:30 PM',
                description: 'Tôi chỉ nhắc nhẹ là nên mua ở đây thôi.',
                roadId: 1,
                id: 7,
                openTime: '08:00 AM',
                roadName: 'Đường Trần Hưng Đạo',
            },
        },
        {
            geometry: {
                coordinates: [105.772604, 10.036052],
                type: 'Point',
            },
            type: 'Feature',
            properties: {
                address: 'Đường Mậu Thân',
                phoneNumber: '0395570930',
                name: 'Quán trà sữa MTMT',
                closeTime: '11:30 PM',
                description: 'Siu ngon',
                roadId: 1,
                id: 8,
                openTime: '09:20 AM',
                roadName: 'Đường Trần Hưng Đạo',
            },
        },
        {
            geometry: {
                coordinates: [105.774225, 10.032848],
                type: 'Point',
            },
            type: 'Feature',
            properties: {
                address: 'Giao đường Mậu Thân và đường 3 tháng 2',
                phoneNumber: '0878787878',
                name: 'Hai land milk tea :)))',
                closeTime: '11:30 PM',
                description: 'Khỏi phải bàn về chất lượng.',
                roadId: 1,
                id: 9,
                openTime: '07:00 AM',
                roadName: 'Đường Trần Hưng Đạo',
            },
        },
        {
            geometry: {
                coordinates: [105.77399857471644, 10.027958870784746],
                type: 'Point',
            },
            type: 'Feature',
            properties: {
                address: '80 Đ. Mạc Thiên Tích, Xuân Khánh, Ninh Kiều, Cần Thơ 900000, Việt Nam',
                phoneNumber: '0395570930',
                name: 'Trà Sữa Tigon',
                closeTime: '10:00 PM',
                description:
                    'Không gian cafe thoải mái nhẹ nhàng, rất phù hợp cho việc học bài, hương vị đồ uống thơm ngon đặc biệt từ những nguyên liệu cao cấp.',
                roadId: 2,
                id: 6,
                openTime: '08:00 AM',
                roadName: 'Đường Mạc Thiên Tích',
            },
        },
        {
            geometry: {
                coordinates: [105.770404636622, 10.0277145374459],
                type: 'Point',
            },
            type: 'Feature',
            properties: {
                address: '144B Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam',
                phoneNumber: '02926506777',
                name: 'Quán Cà Phê - Trà Sữa V2',
                closeTime: '10:00 PM',
                description:
                    'Được nhiều bạn chú ý bởi vì hương vị không bị hòa lẫn, mang sắc thái riêng, quán rất hân hạnh được phục vụ quý khách',
                roadId: 3,
                id: 5,
                openTime: '08:00 AM',
                roadName: 'Đường 3 Tháng 2',
            },
        },
        {
            geometry: {
                coordinates: [
                    [105.774552, 10.032859],
                    [105.776435, 10.037862],
                ],
                type: 'LineString',
            },
            type: 'Feature',
            properties: {
                name: 'Đường Trần Hưng Đạo',
                id: 1,
            },
        },
        {
            geometry: {
                coordinates: [
                    [105.771274, 10.02865],
                    [105.77443, 10.02797],
                ],
                type: 'LineString',
            },
            type: 'Feature',
            properties: {
                name: 'Đường Mạc Thiên Tích',
                id: 2,
            },
        },
        {
            geometry: {
                coordinates: [
                    [105.774449, 10.032723],
                    [105.764829, 10.021616],
                ],
                type: 'LineString',
            },
            type: 'Feature',
            properties: {
                name: 'Đường 3 Tháng 2',
                id: 3,
            },
        },
        {
            geometry: {
                coordinates: [
                    [105.774385, 10.032906],
                    [105.771252, 10.038058],
                    [105.770093, 10.039135],
                ],
                type: 'LineString',
            },
            type: 'Feature',
            properties: {
                name: 'Đường Mậu Thân',
                id: 4,
            },
        },
    ],
    type: 'FeatureCollection',
};

function Map() {
    const [controlSate, setControlSate] = useState(() => ({
        isDraw: false,
        isRouting: false,
    }));
    const fGRef = useRef(null);
    const mapRef = useRef(null);
    const [geoJsonData, setGeoJsonData] = useState(geoJsonDataTest);
    const dispatch = useDispatch();
    const drawGeoInfo = useSelector((state) => state.drawGeoState);

    useEffect(() => {
        const fetchApi = async () => {
            const rsp = await axios.get('http://localhost:8086/api/v1/milktea/search?q=');
            setGeoJsonData(rsp.data.geoJson);
        };

        fetchApi();
    }, []);

    //console.log(drawGeoInfo);
    // console.log('re-render');
    // console.log(fGRef.current === null ? 'di' : Object.keys(fGRef.current._layers).length);

    const handleDrawControlClick = useCallback(() => {
        setControlSate((prev) => {
            if (prev.isDraw === false && Object.keys(fGRef.current._layers).length === 0) {
                let leafletGeoJSON = new L.GeoJSON(geoJsonData, { pointToLayer: pointToLayer });
                let arrayPointAddToStoreGeo = [];
                let arrayLineStringAddToStoreGeo = [];
                leafletGeoJSON.eachLayer((layer) => {
                    let temp;
                    if (layer.feature.geometry.type === 'Point') {
                        temp = {
                            id: layer._leaflet_id,
                            name: layer.feature.properties.name,
                            description: layer.feature.properties.description,
                            address: layer.feature.properties.address,
                            openTime: layer.feature.properties.openTime,
                            closeTime: layer.feature.properties.closeTime,
                            phoneNumber: layer.feature.properties.phoneNumber,
                            positionWkt: stringify(layer.toGeoJSON()),
                            roadId: layer.feature.properties.roadId,
                            needEdit: false,
                            realId: layer.feature.properties.id,
                        };
                        arrayPointAddToStoreGeo.push(temp);
                        layer.bindTooltip('Double click to see and edit information!');
                        layer.on('dblclick', () => {
                            dispatch(drawGeoActions.setActivePointInfo(layer._leaflet_id));
                            dispatch(drawGeoActions.setDrawPointState(true));
                        });
                    } else {
                        temp = {
                            id: layer._leaflet_id,
                            name: layer.feature.properties.name,
                            positionWkt: stringify(layer.toGeoJSON()),
                            needEdit: false,
                            realId: layer.feature.properties.id,
                        };
                        arrayLineStringAddToStoreGeo.push(temp);
                        layer.bindTooltip('Double click to see and edit information!');
                        layer.on('dblclick', () => {
                            dispatch(drawGeoActions.setActiveLineStringsInfo(layer._leaflet_id));
                            dispatch(drawGeoActions.setDrawLineStringState(true));
                        });
                    }
                    console.log(layer);
                    fGRef.current?.addLayer(layer);
                });
                dispatch(drawGeoActions.addFromDataToListPoint(arrayPointAddToStoreGeo));
                dispatch(drawGeoActions.addFromDataToListLineString(arrayLineStringAddToStoreGeo));
            }
            return { isRouting: false, isDraw: !prev.isDraw };
        });
    }, [geoJsonData, controlSate, fGRef.current]);

    const handleSave = useCallback(async () => {
        console.log(drawGeoInfo);
        if (
            drawGeoInfo.listLineStrings.length === 0 &&
            drawGeoInfo.listPoints.length === 0 &&
            drawGeoInfo.listPointIdsDeleteEleMapInDb.length === 0
        ) {
            alert('Chưa có điểm hoặc đường nào được vẽ thêm!!');
        } else {
            let requestObject = {
                listMilkTeaShops: drawGeoInfo.listPoints.filter((obj) => !obj.hasOwnProperty('realId')),
                listRoads: drawGeoInfo.listLineStrings.filter((obj) => !obj.hasOwnProperty('realId')),
                listPointDelete: [...drawGeoInfo.listPointIdsDeleteEleMapInDb],
                //listLineStringDelete: [...drawGeoInfo.listLinStringIdsDeleteEleMapInDb],
                listPointsNeedEdit: drawGeoInfo.listPoints.filter((item) => item.needEdit === true),
                listLineStringsNeedEdit: drawGeoInfo.listLineStrings.filter((item) => item.needEdit === true),
            };

            console.log(requestObject);
            const rsp = await axios.post('http://localhost:8086/api/v1/milktea', requestObject);
            console.log(rsp);

            const fetchApi = async () => {
                const rsp = await axios.get('http://localhost:8086/api/v1/milktea/search?q=');
                setGeoJsonData(rsp.data.geoJson);
            };
            setControlSate((prev) => ({ ...prev, isDraw: false }));
            fetchApi();
        }
    }, [drawGeoInfo]);

    const pointToLayer = (feature, latlng) => {
        return L.marker(latlng, { icon: customIcon });
    };

    const handleRouting = () => {
        setControlSate((prev) => ({ isDraw: false, isRouting: !prev.isRouting }));
    };

    return (
        <MapContainer
            ref={mapRef}
            center={[10.030414, 105.769574]}
            zoom={15}
            scrollWheelZoom={true}
            className={cx('map-wrapper')}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DrawControl
                position="topleft"
                isDraw={controlSate.isDraw}
                onClick={handleDrawControlClick}
                onSave={handleSave}
            />
            {!controlSate.isDraw && <GeoJSON key={hash(geoJsonData)} data={geoJsonData} pointToLayer={pointToLayer} />}

            <FeatureGroup key={hash(geoJsonData) + 1} ref={fGRef}>
                {controlSate.isDraw && <DrawTools />}
            </FeatureGroup>

            <RoutingControl position="topleft" isRouting={controlSate.isRouting} onClick={handleRouting} />
            {controlSate.isRouting && (
                <RoutingCustom key={hash(controlSate.isRouting)} isRouting={controlSate.isRouting} />
            )}
        </MapContainer>
    );
}

export default Map;
