# rest_api封装文档
基于axios 0.21.1进行封装，面向后端提供的restful api
***
***
## 目录结构
```
rest_api
│  index.js-----模块整合，axios基础配置，选择api版本，提供给外部统一导入
│  README.md
│  request_methods.js-----封装axios的request方法，对api模块提供支持
│
└─api_version-----存放各个版本的api，每个版本一个文件
       └─api_v1.js-----定义api_v1的baseURL、api版本名、获取api的url的方法、api接口函数
```
***
## 约定
为方便管理与迭代更新，对每个文件定义的内容做出一些限制
默认后端提供的为基本符合restful习惯的url，即`/api版本号/宾语······
* **index.js**
  * 负责axios的底层配置，如设置请求拦截器、响应拦截器，对请求头与响应头进行处理，加入OAuth用户鉴权等
  * 选择对外提供的api版本，即选择导入的api模块文件
  * 供外部调用的三个对象，即
    * axios--经过封装的axios库
    * API_URL--获取API对应的url，每个方法应返回内置URL对象；存储着api的版本名与baseURL
    * API--使用API_URL与后端交互，每个方法应为一个封装好的API接口函数
  
* **request_methods.js**
  * 封装axios的GET、POST、PUT、DELETE等方法，可以特化一些方法，对收到的json进行统一预处理
  * API模块调用此模块内的方法对后端发起请求
  
* **api_version/\*.js**
  * 每个文件定义一个版本的api的全部内容，根据后端api版本的迭代进行更新
  * 每个文件内有两个对index.js提供的对象
    * _API_URL **`.api_version`属性**保存`api版本号`的名字，**`.base_url`属性**保存api的baseURL，其内的方法保存获得api的url的函数，统一返回`URL`对象。
    * _API 每一个方法都代表着一个对后端api接口的操作，处理并返回从后端得到的数据。**每个方法返回一个Promise对象，通过`.then`异步回调获得最终数据**