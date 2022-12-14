import { Card, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useTheme } from '@mui/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useContext } from 'react';
import Recurrence from '../components/Recurrence';
import '../styles/recurrences.css';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import properties from '../data/properties.json';
import NewRecurrenceDialog from '../components/NewRecurrenceDialog';

export default function Recurrences(props){

    //Application theme
    const theme = useTheme();

    const guide = 'This section shows all monthly recurring transactions. Whenever a transaction occurs, check the corresponding item to update the budget.'

    const [isSectionOpen, setIsSectionOpen] = useState([false, false, false]);

    const [isNewRecurrenceDialogOpen, setIsNewRecurrenceDialogOpen] = useState(false);

    const clickAccordionHandler = (index) => {
        let newIsSectionOpen = isSectionOpen.map(item => false);
        newIsSectionOpen[index] = !isSectionOpen[index];
        setIsSectionOpen(newIsSectionOpen);
    }

    const getChartData = () => {

        let data = [];
        
        props.recurrences.map(
            recurrence => {
                if(recurrence.type === 'EXPENSE') data.push({ 
                    name: recurrence.name, value: Math.abs(recurrence.amount), color: theme.palette.tertiary_light.main
                })
                if(recurrence.type === 'OTHER') data.push({
                    name: recurrence.name, value: Math.abs(recurrence.amount), color: theme.palette.primary_light.main
                })
            }
        );
        
        data.push({ name: 'Budget', value: props.budget.startingBudget, color:theme.palette.primary.light});

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

    const getTotalRecurrencesType = (type) => {
        let total = 0;

        props.recurrences.forEach(recurrence => {
            if(recurrence.type === type) total += Math.abs(recurrence.amount);
        });

        return total;
    }


    return(
        <div className='recurrences-layout'>
            <NewRecurrenceDialog isDialogOpen={isNewRecurrenceDialogOpen} setIsDialogOpen={setIsNewRecurrenceDialogOpen}/>
            <Card className='recurrences-card' elevation={0}>        
                <div>
                    {/*Header*/}
                    <div className='recurrences-header'>
                        <div className='exteme-position-section'>
                            <Typography variant='h6'>Monthly recurrences</Typography>
                            <Tooltip title={guide}>
                                <span className = "preview-card-icon material-symbols-outlined recurrence-mobile-info" style={{fontSize: '16px', opacity:'0.6'}}>
                                    help
                                </span>
                            </Tooltip>
                        </div>
                        <Typography className='recurrence-desktop-info' variant='subtitle2' sx={{opacity: '0.6', display:'flex', gap:'8px', marginTop:'8px'}}>
                            <span className = "preview-card-icon material-symbols-outlined" style={{fontSize: '16px', marginTop: '2px'}}>
                                info
                            </span>
                            {guide}
                        </Typography>
                    </div>     

                    {/*Monthly earnings*/}
                    <Accordion className="recurrences-accordion" disableGutters elevation={0} expanded={isSectionOpen[0]}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={()=>(clickAccordionHandler(0))}/>}>
                            <div className='exteme-position-section'>
                                <Typography>Monthly earnings</Typography>
                                <Typography variant="body2" sx={{opacity: "0.6", marginRight: "16px"}}>{properties.currency + " " + getTotalRecurrencesType('EARNING')}</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            { props.recurrences.map( recurrence => recurrence.type==='EARNING'?<Recurrence recurrence={recurrence} setRecurrences={props.setRecurrences}/>:null ) }
                        </AccordionDetails>
                    </Accordion>

                    {/*Monthly expenses*/}
                    <Accordion className="recurrences-accordion" disableGutters elevation={0} expanded={isSectionOpen[1]}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={()=>(clickAccordionHandler(1))}/>}>
                            <div className='exteme-position-section'>
                                <Typography>Monthly expenses</Typography>
                                <Typography variant="body2" sx={{opacity: "0.6", marginRight: "16px"}}>{properties.currency + " " + (- getTotalRecurrencesType('EXPENSE'))}</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            { props.recurrences.map( recurrence => recurrence.type==='EXPENSE'?<Recurrence recurrence={recurrence} updateHome={props.updateHome} setRecurrences={props.setRecurrences}/>:null ) }
                        </AccordionDetails>
                    </Accordion>

                    {/*Other*/}
                    <Accordion className="recurrences-accordion" disableGutters elevation={0} expanded={isSectionOpen[2]}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={()=>(clickAccordionHandler(2))}/>}>
                            <div className='exteme-position-section'>
                                <Typography>Other</Typography>
                                <Typography variant="body2" sx={{opacity: "0.6", marginRight: "16px"}}>{properties.currency + " " + (-getTotalRecurrencesType('OTHER'))}</Typography>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            { props.recurrences.map( recurrence => recurrence.type==='OTHER'?<Recurrence notInteractable recurrence={recurrence}/>:null )}
                        </AccordionDetails>
                    </Accordion>

                </div>

                {/*Total*/}
                <div className="recurrences-total-section exteme-position-section">
                    <Typography>Total:</Typography>
                    <Typography variant="body2" sx={{opacity: "0.6", marginRight: "40px"}}>{properties.currency + " " + props.budget.startingBudget}</Typography>
                </div>
            </Card>

            <Card className='recurrences-charts-card' elevation={0}>

                <NewRecurrenceDialog/>

                {/*Chart*/}
                <PieChart width={160} height={160} style={{marginTop:'32px'}}>
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

                {/*Legend*/}
                <div className='recurrences-legend'>
                    <div className='recurrence-legend'>
                        <span className="material-symbols-outlined icon-filled" style={{fontSize: 12, marginTop:'-1px', color: theme.palette.tertiary_light.main}}>
                            circle
                        </span>
                        <Typography variant='caption' color='secondary'>
                            Expenses
                        </Typography>
                    </div>
                    <div className='recurrence-legend'>
                        <span className="material-symbols-outlined icon-filled" style={{fontSize: 12, marginTop:'-1px', color: theme.palette.primary_light.main}}>
                            circle
                        </span>
                        <Typography variant='caption' color='secondary'>
                            Savings and Investments
                        </Typography>
                    </div>
                    <div className='recurrence-legend'>
                        <span className="material-symbols-outlined icon-filled" style={{fontSize: 12, marginTop:'-1px', color: theme.palette.primary.main}}>
                            circle
                        </span>
                        <Typography variant='caption'  color='secondary'>
                            Budget
                        </Typography>
                    </div>
                </div>
                
            </Card>
        </div>
    )
}