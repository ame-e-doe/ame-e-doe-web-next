import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={cart}
      sx={{ width: '80%', marginTop: '20px', marginLeft:'10%' }}
      renderInput={(params) => <TextField {...params} label="Cartões cadastrados" />}
    />
  );
}

const cart = [
  { label: 'Master'},
  { label: 'Visa'},
  ];