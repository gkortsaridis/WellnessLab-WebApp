import * as React from 'react';
import { TopAppBar, TopAppBarFixedAdjust, TopAppBarRow, TopAppBarSection, TopAppBarTitle } from 'rmwc';
import logoWhite from "../../Images/logo_white.png";
import WLToolbarItem from "./WLToolbarItem";
import {wellnessLabPrimary} from "../../Entities/Colors";
import {ACTIONS, HOME, SUBJECTS, TEAM } from "../../Entities/AppRoutes";

type WLToolbarProps = {
    onPageSelected: (page: string) => void;
    activePage: string
}

class WLToolbarBrowser extends React.Component<WLToolbarProps, {}> {

    constructor(props: WLToolbarProps, state: {}) {
        super(props, state);

        this.onPageSelected = this.onPageSelected.bind(this)
    }

    private onPageSelected(page: string) {
        this.props.onPageSelected(page)
    }

    render() {
        return (
            <div style={this.stylesBrowser.container}>
                <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                    <TopAppBarRow>
                        <TopAppBarSection>
                            <img alt={"Logo"} src={logoWhite} style={this.stylesBrowser.logo}/>
                            <TopAppBarTitle style={this.stylesBrowser.siteName}>WellnessLab</TopAppBarTitle>
                        </TopAppBarSection>
                    </TopAppBarRow>
                    <TopAppBarRow>
                        <TopAppBarSection >
                            <WLToolbarItem activePage={this.props.activePage} name={"Αρχική"} link={HOME} onPageSelected={this.onPageSelected} />
                            <WLToolbarItem activePage={this.props.activePage} name={"Θέματα"} link={SUBJECTS} onPageSelected={this.onPageSelected} />
                            <WLToolbarItem activePage={this.props.activePage} name={"Δράσεις"} link={ACTIONS} onPageSelected={this.onPageSelected} />
                            <WLToolbarItem activePage={this.props.activePage} name={"Ομάδα"} link={TEAM} onPageSelected={this.onPageSelected} />
                        </TopAppBarSection>
                    </TopAppBarRow>
                </TopAppBar>
                <TopAppBarFixedAdjust />
            </div>
        )
    }

    stylesBrowser = {
        container: {backgroundColor: '#63948C', backgroundSize: 'cover', display: 'flex', flexDirection: 'column' as 'column', paddingBottom: 64},
        logo: {width: 60, height: 60, marginRight: 20 },
        siteName: {fontSize: 25}
    }
}

export default WLToolbarBrowser