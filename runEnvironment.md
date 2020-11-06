# master
项目运行环境搭建
1. 安装node.js软件并测试其是否安装成功
   1. win + R 开启windows系统中的运行程序，在运行程序中输入powershell回车，打开命令行程序
   2. 输入node -v命令查看node.js的版本，在命令行程序中输出了版本号没有报错即说明安装成功
2. 安装mongodb、mongodb-compass软件
3. 数据库配置，为alibaixiu数据库创建普通账号
   （1）mongo 进入mongodb数据库操作环境
   （2）use admin 切换到admin数据库
   （3）db.auth('root', 'root') 登录admin数据库
   （4）use alibaixiu 切换到alibaixiu数据库
   （5）db.createUser({user: 'demo', pwd: 'demo', roles: ['readWrite']})  创建账号
   （6）exit 退出mongodb数据库操作环境
4. 将阿里百秀项目文件夹复制到硬盘中（服务器端程序）
5. 在app.js中配置数据库账号密码
6. 在命令行工具中进入到项目根目录中
   1. 按住shift键，点击鼠标右键，选择在此处打开powershell窗口
7. 使用npm install命令安装项目所需依赖文件
   1. 为了节省时间,预先安装加密模块.
      npm install -g node-gyp
npm install --global --production windows-build-tools
8. 将阿里百秀静态页面复制到public文件夹中
9. 在命令行工具中输入node app.js开启项目
