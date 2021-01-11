import * as React from 'react';

class Videos extends React.Component<{ }, {}> {

    /*constructor(props: {}, state: {}) {
        super(props, state);
    }*/

    render() {
        return (
            <div style={this.styles.container}>
                <h1>VIDEOS</h1>
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

export default Videos