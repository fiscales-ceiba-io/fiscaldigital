import Grid from "@material-ui/core/Grid";
import React from "react";
import GoogleReCAPTCHA from "react-google-recaptcha";

export const ReCAPTCHA = ({ onChange, onErrored }: { onChange: any; onErrored: any }) => (
  <Grid container spacing={2} justify="center">
    <Grid item>
      <GoogleReCAPTCHA
        onChange={onChange}
        onErrored={onErrored}
        size="normal"
        sitekey="6LdtMa8UAAAAAJStFrMvDTrmwUAMvrCMVstRyGIO"
      />
    </Grid>
  </Grid>
);
