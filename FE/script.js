document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const bookingData = {
        name: name,
        date: date,
        time: time
    };
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Booking successful!');
        document.getElementById('bookingForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Booking failed. Please try again.');
    });
});