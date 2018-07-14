import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, ListGroup, ListGroupItem } from 'reactstrap';
import Collapsible from 'components/collapsible';
import map from 'lodash/map';
import './styles.scss';

const tempIcon = (<span className="fas fa-thermometer-empty" />);
const loadingIcon = (
    <div className="row text-center main-loading">
        <div className="col-12">
            <span className="fa-5x fas fa-spinner fa-spin text-primary" />
        </div>
    </div>
);
class Main extends Component {
    constructor(props) {
        super(props);
        this.days = {};
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.appState.isFetchingCity !== this.props.appState.isFetchingCity;
    }

    getCityInfo() {
        const { isFetchingCity, cityInfo: { name } } = this.props.appState;
        const html = isFetchingCity ? loadingIcon : this.setDataList();
        return (
            <div className="row city-info-container">
                <div className="col-12 mt-2">
                    <h3 className="text-primary text-center">
                        Weather for:&nbsp;
                        <span className="text-secondary font-italic">{name}</span>
                    </h3>
                </div>
                <div className="col-12">
                    <div className="row justify-content-center">
                        <div className="col-10">
                            <hr />
                        </div>
                    </div>
                </div>
                <div className="col-12 city-info-content ">
                    {html}
                </div>
            </div>
        );
    }

    setDataList() {
        return map(this.days, (dayInfo, date) => (
            <Collapsible
                key={date}
                icon="calendar-alt"
                title={date}
                isOpen={false}
            >
                <ListGroup flush>
                    {this.getDayInfo(dayInfo)}
                </ListGroup>
            </Collapsible>
        ));
    }

    getDayInfo(dayInfo) {// eslint-disable-line
        return map(dayInfo, (info, hour) => (
            <ListGroupItem
                key={hour}
            >
                <h6 className="text-primary">{hour}</h6>
                <Table borderless="true" responsive size="sm">
                    <tbody>
                        <tr>
                            <th>{tempIcon} F</th>
                            <td>{info.main.temp}</td>
                            <th>Pressure</th>
                            <td>{info.main.pressure}</td>

                        </tr>
                        <tr>
                            <th>{tempIcon} Min</th>
                            <td>{info.main.temp_min}</td>
                            <th>Sea Level</th>
                            <td>{info.main.sea_level}</td>
                        </tr>
                        <tr>
                            <th>{tempIcon} Max</th>
                            <td>{info.main.temp_max}</td>
                            <th>Ground Level</th>
                            <td>{info.main.grnd_level}</td>
                        </tr>
                        <tr>
                            <th>Weather</th>
                            <td>{info.weather[0].description}</td>
                            <th>Humidity</th>
                            <td>{info.main.humidity}</td>
                        </tr>
                        <tr>
                            <th />
                            <td />
                            <th>Wind Speed</th>
                            <td>{info.wind.speed}</td>
                        </tr>
                    </tbody>
                </Table>
            </ListGroupItem>

        ));
    }

    groupDays() {
        this.days = {};
        const { cityInfo: { data } } = this.props.appState;

        if (data) {
            data.forEach((item) => {
                const datetime = item.dt_txt.split(' ');
                if (!this.days[datetime[0]]) {
                    this.days[datetime[0]] = {};
                }
                this.days[datetime[0]][datetime[1]] = item;
            });
        }
    }

    render() {
        this.groupDays();

        return (
            <div className="row ml-md-4 mt-4 main-container">
                <div className="col-12">
                    {this.getCityInfo()}
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
