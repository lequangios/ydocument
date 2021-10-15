import axios from 'axios'
import Qs from 'qs'

class MBServiceError extends Error {
    constructor(httpStatus, code, message) {
        super(message);
        this.httpStatus = httpStatus;
        this.name = 'MBServiceError';
        this.code = code;
    }

    getHttpStatus() {
        return this.httpStatus;
    }

    getCode() {
        return this.code;
    }
}

class MBClient {
    static mbClient = undefined
    constructor(apiEndpoint, apiTimeout) {
        this.__client = axios.create({
            baseURL: apiEndpoint,
            timeout: apiTimeout,
            paramsSerializer: function(params) {
                return Qs.stringify(params)
            }
        })
        this.__client.interceptors.response.use(function(response) {
            if (response.data && response.data.error_code != undefined) {
                return Promise.reject(new MBServiceError(response.status, response.data.error_code,
                    response.data.error_message));
            } else {
                return response.data;
            }
        }, function(error) {
            if (!(error instanceof MBServiceError)) {
                if (error.response && error.response.data && error.response.data.error_code != undefined) {
                    return Promise.reject(new MBServiceError(error.response.status, error.response.data.error_code,
                        error.response.data.error_message));
                }
            }
            return Promise.reject(error);
        });
    }

    static shared() {
        if (MBClient.mbClient == undefined) {
            MBClient.mbClient = new MBClient(process.env.API_ENDPOINT, process.env.API_TIME_OUT)
        }
        return MBClient.mbClient
    }

    getAxios() {
        return this.__client;
    }

    listDocument() {
        return this.__client.get('', { params: { router: "document" } })
    }

    addDocument(doc) {
        return this.__client.post('?router=document/add', doc)
    }

    detailDocument(doc_id) {
        return this.__client.get('', { params: { router: "document/detail", document_id: doc_id } })
    }

    updateDocument(doc) {
        return this.__client.post('?router=document/edit', doc)
    }

    viewDocument(doc_id) {
        return this.__client.get('', { params: { router: "document/view", document_id: doc_id } })
    }

    listChapter() {
        return this.__client.get('', { params: { router: "chapter/all" } })
    }

    addChapter(doc_id, chap) {
        return this.__client.post('?router=chapter/add&document_id=' + doc_id, chap)
    }

    detailChapter(chap_id) {
        return this.__client.get('', { params: { router: "chapter/detail", chapter_id: chap_id } })
    }

    updateChapter(chap) {
        return this.__client.post('?router=chapter/edit&chapter_id=' + chap.id, chap)
    }

    listNodeTypes() {
        return this.__client.get('', { params: { router: "meta/nodetype" } })
    }

    getConfiguration(name) {
        return this.__client.get('', { params: { router: "meta/configuration", name: name } })
    }

    listCategory() {
        return this.__client.get('', { params: { router: "category" } })
    }

    addCategory(cate) {
        return this.__client.post('?router=category/addCate', cate)
    }

    udpateCategory(category_id, cate) {
        return this.__client.post('?router=category/editCate?category_id=' + category_id, cate)
    }

    removeCategory(category_id) {
        return this.__client.get('', { params: { router: "category/removeCate", category_id: category_id } })
    }

    listAuthor() {
        return this.__client.get('', { params: { router: "author" } })
    }

    addAuthor(author) {
        return this.__client.post('?router=author/addAuthor', author)
    }

    udpateAuthor(author_id, author) {
        return this.__client.post('?router=author/editAuthor?author_id=' + author_id, author)
    }

    listAssets(folder) {
        return this.__client.get('', { params: { router: "filemanger", name: folder } })
    }
}

export { MBClient }