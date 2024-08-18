import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { styled } from '@mui/material/styles';

const StyledTimePicker = styled(TimePicker)(({ customStyles }) => ({
  '& .MuiTextField-root': {
    minWidth: customStyles?.minWidth || '357px',
  },
  '& .MuiInputBase-input': {
    minWidth: customStyles?.minWidth || '357px',
    height: customStyles?.height || '18px',
    cursor: 'pointer',
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'transparent', 
  },
  '& .Mui-focused .MuiInputBase-input::placeholder': {
    color: 'transparent', 
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #d3d3d3', 
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderBottom: '2px solid #47aeb5', 
      borderLeft: '1px solid #d3d3d3', 
      borderRight: '1px solid #d3d3d3', 
      borderTop: '1px solid #d3d3d3', 
    },
    '&:focus .MuiOutlinedInput-notchedOutline': {
      borderBottom: '2px solid #47aeb5', 
      borderLeft: '1px solid #d3d3d3', 
      borderRight: '1px solid #d3d3d3', 
      borderTop: '1px solid #d3d3d3', 
    },
  },
  '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderBottom: '2px solid #47aeb5', 
    borderLeft: '1px solid #d3d3d3', 
    borderRight: '1px solid #d3d3d3', 
    borderTop: '1px solid #d3d3d3', 
  },
  '& .MuiClock-clock': {
    backgroundColor: '#47aeb5', 
  },
  '& .MuiIconButton-root': {
    color: '#47aeb5', 
  },
}));

export default function TimePickerViewRenderers({ style }) {
  const [iconColor, setIconColor] = useState("primary");
  const [time, setTime] = useState(null);

  const onChange = (newTime) => {
    setTime(newTime);
  };

  const handleClick = () => {
    setIconColor(iconColor === "primary" ? "secondary" : "primary");
  };

  const renderInput = (props) => (
    <TimePicker
      {...props}
      color={iconColor}
      onClick={handleClick}
    />
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <StyledTimePicker
          value={time}
          onChange={onChange}
          renderInput={renderInput}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
          customStyles={style} 
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
