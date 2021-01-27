import * as React from 'react';

class Seminars extends React.Component<{ }, {}> {

    /*constructor(props: {}, state: {}) {
        super(props, state);
    }*/

    render() {
        return (
            <div style={this.styles.container}>
                <h1>Seminars</h1>
            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            background: 'white'
        }
    }
}

export default Seminars