import { Notification } from 'element-ui'
import { axios } from '@/common/request'

export default {
  state: {
    blogList: []
  },
  mutations: {
    update_blogList (store, blogList) {
      store.blogList = blogList
    }
  },
  actions: {
    update_blogList ({ commit }, query) {
      axios({ url: "/blog", params: query }).then(res => {
        const result = res.data || []
        if (!result.length) return Promise.resolve()
        commit("update_blogList", result)
      }).catch(res => {
        Notification.error({
          title: '错误',
          message: JSON.stringify(res.message)
        });
        Promise.resolve()
      });
    }
  }
}