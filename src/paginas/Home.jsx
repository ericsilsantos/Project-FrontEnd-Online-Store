import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../Componentes/Card';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Categories from '../Componentes/Categories';
import { handleButton, getquantilityItem } from '../services/carrinhoDeCompra';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      category: '',
      inputText: '',
      productList: [],
      totalItem: '0',
    };
  }

  componentDidMount() { this.setState({ totalItem: getquantilityItem() }); }

  searchProduct = async () => {
    const { inputText, category } = this.state;
    const list = await getProductsFromCategoryAndQuery(category, inputText);
    this.setState({
      productList: list.results,
    });
  }

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({
      inputText: value,
    });
  }

  handleRadio = async ({ target }) => {
    const { id } = target;
    await this.setState({
      category: id,
    });
    this.searchProduct();
  };

  handleClickButton = (product) => {
    handleButton(product);
    const total = getquantilityItem();
    this.setState({ totalItem: total });
  }

  render() {
    const { productList, totalItem } = this.state;
    // const { handleButton } = this.props;
    return (
      <div className="home">
        <aside className="asideCat">
          <Categories
            handleRadio={ this.handleRadio }
          />
        </aside>
        <div className="telaBusca">
          <input
            className="inputSearch"
            data-testid="query-input"
            type="text"
            onChange={ this.handleInput }
          />
          <button
            type="button"
            data-testid="query-button"
            onClick={ this.searchProduct }
          >
            Procurar
          </button>
          <Link
            className="iconeCartShopping"
            to="/shoppingcart"
            data-testid="shopping-cart-button"
          >
            <span
              data-testid="shopping-cart-size"
            >
              {`Carrinho de Compras ${totalItem}`}
            </span>
          </Link>
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
          <div className="listagemDeProduto">
            {productList.length === 0 ? <p>Nenhum produto foi encontrado</p> : (
              productList.map((product) => (
                <Card
                  key={ product.id }
                  title={ product.title }
                  price={ product.price }
                  image={ product.thumbnail }
                  handleButton={ this.handleClickButton }
                  product={ product }
                />
              )))}
          </div>
        </div>
      </div>
    );
  }
}
// Home.propTypes = {
//   handleButton: PropTypes.func.isRequired,
// };

export default Home;
