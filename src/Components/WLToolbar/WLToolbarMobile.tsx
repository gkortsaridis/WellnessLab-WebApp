import * as React from 'react';
import "rmwc/styles";
import {MenuItem, IconButton, SimpleMenu } from 'rmwc';
import coverImg from "../../Images/cover1.jpg";
import logoWhite from "../../Images/logo_white.png";
import {ACTIONS, HOME, SUBJECTS, TEAM } from "../../Entities/AppRoutes";

type WLToolbarProps = {
    onPageSelected: (page: string) => void;
}

type WLToolbarMobileState = {
    menuOpen: boolean;
}

class WLToolbarMobile extends React.Component<WLToolbarProps, WLToolbarMobileState> {

    constructor(props: WLToolbarProps, state: WLToolbarMobileState) {
        super(props, state);

        this.state = {menuOpen: false}

        this.onPageSelected = this.onPageSelected.bind(this)
        this.onMenuItemClicked = this.onMenuItemClicked.bind(this)

    }

    private onPageSelected(page: string) {
        this.props.onPageSelected(page)
    }

    private onMenuItemClicked(index: number) {
        const items = [HOME, SUBJECTS, ACTIONS, TEAM]
        this.props.onPageSelected(items[index])
    }

    render() {
        return (
            <div style={this.stylesMobile.container}>
                <div style={this.stylesMobile.row1}>
                    <img alt={"Logo"} src={logoWhite} style={this.stylesMobile.logo}/>

                    <p style={this.stylesMobile.logoText}>WellnessLab</p>

                    <div style={this.stylesMobile.menu}>
                        <SimpleMenu onSelect={evt => this.onMenuItemClicked(evt.detail.index)} handle={<IconButton icon={"menu"} />} anchorCorner={'bottomLeft'}>
                            <MenuItem>Αρχική</MenuItem>
                            <MenuItem>Θέματα</MenuItem>
                            <MenuItem>Δράσεις</MenuItem>
                            <MenuItem>Ομάδα</MenuItem>
                        </SimpleMenu>
                    </div>
                </div>

                <div style={this.stylesMobile.fader}/>

            </div>
        )
    }

    stylesMobile = {
        container: {
            backgroundImage:`url(${coverImg})`,
            backgroundSize: 'cover',
            display: 'flex',
            flexDirection: 'column' as 'column'
        },
        row1: {
            display: 'flex',
            flexDirection: 'row' as 'row',
            alignItems: 'center' as 'center',
            height: 60
        },
        logo: {
            width: 30,
            height: 30,
            margin: 10
        },
        logoText: {
            color: 'white',
            flexGrow: 1,
            textAlign: 'center' as 'center',
            fontSize: 25,
            alignSelf: 'center',
            height: 25,
            marginTop: 17.5
        },
        menu: {
          marginRight: 20
        },
        fader: {
            height: 10,
            background: "linear-gradient(transparent, #ffffff)"
        }
    }
}

export default WLToolbarMobile