export class UserInfo {
  constructor({ userName, userInfo }) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      info: this._userInfo.textContent
    }
  }

  setUserInfo({ newUserName, newUserInfo }) {
    this._userName.textContent = newUserName;
    this._userInfo.textContent = newUserInfo;
  }
}