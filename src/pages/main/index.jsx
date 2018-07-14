import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CityInfo from 'components/city-info';

import { Progress } from 'reactstrap';

import './styles.scss';

class Main extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.appState.isFetchingCity !== this.props.appState.isFetchingCity;
    }

    render() {
        const { isFetchingCity, cityInfo } = this.props.appState;

        const html = isFetchingCity ?
            <Progress animated value={100} /> :
            <CityInfo city={cityInfo} />;

        return (
            <div className="row ml-md-4 mt-4 main-container">
                <div className="col-12">
                    {html}
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    appState: PropTypes.object,// eslint-disable-line
};

const mapStateToProps = state => ({
    appState: state.app,
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Main);
