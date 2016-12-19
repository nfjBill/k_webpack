/**
 * Created by ningfujun on 16/12/16.
 */
import cache from './cache';
import server from './server';
import util from './util';
import conf from './conf';

export default class load {
  constructor(opt = {type: 'local', param: ''}) {
    let that = this;

    //获取类型
    that.opt = opt;

    //服务器计数器
    that.key_server = 0;

    that.init();
  }

  init() {
    let that = this;

    //前者有并且相同 后者无或者没有
    cache.compare.version(()=> {
      //是否处于debug模式
      conf.debug ? that.server() : that.cache();
    }, ()=> {
      that.server();
    });
  }

  server() {
    let that = this;

    //多于3次就停止向服务器获取 防御阻塞
    if(that.key_server < 2){
      //从服务器获取
      server.get.js[that.opt.type]((val)=> {
        //存入本地
        cache.set.js(val, ()=> {
          //取出运行
          that.cache();
        });
      });
    }
  }

  cache() {
    let that = this;

    //探索缓存是否存在资源
    cache.find.js((bl) => {
      //存在
      if (bl) {
        //探索本地是否缓存
        cache.get.js((lfVal)=> {
          //启动
          that.run(lfVal);
        });
        //不存在
      } else {
        //重新从服务器获取
        that.server();
        ++that.key_server;
      }
    });
  }

  run(lfVal) {
    //加载
    util.conLoad.js(lfVal);

    //添加启动函数
    cache.set.version();
  }
}