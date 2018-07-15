import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCity } from 'actions/app';

import PropTypes from 'prop-types';// eslint-disable-line
import { ListGroup, ListGroupItem } from 'reactstrap';
import './styles.scss';

class CitiesList extends Component {
    constructor(props) {
        super(props);
        this.selectCity = this.selectCity.bind(this);
    }

    // shouldComponentUpdate(nextProps) {
    //     return nextProps.appState.selectedCity !== this.props.appState.selectedCity;
    // }

    setCityInfo(city, idx) {
        const { appState: { selectedCity } } = this.props;
        const active = selectedCity === city.id;
        return (
            <ListGroupItem
                tag="a"
                href="#"
                key={city.id}
                active={active}
                onClick={evt => this.selectCity(evt, city.id)}
            >
                <div className="row">
                    <div className="col-12">
                        <h5 className="">{idx}{city.name} </h5>
                    </div>
                    <div className="col-12">
                        <p className="cities-list-item">
                            <span className="fas fa-thermometer-empty" />&nbsp;
                            {city.main.temp}F&nbsp;
                            Min. {city.main.temp_min}&nbsp;
                            Max. {city.main.temp_max}
                        </p>
                        <p className="cities-list-item">
                            Weather: <span className="font-italic">{city.weather[0].description}</span>
                        </p>
                    </div>
                </div>
            </ListGroupItem>
        );
    }

    selectCity(evt, cityId) {
        evt.preventDefault();
        const { actionSelectCity, appState: { selectedCity } } = this.props;

        if (selectedCity !== cityId) {
            actionSelectCity(cityId);
        }
    }

    render() {
        const { cities, filteredCities, filteredTemp } = this.props.appState;
        const hasTempFilter = filteredTemp.max > 0 && filteredTemp.min > 0;
        const hasCitiesFilter = !!filteredCities.length;

        const list = cities
            .filter((city) => {
                let tempFilter = true;
                let cityFilter = true;

                if (hasCitiesFilter) {
                    cityFilter = filteredCities.filter(search => search.id === city.id).length;
                }

                if (hasTempFilter) {
                    tempFilter = city.main.temp_min >= filteredTemp.min &&
                        city.main.temp_max <= filteredTemp.max;
                }
                return tempFilter && cityFilter;
            })
            .map((city, idx) => this.setCityInfo(city, idx));

        return (
            <div className="row">
                <div className="col-12">
                    <ListGroup flush>
                        {list}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

CitiesList.propTypes = {
    appState: PropTypes.object,// eslint-disable-line
    actionSelectCity: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    appState: state.app,
});

const mapDispatchToProps = ({
    actionSelectCity: selectCity,
});

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
