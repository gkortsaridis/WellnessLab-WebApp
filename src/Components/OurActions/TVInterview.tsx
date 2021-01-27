import * as React from 'react';
import ReactPlayer from "react-player"

class TVInterview extends React.Component<{ }, {}> {

    /*constructor(props: {}, state: {}) {
        super(props, state);
    }*/

    render() {
        return (
            <div style={this.styles.container}>
                <ReactPlayer
                    width={'100%'}
                    height={'100%'}
                    playsinline={true}
                    url="https://www.youtube.com/watch?v=_6BNxPuA6ik"
                />
            </div>
        )
    }

    styles = {
        container: {flex: 1, background: 'white'}
    }
}

export default TVInterview