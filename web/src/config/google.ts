const head = document.head;

export const sheets = {
  apiKey: "AIzaSyCk39W5I0VETtR9eLV3qX-kcCVYztuSB98",
  // clientId: "426484164427-flqj9180pcr2254sk2fg0lo9kuod7b1v.apps.googleusercontent.com",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  spreadsheetId: "17L7LWa6AbuTIvKw-vL7vV0BYtsQXsUMxv56CJBKPTsI",
};

export const injectApiScript = ({ onLoad }: { onLoad: any }) => {
  const script = document.createElement("script");
  script.src = "https://apis.google.com/js/api.js";
  script.id = "google-api";
  script.onload = onLoad;
  head.appendChild(script);
};

export const handleClientLoad = (
  { initConfig, sheetConfig }: { initConfig: any; sheetConfig: any },
  onSuccess: any,
  onError: any,
) => () =>
  (window as any).gapi.load("client", async () => {
    try {
      await (window as any).gapi.client.init(initConfig);
      (window as any).gapi.client.load("sheets", "v4", async () => {
        const res = await (window as any).gapi.client.sheets.spreadsheets.values.get(sheetConfig);
        onSuccess(res);
      });
    } catch (error) {
      console.error(error);
      onError(error);
    }
  });

export default {
  handleClientLoad,
  injectApiScript,
  sheets,
};
