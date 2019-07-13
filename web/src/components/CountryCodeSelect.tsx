import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useEffect, useState } from "react";
import CountryCodes from "../assets/CountryCodes.json";

export const CountryCodeSelect = ({ onChange }: { onChange: any }) => {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [countryCode, setCountryCode] = useState("+502");

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel ref={inputLabel} htmlFor="age-customized-select">
        Código
      </InputLabel>
      <Select
        value={countryCode}
        onChange={(e: any) => {
          setCountryCode(e.target.value);
          return onChange(e);
        }}
        input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
      >
        {CountryCodes.map((country: any, i: number) => (
          <MenuItem key={i} value={country.dial_code}>
            {country.code} {country.dial_code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
