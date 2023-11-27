import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Col, Row, Offcanvas } from 'react-bootstrap';
import Map from '~/components/Map';
import SearchItemDetail from '~/components/SearchItemDetail';
import FormAddPoint from '~/components/FormAddPoint';
import { useDispatch, useSelector } from 'react-redux';
import { drawGeoActions } from '~/store/draw-geo-slice';
import FormAddLineString from '~/components/FormAddLineString';

const cx = classNames.bind(styles);

function Home() {
    const itemDetail = useSelector((state) => state.Itemdetail);
    const ItemDetailInfo = itemDetail.itemInfo.properties;
    const ShowDetailItem = itemDetail.isShowDetailItem;
    const dispatch = useDispatch();
    const drawGeoState = useSelector((state) => state.drawGeoState);

    const handleClose = () => {
        if (drawGeoState.isDrawPoint) {
            dispatch(drawGeoActions.setDrawPointState(false));
        } else {
            dispatch(drawGeoActions.setActiveLineStringsInfo(false));
        }
    };
    return (
        <div className={cx('home-wrapper')}>
            <Offcanvas
                show={drawGeoState.isDrawPoint || drawGeoState.isDrawLineString}
                onHide={handleClose}
                scroll="true"
                backdrop={false}
                style={{ marginTop: '66px' }}
            >
                <Offcanvas.Header>
                    {drawGeoState.isDrawPoint && <Offcanvas.Title>Add point</Offcanvas.Title>}
                    {drawGeoState.isDrawLineString && <Offcanvas.Title>Add line string</Offcanvas.Title>}
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {drawGeoState.isDrawPoint && <FormAddPoint />}
                    {drawGeoState.isDrawLineString && <FormAddLineString />}
                </Offcanvas.Body>
            </Offcanvas>
            <Row style={{ marginRight: 0, marginLeft: 0 }}>
                <Col md={4}>{ShowDetailItem && <SearchItemDetail />}</Col>
                <Col md={8}>
                    <Map />
                </Col>
            </Row>
        </div>
    );
}

export default Home;
