import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Signup = () => {
  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField required id="outlined-required" label="Required" />
      </Box>
    </>
  );
};

export default Signup;
