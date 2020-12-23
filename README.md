# README of ics-project

下面对如何使用该项目作一简短介绍



## 安装依赖环境

为了方便，所有的 `node_module` 已经放在文件夹内，所以无需（也建议不要）运行 `npm install` 

下面需要安装 `node` 和 `electron` ，且由于许多框架和兼容性方面的原因，需要安装特定版本的 `node ` 和 `electron` ，这些操作方法都将作具体介绍



### 准备工作

需要安装 `n`（用于特定版本 `node` 安装）以及 `cnpm`（建议不要使用 `npm` ）

```bash
# install n
sudo npm install -g n

# install cnpm from taobao source
sudo npm install -g cnpm --registry=https://registry.npm.taobao.org
```



### 安装特定版本 node (v10.15.3)

```bash
sudo n v10.15.3
```



### 安装特定版本 electron (v4.2.0)

```bash
sudo cnpm install electron@^4.2.0 -g
```



## 终端安装实例

可以查看目录下的 `install demo.html` 文件