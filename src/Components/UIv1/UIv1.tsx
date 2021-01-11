import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { ParallaxHover } from 'react-parallax-hover';

//Images
import Anastasia from '../../Images/anastasia_aivatoglou.png'
import Chrysoula from '../../Images/chrysoula_grigoropoulou.png'
import georgia from '../../Images/georgia_pantazi.png'
import ioanna from '../../Images/ioanna_koutsiona.png'
import maria from '../../Images/maria_dimitriadou.png'
import Facebook from '../../Images/facebook.png'
import Twitter from '../../Images/twitter.png'
import Instagram from '../../Images/instagram.png'
import LinkedIn from '../../Images/linkedin.png'
import cover from '../../Images/cover.jpg'
import Email from '../../Images/email.png'
import {Article, SocialMedia, TeamMember} from "../../Entities/Entities";
import {TopAppBar, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from "rmwc";
import {wellnessLabPrimary} from "../../Entities/Colors";
import logoWhite from "../../Images/logo_white.png";
import {HOME} from "../../Entities/AppRoutes";

type WLToolbarProps = {
    history: any
}

type WLToolabrState = {
    articles: Article[]
    team: TeamMember[],
    socialMedia: SocialMedia[]
}

class UIv1 extends React.Component<WLToolbarProps, WLToolabrState> {

    constructor(props: WLToolbarProps, state:WLToolabrState) {
        super(props, state);
        this.state = {
            articles: [],
            team: [
                {
                    name: "Αναστασία\nΑιβάτογλου",
                    image: Anastasia,
                    title: "Co-founder",
                    bio: "",
                    social: [
                        {
                            name: "facebook",
                            url: "https://www.facebook.com/anastasia.aivatoglou.7"
                        },
                        {
                            name: "linkedin",
                            url: "https://www.linkedin.com/in/anastasia-aivatoglou-963278173/"
                        },
                        {
                            name: "mail",
                            url: "mailto:an.aivatoglou@gmail.com"
                        }
                    ]
                }, {
                    name: "Χρύσα\nΓρηγοροπούλου",
                    image: Chrysoula,
                    title: "Co-founder",
                    bio: "",
                    social: [
                        {
                            name: "facebook",
                            url: "https://www.facebook.com/chrysgr9"
                        },
                        {
                            name: "linkedin",
                            url: "https://www.linkedin.com/in/chrysoula-grigoropoulou-728b02176/"
                        },
                        {
                            name: "mail",
                            url: "mailto:grigoropoulou.chrys@gmail.com\n"
                        }
                    ]
                }, {
                    name: "Μαρία\nΔημητριάδου",
                    image: maria,
                    title: "Content writer",
                    bio: "",
                    social: [
                        {
                            name: "facebook",
                            url: "https://www.facebook.com/profile.php?id=100005508162148"
                        },
                        {
                            name: "instagram",
                            url: "https://www.instagram.com/maria_dmtr/"
                        },
                        {
                            name: "mail",
                            url: "mailto:dimitriadoumaria00@gmail.com"
                        }
                    ]
                }, {
                    name: "Γεωργία\nΠανταζή",
                    image: georgia,
                    title: "Content writer",
                    bio: "",
                    social: [
                        {
                            name: "facebook",
                            url: "https://www.facebook.com/profile.php?id=100019096519794"
                        },
                        {
                            name: "mail",
                            url: "mailto:geopantazi96@gmail.com\n"
                        },
                        {
                            name: "linkedin",
                            url: "https://www.linkedin.com/in/georgia-pantazi-6072a3200/"
                        }
                    ]
                }, {
                    name: "Ιωάννα\nΚουτσιώνα",
                    image: ioanna,
                    title: "Content writer",
                    bio: "",
                    social: [
                        {
                            name: "facebook",
                            url: "https://www.facebook.com/profile.php?id=100000424791709"
                        },
                        {
                            name: "instagram",
                            url: "https://www.instagram.com/ioannakoutsiona/"
                        },
                        {
                            name: "linkedin",
                            url: "https://www.linkedin.com/in/ioanna-koutsiona-529797193?fbclid=IwAR2K7zJCylS4lNfR1Yimq0wno-gidwbC4K6vAphs1KvNRKvjdtsvlDSsRRE"
                        }
                    ]
                }
            ],
            socialMedia: [
                {
                    name: "Facebook",
                    url: "https://www.facebook.com/WellnessLab-104016004679802/"
                }, {
                    name: "Instagram",
                    url: "https://www.instagram.com/wellnesslab__/?hl=en"
                }, {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/company/wellnesslab-psy/"
                }, {
                    name: "Twitter",
                    url: "https://twitter.com/WellnessLab_psy"
                }, {
                    name: "Email",
                    url: "mailto:wellnesslab@gmail.com"
                }
            ]
        };

        this.clickedLink = this.clickedLink.bind(this)
    }

    componentDidMount() {
        fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@wellnesslab-psy")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    const articles: Article[] = []
                    for(let i=0; i<result.items.length; i++) {
                        const item = result.items[i]
                        const article: Article = {
                            title: item["title"],
                            imgUrl: item["thumbnail"],
                            articleUrl: item["link"]
                        }
                        articles.push(article)
                    }

                    this.setState({articles: articles})
                },
                (error) => { }
            )
    }

    private clickedLink(link: string) {
        window.open(link, "_blank", "noopener")
    }

    render() {
        const articleItems: JSX.Element[] = [];
        const teamItems: JSX.Element[] = [];
        const socialItems: JSX.Element[] = [];

        for (let i=0; i<this.state.articles.length; i++) {
            articleItems.push(
                <div style={this.styles.itemCardContainer} onClick={(e) => this.clickedLink(this.state.articles[i].articleUrl)}>
                    <ParallaxHover width={302} height={502} rotation={9} shadow={2} borderRadius={15}>
                        <div style={this.styles.articleCard}>
                            <div style={Object.assign({background: 'url('+this.state.articles[i].imgUrl+') center / cover'}, this.styles.articleImage)}></div>
                            <div style={this.styles.articleTitleContainer}>
                                <p style={this.styles.articleTitleText}>{this.state.articles[i].title}</p>
                            </div>
                        </div>
                    </ParallaxHover>
                </div>
            );
        }

        for (let i=0; i<this.state.socialMedia.length; i++) {
            socialItems.push(
                <div style={this.styles.itemCardContainer} >
                    <ParallaxHover width={252} height={252} rotation={9} shadow={2} borderRadius={15}>
                        <div style={this.styles.socialMediaCard}  onClick={(e) => {this.clickedLink(this.state.socialMedia[i].url)}}>
                            <img alt={"social media icon"} style={this.styles.socialMediaImg} src={
                                this.state.socialMedia[i].name === "Facebook"
                                    ? Facebook
                                    : this.state.socialMedia[i].name === "Twitter"
                                    ? Twitter
                                    : this.state.socialMedia[i].name === "Instagram"
                                        ? Instagram
                                        : this.state.socialMedia[i].name === "LinkedIn"
                                            ? LinkedIn
                                            : Email
                            }/>
                            <div style={this.styles.socialMediaTxt}>{this.state.socialMedia[i].name}</div>

                        </div>
                    </ParallaxHover>
                </div>
            )
        }

        for (let i=0; i<this.state.team.length; i++) {
            const personSocial: JSX.Element[] = [];

            for (let j=0; j<this.state.team[i].social.length; j++) {
                personSocial.push(
                    <div onClick={(e) => {this.clickedLink(this.state.team[i].social[j].url)}} >
                        <FontAwesomeIcon icon={
                            this.state.team[i].social[j].name === "facebook"
                                ? faFacebook
                                : this.state.team[i].social[j].name === "linkedin"
                                ? faLinkedin
                                : this.state.team[i].social[j].name === "instagram"
                                    ? faInstagram
                                    : this.state.team[i].social[j].name === "mail"
                                        ? faMailBulk
                                        : faTwitter
                        } style={this.styles.teamMemberSocialIcon}/>

                    </div>
                )
            }

            teamItems.push(
                <div style={this.styles.itemCardContainer}>
                    <ParallaxHover width={252} height={272} rotation={9} shadow={2} borderRadius={15} light={0}>
                        <div style={this.styles.teamMemberCard}>
                            <img alt={"team member icon"} style={this.styles.teamMemberImg} src={this.state.team[i].image}/>
                            <div style={this.styles.teamMemberTextContainer}>
                                <p>
                                    <div style={this.styles.teamMemberName}> {this.state.team[i].name} </div>
                                    <div style={this.styles.teamMemberTitle}> {this.state.team[i].title} </div>
                                </p>
                            </div>
                        </div>
                    </ParallaxHover>
                    <div style={this.styles.teamMemberSocialsContainer}>{personSocial}</div>
                </div>
            )
        }

        return (
            <div style={{whiteSpace: 'pre-wrap'}} className="App">
                <div>
                    <div>
                        <TopAppBar fixed style={{backgroundColor: wellnessLabPrimary}}>
                            <TopAppBarRow>
                                <TopAppBarSection>
                                    <img alt={"Logo"} src={logoWhite} style={this.styles.logo}/>
                                    <TopAppBarTitle>WellnessLab</TopAppBarTitle>
                                </TopAppBarSection>
                            </TopAppBarRow>
                        </TopAppBar>

                        <div>
                            <div id="intro" className="section scrollspy" style={this.styles.introContainer}>
                                <h1 style={this.styles.introText}>
                                    Το WellnessLab σας ενημερώνει για θέματα σωματικής υγείας και πώς αυτά επηρεάζουν την ψυχική μας υγεία. Προωθεί την προσωπική και συλλογική ευημερία και στοχεύει στην παροχή υποστήριξης σε ζητήματα που αφορούν τη σωματική και ψυχική ευεξία.
                                </h1>
                            </div>

                            <div id="arthra" style={this.styles.articlesContainer}>
                                <h2 style={this.styles.sectionHeader}>Άρθρα</h2>
                                <div style={this.styles.articlesDiv}> {articleItems} </div>
                            </div>

                            <div id="health_experiences" style={this.styles.healthExperiencesContainer}>
                                <h2 style={this.styles.sectionHeader}>Εμπειρίες Υγείας</h2>
                                <h4 style={this.styles.healthExperiencesText}>
                                    Μοιράσου και εσύ τη δική σου εμπειρία υγείας ανώνυμα, συμπληρώνοντας την παρακάτω <a target="_blank" href={"https://forms.gle/5jbZK3NRPLDWhdrn9"} rel="noopener noreferrer">φόρμα</a>
                                </h4>
                            </div>

                            <div className="parallax-container">
                                <img alt={"cover"} src={cover} style={this.styles.parallaxImage}/>
                            </div>

                            <div id="social_media" style={this.styles.socialMediaContainer} >
                                <h2 style={this.styles.sectionHeader}> Social Media </h2>
                                <div style={this.styles.socialMediaDiv}>
                                    {socialItems}
                                </div>
                            </div>

                            <div id="team" style={this.styles.teamContainer}>
                                <h2 style={this.styles.sectionHeader}> Ομάδα </h2>
                                <div style={this.styles.teamDiv}>
                                    {teamItems}
                                </div>
                            </div>

                            <div style={this.styles.bottomBar} onClick={() => {
                                this.props.history.push(HOME)
                            }}></div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }

    cardRadius = '15px'

    styles = {
        toolbar: {color: 'white', backgroundColor: 'rgb(99, 148, 140)', height: 60},
        toolbarLogo: {height: '100%'},
        introContainer: {paddingLeft: '15%', paddingRight: '15%', paddingTop: '100px', paddingBottom: '100px'},
        introText: {fontWeight: 100, fontSize: 56},
        articlesContainer: {backgroundColor: 'rgb(247,247,247)', paddingTop: '30px', paddingBottom: '30px'},
        sectionHeader: {marginLeft: '30px', color: 'rgb(99, 148, 140)', fontWeight: 400, fontSize: 45},
        articlesDiv: {width: '75%', flexDirection: "row" as 'row', display: 'flex', flexWrap: 'wrap' as "wrap", marginLeft: 'auto', marginRight: 'auto'},
        healthExperiencesContainer: {paddingTop: '30px', paddingBottom: '30px'},
        healthExperiencesText: {marginLeft: '30px', marginRight: '30px', fontWeight: 400, fontSize: 24},
        parallaxImage: {height: '500px', width: '100vw', objectFit: 'cover' as 'cover'},
        socialMediaContainer: {paddingTop: '30px', paddingBottom: '30px'},
        socialMediaDiv: {width: '75%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto'},
        teamContainer: {backgroundColor: 'rgb(247,247,247)', paddingTop: '30px', paddingBottom: '30px'},
        teamDiv: {width: '75%', flexDirection: 'row' as 'row', display: 'flex', flexWrap: 'wrap' as 'wrap', marginLeft: 'auto', marginRight: 'auto'},
        bottomBar: {height: '100px', backgroundColor: 'rgb(99, 148, 140)'},
        itemCardContainer: {flexGrow: 1, padding: '10px', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        articleCard: {borderRadius: this.cardRadius, width: '300px', height: '500px',display: "flex", flexDirection: 'column' as 'column', backgroundColor: 'white', border: '1px solid black'},
        articleImage: {width: '300px', height: '400px', overflow: 'hidden', borderRadius: this.cardRadius},
        articleTitleContainer: {width: '300px', height: '100px', backgroundColor: 'white', display: 'table', textAlign: 'center' as 'center', borderRadius: this.cardRadius},
        articleTitleText: {textDecoration: 'none', color: 'black', textAlign: 'center' as 'center', fontSize: '20px', display: 'table-cell', verticalAlign: 'middle', padding: '5px'},
        socialMediaCard: {display: 'flex', flexDirection: 'column' as 'column', width: '250px', height: '250px', backgroundColor: '#F7F7F7', justifyContent: 'center' as 'center', alignItems: 'center' as 'center', border: '1px solid black', borderRadius: this.cardRadius},
        socialMediaImg: {width: '150px', height: '150px', padding: '30px'},
        socialMediaTxt: {textDecoration:'none', fontSize: '20px', marginBottom: 16},
        teamMemberCard: {width: '250px',height: '270px', display: 'flex', flexDirection: 'column' as 'column', backgroundColor: 'white', border: '1px solid black', borderRadius: this.cardRadius, alignItems: 'center' as 'center'},
        teamMemberSocialIcon: {width: '30px', height: '30px', padding: 15, color:'rgb(99, 148, 140)'},
        teamMemberSocialsContainer: {display: 'flex', flexDirection: 'row' as 'row'},
        teamMemberImg: {width: '120px', height: '120px', marginTop: '20px'},
        teamMemberTextContainer: {fontSize: '22px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)', padding: '20px'},
        teamMemberName: { fontSize: '20px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)'},
        teamMemberTitle: { fontSize: '16px', lineHeight: '16px', fontWeight: 500, color: 'rgb(255,63,128)', marginTop: '10px'},
        logo: {width: 40, height: 40, marginRight: 20 },
    }

}

export default UIv1