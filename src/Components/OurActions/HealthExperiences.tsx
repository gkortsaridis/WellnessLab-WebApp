import * as React from 'react';

class HealthExperiences extends React.Component<{ }, {}> {

    /*constructor(props: {}, state: {}) {
        super(props, state);
    }*/

    render() {
        return (
            <div style={this.styles.container}>
                <h1>Health Experiences</h1>
                <h2 style={{color: 'rgb(99, 148, 140)', fontWeight: 400}}>Εμπειρίες Υγείας</h2>
                <h4 style={{ fontWeight: 400}}>
                    Μοιράσου και εσύ τη δική σου εμπειρία υγείας ανώνυμα, συμπληρώνοντας την παρακάτω <a target="_blank" href={"https://forms.gle/5jbZK3NRPLDWhdrn9"} rel="noopener noreferrer">φόρμα</a>
                </h4>
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

export default HealthExperiences