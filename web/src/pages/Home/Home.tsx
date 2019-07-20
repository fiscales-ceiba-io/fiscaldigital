import { History } from "history";
import React, { useState } from "react";
import { Header, Intro, Leaderboard } from ".";
import { closeSnackbar, displaySnackbarError, Snackbar, SnackbarProps } from "../../components";
import { SignUpForm } from "../Auth/Create";
import { routes } from "../routes";
import { Footer } from "./Footer";
import { Prices } from "./Prices";

export const Home = ({ history }: { history: History }) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps>(closeSnackbar());

  return (
    <>
      <Snackbar snackbar={snackbar} onClose={() => setSnackbar(closeSnackbar())} />
      <Header />
      <Intro
        signUpForm={
          <SignUpForm
            onSuccess={({ telefono }: { telefono: string }) => {
              setSnackbar(closeSnackbar());
              history.push(routes.auth.validate, {
                telefono,
              });
            }}
            onError={(error: any) => {
              setSnackbar(displaySnackbarError(error));
            }}
          />
        }
      />
      <Leaderboard />
      <Prices />
      <Footer />
    </>
  );
};
