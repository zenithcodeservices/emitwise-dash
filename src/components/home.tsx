import styles from '../styles/Home.module.css'
import Typography from '@mui/material/Typography';
import https from "https"
import { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, LinearScale, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'




export default function Home () {


    ChartJS.register(...registerables);


    const graphConfig = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            type: 'bar',
            label: 'Emissions Overview',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
            'rgba(0, 211, 185, 1)',
            ],
            borderColor: [
            'rgba(3, 133, 117, 1)',
            ],
            borderWidth: 1,
            order: 2
        }, {
            type: 'line',
            label: 'Emissions Intensity',
            data: [20, 18, 22, 40, 10, 5],
            backgroundColor: [
                'rgba(167, 97, 193, 1)',
            ],
            borderColor: [
                'rgba(167, 97, 193, 1)',
            ],
            borderWidth: 1,
            order: 1
        }]
    }

    const [APICallComplete, setAPICallComplete] = useState(false);
    const [totalEmissions, setTotalEmissions] = useState([])
    const [emissionIntensity, setEmissionIntensity] = useState([])

    useEffect(() => {
        callAPI()
    }, [])      
    
    const callAPI = async () => {
        try {

            const agent = new https.Agent({  
              rejectUnauthorized: false
            });

            const res = await fetch('https://api-dev.emitwise.com/interview/data');

            if (!res.ok) {
                throw new Error(`Error! status: ${res.status}`);
            }
        
            const data = await res.json();
            setTotalEmissions(data["Total emissions"])
            setEmissionIntensity(data["Emission intensity"])
            console.log(data)
            setAPICallComplete(true)

         } catch (error) {

            console.log(error);
            setAPICallComplete(true)
         }
      }

    return (
            <div className={styles.wrapper}>
                <Typography variant="h4" className={styles.title}>
                    Antwerp plant
                </Typography>
                <Typography variant="h6" className={styles.subtitle}>
                    The carbon emissions dashboard of our chemical plant in Antwerp contains information on the emissions of our facility, as well as the emissions of the facilities in the surrounding area. This information is essential in order to monitor and reduce our carbon footprint.
                </Typography>
                    <div className={styles.graphWrapper}>
                        <Chart
                            data={graphConfig}
                            width={500}
                            height={500}
                            options={{
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
            </div>
    )

}