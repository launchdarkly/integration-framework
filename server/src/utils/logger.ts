export const createLogger = (prefix: string) => {
  return {
    log: (...args: any) => console.log(`[${prefix}]: `, ...args),
  };
};
