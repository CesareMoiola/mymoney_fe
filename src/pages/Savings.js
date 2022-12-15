import React, { useContext } from "react";
import { UserContext } from '../pages/Home';
import Saving from '../components/Saving';
import '../styles/savings.css';
import { useTheme } from '@mui/styles';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import properties from '../data/properties.json';
import { Card, Typography} from '@mui/material';

export default function Savings(props){

    const theme = useTheme();
    const screen = useContext(UserContext).screen;

    const getChartData = () => {
        
        let data = [];
        
        props.savings.map(
            saving => {
                data.push({ name: saving.name, value: (saving.active ? saving.dailyAmount : 0), color: theme.palette.primary_light.main })
            }
        );

        data.push({name:'Remaining', value: props.budget.dailyBudget, color: theme.palette.primary.light })

        return data;
    }
    
    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
              <Card elevation={0} style={{backgroundColor: 'black', opacity:'0.6', borderRadius:'4px', padding:'0 4px'}}>
                <Typography variant='caption' color='white'>
                    { payload[0].name + ': ' + properties.currency + ' ' + payload[0].value }
                </Typography>
              </Card>
            );
          }
        
          return null;
    }

    const getTotalDailySavings = () => {
        let tot = 0;
        
        props.savings.map(saving => { tot += saving.dailyAmount; });

        return tot;
    }
    
    const getDailySavingsChart = () => {
        return (
            <div style={{ display: 'flex', flexDirection:'column', alignItems:'center', marginTop:'32px', gap:'32px'}}>

                <Typography fontWeight='bold'>Daily savings</Typography>
                    
                {/* Chart */}
                <PieChart width={160} height={160}>
                    <Pie
                        data={getChartData()}
                        innerRadius={60}
                        outerRadius={80}
                        fill={theme.palette.tertiary_light.main}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {getChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color}/>
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip/>}/>
                </PieChart>

                {/* Legend */}
                <div>
                    <div className='legend'>
                        <span className="material-symbols-outlined icon-filled" style={{fontSize: 12, marginTop:'-1px', color: theme.palette.primary_light.main}}>
                            circle
                        </span>
                        <Typography variant='caption'  color='secondary'>
                            {'Savings: ' + properties.currency + ' ' + Math.round(getTotalDailySavings()*100)/100}
                        </Typography>
                    </div>
                    <div className='legend'>
                        <span className="material-symbols-outlined icon-filled" style={{fontSize: 12, marginTop:'-1px', color: theme.palette.primary.light}}>
                            circle
                        </span>
                        <Typography variant='caption'  color='secondary'>
                            {'Remaining: ' + properties.currency + ' ' + Math.round(props.budget.dailyBudget*100) / 100}
                        </Typography>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='savings'>

            {/* Savings list */}
            <Card elevation={0} className='savings-list' sx={{ backgroundColor: theme.palette.background.surface3 }}>
                {props.savings.map( saving => <Saving saving={saving} setSavings={props.setSavings}/> )}
            </Card>

            {/* Savings chart */
                screen===properties.screen.MOBILE ?
                null
                :
                <Card className='savings-charts' elevation={0}>
                    <div style={{display:'flex', justifyContent:'center'}}>
                        {getDailySavingsChart()}
                    </div>
                </Card>
            }
        </div>
    );
}