import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../css/bootstrap.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: null
        };

    }

    componentDidMount() {
        fetch(process.env.REACT_APP_USERS_URL).then(result => result.json())
            .then(data => this.setState(
                {data: data}
            ));
    };

    handleSubmit(evt, id, name) {
        evt.preventDefault();
        const {target} = evt;
        this.setState({id: id});
        const {eventHandler} = this.props;
        eventHandler({id: id, name: name});
    }

    render() {
        return (
            <div className="col-md-4">
                <div className="list-group">
                    {this.state.data.map(item =>
                        <button href='#'
                                key={item.id}
                                onClick={(evt) => this.handleSubmit(evt, item.id, item.name)}
                                className={'list-group-item ' + ((item.id == this.state.id) ? 'active' : '')}>{item.name}</button>)}
                </div>
            </div>
        );
    }
}

List.propTypes = {};

export default List;