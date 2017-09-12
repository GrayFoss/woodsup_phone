// 从页面收集OpenAPI必要的参数。get_user_info不需要输入参数，因此paras中没有参数
var paras = {};
// 存储QQ回调的用户信息
// 最下面清除了打印信息
if(typeof (QC) !== 'undefined') {
  QC.api('get_user_info', paras)
    .success(function(s){
      // 成功回调
      console.log("获取用户信息成功！当前用户昵称为："+s.data.nickname);
    })
    // 指定接口访问失败的接收函数，f为失败返回Response对象
    .error(function(f){
      //失败回调
      console.log("获取用户信息失败！");
    })
    //指定接口完成请求后的接收函数，c为完成请求返回Response对象
    .complete(function(c){
      //完成请求回调
      console.log("获取用户信息完成！");
    });
// 如果已登录
  if(QC.Login.check()){
    QC.Login.getMe(function(openId, accessToken){
      console.log(["当前登录用户的", "openId为："+openId, "accessToken为："+accessToken].join("\n"));
    });
    //这里可以调用自己的保存接口
    //...
  }
}
