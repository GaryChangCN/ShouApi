## 后台调用接口说明

约定返回数据格式同意为json格式，有data和err两个字段，如果没有错误，err可不填写，如果有错，err可以为布尔值
或者为一个对象，这个对象message字段有错误信息

### urp登录

```
{
    url:"/api/urplogin",
    method:"POST",
    data:{
        username:"",
        urppassword:"",
        thirdSession:""//当存在此字段时候会做小程序绑定验证
    },
    dataType:"urlencoded"
}
//res
{
    data:{
        urpPass:true/false,
        bindWxApp:true/false  //小程序openid绑定成功
    },
    err:""
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


### 获取成绩

```
{
    url:"/api/getachievement/:username",
    method:"GET",
    origin:"urp"
}
//res
{
    err:"",//false or 暂时没有出成绩
     //没有出成绩数组为空
    data:[
        {
            kch:"课程号",
            kxh:"课序号",
            kcm:"课程名",
            kcywm:"课程英文名",
            xf:"学分",
            kcsx:"课程属性",
            cj:"成绩"
        }
    ]
}
```

### 获取课程表

```
{
    url:"api/getclass/:username/:type,
    method:"GET",
    origin:"urp",
    type:{
        cache:"从缓存中获取若没有则更新缓存并返回",
        refresh:"重新抓取"
    }
}
//res
{
    err:true/false,
    data:[]//课程表数组
}
```

### 通讯录

```
{
    url:"api/address/:[keywords]",
    method:"GET/POST/UPDATE",
    origin:"app"
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

### 获取详细信息

```
{
    url:"api/getinfoplus/:username/:type,
    method:"GET",
    origin:"urp",
    type:{
        cache:"从缓存中获取",
        refresh:"重新抓取"
    }
}
//res
{
    err:true/false,
    data:{
        name,
        idCard,
        national,
        highSchoolName,
        highSchoolExam,
        address,
        parents,
        college,
        major,
        className,
        room,
        political,
        pic//图片名称
    }
}
//在获取infoPlus过程中会获取校园卡照片，保存成"学号".jpg格式在public/pic下
//若图片已存在，则不会重新获取图片
```