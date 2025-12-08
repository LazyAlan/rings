export const isLocal = () => {
  // 这里的 _ENV 可以在 package.json 的 scripts 命令中来定义
  // 比如 “dev”: "_ENV='local' node './index.js'"
  return process.env._ENV === "local";
};

export const isBeta = () => {
  return process.env._ENV === "beta";
};

export const isProduction = () => {
  return process.env._ENV === "production";
};

export const getEnv = () => {
  return process.env._ENV ?? "local";
};
