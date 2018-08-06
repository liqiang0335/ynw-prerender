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
 *
 *
 * 命令行：
 * ynwbrowser --init(i) : 添加配置文件
 * ynwbrowser --render(r) : 开始渲染
 * ynwbrowser --render type=queue : 单线程渲染
 */

module.exports = {
  common: {
    dist: "./test",
    handler: html => {
      //修改路由
      html = html.replace(/#?\/question/g, "/web/question.htm");
      html = html.replace(/#?\/home/g, "/");
      //修改路径
      html = html.replace(/<.+?.+webpack-dev-server.js.+<\/script>/, "");
      html = html.replace(/http:\/\/localhost:9999/g, "/public/home");
      html = html.replace(/\/dist\/assets/g, "/public/home/dist/assets");
      html = html.replace(/index.bundle.js/g, "script.bundle.js");
      return html;
    }
  },
  routes: [
    {
      url: "http://www.example.com",
      name: "example.html",
      pipe: html => html
    }
  ]
};
