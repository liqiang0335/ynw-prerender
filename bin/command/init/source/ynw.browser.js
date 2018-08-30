/**
 * 可配置选项
 * @param url: String  网址
 * @param name: String 文件名
 * @param enable: Boolean 是否渲染(默认true)
 * @param dist: String  保存位置
 * @param handler: Function 内容处理
 * @param pipe: Function 内容处理
 * @param visitor: 遍历标签中每个节点将内容交给visitor处理
 *
 * 注意事项：
 * common的配置会应用于每个routes项
 * routes项的同名配置会覆盖common中的配置
 * 所有页面按顺序同步渲染，处理时间和页面数量成正比
 *
 *
 * 命令行：
 * ynwbrowser init : 添加配置文件
 * ynwbrowser render: 开始渲染
 * ynwbrowser render type=queue : 单线程渲染
 */

module.exports = {
  common: {
    dist: "./htmls",
    //修改节点
    visitor: node => {
      ////////////////
      node = node.replace(/#\/question/g, "/web/question.htm");
      node = node.replace(/#\/home/g, "/");
      node = node.replace(/Example/g, "liqiang0335");
      /////////////
      return node;
    },
    //查找替换
    handler: html => {
      ////////////////
      html = html.replace(/<.+?.+webpack-dev-server.js.+<\/script>/, "");
      html = html.replace(/http:\/\/localhost:9999/g, "/public/home");
      html = html.replace(/\/dist\/assets/g, "/public/home/dist/assets");
      html = html.replace(/index.bundle.js/g, "script.bundle.js");
      ///////////
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
