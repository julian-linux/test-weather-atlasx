import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';// eslint-disable-line
import { Button, Input } from 'reactstrap';

import _ from 'lodash';// eslint-disable-line

// import { setName } from 'actions/hotels';

// import './styles.scss';


class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        };
        this.updateSearhText = this.updateSearhText.bind(this);
        this.searchForm = this.searchForm.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return !_.isEqual(this.state, nextState);
    // }

    searchForm() {// eslint-disable-line
        // this.props.actionSetName(this.state.searchText);
    }

    updateSearhText(evt) {
        const searchText = evt.target.value;
        this.setState({ searchText });
    }

    render() {
        // const { isFetching } = this.props.hotelState;
        const isFetching = false;

        return (
            <div className="row searchForm__main">
                <div className="col-9">
                    <Input
                        placeholder="Search Cities"
                        onChange={this.updateSearhText}
                        value={this.state.searchText}
                        required
                    />
                </div>
                <div className="col-3">
                    <Button
                        color="primary"
                        onClick={this.searchForm}
                        disabled={isFetching}
                    >
                        Search
                    </Button>
                </div>
            </div>
        );
    }
}

SearchForm.propTypes = {
    // hotelState: PropTypes.object,// eslint-disable-line
    // actionSetName: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({// eslint-disable-line
    // hotelState: state.hotels,
});

const mapDispatchToProps = ({
    // actionSetName: setName,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
