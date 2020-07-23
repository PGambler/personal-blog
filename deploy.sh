#!/bin/sh
#获取环境名
env=''

if [ x$1 != x ];then
    env=$1
else
    env='local'
fi
echo -e '\n'
echo '部署环境 => '${env}''
echo -e '\n'

#获取当前分支名
curr_branch=`git symbolic-ref --short -q HEAD`
echo '当前工作分支 => '${curr_branch}''

echo -e '\n'

echo '读取配置文件:'
deploy_branch=`sed '/^'${env}_branch'=/!d;s/.*=//' deploy.conf`
deploy_host=`sed '/^'${env}_host'=/!d;s/.*=//' deploy.conf`
deploy_user=`sed '/^'${env}_user'=/!d;s/.*=//' deploy.conf`
deploy_pwd=`sed '/^'${env}_pwd'=/!d;s/.*=//' deploy.conf`
deploy_path=`sed '/^'${env}_path'=/!d;s/.*=//' deploy.conf`
echo '分支 => '${deploy_branch}
echo '地址 => '${deploy_host}
echo '用户 => '${deploy_user}
echo '路径 => '${deploy_path}
echo -e '\n'

isCheckout=0
if [ ${curr_branch} != ${deploy_branch} ]; then
  isCheckout=1
  echo '切换到需发布的分支 => '${deploy_branch}
  echo '储存当前修改'
  git stash 
  git checkout $deploy_branch
  echo -e '\n'
fi

echo '编译项目'
# npm run build
echo -e '\n'

if [ ${deploy_host} = 'localhost' ]; then
  echo '删除老版本'
  rm -rf ${deploy_path}
  echo '上传新版本'
  scp -r ./dist/ ${deploy_path}
elif [ -n ${deploy_pwd} ]; then
  plink -batch -C -ssh -pw ${deploy_pwd} ${deploy_user}@${deploy_host}
  echo '删除老版本'
  rm -rf ${deploy_path}
  echo '上传新版本'
  scp -r ./dist/ ${deploy_user}@${deploy_host}:${deploy_path}
else 
  echo '删除老版本'
  ssh ${deploy_user}@${deploy_host} "rm -rf "${deploy_path}
  echo '上传新版本'
  scp -r ./dist/ ${deploy_user}@${deploy_host}:${deploy_path}
fi
echo -e '\n'

if [ ${isCheckout} -eq 1 ]; then
  echo '切回工作分支 => '${curr_branch}
  echo '释放修改'
  git stash pop
  git checkout $curr_branch
  echo -e '\n'
fi

echo '部署结束'
