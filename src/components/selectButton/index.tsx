import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Card } from '../../models/card-type';

export default function ComboBox( props) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={props}
      sx={{ width: '80%', marginTop: '20px', marginLeft:'10%' }}
      renderInput={(params) => <TextField {...params} label="Cartões cadastrados" />}
    />
  );
}
