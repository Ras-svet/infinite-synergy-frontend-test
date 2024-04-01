export class Api {
	constructor({url, headers}) {
		this._url = url;
		this._headers = headers;
	}
  _checkResponse(response) {
		return response.ok ? response.json() : response.json().then(errData => Promise.reject(errData))
	}
  getUsersByPackets(pageNumber, size) {
		return fetch(`${this._url}/${pageNumber}/${size}`, {
			headers: this._headers,
		}).then(this._checkResponse)
	}
  updateUserInfo(id, body) {
    return fetch(`${this._url}/${id}`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify(body),
		}).then(this._checkResponse)
  }
}

const api = new Api({
	url: 'http://localhost:3001/users',
	headers: {
		'Content-Type': 'application/json'
	}
})

export default api;