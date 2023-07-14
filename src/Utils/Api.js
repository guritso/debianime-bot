export default class Api {
  constructor({ config }) {
    this.token = config.discloud.token;

    (async () => {
      const info = await this.execute("GET", "app/all");
      this.appID = info.apps.find((a) => a.name === "DebiAnime").id;
    })();
  }
  async execute(method, end) {
    const url = "https://api.discloud.app/v2/";

    if (end.startsWith("app") && !end.includes("all")) {
      end = end.replace("/", `/${this.appID}/`);
    }

    const response = await fetch(url.concat(end), {
      method: method,
      headers: {
        "api-token": this.token,
        accept: "*/*",
      },
    }).catch(() => {
      return { status: "Error", message: "catch" };
    });

    return await response.json();
  }
}
