const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

const rootPath = path.relative(__dirname, "singlePage");

app.use(bodyParser.json());
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());

app.use(session({
  secret: "epcos-user",
  resave: true,
  key: "epcos-user",
  saveUninitialized: true,
  rolling: false,
  cookie: {
    secure: false, // http有效
    maxAge: 5 * 60 * 1000
  }
}));


/**
 * 开启跨域，便于接口访问.
 */
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //控制访问来源：所有
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求 
  res.header('Access-Control_Allow-Metheds', 'GET, POST, PUT, DELETE, OPTIONS'); //访问控制允许方法 
  res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs 
  res.header('Content-Type', 'application/json;charset=utf-8');
  return next();
});

app.post("/setSettingConfig", (req, res) => {
  const param = Object.keys(req.query).length === 0 ? req.body : req.query;
  if (!param || !param.config) {
    return generalRes(res, "参数不完整", -1);
  }
  try {
    var configStr = JSON.stringify(param.config)
  } catch (error) {
    return generalRes(res, "配置不能正常解析", -1);
  }
  fs.writeFile(rootPath + "/src/configure/setting.json", configStr, "utf-8", (err) => {
    if (err) {
      return generalRes(res, err, -1);
    }
    generalRes(res);
  })
});

app.get("/getSettingConfig", (req, res) => {
  fs.readFile(rootPath + "/src/configure/setting.json", "utf-8", (err, text) => {
    if (err) {
      text = ""
    }
    res.send(text);
  })
});

app.get("/getPage/:path", (req, res) => {
  let path = req.params.path;
  if (!path) return generalRes(res, "未知页面", -1);
  path = path.replace(/233/g, '\/').replace(/322/g, '.');
  fs.readFile(rootPath + "/src/pages/home/" + path, "utf-8", (err, text) => {
    if (err) {
      text = ""
    } else {
      text = text.replace(/<template><div>/g, "");
      text = text.substring(0, text.indexOf("</div></template>"));
    }
    res.send(text);
  })
});

app.post("/savePage", (req, res) => {
  const param = Object.keys(req.query).length === 0 ? req.body : req.query;
  if (!param || !param.path || !param.template) {
    return generalRes(res, "参数不完整", -1);
  }
  fs.writeFile(rootPath + "/src/pages/home/" + param.path, param.template, "utf-8", (err) => {
    if (err) {
      return generalRes(res, err, -1);
    }
    generalRes(res);
  })
});

app.get("/getPageTemp/:path", (req, res) => {
  let path = req.params.path;
  if (!path) return generalRes(res, "未知页面", -1);
  path = path.replace(/233/g, '\/').replace(/322/g, '.');
  fs.readFile(rootPath + "/src/pageTemps/" + path, "utf-8", (err, text) => {
    if (err) {
      text = ""
    }
    res.send(text);
  })
});

app.post("/savePageTemp", (req, res) => {
  const param = Object.keys(req.query).length === 0 ? req.body : req.query;
  if (!param || !param.path || !param.template) {
    return generalRes(res, "参数不完整", -1);
  }
  let path = rootPath + "/src/pageTemps/" + param.path;
  mkdirp(path.substring(0, path.lastIndexOf('/')), (err) => {
    fs.writeFile(path, param.template, "utf-8", (err) => {
      if (err) {
        return generalRes(res, err, -1);
      }
      generalRes(res);
    })
  });
});

let generalRes = function (res, msg = "OK", code = 1) {
  if (!res) return;
  res.json({
    code: code,
    msg: msg
  });
};

app.listen("7788", () => {
  console.log("the service is run!");
})