import { resolve, sep } from "node:path";
import { globSync } from "glob";
import { IApp } from "types/IApp";

/**
 *
 * @param app - 应用程序实例
 * @param loaderName 加载器名称
 * @param loaderModuleObject 模块对象
 */
const moduleLoadFun = async (
  app: IApp,
  loaderName: string,
  loaderModuleObject: any = {}
) => {
  // 读取文件
  const filePath = resolve(app.businessPath, `.${sep + loaderName}`);
  const filePathList = globSync(resolve(filePath) + `/**/*.js`); // 这里要写 .js 因为最终执行的是 js 文件

  if (!filePathList || !filePathList.length) {
    console.log("没有读取到中间件文件");
    return;
  }

  for (const filePath of filePathList) {
    // 获取文件名并转换为大驼峰命名
    const modulePath = filePath
      .split(`${loaderName + sep}`)[1]
      .split(".")[0]
      .replace(/[_-](\w)/gi, (_, letter) => letter.toUpperCase());

    let tempModule = loaderModuleObject;
    const moduleCatalogs = modulePath.split(sep);
    for (let i = 0; i < moduleCatalogs.length; i++) {
      if (i === moduleCatalogs.length - 1) {
        const mod = await import(filePath);
        // 兼容多种导出形式：
        // - ESM default export => mod.default is function
        // - CommonJS exported function => mod (or mod.default) is function
        // - 有时会出现双重 default 包裹的情形 => mod.default.default
        let exported: any =
          mod && mod.default !== undefined ? mod.default : mod;

        // 处理双重 default：{ default: { default: fn } }
        if (
          exported &&
          exported.default &&
          typeof exported.default === "function"
        ) {
          exported = exported.default;
        }

        if (typeof exported === "function") {
          try {
            exported(app);
          } catch (err) {
            console.warn(
              `[middleware loader] failed to execute middleware: ${filePath}`,
              err
            );
          }
        } else {
          console.warn(
            `[middleware loader] exported middleware is not a function: ${filePath}`
          );
        }

        // 保存实际导出的东西（优先保存函数/默认导出），回退到整个模块对象
        tempModule[moduleCatalogs[i]] = exported || mod;
        break;
      }

      if (!tempModule[moduleCatalogs[i]]) {
        tempModule[moduleCatalogs[i]] = {};
      }

      tempModule = tempModule[moduleCatalogs[i]];
    }
  }
};

export { moduleLoadFun };
