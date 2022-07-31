export class UserInfo {
  constructor({ userName, userInfo, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userInfo.textContent,
      avatar: this._userAvatar.src
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}