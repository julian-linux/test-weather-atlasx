import React from 'react';
import PropTypes from 'prop-types';// eslint-disable-line

// import './styles.scss';

const CityInfo = (props) => { // eslint-disable-line
    const { city } = props;

    return (
        <div className="row">
            <div className="col-12">
                {city[0].dt_txt}
            </div>
        </div>
    );
};

CityInfo.propTypes = {
    city: PropTypes.array,// eslint-disable-line
};

export default CityInfo;
