import React, { Component } from 'react';
import { connect } from 'react-redux';

import citiesList from 'config/cities';
import PropTypes from 'prop-types';// eslint-disable-line
import { Input, ListGroup, ListGroupItem } from 'reactstrap';
import InputRange from 'react-input-range';
import { addFilteredCity, removeFilteredCity, changeTemp } from 'actions/app';

import 'react-input-range/lib/css/index.css';
import './styles.scss';

const getCities = searchText => citiesList.filter((city) => {
    if (searchText !== '') {
        return city.city.toLowerCase().includes(searchText.toLowerCase());
    }
    return false;
});

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            showResults: false,
            listCities: [],
            position: 0,
            tempValues: {
                min: Math.round(props.appState.filteredTemp.min),
                max: Math.round(props.appState.filteredTemp.max) + 1,
            },
        };
        this.updateSearhText = this.updateSearhText.bind(this);
        this.selectPosition = this.selectPosition.bind(this);
        this.selectPositionListElement = this.selectPositionListElement.bind(this);
        this.removeFilteredCity = this.removeFilteredCity.bind(this);
        this.changeFilterTemp = this.changeFilterTemp.bind(this);
        this.updateFiltersWithTemp = this.updateFiltersWithTemp.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !_.isEqual(this.state, nextState);
    // }

    getListResults() {
        if (!this.state.showResults) {
            return '';
        }

        const { filteredCities } = this.props.appState;

        const listCities = this.state.listCities
            .filter((city) => {
                if (filteredCities.length === 0) {
                    return true;
                }
                return filteredCities.filter(search => search.id !== city.id).length;
            })
            .map((city, idx) => {
                const search = this.state.searchText;
                const parts = city.city.split(new RegExp(search, 'gi'));

                const text = parts.map((part, idxPart) => {
                    const keyPart = idxPart + 1;
                    if (parts.length === keyPart) {
                        return (<span key={keyPart}>{part}</span>);
                    }
                    return (
                        <span key={keyPart}>
                            {part}<b className="text-primary">{search}</b>
                        </span>
                    );
                });

                return (
                    <ListGroupItem
                        key={city.id}
                        tag="a"
                        href="#"
                        active={this.state.position === idx + 1}
                        onClick={evt => this.selectPosition(city, evt)}
                    >
                        {text}
                    </ListGroupItem>
                );
            });

        return (
            <ListGroup className="cities-list-searh-result">
                {listCities}
            </ListGroup>
        );
    }

    selectPosition(city, evt = null) {// eslint-disable-line
        if (evt) {
            evt.preventDefault();
        }
        this.setState(
            {
                showResults: false,
                searchText: '',
            },
            () => this.props.actionAddFilteredCity(city),
        );
    }

    selectPositionListElement(evt) {
        evt.preventDefault();
        const lengthCities = this.state.listCities.length;

        if (lengthCities === 0) {
            return false;
        }

        const code = evt.keyCode;
        let { position } = this.state;

        if (code === 38) { // up
            if (position === 0) {
                return false;
            }
            position -= 1;
            return this.setState({ position });
        }

        if (code === 40) { // down
            if (position > lengthCities) {
                return false;
            }
            position += 1;
            return this.setState({ position });
        }

        if (code === 13) { // enter
            if (position === 0 || position > lengthCities) {
                return false;
            }
            const citySelected = citiesList.filter((city, idx) => position === idx + 1);
            return this.selectPosition(citySelected);
        }

        return false;
    }

    updateSearhText(evt) {
        const searchText = evt.target.value;
        const listCities = getCities(searchText);

        this.setState({
            listCities,
            searchText,
            showResults: searchText.length > 0,
        });
    }

    getFilteredCities() {
        const { filteredCities } = this.props.appState;

        if (filteredCities.length === 0) {
            return false;
        }

        return filteredCities.map(city => (
            <div
                key={`badge-${city.id}`}
                className="badge badge-pill badge-secondary"
            >
                <span>{city.city}</span>&nbsp;
                <button
                    className="close"
                    onClick={evt => this.removeFilteredCity(evt, city)}
                >
                    X
                </button>
            </div>
        ));
    }

    changeFilterTemp(tempValues) {
        this.setState({ tempValues });
    }

    updateFiltersWithTemp(tempValues) {
        this.props.actionChangeTemp(tempValues);
    }

    removeFilteredCity(evt, city) {
        evt.preventDefault();
        this.props.actionRemovefilteredCity(city);
    }

    render() {
        let { minTemp, maxTemp } = this.props.appState;// eslint-disable-line
        minTemp = Math.round(minTemp);
        maxTemp = Math.round(maxTemp) + 1;
        // console.log("minValue, maxValue", minValue, maxValue);
        const listResults = this.getListResults();
        const filteredCities = this.getFilteredCities();
        return (
            <div className="row cities-list-container">
                <div className="col-12">
                    <Input
                        placeholder="Search Cities"
                        onChange={this.updateSearhText}
                        onKeyUp={this.selectPositionListElement}
                        value={this.state.searchText}
                        required
                    />
                    {listResults}
                </div>
                <div className="col-12">
                    {filteredCities}
                </div>
                <div className="col-12 mt-3 text-center">
                    <h6 className="text-primary">Temp Range</h6>
                </div>
                <div className="col-12 text-right mt-2">
                    <InputRange

                        maxValue={maxTemp}// eslint-disable-line
                        minValue={minTemp}// eslint-disable-line
                        step={1}
                        onChange={value => this.changeFilterTemp(value)}
                        onChangeComplete={range => this.updateFiltersWithTemp(range)}
                        value={this.state.tempValues}
                    />
                </div>
            </div>
        );
    }
}

SearchForm.propTypes = {
    appState: PropTypes.object,// eslint-disable-line
    actionAddFilteredCity: PropTypes.func.isRequired,
    actionRemovefilteredCity: PropTypes.func.isRequired,// eslint-disable-line
    actionChangeTemp: PropTypes.func.isRequired,// eslint-disable-line
};

const mapStateToProps = state => ({// eslint-disable-line
    appState: state.app,
});

const mapDispatchToProps = ({
    actionAddFilteredCity: addFilteredCity,
    actionRemovefilteredCity: removeFilteredCity,
    actionChangeTemp: changeTemp,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
