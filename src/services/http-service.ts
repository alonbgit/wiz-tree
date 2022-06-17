const RESOLVE_TIMEOUT = 1000;

class HttpService {
    get<T> (responseToResolve: T): Promise<T> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(responseToResolve);
            }, RESOLVE_TIMEOUT);
        });
    }
}

const service = new HttpService();
export default service;