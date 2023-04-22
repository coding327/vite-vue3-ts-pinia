import type { ProxyOptions } from "vite";

type ProxyItem = [string, string];

type proxyList = ProxyItem[];

type ProxyTargetList = Record<string, ProxyOptions>;

/**
 * 创建代理，用于解析.env.development 代理配置
 * @param list 代理列表
 */
export const createProxy = (list: proxyList = []): ProxyTargetList => {
  const ret: ProxyTargetList = {};
  list.forEach(([prefix, target]) => {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    };
  });
  return ret;
};
