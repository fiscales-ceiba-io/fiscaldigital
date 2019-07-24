import React, { useState } from "react";
import { TextField } from "./Form";

export const PhoneNumberInput = ({
  onChange,
  autoFocus,
}: {
  onChange: any;
  autoFocus: boolean;
}) => {
  const [telefono, setPhoneNumber] = useState("");
  const [hasError, setError] = useState(false);

  const handleOnChange = (e: any) => {
    const value = e.target.value;
    if (/\D/gi.test(value)) {
      setError(true);
      return;
    }
    setError(false);
    setPhoneNumber(value);
    return onChange(e);
  };

  return (
    <TextField
      variant="outlined"
      required
      inputProps={{
        type: "tel",
      }}
      fullWidth
      autoFocus={autoFocus}
      id="telefono"
      label="Número"
      name="telefono"
      value={telefono}
      error={hasError}
      onChange={handleOnChange}
      autoComplete="telefono"
    />
  );
};
