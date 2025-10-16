import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import { SocketContext } from '../Context';

const StyledContainer = styled(Container)(({ theme }) => ({
  width: '600px',
  margin: '35px 0',
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    width: '80%',
  },
}));

const StyledPaper = styled(Paper)({
  padding: '10px 20px',
  border: '2px solid black',
});

const FormRoot = styled('form')({
  display: 'flex',
  flexDirection: 'column',
});

const GridContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const PaddingGrid = styled(Grid)({
  padding: 20,
});

const MarginButton = styled(Button)({
  marginTop: 20,
});

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <StyledContainer>
      <StyledPaper elevation={10}>
        <FormRoot noValidate autoComplete="off">
          <GridContainer container>
            <PaddingGrid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me}>
                <MarginButton variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </MarginButton>
              </CopyToClipboard>
            </PaddingGrid>
            <PaddingGrid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <MarginButton variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
                  Hang Up
                </MarginButton>
              ) : (
                <MarginButton variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)}>
                  Call
                </MarginButton>
              )}
            </PaddingGrid>
          </GridContainer>
        </FormRoot>
        {children}
      </StyledPaper>
    </StyledContainer>
  );
};

export default Sidebar;