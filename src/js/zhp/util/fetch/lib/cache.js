/**
 * Created by ningfujun on 16/12/16.
 */

import lf from '../../lf/index';
import conf from './conf';
import util from './util';

let get = {
  js(cal){
    lf.getItem(conf.lf_key_js).then((val)=> {
      cal(util.save_get(val));
    });
  },

  version(cal){
    lf.getItem(conf.lf_key_version).then((val)=> {
      cal(util.save_get(val));
    });
  },
};

let set = {
  js(val, cal){
    lf.setItem(conf.lf_key_js, val).then((val)=> {
      cal(util.save_get(val));
    });
  },

  version(val = conf.version, cal = function () {}){
    lf.setItem(conf.lf_key_version, val).then((val)=> {
      cal(util.save_get(val));
    });
  },
};

//查询是否存在
let find = {
  js(cal){
    get.js((val)=> {
      val ? cal(true, val) : cal(false, val);
    });
  },

  version(cal){
    get.version((val)=> {
      val ? cal(true, val) : cal(false, val);
    });
  },
};

//比较
let compare = {
  version(have, without){
    get.version((version) => {
      if (version == conf.version) {
        have();
      } else {
        without();
      }
    });
  },
};

export default {
  get,
  set,
  find,
  compare,
};