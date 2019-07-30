import ErrorOutlinedIcon from "@material-ui/icons/ErrorOutlined";
import axios from "axios";
import { History } from "history";
import Cookies from "js-cookie";
import { get } from "lodash";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AcceptTermsDialog, Button, Container, Grid, TextField, View } from "../../components";
import { AppBar, Toolbar } from "../../components/AppBar";
import { Link, Typography } from "../../components/Typography";
import { fetchLeaderboard, fetchUserScore } from "../../http";
import { theme } from "../../theme";
import { routes } from "../routes";
import { Step1 as FileType2Step1, Step2 as FileType2Step2, Step3 as FileType2Step3 } from "./groups";
import { Score } from "./Score";

interface IVoteCountCertificate {
  id: number;
  imagen: string;
  activa: number;
}

let currentInputRef: HTMLInputElement | null = null;
let isLastGroup = false;

const voteCountCertificateData: any = {
  activa: 0,
  id: 0,
  imagen: "",
  sha1: "",
  tipo: {
    mapa: [],
  },
};

export const Compare = ({ history }: { history: History }) => {
  const [isLoading, onLoad] = useState(true);
  const [voteCountCertificate, setVoteCountCertificate] = useState({
    activa: 0,
    id: 0,
    imagen: "",
    sha1: "",
  });
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [fileType, setFileType] = useState("0");
  const [fileName, setFileName] = useState("");
  const [currentGroup, setCurrentGroup] = useState(1);
  const [userScore, setUserScore] = useState({});
  const [leaderboard, setLeaderboard] = useState([{}]);

  useEffect(() => {
    try {
      checkTermsAndConditionsAcceptance();
      document.addEventListener("focusin", setCurrentInputRef);
    } catch (error) {
      setError(error.message);
    }

    return () => {
      document.removeEventListener("focusin", setCurrentInputRef);
    };
  }, []);

  const acceptTerms = async () => {
    try {
      await axios({
        data: {
          accepted_terms_at: new Date().toISOString(),
        },
        headers: {
          Authorization: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        method: "patch",
        url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/usuarios/actualizar/${Cookies.get(
          "userID",
        )}/`,
      });

      setAcceptedTerms(true);
      getNewVoteCountCertificate();
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const checkTermsAndConditionsAcceptance = async () => {
    try {
      const res = await axios({
        headers: {
          Authorization: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        method: "get",
        url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/usuarios/terminos/`,
      });

      setAcceptedTerms(get(res.data, ["accepted_terms"], false));
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const getNewVoteCountCertificate = async () => {
    try {
      const { data } = await getFile();
      setVoteCountCertificate(data);
      setFileType(getFileType(data)[0] || "0");
      setFileName(getFileName(data)[0] || "");
      voteCountCertificateData.tipo.mapa = getFileMap(data);
      fetchUserScore(setUserScore);
      fetchLeaderboard(setLeaderboard);
      onLoad(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 500) {
        // assume the token expired
        Cookies.remove("token");
        Cookies.remove("userID");
        history.push(routes.auth.signIn);
      }
    }
  };

  const loadNewVoteCountCertificate = async () => {
    onLoad(true);
    await getNewVoteCountCertificate();
    isLastGroup = false;
    setCurrentGroup(1);
  };

  const fillFileMap = ({ campo, valor }: { campo: any; valor: any }) => {
    voteCountCertificateData.tipo.mapa = voteCountCertificateData.tipo.mapa.map((row: any) =>
      row.campo === campo ? { ...row, valor } : row,
    );

    if (!currentInputRef) {
      return;
    }

    const closestInputRef = currentInputRef.closest(".input-field-wrapper");
    if (!closestInputRef || !closestInputRef.nextElementSibling) {
      if (!isLastGroup && /^\d{3}$/gi.test(valor)) {
        setCurrentGroup(currentGroup + 1);
      }
      return;
    }

    if (!/^\d{3}$/gi.test(valor)) {
      return;
    }

    const nextInputRef = closestInputRef.nextElementSibling.querySelector("input");

    currentInputRef = nextInputRef;
    nextInputRef.focus();
  };

  const sendFileMap = async () => {
    if (!isLastGroup) {
      setCurrentGroup(currentGroup + 1);
      return;
    }

    try {
      await axios({
        data: voteCountCertificateData.tipo.mapa.map((acta: any) => ({
          acta: voteCountCertificate.id,
          campo: acta.campo,
          usuario: Cookies.get("userID"),
          valor: !/^\D+$/gi.test(acta.valor) ? acta.valor : `NULL`,
        })),
        headers: {
          Authorization: Cookies.get("token"),
          "Content-Type": "application/json",
        },
        method: "post",
        url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/resultados/cuenta/`,
      });
    } catch (error) {
      console.error(error);
    }

    loadNewVoteCountCertificate();
  };

  const onBack = () => {
    if (currentGroup === 1) {
      return;
    }
    isLastGroup = false;
    setCurrentGroup(currentGroup - 1);
  };

  const getCurrentActionBlockGroupByFileType = () => {
    if (currentGroup === 1) {
      return (
        <FileType2Step1
          onContinue={sendFileMap}
          onBack={onBack}
          scoreComponent={<Score score={userScore} leaderboard={leaderboard} />}
          loadMoreButton={
            <Button variant="text" color="secondary" onClick={() => loadNewVoteCountCertificate()}>
              <ErrorOutlinedIcon style={{ marginRight: theme.spacing(1) }} />
              Marcar Como Ilegible
            </Button>
          }
          actionBlock={
            <ActionBlock
              fileMap={voteCountCertificateData.tipo.mapa}
              onChange={fillFileMap}
              currentGroup={currentGroup}
            />
          }
        />
      );
    } else if (currentGroup === 2) {
      return (
        <FileType2Step2
          onContinue={sendFileMap}
          onBack={onBack}
          scoreComponent={<Score score={userScore} leaderboard={leaderboard} />}
          loadMoreButton={
            <Button variant="text" color="secondary" onClick={() => loadNewVoteCountCertificate()}>
              <ErrorOutlinedIcon style={{ marginRight: theme.spacing(1) }} />
              Marcar Como Ilegible
            </Button>
          }
          actionBlock={
            <ActionBlock
              fileMap={voteCountCertificateData.tipo.mapa}
              onChange={fillFileMap}
              currentGroup={currentGroup}
            />
          }
        />
      );
    }

    isLastGroup = true;

    return (
      <FileType2Step3
        onContinue={sendFileMap}
        onBack={onBack}
        scoreComponent={<Score score={userScore} leaderboard={leaderboard} />}
        loadMoreButton={
          <Button variant="text" color="secondary" onClick={() => loadNewVoteCountCertificate()}>
            <ErrorOutlinedIcon style={{ marginRight: theme.spacing(1) }} />
            Marcar Como Ilegible
          </Button>
        }
        actionBlock={
          <ActionBlock
            fileMap={voteCountCertificateData.tipo.mapa}
            onChange={fillFileMap}
            currentGroup={currentGroup}
          />
        }
      />
    );
  };

  return (
    <View minHeight="100vh" justifyContent="center" flexDirection="column" display="flex">
      <Container maxWidth="xl" style={{ padding: 0 }}>
        {error ? (
          <View textAlign="center">
            <h2>Ha ocurrido un error.</h2>
            <h4>Estamos trabajando en solucionarlo.</h4>
          </View>
        ) : !acceptedTerms ? (
          <AcceptTermsDialog open={!acceptedTerms} acceptTerms={acceptTerms} />
        ) : isLoading ? (
          <View textAlign="center">
            <h2>Cargando...</h2>
          </View>
        ) : (
          <Grid container spacing={0} wrap="nowrap">
            <Grid
              item
              style={{
                backgroundImage: `url(${voteCountCertificate.imagen})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                height: "100vh",
                width: "75vw",
              }}
            />
            <Grid container item spacing={0}>
              <View width="100%" position="relative">
                <AppBar
                  position="absolute"
                  color="inherit"
                  style={{ paddingTop: theme.spacing(1), paddingBottom: theme.spacing(2) }}
                >
                  <Toolbar style={{ justifyContent: "space-between" }}>
                    <View>
                      <Typography variant="h6" color="inherit">
                        Evaluando acta: {fileName}
                      </Typography>
                      <Typography variant="body2" color="inherit">
                        Hash SHA1 entregado por TSE:
                      </Typography>
                      <Typography variant="body2" color="inherit">
                        {voteCountCertificate.sha1}
                      </Typography>
                    </View>
                    <View>
                      <Link to={routes.root}>
                        <img
                          src="/svg/logo-fiscal-digital.svg"
                          style={{ width: "120px", height: "auto" }}
                          alt="fiscal digital logo"
                        />
                      </Link>
                    </View>
                  </Toolbar>
                </AppBar>
              </View>
              {getCurrentActionBlockGroupByFileType()}
            </Grid>
          </Grid>
        )}
      </Container>
    </View>
  );
};

export const ActionBlock = ({
  fileMap,
  currentGroup,
  onChange,
}: {
  fileMap: any;
  currentGroup: number;
  onChange: any;
}) => {
  const rows = fileMap.filter((row: any) => row.grupo === currentGroup);
  return (
    <Grid container justify="space-between" style={{ marginTop: theme.spacing(2) }}>
      <InputsBlock
        rows={rows}
        inputProps={{
          lower: 0,
          onChange,
          upper: rows.length,
        }}
      />
    </Grid>
  );
};

export const InputsBlock = ({ rows, inputProps }: { rows: any[]; inputProps: any }) => {
  return (
    <Grid
      item
      lg={12}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        maxHeight: "200vh",
      }}
    >
      {rows.slice(inputProps.lower, inputProps.upper).map((row, i) => (
        <Input key={i} index={i} row={row} rows={rows} onChange={inputProps.onChange} />
      ))}
    </Grid>
  );
};

export const Input = ({
  row,
  rows,
  index,
  onChange,
}: {
  row: any;
  rows: any[];
  index: number;
  onChange: (value: any) => void;
}) => {
  const [value, setValue] = useState(row.valor);
  const [hasError, setError] = useState(false);

  const handleOnChange = ({ campo, valor }: { campo: any; valor: any }) => {
    setValue(valor);

    if (/\D/gi.test(valor) || /^\d{4,}/gi.test(valor)) {
      setError(true);
      return;
    }

    setError(false);

    return onChange({ campo, valor });
  };

  return (
    <View
      mb={2}
      className="input-field-wrapper"
      style={{
        flexBasis: rows.length < 10 ? "100%" : "calc(50% - 14px)",
      }}
    >
      <TextField
        style={{
          backgroundColor: theme.palette.background.default,
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
        }}
        name={`input-${row.campo}`}
        id={`input-${row.campo}`}
        variant="filled"
        label={row.etiqueta}
        required
        value={value}
        fullWidth
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleOnChange({ campo: row.campo, valor: e.target.value })
        }
        autoFocus={index === 0}
        error={hasError}
      />
    </View>
  );
};

const getFileMap = ({ tipo: { mapa } }: { tipo: any }) => JSON.parse(mapa);

const getFile = async () =>
  await axios({
    headers: {
      Authorization: Cookies.get("token"),
    },
    method: "get",
    url: `${process.env.REACT_APP_ENDPOINT_ROOT}/api/resultados/acta/`,
  });

const getFileType = ({ id, imagen, activa }: IVoteCountCertificate) =>
  imagen.match(/\d(?=(\.[jpg|png|JPEG]+))/gi);

const getFileName = ({ id, imagen, activa }: IVoteCountCertificate) =>
  imagen.match(/\d+(?=(\.[jpg|png|JPEG]+))/gi);

const setCurrentInputRef = (el: any) => (currentInputRef = el.target as HTMLInputElement);
