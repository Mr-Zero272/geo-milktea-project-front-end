import classNames from 'classnames/bind';
import styles from './SearchItemDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMap, faPhone, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import CommentItem from '~/CommentItem';

const cx = classNames.bind(styles);

function SearchItemDetail() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image-parts')}>
                <div className={cx('slider-img-item')}>
                    <img
                        src="https://adormusic.s3.us-east-2.amazonaws.com/wp-content/uploads/2020/09/26074258/our-july-coffee.jpg"
                        alt="ewf"
                    />
                </div>
            </div>
            <div className={cx('information')}>
                <h3>Moon Milk Tea</h3>
                <div className={cx('rating-details')}>
                    <span>4.6</span>
                    <div>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalf} />
                    </div>
                    <span>(20)</span>
                </div>
                <p>Cafe shop</p>
            </div>
            <div className={cx('tabs-part')}>
                <Tabs defaultActiveKey="overview" transition={false} id="map-item-tabs" fill>
                    <Tab eventKey="overview" title="Overview">
                        <div className={cx('list-overviews')}>
                            <Row className={cx('overview-item')}>
                                <Col md={3} className={cx('overview-item-icon')}>
                                    <FontAwesomeIcon icon={faMap} />
                                </Col>
                                <Col md={9}>144B Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam</Col>
                            </Row>
                            <Row className={cx('overview-item')}>
                                <Col md={3} className={cx('overview-item-icon')}>
                                    <FontAwesomeIcon icon={faClock} />
                                </Col>
                                <Col md={9}>Closes at: 22:30</Col>
                            </Row>
                            <Row className={cx('overview-item')}>
                                <Col md={3} className={cx('overview-item-icon')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                </Col>
                                <Col md={9}>+84 300000002</Col>
                            </Row>
                            <Row className={cx('overview-item')}>
                                <Col md={3} className={cx('overview-item-icon')}>
                                    <FontAwesomeIcon icon={faMap} />
                                </Col>
                                <Col md={9}>144B Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam</Col>
                            </Row>
                            <Row className={cx('overview-item')}>
                                <Col md={3} className={cx('overview-item-icon')}>
                                    <FontAwesomeIcon icon={faClock} />
                                </Col>
                                <Col md={9}>Closes at: 22:30</Col>
                            </Row>
                            <Row className={cx('overview-item')}>
                                <Col md={3} className={cx('overview-item-icon')}>
                                    <FontAwesomeIcon icon={faPhone} />
                                </Col>
                                <Col md={9}>+84 300000002</Col>
                            </Row>
                            <Row className={cx('overview-item')}>
                                <Col md={3} className={cx('overview-item-icon')}>
                                    <FontAwesomeIcon icon={faMap} />
                                </Col>
                                <Col md={9}>144B Đ. 3 Tháng 2, Xuân Khánh, Ninh Kiều, Cần Thơ, Việt Nam</Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey="comment" title="Comment">
                        <div className={cx('comment-tab')}>
                            <CommentItem />
                            <CommentItem />
                            <CommentItem />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}

export default SearchItemDetail;
