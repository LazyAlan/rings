import { resolve, sep } from "node:path";
import { globSync } from "glob";
import { IApp } from "../types/IApp.js";

/**
 * 加载模块，模块实现中需要是一个 Function
 * @param app - 应用程序实例
 * @param loaderName 加载器名称
 * @param loaderModuleObject 模块对象
 */
const moduleLoadClassAndFunc = async (
  app: IApp,
  loaderName: string,
  loaderModuleObject: any = {}
) => {
  // 读取文件
  const filePath = resolve(app.businessPath, `.${sep + loaderName}`);
  const filePathList = globSync(resolve(filePath) + `/**/*.js`); // 这里要写 .js 因为最终执行的是 js 文件

  if (!filePathList || !filePathList.length) {
    console.log(`${loaderName} 没有读取到文件`);
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
      // ESM 和 CJM 兼容处理，改为使用 ESM 之后不再需要了
      // if (i === moduleCatalogs.length - 1) {
      //   const mod = await import(filePath);
      //   // 兼容多种导出形式：
      //   // - ESM default export => mod.default is function/class
      //   // - CommonJS exported function/class => mod (or mod.default) is function
      //   // - 有时会出现双重 default 包裹的情形 => mod.default.default
      //   let exported: any =
      //     mod && mod.default !== undefined ? mod.default : mod;

      //   // 处理双重 default：{ default: { default: fn } }
      //   if (
      //     exported &&
      //     exported.default &&
      //     typeof exported.default === "function"
      //   ) {
      //     exported = exported.default;
      //   }

      //   let instance: any;

      //   if (typeof exported === "function") {
      //     // 判断是否为 class（尽量兼容各种打包产物）
      //     const fnStr = Function.prototype.toString.call(exported);
      //     const looksLikeClass =
      //       /^class\s/.test(fnStr) ||
      //       (exported.prototype &&
      //         Object.getOwnPropertyNames(exported.prototype).length > 1);

      //     if (looksLikeClass) {
      //       try {
      //         instance = new exported(app);
      //       } catch (err) {
      //         // 如果 new 失败，退回到当作工厂函数调用
      //         try {
      //           instance = exported(app);
      //         } catch (err2) {
      //           console.warn(
      //             `[${loaderName} loader] failed to instantiate/call exported function/class: ${filePath}`,
      //             err2
      //           );
      //         }
      //       }
      //     } else {
      //       // 作为工厂函数调用，返回实例
      //       try {
      //         instance = exported(app);
      //       } catch (err) {
      //         console.warn(
      //           `[${loaderName} loader] failed to execute exported factory function: ${filePath}`,
      //           err
      //         );
      //       }
      //     }
      //   } else {
      //     console.warn(
      //       `[${loaderName} loader] exported module is not a function/class: ${filePath}`
      //     );
      //   }

      //   // 保存实际导出的东西（优先保存实例/函数/默认导出），回退到整个模块对象
      //   tempModule[moduleCatalogs[i]] = instance || exported || mod;
      //   break;
      // }

      if (i === moduleCatalogs.length - 1) {
        const exported = await import(filePath);
        const module = exported.default;

        if (typeof module !== "function") {
          console.warn(`exported module is not a function/class: ${filePath}`);
          break;
        }

        const fnStr = Function.prototype.toString.call(module);
        const looksLikeClass =
          /^class\s/.test(fnStr) ||
          (module.prototype &&
            Object.getOwnPropertyNames(module.prototype).length > 1);

        tempModule[moduleCatalogs[i]] = looksLikeClass
          ? new module(app) // 导入的是类需要实例化
          : module(app);
        break;
      }

      // 确保目录转化为类层级
      if (!tempModule[moduleCatalogs[i]]) {
        tempModule[moduleCatalogs[i]] = {};
      }
      tempModule = tempModule[moduleCatalogs[i]];
    }
  }
};

export { moduleLoadClassAndFunc };
