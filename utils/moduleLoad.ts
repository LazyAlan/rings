import { resolve, sep } from "node:path";
import { globSync } from "glob";
import { IApp } from "../types/IApp.js";

/**
 * 加载模块（仅支持 ESM default 导出）
 * - 如果 default 是 class，则 new 出实例并保存
 * - 如果 default 是工厂函数，则调用它；若返回值是 class，则 new，否则保存返回值
 * - 其它类型直接保存
 * @param app - 应用程序实例
 * @param loaderName 加载器名称
 * @param loaderModuleObject 模块对象
 */
const moduleLoadClassAndFunc = async (
  app: IApp,
  loaderName: string,
  loaderModuleObject: any = {}
) => {
  const baseDir = resolve(app.businessPath, `.${sep + loaderName}`);
  const filePathList = globSync(resolve(baseDir) + `/**/*.js`);

  if (!filePathList || !filePathList.length) return;

  const isClass = (fn: any) => {
    if (typeof fn !== "function") return false;
    const str = Function.prototype.toString.call(fn);
    return (
      /^class\s/.test(str) ||
      (fn.prototype && Object.getOwnPropertyNames(fn.prototype).length > 1)
    );
  };

  for (const filePath of filePathList) {
    const modulePath = filePath
      .split(`${loaderName + sep}`)[1]
      .split(".")[0]
      .replace(/[_-](\w)/gi, (_, l) => l.toUpperCase());

    let target = loaderModuleObject;
    const parts = modulePath.split(sep);

    for (let i = 0; i < parts.length; i++) {
      const key = parts[i];
      if (i === parts.length - 1) {
        const mod = await import(filePath);
        const exported = mod && mod.default;

        if (typeof exported !== "function") {
          target[key] = exported;
          break;
        }

        // exported 是函数：可能是 class 或 工厂函数
        try {
          if (isClass(exported)) {
            target[key] = new exported(app);
          } else {
            const result = exported(app);
            if (typeof result === "function" && isClass(result)) {
              target[key] = new result(app);
            } else {
              target[key] = result;
            }
          }
        } catch (err) {
          console.warn(
            `[${loaderName} loader] failed to load ${filePath}`,
            err
          );
        }

        break;
      }

      if (!target[key]) target[key] = {};
      target = target[key];
    }
  }
};

export { moduleLoadClassAndFunc };
