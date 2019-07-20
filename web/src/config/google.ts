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

export default {
  injectApiScript,
  sheets,
};
