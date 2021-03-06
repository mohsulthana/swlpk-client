import API from '@/services/APIService'

export default {
  index () {
    return API().get('post')
  },
  register_lapak (lapak) {
    return API().post('post', lapak)
  },
  show (id) {
    return API().get(`post/${id}`)
  },
  delete (id) {
    return API().delete(`post/${id}`)
  },
  update (id) {
    return API().put(`post/${id}`)
  },
  search (id) {
    return API().post()
  }
}
