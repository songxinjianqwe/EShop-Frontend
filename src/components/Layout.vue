<template>
  <div>
    <div class="app-header">
      <div class="app-header-inner">
        <img src="../assets/logo.png"></img>
        <!-- nav是navigation导航栏的简写 -->
        <div class="header-nav">
          <ul class="nav-list">
            <li>登录</li>
            <li class="nav-pile">|</li>
            <li>注册</li>
            <li class="nav-pile">|</li>
            <li>关于</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="app-content">
      <!-- 缓存 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-footer">
      <p> 2017 ESHOP </p>
    </div>
  </div>
</template>

<script>
// 公共组件都放在/components里面
// 而页面都放在/pages里面，每个Vue文件代表一个页面
// 主界面布局：Layout.vue
// 它是一个根节点，并放了根CSS，<style>不能加scoped，因为是全局共享的。
export default {
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
theader,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
headerer,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}


/* HTML5 display-role reset for older browsers */

article,
aside,
details,
figcaption,
figure,
footer,
headerer,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

body {
  background: #f0f2f5;
  font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  font-size: 14px;
  color: #444;
}

.app-header {
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}

.app-header-inner {
  width: 1200px;
  margin: 0 auto;
}

.app-header-inner img {
  width: 50px;
  margin-top: 20px;
}

.header-nav {
  float: right;
}

.header-nav ul {
  overflow: hidden;
}

.header-nav li {
  cursor: pointer;
  float: left;
}

.nav-pile {
  padding: 0 10px;
}

.app-footer {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}

.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
}

.button:hover {
  background: #4fc08d;
}

.g-form-line {
  padding: 15px 0;
}

.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}

.g-form-input {
  display: inline-block;
}

.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}

.g-form-btn {
  padding-left: 100px;
}

.g-form-error {
  color: red;
  padding-left: 15px;
}
</style>
