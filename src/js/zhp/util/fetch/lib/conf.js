/**
 * Created by ningfujun on 16/12/16.
 */
/**
 * Created by ningfujun on 16/10/9.
 */

let local_root = '192.168.31.11';

let conf = {
  version: '0.0.1',
  //这个没啥用 只是用来快速的检索刀version 方便线上修改
  zhp_ver_sel:'',

  //debug？
  debug: true,

  //cache内缓存关键字
  lf_key_css:'fetch_css',
  lf_key_js:'fetch_js',
  lf_key_version:'fetch_version',

  //路径理解
  path_local: 'http://' + local_root + '/~ningfujun/fetch.php',
  path_line: 'http://cdn.samyon.com/Ui123_Ost/zhp/v2/fetch.php',
};

export default conf;