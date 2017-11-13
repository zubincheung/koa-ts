# koa-ts
koa2 demo，使用typescript

## 启动
```sh
npm install #安装依赖
npm run build # tsc编译
npm start # 启动项目
```

## 其他命令
```sh
npm run build # tsc编译
npm run dev # tsc即时编译并运行，用于本地开发
npm run model # 生成model,默认目录在src/model/[dbname]下
```


## 说明
+ 开发时直接运行``` npm run dev ``` babel即时编译并运行,并检测改动的文件自动编译
+ 建议nodejs使用8以上lts版本，不保证windows下兼容性
+ 运行请先修改配置文件（src/config/）配置好数据库，mongodb,在package.json->scripts->model中配置好数据库信息
