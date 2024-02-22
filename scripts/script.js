async function getCards() {
    try {
        const res = await fetch("https://fakestoreapi.com/products")
        const data = await res.json()
        console.log(data)
        const container = document.getElementById("products-container")
        data.forEach(product => {
            const card = document.createElement("div")
            card.innerHTML = `
             <div class="w-96\t min-h-96 shadow p-10 flex flex-col gap-4">
                <div>
                     <img src="${product.image}" alt="product-img" width="200" height="200"/>
                </div>
               <h2>название: ${product.title}</h2>       
               <p>категория: ${product.category}</p>
               <span>цена: ${product.price}</span>
               <button class="order-btn px-10 py-4 bg-gray-200 rounded text-black pointer">Оформить заказ</button>
            </div> 
            `
            container.appendChild(card)
        })

        document.querySelectorAll('.order-btn').forEach(button => {
            button.addEventListener('click', () => {
                document.getElementById('modal').style.display = 'block';
            });
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            document.getElementById('modal').style.display = 'none';
        });
    } catch (e) {
        console.log(`server error by products: ${e}`)
    }
}

getCards();
