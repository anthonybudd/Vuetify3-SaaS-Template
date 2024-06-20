import Service from './Service';

class Books extends Service {
    index() {
        return this.axios.get(`/books`);
    }

    get(bookID) {
        return this.axios.get(`/books/${bookID}`);
    }

    create(book) {
        return this.axios.post(`/books`, book);
    }

    update(bookID, book) {
        return this.axios.post(`/books/${bookID}`, book);
    }

    delete(bookID) {
        return this.axios.delete(`/books/${bookID}`);
    }
}

export default Books;
