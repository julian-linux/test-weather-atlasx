import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'components/collapsible';
import { Table, ListGroup, ListGroupItem } from 'reactstrap';
import map from 'lodash/map';
import main from '../../pages/main';

const days = {};
// import './styles.scss';
const groupDays = data => data.forEach((item) => {
    const datetime = item.dt_txt.split(' ');
    if (!days[datetime[0]]) {
        days[datetime[0]] = {};
    }
    days[datetime[0]][datetime[1]] = item;
});

const tempIcon = (<span className="fas fa-thermometer-empty" />);

const getDayInfo = dayInfo => map(dayInfo, (info, hour) => (
    <ListGroupItem
        key={hour}
    >
        <h6 className="text-primary">{hour}</h6>
        <Table borderless responsive size="sm">
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

const setDataList = () => map(days, (dayInfo, date) => (
    <Collapsible
        key={date}
        icon="calendar-alt"
        title={date}
        isOpen={false}
    >
        <ListGroup flush>
            {getDayInfo(dayInfo)}
        </ListGroup>
    </Collapsible>
));

const CityInfo = (props) => {
    const { city } = props;
    groupDays(city.data);
    return (
        <div className="row city-info-container">
            <div className="col-12 mt-2">
                <h3 className="text-primary text-center">
                    Weather for:&nbsp;
                    <span className="text-secondary font-italic">{city.name}</span>
                </h3>
            </div>
            <div className="col-12">
                <div className="row justify-content-center">
                    <div className="col-10">
                        <hr />
                    </div>
                </div>
            </div>
            <div className="col-12">
                {setDataList()}
            </div>
        </div>
    );
};

CityInfo.propTypes = {
    city: PropTypes.object,// eslint-disable-line
};

export default CityInfo;
