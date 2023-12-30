export default class BaseApi
{
  constructor({ baseUrl, headers })
  {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //*********************************************
  //                  Request
  //*********************************************
  _request({ method, url, body, moreHeader })
  {
    const header = {...this._headers, ...moreHeader};

    let returnPromise;
    console.log(body);
    console.log(header);
    // Проверка на пустое тело
    if (body == null)
      returnPromise = fetch(this._baseUrl + url,
        {
          method: method,
          headers: header
        });
    else
      returnPromise = fetch(this._baseUrl + url,
        {
          method: method,
          headers: header,
          body: body
        });

    return returnPromise
      .then((res) =>
      {
        if (res.ok) 
          return res.json();
        else
          return Promise.reject(`Ошибка: ${res.status}`);
      })
  }
}