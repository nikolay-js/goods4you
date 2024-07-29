import { useState, ChangeEvent, useEffect } from "react";
import Header from "../components/header/Header";
import Product from "../components/product/Product";
import Input from "../components/ui-kit/input/Input";
import Button from "../components/ui-kit/button/Button";
import { IProduct } from "../types";
import { useFetchProductsQuery } from "../redux/services/productsApi";
import useDebounce from "../hooks/useDebounce";

interface IHome {
	me: string,
  isMe: boolean,
};

const Home: React.FC<IHome> = ({ me, isMe }) => {
	const [limit, setLimit] = useState(12);
	const [search, setSearch] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const { data, error, isLoading, isFetching, isSuccess, isError } = useFetchProductsQuery({ search, limit, authorization: me }, { skip: !isMe, refetchOnMountOrArgChange: true });
	const products: Array<IProduct> = data?.products ?? [];
	const totalProducts = data?.total ?? '';
	const limitProducts = data?.limit ?? '';

	useDebounce(() => {
		setSearch(searchTerm);
	}, [searchTerm], 800);

	const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	}

  useEffect(() => {
    if (isError) alert('error' in error ? error.error : error.data.message);
  }, [isError]);

	return (
		<>
			<Header />
			<main>
				<section id="catalog" className="container">
					<div className="section">
						<h2 className="title-1">Catalog</h2>
						<Input type="search" placeholder="Search by title" value={searchTerm || ''} onChange={handleInputSearch} />
						<ul className="products">
						{isLoading && <p>is loading...</p>}
							{isSuccess && products.map((product, id) => {
								return (
									<Product
										key={id}
										product={product}
									/>
								);
							})}
						</ul>
						{(totalProducts !== limitProducts) && <Button disabled={isLoading || isFetching} onClick={() => setLimit(limit + 12)}>Show more</Button>}
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
