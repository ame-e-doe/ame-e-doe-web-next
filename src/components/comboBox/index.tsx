import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function ComboBox(props: string[]) {
  console.log(props);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={props}
      sx={{ width: "80%", marginTop: "20px", marginLeft: "10%" }}
      renderInput={(params) => (
        <TextField {...params} label="Cartões cadastrados" />
      )}
    />
  );
}
