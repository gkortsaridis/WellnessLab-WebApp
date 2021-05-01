import * as React from 'react';
import "rmwc/styles";
import {MenuItem, SimpleMenu, IconButton} from 'rmwc';
import logoWhite from "../../Images/logo_white.png";
import {ACTIONS, HOME, SUBJECTS, TEAM } from "../../Entities/AppRoutes";
import menu from '../../Images/menu.png'
import {wellnessLabPrimary} from "../../Entities/Colors";

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
                        <SimpleMenu onSelect={evt => this.onMenuItemClicked(evt.detail.index)} handle={<img style={{width: 25, height: 25}} src={menu}/>} anchorCorner={'bottomLeft'}>
                            <MenuItem>Αρχική</MenuItem>
                            <MenuItem>Θέματα</MenuItem>
                            <MenuItem>Δράσεις</MenuItem>
                            <MenuItem>Ομάδα</MenuItem>
                        </SimpleMenu>
                    </div>
                </div>
            </div>
        )
    }

    stylesMobile = {
        container: {
            backgroundColor:wellnessLabPrimary,
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
            width: 50,
            height: 50,
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
        }
    }
}

export default WLToolbarMobile