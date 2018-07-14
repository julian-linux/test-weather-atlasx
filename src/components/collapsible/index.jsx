import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, CardBody, Card } from 'reactstrap';

import './styles.scss';

class Collapsible extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: props.isOpen,
            actualIcon: props.isOpen ? 'chevron-up' : 'chevron-down',
        };

        this.hideContent = this.hideContent.bind(this);
        this.changeIcon = this.changeIcon.bind(this);
    }

    changeIcon() {
        const actualIcon = this.state.open ? 'chevron-up' : 'chevron-down';

        this.setState({ actualIcon });
    }

    hideContent(evt) {
        if (evt) {
            evt.preventDefault();
        }

        this.setState({
            open: !this.state.open,
        });
    }

    buildTitle() {
        const classIconLeft = `text-primary mt-2 float-left fas fa-${this.props.icon} fa-lg`;
        const classIconRight = `text-primary mt-2 float-right fas fa-${this.state.actualIcon} fa-lg`;

        return (
            <div role="button" tabIndex={0} className="row collapsible__header" onClick={this.hideContent} onKeyPress={this.hideContent} >
                <div className="col-12">
                    <span className={classIconLeft} />
                    <span className="collapsible__title">{this.props.title}</span>
                    <span className={classIconRight} />
                </div>
            </div>
        );
    }

    render() {
        const title = this.buildTitle();
        const { children } = this.props;

        return (
            <div className="row collapsible__main">
                <div className="col-12">{title}</div>
                <div className="col-12">
                    <Collapse
                        isOpen={this.state.open}
                        onExited={this.changeIcon}
                        onEntered={this.changeIcon}
                    >
                        <Card>
                            <CardBody>
                                {children}
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            </div>
        );
    }
}

Collapsible.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    isOpen: PropTypes.bool,
};

Collapsible.defaultProps = {
    isOpen: true,
};

export default Collapsible;
