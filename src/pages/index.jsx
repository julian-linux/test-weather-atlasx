import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Sidebar from 'components/sidebar';

import Main from 'pages/main';

import { init } from 'actions/app';

import { Progress } from 'reactstrap';

import 'assets/main.scss';

class App extends Component {
    componentWillMount() {
        this.props.actionInit();
    }

    render() {
        let html;
        if (this.props.appState.isFetching) {
            html = (
                <div className="row justify-content-center main__loading-row">
                    <div className="col-4">
                        <Progress animated value={100} />
                    </div>
                </div>
            );
        } else {
            html = (
                <div className="row">
                    <div className="col-md-4 sidebar__container">
                        <Sidebar />
                    </div>
                    <div className="col-md-8 main__container">
                        <Main />
                    </div>
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-12">
                    {html}
                </div>
            </div>
        );
    }
}

App.propTypes = {
    appState: PropTypes.object,// eslint-disable-line
    actionInit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    appState: state.app,
});


const mapDispatchToProps = ({
    actionInit: init,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
