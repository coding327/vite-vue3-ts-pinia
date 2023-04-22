import path from "path";

export const isDevFn = (mode: string): boolean => mode === "development";

export const isProdFn = (mode: string): boolean => mode === "production";

export const isTestFn = (mode: string): boolean => mode === "test";

/**
 * Whether to generate package preview
 * @returns {boolean}
 */
export const isReportMode = (): boolean => process.env.VITE_REPORT === "true";

// Read all enviremnt variables configuration files to process.env
export const wrapperEnv = (config: Recordable): ViteEnv => {
  const ret: any = {};
  Object.keys(config).forEach(envName => {
    let realName = config[envName].replace(/\\n/g, "\n");
    if (envName === "VITE_PORT") realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {}
    }
    ret[envName] = realName;
  });
  return ret;
};

/**
 * Get user root directory
 * @param dir file path
 */
export const getRootPath = (...dir: string[]): string =>
  path.resolve(process.cwd(), ...dir);
