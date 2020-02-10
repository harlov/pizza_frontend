const BASE_API_URL = "http://localhost:5000/api/v1";


class Api {
    get(url) {
        return fetch(BASE_API_URL + url).then(res => res.json())
    }

    _modify_methods(method, url, data) {
        return fetch(
            BASE_API_URL + url,
            {
                method:  method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        ).then(res => res.json())
    }

    post(url, data) {
        return this._modify_methods("POST", url, data)
    }

    put(url, data) {
        return this._modify_methods("PUT", url, data)
    }
}

let api = new Api();

export default api;
