import { useState, ChangeEvent, useEffect } from "react";
import Header from "../components/header/Header";
import Product from "../components/product/Product";
import Input from "../components/ui-kit/input/Input";
import Button from "../components/ui-kit/button/Button";
import { IProduct } from "../types";
import { useFetchProductsQuery } from "../redux/services/productsApi";
import useDebounce from "../hooks/useDebounce";
import Loader from "../components/loader/loader";
import { ICart } from "../redux/reducers/cartsSlice";

interface IHome {
	me: string,
	isMe: boolean,
};

const Home: React.FC<IHome> = ({ me, isMe }) => {
	const [limit, setLimit] = useState<number>(0);
	const [search, setSearch] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
	const { data = {}, error, isLoading, isFetching, isSuccess, isError } = useFetchProductsQuery({ search, skip: limit, authorization: me }, { skip: !isMe, refetchOnMountOrArgChange: true });
	const { products = [], total: totalProducts = 0 } = data as ICart;
	const [productsOnPage, setProducts] = useState<Array<IProduct>>(products);

	useEffect(() => {
		if (!isLoading && !isFetching && isSuccess) {
			if (searchTerm || products.length !== 0) setProducts(products);
			if (limit !== 0) setProducts([...productsOnPage, ...products]);
		}
	}, [isLoading, isFetching, isSuccess, products.length, searchTerm, limit]);

	useDebounce(() => {
		if (typeof searchTerm != 'undefined') {
			setSearch(searchTerm);
			setProducts([]);
			setLimit(0);
		}
	}, [searchTerm], 800);

	const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	}

	useEffect(() => {
		if (isError) {
			if ('error' in error) alert(error.error);
			if ('data' in error && typeof error.data === 'object' && error.data && 'message' in error.data) alert(error.data.message);
			if ('message' in error) alert(error.message);
		}
	}, [isError]);

	return (
		<>
			<Header />
			<main>
				<section id="catalog" className="container">
					<div className="section">
						<div className="catalog">
							<h2 className="title-1">Catalog</h2>
							<Input type="search" placeholder="Search by title" value={searchTerm || ''} onChange={handleInputSearch} />
							<ul className="products">
								{isLoading && <Loader />}
								{isSuccess && productsOnPage?.map((product, id) => {
									return (
										<Product
											key={id}
											product={product}
										/>
									);
								})}
							</ul>
							{(!isLoading && !isFetching && productsOnPage.length === 0) && <p>Products not found</p>}
							{(!isLoading && isFetching) && <Loader />}
							{(!isLoading && !isFetching && totalProducts !== productsOnPage?.length) && <Button disabled={isLoading || isFetching} className="catalog-btn" onClick={() => setLimit(limit + 12)}>Show more</Button>}
						</div>
					</div>
				</section>
				<section id="faq" className="faq">
					<div className="faq__wrapper">
						<h3 className="faq__title">FAQ</h3>
						<details className="faq__details">
							<summary className="faq__summary">
								How can I track the status of my order?
						<img src="./images/icons/+.svg" alt="Open summary" />
							</summary>
							<p>After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.</p>
						</details>
						<details className="faq__details">
							<summary className="faq__summary">
								What payment methods do you accept?
						<img src="./images/icons/+.svg" alt="Open summary" />
							</summary>
							<p>After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.</p>
						</details>
						<details className="faq__details">
							<summary className="faq__summary">
								How can I return or exchange an item?
						<img src="./images/icons/+.svg" alt="Open summary" />
							</summary>
							<p>After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.</p>
						</details>
					</div>
				</section>
			</main>
		</>
	);
}

export default Home;
