# ynwbrowser

### install

```shell
npm i -g ynwbrowser
```

### pre-render

> pre-render static page for SPA

```shell
# add config file to current working directory
ynwbrowser --init

# Render page
ynwbrowser --render
```

### config

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
