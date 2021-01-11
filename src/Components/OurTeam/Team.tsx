import * as React from 'react';
import Anastasia from "../../Images/anastasia_aivatoglou.png";
import Chrysoula from "../../Images/chrysoula_grigoropoulou.png";
import maria from "../../Images/maria_dimitriadou.png";
import georgia from "../../Images/georgia_pantazi.png";
import ioanna from "../../Images/ioanna_koutsiona.png";
import {TeamMember} from "../../Entities/Entities";
import WellnessTeamCard from "../CustomUIComponents/WellnessTeamCard/WellnessTeamCard";

class Team extends React.Component<{ }, {}> {

    private team: TeamMember[] = []

    constructor(props: {}, state: {}) {
        super(props, state);

        this.team.push({
            name: "Αναστασία\nΑιβάτογλου",
            image: Anastasia,
            title: "Co-founder",
            bio: "Η Αναστασία σπούδασε Ψυχολογία στο Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης και αποφοίτησε το 2018. Το 2019 ολοκλήρωσε τις Μεταπτυχιακές της Σπουδές στο Πανεπιστήμιο του Leeds της Αγγλίας με ειδίκευση στην Ψυχολογία της Υγείας. Έκτοτε ζει και εργάζεται στο Ηνωμένο Βασίλειο.\n\nΗ Αναστασία έχει μια μακρόχρονη εμπειρία σε διάφορους τομείς της ψυχικής υγείας. Έχει εργαστεί εθελοντικά σε δομές στήριξης παιδιών αλλά και ενηλίκων με χρόνιες ασθένειες ή βιώματα πένθους. Ακόμα, έχει εργαστεί στον τομέα της ψυχοκοινωνικής στήριξης ατόμων τρίτης ηλικίας. Σήμερα, παράλληλα με το WellnessLab και την εργασία της, στοχεύει στη διαρκή εκπαίδευση και κατάρτιση στο πεδίο της ψυχολογίας.",
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
            ],
        })
        this.team.push({
            name: "Χρύσα Γρηγοροπούλου",
            image: Chrysoula,
            title: "Co-founder",
            bio: "Η Χρύσα ολοκλήρωσε τις προπτυχιακές της σπουδές στην Ψυχολογία στο Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης το 2018. Ακολουθώντας τον κλάδο της Ψυχολογίας της Υγείας έλαβε το μεταπτυχιακό της δίπλωμα από την Ιατρική Σχολή του Πανεπιστημίου του Nottingham στην Αγγλία, το 2019.\n\nΔιαθέτει μακρόχρονη εθελοντική εμπειρία στη συμβουλευτική ενηλίκων, στη ψυχοκοινωνική στήριξη παιδιών και εφήβων με νεοπλασματικές ασθένειες και στην καταπολέμηση της παιδικής επισιτιστικής ανασφάλειας. Σήμερα ζει στην Αθήνα και εργάζεται ως Ψυχολόγος και Συντονίστρια προγράμματος στον τομέα της προαγωγής υγείας για άτομα Τρίτης Ηλικίας και είναι συν-ιδρύτρια της σελίδας WellnessLab. Μέσα από ποικίλα εκπαιδευτικά προγράμματα και δράσεις συνεχίζει να καταρτίζεται στον τομέα της Ψυχολογίας.",
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
        })
        this.team.push({
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
        })
        this.team.push({
            name: "Γεωργία\nΠανταζή",
            image: georgia,
            title: "Content writer",
            bio: "Η Γεωργία σπούδασε Ψυχολογία στο Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης και αποφοίτησε το 2019. Το 2020 ακολούθησε και ολοκλήρωσε Μεταπτυχιακές Σπουδές στον κλάδο των Αναπτυξιακών Διαταραχών, στο Πανεπιστήμιο του Nottingham της Αγγλίας.\n\nΔιαθέτει εμπειρία στην ψυχολογική υποστήριξη παιδιών και εφήβων με αναπτυξιακές και ψυχοσυναισθηματικές δυσκολίες και πολυετή εθελοντική εμπειρία στην ΜΚΟ «Το Χαμόγελο του Παιδιού» Θεσσαλονίκης. Σήμερα, δραστηριοποιείται επαγγελματικά σε Κέντρα Ειδικών Θεραπειών στην Χαλκίδα και παράλληλα μετεκπαιδεύεται στη Γνωστική-Συμπεριφορική Ψυχοθεραπεία, στοχεύοντας στην περαιτέρω επαγγελματική της κατάρτιση. Ακόμη, είναι εθελόντρια αρθρογράφος στην σελίδα WellnessLab, αποσκοπώντας στην καλύτερη δυνατή προαγωγή και υποστήριξη της ψυχικής υγείας.",
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
        })
        this.team.push({
            name: "Ιωάννα\nΚουτσιώνα",
            image: ioanna,
            title: "Content writer",
            bio: "Η Ιωάννα αποφοίτησε από το τμήμα Ψυχολογίας του Α.Π.Θ. το 2019. Το 2020 ολοκλήρωσε τις μεταπτυχιακές της σπουδές στο αντικείμενο της εργασιακής και οργανωτικής ψυχολογίας στο Πανεπιστήμιο της Ουτρέχτης στην Ολλανδία.\n\nΩς προπτυχιακή φοιτήτρια, συμμετείχε εθελοντικά επί χρόνια στις δράσεις του Χαμόγελου του Παιδιού. Κατά το μεταπτυχιακό της, έκανε την πρακτική της ως εργασιακή ψυχολόγος σε μεγάλη ολλανδική εταιρεία και συνεργάστηκε με εταιρείες του εξωτερικού με σκοπό την παροχή συμβουλευτικής. Σήμερα τα αντικείμενα ενασχόλησης και ενδιαφέροντος της είναι η ευημερία, η δέσμευση και η κινητοποίηση των εργαζομένων και συνεχίζει να μετεκπαιδεύεται πάνω σε αυτά. Παράλληλα, είναι αρθρογράφος στο wellnesslab με σκοπό την περαιτέρω συνεισφορά στον τομέα της ψυχικής υγείας.",
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
        })
    }

    render() {
        const teamLeaders: JSX.Element[] = []
        const team: JSX.Element[] = []

        for (let i=0; i<2; i++) {
            teamLeaders.push(
                <div style={this.styles.itemCardContainer}>
                    <WellnessTeamCard person={this.team[i]}/>
                </div>
            )
        }

        for (let i=2; i<this.team.length; i++) {
            team.push(
                <div style={this.styles.itemCardContainer}>
                    <WellnessTeamCard person={this.team[i]}/>
                </div>
            )
        }

        return (
            <div style={this.styles.container}>
                <h3 style={this.styles.introText}>Αυτό είναι ένα σύντομο κείμενο που θα περιγραφει την ομάδα </h3>
                <div style={this.styles.cardsContainer}> {teamLeaders} </div>
                <div style={this.styles.cardsContainer}> {team} </div>
            </div>
        )
    }

    styles = {
        container: {
            flex: 1,
            backgroundColor: '#F7F7F7'
        },
        cardsContainer: {
            width: '75%',
            flexDirection: 'row' as 'row',
            display: 'flex',
            flexWrap: 'wrap' as 'wrap',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        introText: {fontWeight: 100, padding: 20},
        itemCardContainer: {flexGrow: 1, padding: '10px', display: 'flex', flexDirection: 'column' as 'column', justifyContent: 'center' as 'center', alignItems: 'center' as 'center'},
        teamMemberCard: {width: '250px',height: '270px', display: 'flex', flexDirection: 'column' as 'column', backgroundColor: 'white', alignItems: 'center' as 'center'},
        teamMemberSocialIcon: {width: '30px', height: '30px', padding: 15, color:'rgb(99, 148, 140)'},
        teamMemberSocialsContainer: {display: 'flex', flexDirection: 'row' as 'row'},
        teamMemberImg: {width: '120px', height: '120px', marginTop: '20px'},
        teamMemberTextContainer: { fontSize: '22px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)', padding: '30px'},
        teamMemberName: { fontSize: '20px', lineHeight: '25px', fontWeight: 500, color: 'rgb(99, 148, 140)', whiteSpace: 'pre-line' as 'pre-line',},
        teamMemberTitle: { fontSize: '16px', lineHeight: '16px', fontWeight: 500, color: 'rgb(255,63,128)', marginTop: '10px'}
    }
}

export default Team