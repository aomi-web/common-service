// 定义装饰器
/**
 * loading 装饰器
 * 方法执行前检查loading变量值是否为true，如果为true，直接return。反之继续执行，结束后设置为false
 * @param target
 * @param propertyKey
 * @param descriptor
 */
export function loading(
  target: any,
  propertyKey: string,
  descriptor: any,
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    if (this.loading) {
      return; // 如果正在加载，直接返回
    }
    this.loading = true; // 设置类的loading变量为true
    try {
      return await originalMethod.apply(this, args); // 执行原始方法
    } finally {
      this.loading = false; // 设置类的loading变量为false
    }
  };

  return descriptor;
}
