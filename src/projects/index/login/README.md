**系统参数配置参数**

- 首次登录是否强制修改密码：hasForceModifyPassword
- 密码有效天数(参数值必须大于等于 1),单位天 passwordExpireDay
- 密码过期提前提醒时间（天）：limitDay
- 密码校验强度(0:低 1:中 2:高)：passwordlevel
- 密码过期是否强制修改密码：hasPasswordExpForceModify

**登录页密码控制迁移指南**

- permission.js 需要增加密码修改页面/info 的白名单，登录失败跳转密码修改页 在 src/projects/index/permission.js whiteList 配置
- axios.js 需要增加登录失败的特殊处理 code=1010 在 src/modularize/config/website.js statusWhiteList 配置
- 登录提示修改密码的请求接口 reject 后需要存储 token 在 src/projects/index/store/modules/user.js loginByUsername 配置
