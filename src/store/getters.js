const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  access_token: state => state.user.access_token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.nickname
}
export default getters
