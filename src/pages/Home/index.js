import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Col, Row } from 'react-bootstrap';
import Map from '~/components/Map';
import SearchItemDetail from '~/components/SearchItemDetail';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('home-wrapper')}>
            <Row style={{ marginRight: 0, marginLeft: 0 }}>
                <Col md={4}>
                    <SearchItemDetail />
                </Col>
                <Col md={8}>
                    <Map />
                </Col>
            </Row>
        </div>
    );
}

export default Home;
