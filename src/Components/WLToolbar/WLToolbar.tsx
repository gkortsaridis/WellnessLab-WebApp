import * as React from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import WLToolbarBrowser from "./WLToolbarBrowser";
import WLToolbarMobile from "./WLToolbarMobile";

type WLToolbarProps = {
    onPageSelected: (page: string) => void;
    activePage: string
}

class WLToolbar extends React.Component<WLToolbarProps, {}> {

    constructor(props: WLToolbarProps, state: {}) {
        super(props, state);

        this.onPageSelected = this.onPageSelected.bind(this)
    }

    private onPageSelected(page: string) {
        this.props.onPageSelected(page)
    }

    render() {
        return (
            <div>
                <BrowserView>
                    <WLToolbarBrowser activePage={this.props.activePage} onPageSelected={this.onPageSelected} />
                </BrowserView>
                <MobileView>
                    <WLToolbarMobile onPageSelected={this.onPageSelected} />
                </MobileView>
            </div>
        )
    }


}

export default WLToolbar