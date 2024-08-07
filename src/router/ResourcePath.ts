/**
 * 资源权限类型定义
 */
export type ResourceUri = {
  /**
   * 基础地址
   */
  base: string
  /**
   * 查询地址
   */
  query?: string
  /**
   * 详情地址
   */
  detail?: string
  /**
   * 新增地址
   */
  create?: string
  /**
   * 更新地址
   */
  update?: string
}


/**
 * 根据base地址直接生成对应的,query,detail,create,update地址
 * @param path
 * @param prefix
 * @param ignorePathKey 忽略不添加前缀的key
 */
export function setUriFromBase(path: { [key: string]: ResourceUri | string }, prefix: string = '', ignorePathKey: Array<string> = []) {
  Object.keys(path).forEach(key => {
    if (ignorePathKey.includes(key))
      return;
    const action: ResourceUri | string = path[key];
    if (typeof action === 'string') {
      path[key] = `${prefix}${path[key]}`;
    } else {
      action.base = `${prefix}${action.base}`;
      action.query = `${action.base}/query`;
      action.detail = `${action.base}/detail`;
      action.create = `${action.base}/create`;
      action.update = `${action.base}/update`;
      Object.keys(action).forEach((item: any) => {
        if (['base', 'query', 'detail', 'create', 'update'].includes(item)) {
          return;
        }
        action[item] = `${action.base}/${action[key] || key}`;
      });
      path[key] = action;
    }
  });
}

/**
 * 生成新增编辑地址，根据基础地址
 * <code>
 *   const path = `${base}/action)`
 * </code>
 * @param base 基础地址
 */
export function actionPath(base: string) {
  return `${base}/:action`;
}
