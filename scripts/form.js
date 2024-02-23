document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const sub1 = document.querySelector('input[name="sub1"]').value;
    const phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

    if (!phoneRegex.test(phone)) {
        alert('Неверный формат номера телефона. Используйте +7(XXX)XXX-XX-XX');
        return;
    }

    const formData = {name: name, phone: phone, sub1: sub1};
    const formDataJSON = JSON.stringify(formData);
    if(localStorage.getItem(formDataJSON)) {
        alert("Вы уже отправляли заявку с этими данными.");
        return;
    }

    fetch("./scripts/submit-form.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: formDataJSON
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Сохраняем данные формы в localStorage как "отправленные"
                localStorage.setItem(formDataJSON, true);
                window.location.href = "../pages/success.html"
            } else {
                window.location.href = "../pages/error.html"
            }
        })
        .catch(error => {
            alert(error);
        });
});
