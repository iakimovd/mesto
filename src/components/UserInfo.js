export class UserInfo {
  constructor({ userName, userInfo, userAvatar }) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userInfo.textContent,
      avatar: this._userAvatar.src
    }
  }

  // setUserInfo({ newUserName, newUserInfo, newUserAvatar }) {
  //   this._userName.textContent = newUserName;
  //   this._userInfo.textContent = newUserInfo;
  //   this._userAvatar.src = newUserAvatar;
  // }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.about;
    this._userAvatar.src = data.avatar;
  }
}