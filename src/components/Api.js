export default class Api{
  constructor(options){
    this._headers = options.headers;
  }

  getInitialCards(){
    return fetch("https://mesto.nomoreparties.co/v1/cohort-20/cards", {
      headers: this._headers
    })
    .then((res) => {
      return res.json()
    })
  }
}
