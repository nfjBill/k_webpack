/**
 * Created by ningfujun on 16/12/16.
 */
let XHR_errorKey = 0;

let util = {
  conLoad: {
    //初始化-js
    js(cd){
      let script = document.createElement('script');
      script.type = "text/javascript";
      script.text = cd;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  },

  //安全取数据
  save_get(val){
    let re = '';

    if (val) {
      re = val;
    }

    return re;
  },
  
  XHR(opt = {success(){},param: '',path: '',}){
    let that = this;

    function error() {
      if (XHR_errorKey < 3) {
        that.getFile(opt);
        ++XHR_errorKey;
      } else {
        alert('加载错误,请重新刷新页面或联系相关人员');
      }
    }

    function send() {
      try {
        let xmlHttp;
        if (window.ActiveXObject) {
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        else if (window.XMLHttpRequest) {
          xmlHttp = new XMLHttpRequest();
        }

        xmlHttp.open("POST", opt.path, true);

        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
              let result = xmlHttp.responseText;

              opt.success(result);
            } else {
              //错误计数
              if (XHR_errorKey < 3) {
                error();
              }
            }
          }
        };
        xmlHttp.send(opt.param);
      } catch (e) {
        let xdr = new XDomainRequest();

        xdr.onload = function (e) {
          let result = xdr.responseText;
          opt.success(result);
        };

        xdr.onerror = function (e) {
          //代码对ie8压力太大 就不进行错误冗余了
          error();
        };

        xdr.open("POST", opt.path);
        // xdr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xdr.send(opt.param);
      }
    }

    send();
  },
};

export default util;