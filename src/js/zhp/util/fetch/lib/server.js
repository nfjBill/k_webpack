/**
 * Created by ningfujun on 16/12/16.
 */

import util from './util';
import conf from './conf';

let get = {
  js : {
    local(cal){
      util.XHR({
        param: 'module=0',
        path: conf.path_local,
        success(result){
          cal(result);
        }
      });
    },

    line(cal){
      util.XHR({
        param: 'module=1',
        path: conf.path_line,
        success(result){
          cal(result);
        }
      });
    },
  }
};

export default {
  get,
}