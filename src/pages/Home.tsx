import Header from "../components/header/Header";
import Product from "../components/product/Product";
import Input from "../components/ui-kit/input/Input";
import Button from "../components/ui-kit/button/Button";

const mockedProducts = [
	{
		id: 0,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 1,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 2,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 3,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 4,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 5,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
		quantity: 1,
	},
	{
		id: 6,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 7,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 8,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 9,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 10,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
	{
		id: 11,
		title: 'Essence Mascara Lash Princess',
		img: 'src/assets/img/product.png',
		price: 110,
	},
];

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<main>
				<section id="catalog" className="container">
					<div className="section">
						<h2 className="title-1">Catalog</h2>
						<Input type="search" placeholder="Search by title" />
						<ul className="products">
							{mockedProducts.map((product, id) => { // TODO: change to products from api
								return (
									<Product
										key={id}
										title={product.title}
										img={product.img}
										price={product.price}
										quantity={product.quantity}
										id={id}
									/>
								);
							})}
						</ul>
						<Button>Show more</Button>
					</div>
				</section>
				<section id="faq" className="faq">
					<h3 className="faq__title">FAQ</h3>
					<details className="faq__details">
						<summary className="faq__summary">
							How can I track the status of my order?
						<img src="src/assets/icons/+.svg" alt="Open summary" />
						</summary>
						<p>After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.</p>
					</details>
					<details className="faq__details">
						<summary className="faq__summary">
							What payment methods do you accept?
						<img src="src/assets/icons/+.svg" alt="Open summary" />
						</summary>
						<p>After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.</p>
					</details>
					<details className="faq__details">
						<summary className="faq__summary">
							How can I return or exchange an item?
						<img src="src/assets/icons/+.svg" alt="Open summary" />
						</summary>
						<p>After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.</p>
					</details>
				</section>
			</main>
		</>
	);
}

export default Home;
