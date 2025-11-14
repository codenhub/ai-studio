class Intl {
  static languages: string[] = ["en", "pt-BR"];
  static language: string = localStorage.getItem("lang") || "en";
  public translations: Map<string, string> = new Map();

  private async loadLanguage(lang: string): Promise<void> {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      const data = await response.json();
      this.translations = new Map(Object.entries(data));
    } catch {
      throw new Error(`Could not load language file: ${lang}.json`);
    }
  }

  private translate() {
    document.querySelectorAll<HTMLElement>("[data-intl]").forEach((element) => {
      let key, value;
      key = element.getAttribute("data-intl");
      if (key) value = this.getKey(key);
      if (key && value) element.innerText = value;
    });
  }

  public async setLanguage(lang: string) {
    if (!Intl.languages.includes(lang))
      throw new Error(`Language not supported: ${lang}`);

    try {
      await this.loadLanguage(lang);
      Intl.language = lang;
      localStorage.setItem("lang", lang);
      document.documentElement.lang = lang;
      this.translate();
    } catch (error) {
      console.error(error);
    }
  }

  public getKey(key: string): string | undefined {
    return this.translations.get(key);
  }

  public async initialize() {
    let lang = localStorage.getItem("lang") || navigator.language || "en";
    if (!Intl.languages.includes(lang)) lang = "en";
    await this.setLanguage(lang);
    document.dispatchEvent(new Event("intl-loaded"));
  }
}

const intl = new Intl();
export default intl;
