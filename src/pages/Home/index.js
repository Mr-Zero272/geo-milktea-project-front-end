import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Col, Row } from 'react-bootstrap';
import Map from '~/components/Map';
import SearchItemDetail from '~/components/SearchItemDetail';
import { useDispatch, useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function Home() {
    const itemDetail = useSelector((state) => state.Itemdetail);
    const ItemDetailInfo = itemDetail.itemInfo.properties;
    const ShowDetailItem = itemDetail.isShowDetailItem;
    //console.log('item selected', ShowDetailItem);
    //console.log('item selected', ItemDetailInfo);

    return (
        <div className={cx('home-wrapper')}>
            {ShowDetailItem ? (
                <Row style={{ marginRight: 0, marginLeft: 0 }}>
                    <Col md={4}>
                        <SearchItemDetail />
                    </Col>
                    <Col md={8}>
                        <Map />
                    </Col>
                </Row>
            ) : (
                <Map />
            )}
        </div>
    );
}

export default Home;
