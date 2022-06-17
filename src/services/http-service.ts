const RESOLVE_TIMEOUT = 1000;

class HttpService {
    get<T> (responseToResolve: T): Promise<T> {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('---response---', responseToResolve);
                resolve(responseToResolve);
            }, RESOLVE_TIMEOUT);
        });
    }
}

const service = new HttpService();
export default service;