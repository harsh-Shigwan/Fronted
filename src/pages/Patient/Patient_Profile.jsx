
import Breadcrumb from '../../components/Breadcrumb';

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Over_View from './Tabs/Over_View';
import Visit from './Tabs/Visit';
import Treatment_History from './Tabs/Treatment_History';
import Billing from './Tabs/Billing';
import Lab_Investigation from './Tabs/Lab_Investigation';



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 5 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  
  
const Patient_Profile = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  return (
    <div><Breadcrumb></Breadcrumb>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: '' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Over View" {...a11yProps(0)} />
          <Tab label="Visit" {...a11yProps(1)} />
          <Tab label="Tretment History" {...a11yProps(2)} />
          <Tab label="Billing" {...a11yProps(3)} />
          <Tab label="Lab" {...a11yProps(4)} />
        
         
      
      
         
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
     <Over_View/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Visit/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Treatment_History/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
    
      <Billing/>
    </CustomTabPanel>
    <CustomTabPanel value={value} index={4}>
    
    <Lab_Investigation/>
  </CustomTabPanel>
   
    </Box>
    
    </div>
  )
}

export default Patient_Profile


 