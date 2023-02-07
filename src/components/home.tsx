import styles from '../styles/Home.module.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Paper } from '@mui/material';

export default function Home () {

    return (
            <div className={styles.wrapper}>
                <Typography variant="h4" className={styles.title}>
                    Antwerp plant
                </Typography>
                <Typography variant="h6" className={styles.subtitle}>
                    The carbon emissions dashboard of our chemical plant in Antwerp contains information on the emissions of our facility, as well as the emissions of the facilities in the surrounding area. This information is essential in order to monitor and reduce our carbon footprint.
                </Typography>
                
            </div>
    )

}