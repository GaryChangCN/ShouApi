## 后台调用接口说明

### 登录

```
{
    url:"/api/login",
    method:"POST",
    data:{
        username:"",
        password:"",
    },
    dataType:"urlencoded",
    origin:"ishou"
}
//res
{
    err:"", //为true时候为登录失败
    data:{
        _id:"",
        username:"",
        password:"",
        md5:"",
        name:"",
        college:"",
        cookie:"",//ishou Cookie
    }
}

```

### 获取余额

//可能返回数据时间会稍长，因为爬取cookie过期，重新模拟登录
```
{
    url:"/api/getbalance/:username",
    method:"GET",
    origin:"ishou"
} 

//res

{
    data:{
        stuempno:"学号",
        custname:"姓名",
        custtype:"本科生/",
        deptname:"学院",
        cardno:"卡号",
        balance:"余额"
    },
    err:false
}
```
### 获取消费

//可能返回数据时间会稍长，因为爬取cookie过期，重新模拟登录
```
{
    url:"api/getCost/:username/:start/:end,
    method:"GET",
    origin:"ishou"
    //这里start、end格式如20160615
}
//res
{
    err:false,
    data[
        {
            amount:"消费金额",
            aftbala:"消费后余额"
            befbala:"消费前金额",
            position:"消费地点",
            type:"pos机"
            transtime:"Date"
        }
    ]
}
```

### 获取新闻列表

//可能返回数据时间会稍长，因为爬取cookie过期，重新模拟登录
```
{
    url:"/api/getnews",
    method:"GET",
    origin:"ishou"
}
//res
{
    err:false,
    data:[
        {
            channelid:"频道编号",
            channelname:"频道名称",
            parentchannelid:"父频道id"
        }
    ]
}
```

### 获取成绩

```
{
    url:"/api/getachievement/:username",
    method:"GET",
    origin:"ishou"
}
//res
{
    err:"",//false or 暂时没有出成绩
    data:[
        {
            kch:"课程号",
            kxh:"课序号",
            kcm:"课程名",
            xf:"学分",
            kccj:"课程成绩",
            cjlrfsdm:"001"//未知
        }
    ]
}
```

### 获取课程表

```
{
    url:"api/getclass/:username/:type,
    method:"GET",
    origin:"官网",
    type:{
        cache:"从缓存中获取",
        refresh:"重新抓取"
    }
}
//res
{
    err:true/false,
    data:[]//课程表数组
    username:"学号",
    _id
}
```

### 通讯录

```
{
    url:"api/address/:[keywords]",
    method:"GET/POST/UPDATE",
    origin:"程序"
    //当为get时候需要keywords参数，可根据姓名，手机号查询
}
//req
{
    //method 为 update时候 有管理员权限认证
    {
        _id:"",
        change:""//为一变更对象
        type:"urlencoded"
    }
    //为post 时候 有管理员权限认证
    {
        type:"urlencoded",
        name:"",
        email:"",
        number:"",
        mobile:"",
        position:""
    }
}
//res
{
    err:true/false,
    data:[  //为get时候显示
        {
            _id:"",
            name:"姓名",
            email:"邮箱",
            number:"电话号",
            mobile:"手机号",
            position:"职位"
        }
    ]
}
```