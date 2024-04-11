function searchBook() {
    const bookName = document.getElementById('bookName').value;
    const author = document.getElementById('author').value;

    fetch(`/search?name=${bookName}&author=${author}`)
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('result').innerHTML = `Book found at row ${data.row}, column ${data.column}`;
        } else {
            document.getElementById('result').innerHTML = 'Book not found';
        }
    })
    .catch(error => console.error('Error:', error));
}
