document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const sub1 = document.querySelector('input[name="sub1"]').value;

    const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
    if (!phoneRegex.test(phone)) {
        alert('Неверный формат номера телефона. Используйте +7(XXX)XXX-XX-XX');
        return;
    }

    fetch("submit-form.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, phone: phone, sub1: sub1 })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'success.html';
            } else {
                window.location.href = 'error.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'error.html';
        });
});
