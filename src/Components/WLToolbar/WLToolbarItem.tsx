import * as React from 'react';
import { Ripple } from 'rmwc';

type WLToolbarItemProps = {
    name: string,
    link: string,
    activePage: string
    onPageSelected: (page: string) => void
}

type WLToolbarItemState = {
    isHovering: boolean
}

class WLToolbarItem extends React.Component<WLToolbarItemProps, WLToolbarItemState> {

    isActive = false

    constructor(props: WLToolbarItemProps, state: WLToolbarItemState) {
        super(props, state);

        this.state = {isHovering: false}

        this.onMouseEnter = this.onMouseEnter.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
        this.onClick = this.onClick.bind(this)
    }


    private onMouseEnter() {
        this.setState({
            isHovering: true
        })
    }

    private onMouseLeave() {
        this.setState({
            isHovering: false
        })
    }

    private onClick() {
        this.props.onPageSelected(this.props.link)
    }

    render() {
        const activeSplit = this.props.activePage.split("/")
        const currentSplit = this.props.link.split("/")
        const currentCategory = currentSplit[currentSplit.length-1]
        const currentActive = activeSplit[activeSplit.length-1]
        if(currentCategory === "" && currentActive === "") { this.isActive = true }
        else this.isActive = !!(currentCategory !== "" && this.props.activePage.includes(currentCategory));

        return (
            <Ripple>
                <div style={this.styles.container} onClick={this.onClick}>
                    <p
                        style={this.state.isHovering ? this.styles.textHover : this.isActive ? this.styles.textActive : this.styles.textNotHover}
                        onMouseEnter={this.onMouseEnter}
                        onMouseLeave={this.onMouseLeave}
                        onClick={this.onClick}>
                        {this.props.name}
                    </p>
                </div>
            </Ripple>
        )
    }

    styles = {
        container: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            cursor: 'pointer',
            height: 35,
            display: 'flex',
            justifyContent: 'center' as 'center',
            alignItems: 'center' as 'center'
        },
        textHover: {
            color: '#4A6F69',
            fontSize: '17px',
            lineHeight: '30px'
        },
        textActive: {
            color: '#95DED2',
            fontSize: '17px',
            lineHeight: '30px'
        },
        textNotHover: {
            color: 'white',
            fontSize: '17px',
            lineHeight: '30px'
        }
    }
}

export default WLToolbarItem