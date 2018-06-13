# ynwbrowser

> 使用场景：将单页应用中的每个路由预渲染成静态页面

### 安装

```shell
npm i -g ynwbrowser
```

### 命令行

- ynwbrowser --version 版本号
- ynwbrowser --init 初始化
- ynwbrowser --render 渲染页面

### 配置说明

```js
/**
 * 可配置选项
 * @param url: String  网址
 * @param name: String 文件名
 * @param enable: Boolean 是否渲染(默认true)
 * @param dist: String  保存位置
 * @param handler: Function 内容处理(默认f=>f)
 *
 * 注意事项：
 * common的配置会应用于每个routes项
 * routes项的同名配置会覆盖common中的配置
 * 所有页面按顺序同步渲染，处理时间和页面数量成正比
 */

module.exports = {
  common: {
    dist: "./test",
    handler: html => html
  },
  routes: [
    {
      url: "http://www.example.com",
      name: "example.html"
    }
  ]
};
```
