import {useState} from "react";

function CategoryRow({categoryName}){
    return (
        <tr>
            <th colSpan="2">
                {categoryName}
            </th>
        </tr>
    )
}

function ProductRow({product}){
    const name = product.stocked ? product.name :
        <span style={{color: 'red'}}>
            {product.name}
        </span>

    return (
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}


function ProductTable({products, filterText, inStockOnly}){
    let rows = [];
    let lastCategory = products[0].category;

    products.forEach((product, index) => {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ) {
            return;
        }
        if (inStockOnly && !product.stocked) {
            return;
        }
        if(product.category === lastCategory){
            rows.push(<ProductRow product={product} key={index}></ProductRow>);
        } else{
            lastCategory = product.category;
            rows.push(<CategoryRow categoryName={product.category} key={product.category}></CategoryRow>);
            rows.push(<ProductRow product={product} key={index}></ProductRow>);
        }
    })
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

function SearchBar({filterText, setFilterText, setInStockOnly, inStockOnly}) {
    return (
        <form>
            <input type="text" value={filterText} placeholder="Type ur search here" onChange={(e) => setFilterText(e.target.value)}/>
            <label>
                <input type="checkbox" value={inStockOnly} onChange={(e) =>{
                    setInStockOnly(e.target.checked)
                }}/>
                show products not in stock
            </label>
        </form>
    )
}

function SearchableProductTable({products}) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);

    return (
        <>
            <SearchBar setInStockOnly={setInStockOnly} setFilterText={setFilterText} filterText={filterText} inStockOnly={inStockOnly}></SearchBar>
            <ProductTable products={products} filterText={filterText} inStockOnly={inStockOnly}></ProductTable>
        </>
    )
}

const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];
export default function App(){
    return <SearchableProductTable products={PRODUCTS}></SearchableProductTable>
}