import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);
function CommentItem() {
    return (
        <div className={cx('wrapper')}>
            <Row className={cx('user-info')}>
                <Col md="2" className={cx('avatar')}>
                    <img
                        src="https://i.pinimg.com/originals/ab/b1/c4/abb1c4b83e8c469acef4e6cee2caf33c.jpg"
                        alt="avatar"
                    />
                </Col>
                <Col className={cx('sub-info')}>
                    <h3>Luis Hwang</h3>
                    <p>
                        <span>8 reviews</span> - <span>6 images</span>
                    </p>
                </Col>
                <Col md="1" className={cx('more-menu')}>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                </Col>
            </Row>
            <div className={cx('comment-body')}>
                <div className={cx('rating', 'd-flex')}>
                    <div>
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStarHalf} />
                    </div>
                    <div>3 years ago</div>
                </div>
                <div className={cx('comment')}>
                    <p>
                        It has a taste that is neither salty nor bland, a little sweet but not too sweet, a little fatty
                        and feels moderately fatty, sometimes it smells good, sometimes it doesn't. Overall, it was
                        f*cking delicious!!!!!!
                    </p>
                    <div className={cx('comment-images')}>
                        <div className={cx('slider')}>
                            <Row>
                                <Col>
                                    <img
                                        src="https://1.bp.blogspot.com/-FZmoUs_OkAY/XanvAsnCE7I/AAAAAAAAkoM/7zCQND1KqHkAOSRNPMeXKsqXynKmZcaDgCLcBGAsYHQ/s1600/5B472BA4-F080-45B9-A1C2-E1ED581E9D2B.JPG"
                                        alt="milk-tea"
                                    />
                                </Col>
                                <Col>
                                    <img
                                        src="https://1.bp.blogspot.com/-hJIxK4B6pII/Xanu6dlzICI/AAAAAAAAkoI/teBdkdMsa78C68JuagqCJeUVBVbaBVU4ACLcBGAsYHQ/s1600/IMG-5913.JPG"
                                        alt="milk-tea"
                                    />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
