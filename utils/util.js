
/* utils/api.js  自定义网络请求 */
const baseURL = 'https://test-miniprogram.com' // 自己后台API地址
const http = ({ url = '', params = {}, ...other } = {}) => {
  wx.showLoading({
    title: '加载中...'
  })
  let time = Date.now()
  console.log(`开始:${time}`)
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl(url),
      data: params,
      header: getHeader(),
      ...other,
      complete: (res) => {
        wx.hideLoading()
        console.log(`耗时:${Date.now() - time}`)
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }
    })
  })
}
const getUrl = url => {
  if (url.indexOf('://') == -1) {
    url = baseURL + url
  }
  return url
}
const getHeader = () => {
  try {
    var token = wx.getStorageSync('token')
    if (token) {
      return { 'token': token }
    }
    return {}
  } catch (e) {
    return {}
  }
}
module.exports = {
  baseURL,
  findTag(tag){
      //新闻列表页api
   return this.get('/api/news/list?type='+tag)
  },
  findDetail(id){
    //新闻详情页api
    return this.get('/api/news/detail?id='+id)
  },
  get(url, params = {}) {
    return http({
      url,
      params
    })
  }
}

