import React, { Component } from 'react';

import Collapsible from 'components/collapsible';
import SearchForm from 'components/cities-search-form';
import CitiesList from 'components/cities-List';

import './styles.scss';

class Sidebar extends Component {
    componentWillMount() {

    }
    render() {
        return (
            <div className="sidebar__content row">

                <div className="col-12 sidebar__row">
                    <Collapsible
                        icon="search"
                        title="Search Cities"
                    >
                        <SearchForm />
                    </Collapsible>
                </div>

                <div className="col-12 sidebar__row sidebar-cities-list">
                    <Collapsible
                        icon="list"
                        title="Cities List"
                        id="citiesList"
                    >
                        <CitiesList />
                    </Collapsible>
                </div>
            </div>
        );
    }
}

export default Sidebar;
